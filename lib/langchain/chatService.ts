import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { getModelConfig } from "@/constants/models";
import type { ModelType } from "@/store/types";

type ChatModel = ChatOpenAI | ChatAnthropic;

export const DEFAULT_SYSTEM_PROMPT =
  "You are EnkiAI, a helpful and knowledgeable AI assistant.";

const DEFAULT_TIMEOUT_MS = 120_000;
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_TEMPERATURE = 0.7;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatServiceConfig {
  openAIKey?: string;
  anthropicKey?: string;
  selectedModel: ModelType;
  maxTokens?: number;
  timeoutMs?: number;
  maxRetries?: number;
  temperature?: number;
}

export interface SendMessageStreamOptions {
  systemPrompt?: string;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export class ChatService {
  private llm: ChatModel;
  private timeoutMs: number;
  private static instance: ChatService;
  private static lastConfig: string | null = null;

  private constructor(config: ChatServiceConfig) {
    const modelConfig = getModelConfig(config.selectedModel);

    if (!modelConfig) {
      throw new Error(`Unknown model: ${config.selectedModel}`);
    }

    const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const maxRetries = config.maxRetries ?? DEFAULT_MAX_RETRIES;
    const temperature = config.temperature ?? DEFAULT_TEMPERATURE;
    this.timeoutMs = timeoutMs;

    switch (modelConfig.provider) {
      case "Anthropic": {
        if (!config.anthropicKey) {
          throw new Error("Anthropic API key is required for Claude models.");
        }

        const anthropicOptions: {
          apiKey: string;
          model: string;
          temperature?: number;
          maxTokens?: number;
          maxRetries?: number;
          clientOptions?: { timeout?: number };
        } = {
          apiKey: config.anthropicKey,
          model: config.selectedModel,
          maxTokens: config.maxTokens,
          maxRetries,
          clientOptions: { timeout: timeoutMs },
        };

        if (modelConfig.reasoning.supportsTemperature) {
          anthropicOptions.temperature = temperature;
        }

        this.llm = new ChatAnthropic(anthropicOptions);
        break;
      }

      case "OpenAI": {
        if (!config.openAIKey) {
          throw new Error("OpenAI API key is required for OpenAI models.");
        }

        const openAIOptions: {
          apiKey: string;
          model: string;
          temperature?: number;
          maxTokens?: number;
          maxRetries?: number;
          timeout?: number;
        } = {
          apiKey: config.openAIKey,
          model: config.selectedModel,
          maxTokens: config.maxTokens,
          maxRetries,
          timeout: timeoutMs,
        };

        if (modelConfig.reasoning.supportsTemperature) {
          openAIOptions.temperature = temperature;
        }

        this.llm = new ChatOpenAI(openAIOptions);
        break;
      }

      case "Google": {
        throw new Error("Google Gemini support is not yet implemented.");
      }

      default: {
        throw new Error(`Unsupported provider: ${modelConfig.provider}`);
      }
    }
  }

  public static getInstance(config: ChatServiceConfig) {
    // Hash only fields that impact the underlying LLM instance.
    const configHash = JSON.stringify({
      openAIKey: config.openAIKey,
      anthropicKey: config.anthropicKey,
      selectedModel: config.selectedModel,
      maxTokens: config.maxTokens,
      timeoutMs: config.timeoutMs,
      maxRetries: config.maxRetries,
      temperature: config.temperature,
    });
    if (configHash !== ChatService.lastConfig || !ChatService.instance) {
      ChatService.instance = new ChatService(config);
      ChatService.lastConfig = configHash;
    }

    return ChatService.instance;
  }

  private convertToLangChainMessages(history: ChatMessage[]) {
    return history.map((msg) =>
      msg.role === "user" ? new HumanMessage(msg.content) : new AIMessage(msg.content)
    );
  }

  public async *sendMessageStream(
    message: string,
    history: ChatMessage[] = [],
    options: SendMessageStreamOptions = {}
  ): AsyncGenerator<string, void, unknown> {
    try {
      const historyMessages = this.convertToLangChainMessages(history);
      const systemPrompt = options.systemPrompt ?? DEFAULT_SYSTEM_PROMPT;
      const messages = [
        ...(systemPrompt.trim() ? [new SystemMessage(systemPrompt)] : []),
        ...historyMessages,
        new HumanMessage(message),
      ];

      const stream = await this.llm.stream(messages, {
        timeout: options.timeoutMs ?? this.timeoutMs,
        signal: options.signal,
      });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) yield chunkText;
      }
    } catch (error) {
      console.error("Error in streaming chat:", error);
      throw error;
    }
  }
}

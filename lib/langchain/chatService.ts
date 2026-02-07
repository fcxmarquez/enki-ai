import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ModelType } from "@/store/types";
import { getModelConfig } from "@/constants/models";

type ChatModel = ChatOpenAI | ChatAnthropic;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class ChatService {
  private llm: ChatModel;
  private static instance: ChatService;
  private static lastConfig: string | null = null;

  private constructor(config: {
    openAIKey?: string;
    anthropicKey?: string;
    selectedModel: ModelType;
  }) {
    const modelConfig = getModelConfig(config.selectedModel);

    if (!modelConfig) {
      throw new Error(`Unknown model: ${config.selectedModel}`);
    }

    switch (modelConfig.provider) {
      case "Anthropic": {
        if (!config.anthropicKey) {
          throw new Error("Anthropic API key is required for Claude models.");
        }

        const anthropicOptions: {
          apiKey: string;
          model: string;
          temperature?: number;
        } = {
          apiKey: config.anthropicKey,
          model: config.selectedModel,
        };

        if (modelConfig.reasoning.supportsTemperature) {
          anthropicOptions.temperature = 0.7;
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
        } = {
          apiKey: config.openAIKey,
          model: config.selectedModel,
        };

        if (modelConfig.reasoning.supportsTemperature) {
          openAIOptions.temperature = 0.7;
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

  public static getInstance(config: {
    openAIKey?: string;
    anthropicKey?: string;
    selectedModel: ModelType;
  }) {
    const configHash = JSON.stringify(config);
    if (configHash !== this.lastConfig || !this.instance) {
      this.instance = new ChatService(config);
      this.lastConfig = configHash;
    }

    return this.instance;
  }

  private convertToLangChainMessages(history: ChatMessage[]) {
    return history.map((msg) =>
      msg.role === "user" ? new HumanMessage(msg.content) : new AIMessage(msg.content)
    );
  }

  public async *sendMessageStream(
    message: string,
    history: ChatMessage[] = []
  ): AsyncGenerator<string, void, unknown> {
    try {
      const historyMessages = this.convertToLangChainMessages(history);
      const stream = await this.llm.stream([
        new SystemMessage("You are EnkiAI, a helpful and knowledgeable AI assistant."),
        ...historyMessages,
        new HumanMessage(message),
      ]);

      for await (const chunk of stream) {
        if (chunk.content) {
          yield chunk.content as string;
        }
      }
    } catch (error) {
      console.error("Error in streaming chat:", error);
      throw error;
    }
  }
}

import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ModelType } from "@/store/types";

function isReasonerModel(model: ModelType): boolean {
  return model === "o3" || model === "o4-mini";
}

export class ChatService {
  private llm: BaseChatModel;
  private static instance: ChatService;
  private static lastConfig: string | null = null;

  private constructor(config: {
    openAIKey?: string;
    anthropicKey?: string;
    selectedModel: ModelType;
  }) {
    if (!config.openAIKey && !config.anthropicKey) {
      throw new Error(
        "No API key provided. Please provide either an OpenAI or Anthropic API key in the settings."
      );
    }

    // Initialize based on selected model
    if (config.selectedModel.startsWith("claude-")) {
      if (!config.anthropicKey) {
        throw new Error("Anthropic API key is required for Claude model.");
      }
      this.llm = new ChatAnthropic({
        apiKey: config.anthropicKey,
        model: config.selectedModel,
        temperature: 0.7,
      });
    } else if (
      config.selectedModel.startsWith("gpt-") ||
      config.selectedModel.startsWith("o")
    ) {
      if (!config.openAIKey) {
        throw new Error("OpenAI API key is required for OpenAI model.");
      }
      const options: {
        apiKey: string;
        model: string;
        temperature?: number;
      } = {
        apiKey: config.openAIKey,
        model: config.selectedModel,
      };

      if (!isReasonerModel(config.selectedModel)) {
        options.temperature = 0.7;
      }

      this.llm = new ChatOpenAI(options);
    } else {
      throw new Error("Invalid model selected.");
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

  public async sendMessage(message: string) {
    try {
      const response = await this.llm.invoke([
        new SystemMessage("You are EnkiAI, a helpful and knowledgeable AI assistant."),
        new HumanMessage(message),
      ]);

      return response.content;
    } catch (error) {
      console.error("Error in chat service:", error);
      throw error;
    }
  }
}

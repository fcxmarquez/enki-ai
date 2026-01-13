import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
  BaseMessage,
  AIMessage,
} from "@langchain/core/messages";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ModelType } from "@/store/types";
import { getModelConfig } from "@/constants/models";
import { Runnable } from "@langchain/core/runnables";
import { ClientSearchTool } from "@/lib/langchain/tools/clientSearchTool";

export class ChatService {
  private llm: BaseChatModel;
  private llmWithTools: Runnable;
  private tools = [new ClientSearchTool()];
  private static instance: ChatService | undefined;
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.llmWithTools = (this.llm as any).bindTools(this.tools);
  }

  public static getInstance(config: {
    openAIKey?: string;
    anthropicKey?: string;
    selectedModel: ModelType;
  }) {
    const configHash = JSON.stringify(config);
    if (configHash !== ChatService.lastConfig || !this.instance) {
      this.instance = new ChatService(config);
      this.lastConfig = configHash;
    }

    return this.instance;
  }

  public async sendMessage(message: string) {
    try {
      const messages: BaseMessage[] = [
        new SystemMessage(
          "You are EnkiAI, a helpful and knowledgeable AI assistant. You have access to tools to search the web."
        ),
        new HumanMessage(message),
      ];

      const response = (await this.llmWithTools.invoke(messages)) as AIMessage;

      if (response.tool_calls && response.tool_calls.length > 0) {
        messages.push(response);

        for (const toolCall of response.tool_calls) {
          const tool = this.tools.find((t) => t.name === toolCall.name);
          if (tool) {
            console.log(`Executing tool: ${tool.name}`);
            const result = await tool.invoke(toolCall.args);
            messages.push(
              new ToolMessage({
                tool_call_id: toolCall.id!,
                name: toolCall.name,
                content: result,
              })
            );
          }
        }

        const finalResponse = await this.llmWithTools.invoke(messages);
        return typeof finalResponse.content === "string"
          ? (finalResponse.content as string)
          : JSON.stringify(finalResponse.content || "");
      }

      return typeof response.content === "string"
        ? (response.content as string)
        : JSON.stringify(response.content || "");
    } catch (error) {
      console.error("Error in chat service:", error);
      throw error;
    }
  }

  public async *sendMessageStream(
    message: string
  ): AsyncGenerator<string, void, unknown> {
    try {
      const messages: BaseMessage[] = [
        new SystemMessage(
          "You are EnkiAI, a helpful and knowledgeable AI assistant. You have access to tools to search the web."
        ),
        new HumanMessage(message),
      ];

      // First pass: check for tool calls (non-streaming for simplicity in decision making)
      // Or we can stream and buffer. Let's do a simple check first.
      const response = (await this.llmWithTools.invoke(messages)) as AIMessage;

      if (response.tool_calls && response.tool_calls.length > 0) {
        messages.push(response);

        for (const toolCall of response.tool_calls) {
          const tool = this.tools.find((t) => t.name === toolCall.name);
          if (tool) {
            const result = await tool.invoke(toolCall.args);
            messages.push(
              new ToolMessage({
                tool_call_id: toolCall.id!,
                name: toolCall.name,
                content: result,
              })
            );
          }
        }

        // Stream the final response
        const stream = await this.llmWithTools.stream(messages);
        for await (const chunk of stream) {
          if (typeof chunk.content === "string") {
            yield chunk.content as string;
          }
        }
      } else {
        // No tool calls, just stream the content of the response we already got?
        // Or re-stream?
        // The 'response' already has content. We can just yield it.
        if (typeof response.content === "string") {
          yield response.content;
        } else if (Array.isArray(response.content)) {
            // Handle multimodal content if necessary, but usually it's string for text
             for (const contentPart of response.content) {
                if ('type' in contentPart && contentPart.type === 'text') {
                    yield contentPart.text;
                }
             }
        }
      }
    } catch (error) {
      console.error("Error in streaming chat:", error);
      throw error;
    }
  }
}

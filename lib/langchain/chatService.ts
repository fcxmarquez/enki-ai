import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export class ChatService {
  private llm: ChatOpenAI;

  constructor(apiKey: string) {
    this.llm = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: "gpt-4o-mini",
      temperature: 0.7,
    });
  }

  async sendMessage(message: string) {
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

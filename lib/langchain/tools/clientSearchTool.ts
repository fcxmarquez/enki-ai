import { Tool } from "@langchain/core/tools";

export class ClientSearchTool extends Tool {
  name = "duckduckgo_search";
  description =
    "A search engine. Useful for when you need to answer questions about current events. Input should be a search query.";

  protected async _call(input: string): Promise<string> {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return `Error: ${errorData.error || response.statusText}`;
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("ClientSearchTool error:", error);
      return "An error occurred while performing the search.";
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const tool = new DuckDuckGoSearch();
    const result = await tool.invoke(query);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

"use client";

import { ChatArea } from "@/components/chat/ChatArea";
import { useConversationRouter } from "@/hooks/useConversationRouter";

export default function Home() {
  useConversationRouter();

  return <ChatArea />;
}

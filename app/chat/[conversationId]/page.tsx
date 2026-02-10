"use client";

import { use } from "react";
import { ChatArea } from "@/components/chat/ChatArea";
import { useConversationRouter } from "@/hooks/useConversationRouter";

export default function ChatPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = use(params);
  useConversationRouter(conversationId);

  return <ChatArea />;
}

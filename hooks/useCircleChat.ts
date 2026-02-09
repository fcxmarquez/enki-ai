import { useRef, useState } from "react";
import { useChat, useChatActions } from "@/store";
import { useManageChunks } from "./useManageChunks";
import { useSendMessageStream } from "@/fetch/chat/mutations";
import { toast } from "sonner";
import { ChatMessage } from "@/lib/langchain/chatService";

export const useCircleChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isSendingRef = useRef(false);
  const { currentConversationId, messages } = useChat();
  const { createNewConversation, addMessage, setMessageStatus, deleteMessage } =
    useChatActions();
  const { accumulateChunk, flushChunks, flushIntervalRef } = useManageChunks();
  const sendMessageStream = useSendMessageStream();

  const sendMessage = (message: string) => {
    if (isSendingRef.current || isLoading) {
      return;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    isSendingRef.current = true;
    setError(null);
    setIsLoading(true);

    if (!currentConversationId) {
      createNewConversation(trimmedMessage);
    }

    addMessage({
      content: trimmedMessage,
      role: "user",
    });

    const assistantMessage = addMessage({
      content: "",
      role: "assistant",
    });

    const history: ChatMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    sendMessageStream.mutate({
      message: trimmedMessage,
      history,
      onChunk: (chunk: string) => {
        accumulateChunk(assistantMessage.id, chunk);
      },
      onComplete: () => {
        if (flushIntervalRef.current) {
          clearInterval(flushIntervalRef.current);
          flushIntervalRef.current = null;
        }
        flushChunks();

        isSendingRef.current = false;
        setError(null);
        setIsLoading(false);

        setMessageStatus(assistantMessage.id, "success");
      },
      onError: (error: Error, partialResponse: string) => {
        console.error("Streaming error:", error);
        setError(error);

        if (flushIntervalRef.current) {
          clearInterval(flushIntervalRef.current);
          flushIntervalRef.current = null;
        }
        flushChunks();

        if (!partialResponse || !partialResponse.trim()) {
          deleteMessage(assistantMessage.id);
        } else {
          setMessageStatus(assistantMessage.id, "error");
        }

        const errorMessage = error.message.includes("API key")
          ? "Invalid API key. Please check your settings."
          : "Failed to send message. Please try again.";

        toast.error(errorMessage);
        isSendingRef.current = false;
        setIsLoading(false);
      },
    });
  };

  return {
    isError: Boolean(error),
    error,
    messages,
    sendMessage,
    isLoading,
  };
};

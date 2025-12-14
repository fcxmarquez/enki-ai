import { useRef, useState } from "react";
import { useChat, useChatActions, useUIActions } from "@/store";
import { useManageChunks } from "./useManageChunks";
import { useSendMessageStream } from "@/fetch/chat/mutations";
import { toast } from "sonner";

export const useCircleChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setStatus, setSettingsModalOpen } = useUIActions();
  const { currentConversationId } = useChat();
  const { createNewConversation, addMessage } = useChatActions();
  const { accumulateChunk, flushChunks, flushIntervalRef } = useManageChunks();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sendMessageStream = useSendMessageStream();
  const { lastMessageToSuccess, updateMessageContent, deleteLastMessage } =
    useChatActions();

  const sendMessage = async (message: string) => {
    setIsLoading(true);

    setStatus("loading", "Sending message...");

    if (!currentConversationId) {
      createNewConversation(message);
    }

    addMessage({
      content: message,
      role: "user",
    });

    const assistantMessage = addMessage({
      content: "",
      role: "assistant",
    });

    requestAnimationFrame(() => {
      scrollContainerRef.current?.scrollTo({
        behavior: "smooth",
        top: scrollContainerRef.current?.scrollHeight,
      });
    });

    sendMessageStream.mutate({
      message,
      onChunk: (chunk: string) => {
        accumulateChunk(assistantMessage.id, chunk);
      },
      onComplete: () => {
        if (flushIntervalRef.current) {
          clearInterval(flushIntervalRef.current);
          flushIntervalRef.current = null;
        }
        flushChunks();

        setStatus("success", "Message sent!");
        setIsLoading(false);

        lastMessageToSuccess();
      },
      onError: (error: Error, partialResponse: string) => {
        console.error("Streaming error:", error);

        if (flushIntervalRef.current) {
          clearInterval(flushIntervalRef.current);
          flushIntervalRef.current = null;
        }
        flushChunks();

        if (partialResponse && partialResponse.trim()) {
          updateMessageContent(assistantMessage.id, partialResponse);
        } else {
          deleteLastMessage();
        }

        const errorMessage = error.message.includes("API key")
          ? "Invalid API key. Please check your settings."
          : "Failed to send message. Please try again.";

        toast.error(errorMessage);

        if (error.message.includes("API key")) {
          setSettingsModalOpen(true);
        }

        setStatus("error", errorMessage);
        setIsLoading(false);
      },
    });
  };

  return {
    sendMessage,
    isLoading,
  };
};

/* eslint-disable jsx-a11y/aria-role */
"use client";

import { InputChat } from "@/components/Inputs/InputChat";
import { useChat, useConfig, useChatActions, useUIActions } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useManageChunks } from "@/hooks/useManageChunks";
import { useSendMessageStream } from "@/fetch/chat/mutations";
import { toast } from "sonner";
// TEMP: Disabled for rebuild - FCX-30
// import { ModalLogin } from "@/components/Modals/ChakraModals/Login";
import { colors } from "@/constants/systemDesign/colors";
// import { hasActiveSession } from "@/utils/supabase/session";
import { Thread } from "@/components/chat/Thread";

export const ChatArea = () => {
  const { messages } = useChat();
  // const { setSettingsModalOpen } = useUIActions();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setStatus, setSettingsModalOpen } = useUIActions();
  const {
    addMessage,
    createNewConversation,
    updateMessageContent,
    deleteLastMessage,
    lastMessageToSuccess,
  } = useChatActions();
  const sendMessageStream = useSendMessageStream();
  const { currentConversationId } = useChat();
  const { hasValidApiKey } = useConfig();
  const hasApiKey = hasValidApiKey();

  const { accumulateChunk, flushChunks, flushIntervalRef } = useManageChunks();
  // TEMP: Disabled for rebuild - FCX-30
  // const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration issues by not rendering until client-side
  if (!isMounted) {
    return null;
  }

  const handleSubmit = async (message: string) => {
    if (!message.trim()) return;

    if (!hasApiKey) {
      toast.warning("Please configure your API key in settings to continue.");
      setSettingsModalOpen(true);
      return;
    }

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

  return (
    <div className="flex flex-col flex-1 max-h-[calc(100vh-56px)] h-full overflow-y-hidden">
      <div
        ref={scrollContainerRef}
        className="flex flex-col w-full flex-1 overflow-y-scroll"
      >
        <div className="max-w-[800px] w-full mx-auto h-full">
          {messages.length === 0 ? (
            <div className="text-muted-foreground flex h-full flex-1 flex-col items-center justify-center gap-4 text-center">
              <h3 className="text-lg font-semibold text-text-default">
                Welcome to EnkiAI!
              </h3>
              <p style={{ color: colors.text.paragraph }} className="max-w-md">
                Start a conversation by typing a message below. The AI supports markdown
                formatting, code highlighting, and more.
              </p>
            </div>
          ) : (
            <Thread />
          )}
        </div>
      </div>
      <div className="w-full py-8">
        <InputChat isLoading={isLoading} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

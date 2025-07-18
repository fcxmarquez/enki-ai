"use client";

import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";
import { useUIActions, useChatActions, useChat, useConfig } from "@/store";
import { useSendMessageStream } from "@/fetch/chat/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const InputChat = () => {
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async () => {
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

    sendMessageStream.mutate({
      message,
      onChunk: (chunk: string) => {
        updateMessageContent(assistantMessage.id, chunk);
      },
      onComplete: () => {
        setStatus("success", "Message sent!");
        setMessage("");
        setIsLoading(false);

        lastMessageToSuccess();
      },
      onError: (error: Error, partialResponse: string) => {
        console.error("Streaming error:", error);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative flex justify-center w-full">
      <div className="relative flex items-center w-full max-w-[724px]">
        <Input
          className={cn(
            "min-h-[56px] w-full rounded-xl py-8 pl-4 pr-14 text-base backdrop-blur-lg bg-background/50"
          )}
          placeholder={
            hasApiKey
              ? "Message EnkiAI..."
              : "Please configure API key in settings to continue"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading || !hasApiKey}
        />
        <Button
          size="icon"
          className={cn(
            "absolute right-2 h-10 w-10 rounded-lg",
            "hover:opacity-90 transition-opacity"
          )}
          onClick={handleSubmit}
          disabled={isLoading || !message.trim()}
          aria-label="Send message"
        >
          <IoMdSend className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

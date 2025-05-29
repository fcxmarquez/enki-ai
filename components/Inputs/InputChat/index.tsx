"use client";

import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useUIActions, useChatActions, useChat, useConfig } from "@/store";
import { useSendMessage } from "@/fetch/chat/mutations";
import { colors } from "@/constants/systemDesign/colors";
import { toast } from "sonner";

export const InputChat = () => {
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { setStatus, setSettingsModalOpen } = useUIActions();
  const { addMessage, setTyping, createNewConversation } = useChatActions();
  const { currentConversationId } = useChat();
  const { hasValidApiKey } = useConfig();

  const sendMessage = useSendMessage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    if (!hasValidApiKey()) {
      toast.warning("Please configure your API key in settings to continue.");
      setSettingsModalOpen(true);
      return;
    }

    // Create new conversation if none exists
    if (!currentConversationId) {
      createNewConversation(message);
    }

    // Add user message to chat immediately
    addMessage({
      content: message,
      role: "user",
    });

    setStatus("loading", "Sending message...");
    setTyping(true);

    sendMessage.mutate(
      {
        message,
        onSuccess: (response) => {
          // Add assistant response to chat
          addMessage({
            content: response,
            role: "assistant",
          });
          setStatus("success", "Message sent!");
          setMessage("");
        },
        onError: (error) => {
          console.error("Error sending message:", error);
          const errorMessage = error.message.includes("API key")
            ? "Invalid API key. Please check your settings."
            : "Failed to send message. Please try again.";

          toast.error(errorMessage);

          if (error.message.includes("API key")) {
            setSettingsModalOpen(true);
          }

          setStatus("error", errorMessage);
        },
      },
      {
        onSettled: () => {
          setTyping(false);
        },
      }
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative">
      <InputGroup size="lg">
        <Input
          className="min-h-[56px] rounded-xl border-0 pl-4 pr-14 shadow-xs"
          style={{
            backgroundColor: colors.background.input.dark,
            color: colors.text.default,
          }}
          placeholder={
            hasValidApiKey()
              ? "Message EnkiAI..."
              : "Please configure API key in settings"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          isDisabled={sendMessage.isPending}
          _focus={{
            boxShadow: "none",
            border: "2px solid",
            borderColor: colors.button.default,
          }}
        />
        <InputRightElement className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2">
          <Button
            aria-label="Send message"
            rightIcon={<IoMdSend />}
            style={{
              backgroundColor: colors.button.default,
              color: colors.text.default,
            }}
            className={`${styles.button} aspect-square h-10 w-10 rounded-lg hover:bg-button-hover`}
            isLoading={sendMessage.isPending}
            onClick={handleSubmit}
            _hover={{
              backgroundColor: colors.button.hover,
            }}
          />
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

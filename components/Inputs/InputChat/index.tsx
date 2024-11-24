"use client";

import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import styles from "./styles.module.css";
import { useState } from "react";
import { useUIActions, useChatActions, useChat } from "@/store";
import { useSendMessage } from "@/fetch/chat/mutations";

export const InputChat = () => {
  const [message, setMessage] = useState("");
  const { setStatus } = useUIActions();
  const { addMessage, setTyping, createNewConversation } = useChatActions();
  const { currentConversationId } = useChat();

  const sendMessage = useSendMessage();

  const handleSubmit = async () => {
    if (!message.trim()) return;

    let activeConversationId = currentConversationId;

    // Create new conversation if none exists
    if (!activeConversationId) {
      activeConversationId = createNewConversation(message);
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
          setStatus("error", "Failed to send message");
        },
      },
      {
        onSettled: () => {
          setTyping(false);
        },
      }
    );
  };

  return (
    <InputGroup size="md">
      <Input
        className="h-12 pr-16"
        placeholder="Let's chat"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        isDisabled={sendMessage.isPending}
      />
      <InputRightElement className="absolute top-1/2 mr-4 h-8 w-8 -translate-y-1/2">
        <Button
          rightIcon={<IoMdSend />}
          className={`${styles.button} aspect-square h-8 rounded-md`}
          size="sm"
          onClick={handleSubmit}
          isLoading={sendMessage.isPending}
        />
      </InputRightElement>
    </InputGroup>
  );
};

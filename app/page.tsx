"use client";

import { BubbleChat } from "@/components/Feedback/BubbleChat";
import { InputChat } from "@/components/Inputs/InputChat";
import { useChat, useConfig, useUIActions } from "@/store";
import { useEffect, useRef } from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Button } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { ModalConfig } from "@/components/Modals/ChakraModals/Config";

export default function Home() {
  const { messages, isTyping } = useChat();
  const { hasValidApiKey } = useConfig();
  const { showModal } = useUIActions();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!hasValidApiKey()) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="auto"
          className="max-w-md rounded-lg"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            API Key Required
          </AlertTitle>
          <AlertDescription maxWidth="sm" mb={4}>
            To start using the chat, you need to configure either an OpenAI or Anthropic
            API key.
          </AlertDescription>
          <Button
            leftIcon={<FiSettings />}
            colorScheme="blue"
            onClick={() => showModal(<ModalConfig />)}
          >
            Open Settings
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative flex grow flex-col gap-4 overflow-y-hidden p-4">
      <div className="flex grow flex-col gap-8 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-4 text-center">
            <p>placeholder</p>
            <h3 className="text-lg font-semibold">Welcome to AI Chat!</h3>
            <p>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <BubbleChat
              key={msg.id}
              profileImg={
                msg.role === "assistant"
                  ? "https://freelogopng.com/images/all_img/1681038887chatgpt-logo%20black-and-white.png"
                  : "https://randomuser.me/api/portraits/men/42.jpg"
              }
              message={msg.content}
              name={msg.role === "assistant" ? "AI Assistant" : "You"}
            />
          ))
        )}
        {isTyping && (
          <BubbleChat
            profileImg="https://freelogopng.com/images/all_img/1681038887chatgpt-logo%20black-and-white.png"
            message="..."
            name="AI Assistant"
            isTyping={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 flex w-full flex-col items-center justify-center border-t bg-background-default p-6">
        <InputChat />
      </div>
    </div>
  );
}

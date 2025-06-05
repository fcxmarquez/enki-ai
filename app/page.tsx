/* eslint-disable jsx-a11y/aria-role */
"use client";

import { BubbleChat } from "@/components/Feedback/BubbleChat";
import { InputChat } from "@/components/Inputs/InputChat";
import { useChat, useConfig, useUIActions } from "@/store";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Box,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
// TEMP: Disabled for rebuild - FCX-30
// import { ModalLogin } from "@/components/Modals/ChakraModals/Login";
import { colors } from "@/constants/systemDesign/colors";
// import { hasActiveSession } from "@/utils/supabase/session";

export default function Home() {
  const { messages, isTyping } = useChat();
  const { hasValidApiKey } = useConfig();
  const { setSettingsModalOpen } = useUIActions();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  // TEMP: Disabled for rebuild - FCX-30
  // const [hasSession, setHasSession] = useState<boolean | null>(null);

  // TEMP: Disabled for rebuild - FCX-30
  // Session checking temporarily disabled to allow access without authentication
  // To reactivate: uncomment the block below
  /*
  // Check for active session
  useEffect(() => {
    const checkSession = async () => {
      const sessionExists = await hasActiveSession();
      setHasSession(sessionExists);

      // If no session, show login modal
      if (!sessionExists) {
        showModal(<ModalLogin />);
      }
    };

    if (isMounted) {
      checkSession();
    }
  }, [isMounted, showModal]);
  */

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Prevent hydration issues by not rendering until client-side
  if (!isMounted) {
    return null;
  }

  // TEMP: Disabled for rebuild - FCX-30
  // Authentication loading check temporarily disabled
  /*
  if (hasSession === null) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Alert
          status="info"
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
            Loading...
          </AlertTitle>
          <AlertDescription maxWidth="sm" mb={4}>
            Checking authentication status...
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  */

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
            colorScheme="purple"
            onClick={() => setSettingsModalOpen(true)}
          >
            Open Settings
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-4">
      <Box
        className="relative flex grow flex-col overflow-hidden rounded-xl"
        style={{ backgroundColor: colors.background.default }}
      >
        <Box
          className="flex grow flex-col overflow-y-auto p-4"
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.1)`,
              borderRadius: "8px",
            },
          }}
        >
          {messages.length === 0 ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-4 text-center">
              <h3 className="text-lg font-semibold text-text-default">
                Welcome to EnkiAI!
              </h3>
              <p style={{ color: colors.text.paragraph }} className="max-w-md">
                Start a conversation by typing a message below. The AI supports markdown
                formatting, code highlighting, and more.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <BubbleChat
                key={msg.id}
                message={msg.content}
                name={msg.role === "assistant" ? "EnkiAI" : "You"}
                role={msg.role}
              />
            ))
          )}
          {isTyping && (
            <BubbleChat message="..." name="EnkiAI" isTyping={true} role="assistant" />
          )}
          <div ref={messagesEndRef} />
        </Box>
        <Box
          className="border-t backdrop-blur-xs"
          style={{
            backgroundColor: colors.background.conversation.dark,
            borderColor: colors.background.conversation.dark,
          }}
        >
          <div className="mx-auto max-w-3xl p-4">
            <InputChat />
          </div>
        </Box>
      </Box>
    </div>
  );
}

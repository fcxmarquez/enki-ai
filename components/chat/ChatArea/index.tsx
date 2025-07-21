/* eslint-disable jsx-a11y/aria-role */
"use client";

import { BubbleChat } from "@/components/Feedback/BubbleChat";
import { InputChat } from "@/components/Inputs/InputChat";
import { ScrollToBottomButton } from "@/components/ScrollToBottomButton";
import { GradientOverlay } from "@/components/GradientOverlay";
import { useChat } from "@/store";
import { useScrollManager } from "@/hooks/useScrollManager";
import { useEffect, useRef, useState } from "react";
// TEMP: Disabled for rebuild - FCX-30
// import { ModalLogin } from "@/components/Modals/ChakraModals/Login";
import { colors } from "@/constants/systemDesign/colors";
// import { hasActiveSession } from "@/utils/supabase/session";

export const ChatArea = () => {
  const { messages } = useChat();
  // const { setSettingsModalOpen } = useUIActions();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  // TEMP: Disabled for rebuild - FCX-30
  // const [hasSession, setHasSession] = useState<boolean | null>(null);

  // Check if there's currently a streaming response
  const isStreamingResponse = messages.some(
    (msg) => msg.role === "assistant" && msg.status === "pending"
  );

  // Initialize scroll manager
  const { showScrollButton, scrollToBottom } = useScrollManager({
    scrollContainerRef,
    messagesLength: messages.length,
    isStreamingResponse,
    messages,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration issues by not rendering until client-side
  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 pt-14 flex flex-1 flex-col gap-4 min-h-screen max-h-screen bg-red-500">
      <div
        ref={scrollContainerRef}
        className="absolute top-0 left-0 right-0 bottom-0 pt-14 flex flex-col rounded-xl max p-4 max-h-screen bg-blue-500 overflow-y-scroll"
      >
        <div className="max-w-[800px] w-full mx-auto">
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
            <div className="flex flex-col flex-1">
              {messages.map((msg) => (
                <BubbleChat
                  key={msg.id}
                  message={msg.content}
                  name={msg.role === "assistant" ? "EnkiAI" : "You"}
                  role={msg.role}
                  status={msg.status}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
          {/* Gradient overlay when content overflows */}
          <GradientOverlay show={showScrollButton} />
        </div>

        <div className="sticky bottom-0 w-full">
          <div className="py-8">
            <InputChat />
          </div>
        </div>
      </div>

      {/* Scroll to bottom button */}
      <ScrollToBottomButton show={showScrollButton} onClick={scrollToBottom} />
    </div>
  );
};

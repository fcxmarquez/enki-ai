"use client";

import { InputChat } from "@/components/Inputs/InputChat";
import { useChat, useConfig, useUIActions } from "@/store";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
// TEMP: Disabled for rebuild - FCX-30
// import { ModalLogin } from "@/components/Modals/ChakraModals/Login";
import { colors } from "@/constants/systemDesign/colors";
// import { hasActiveSession } from "@/utils/supabase/session";
import { Thread } from "@/components/chat/Thread";
import { useCircleChat } from "@/hooks/useCircleChat";

export const ChatArea = () => {
  const { messages } = useChat();
  // const { setSettingsModalOpen } = useUIActions();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { setSettingsModalOpen } = useUIActions();
  const { hasValidApiKey } = useConfig();
  const hasApiKey = hasValidApiKey();
  const { sendMessage, isLoading } = useCircleChat();
  // TEMP: Disabled for rebuild - FCX-30
  // const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

    sendMessage(message);
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

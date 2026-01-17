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
import { ArrowDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export const ChatArea = () => {
  const { messages } = useChat();
  // const { setSettingsModalOpen } = useUIActions();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { setSettingsModalOpen } = useUIActions();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { hasValidApiKey } = useConfig();
  const hasApiKey = hasValidApiKey();
  const { sendMessage, isLoading } = useCircleChat({ scrollContainerRef });
  // TEMP: Disabled for rebuild - FCX-30
  // const [hasSession, setHasSession] = useState<boolean | null>(null);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;
      const hasOverflow = scrollHeight > clientHeight;
      setShowScrollButton((prev) => {
        const newValue = hasOverflow && !isAtBottom;
        return prev === newValue ? prev : newValue;
      });
    }
  };

  useEffect(() => {
    const content = scrollContainerRef.current;
    if (!content) return;

    const innerContent = content.firstElementChild;
    if (!innerContent) return;

    const observer = new ResizeObserver(() => {
      checkScrollPosition();
    });

    observer.observe(innerContent);

    return () => observer.disconnect();
  }, [isMounted]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        checkScrollPosition();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

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
    <div className="flex flex-col flex-1 max-h-[calc(100vh-56px)] h-full overflow-hidden max-w-full">
      <div className="relative flex-1 min-h-0">
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          className="absolute inset-0 flex flex-col w-full overflow-y-auto overflow-x-hidden"
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

        <AnimatePresence>
          {showScrollButton && !isLoading ? (
            <motion.button
              type="button"
              aria-label="Scroll to bottom"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-4 rounded-full p-2 border-foreground bg-background border"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    top: scrollContainerRef.current.scrollHeight,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <ArrowDownIcon className="w-4 h-4 text-foreground" />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="w-full py-8">
        <InputChat isLoading={isLoading} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

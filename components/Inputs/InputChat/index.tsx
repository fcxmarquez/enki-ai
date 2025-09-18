"use client";

import { IoMdSend } from "react-icons/io";
import { FC, useState } from "react";
import { useConfig } from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InputChatProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export const InputChat: FC<InputChatProps> = ({ onSubmit, isLoading }) => {
  const [message, setMessage] = useState("");

  const { hasValidApiKey } = useConfig();
  const hasApiKey = hasValidApiKey();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(message);
    }
  };

  return (
    <div className="relative flex justify-center w-full">
      <div className="relative flex items-center w-full max-w-[800px]">
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
          onClick={() => onSubmit(message)}
          disabled={isLoading || !message.trim()}
          aria-label="Send message"
        >
          <IoMdSend className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownComponents } from "./MarkdownComponents";

interface BubbleChatProps {
  message: string;
  name: string;
  role?: "user" | "assistant";
  status?: "pending" | "success" | "error" | undefined;
  isLastMessage?: boolean;
}

export const BubbleChat = ({
  message,
  name,
  role = "user",
  status = "pending",
  isLastMessage = false,
}: BubbleChatProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl m-auto flex gap-4 p-4 text-base">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        {role === "assistant" ? (
          <Bot className="h-6 w-6 text-foreground" />
        ) : (
          <User className="h-6 w-6 text-foreground" />
        )}
      </div>
      <div className="flex w-full flex-col">
        <span className="mb-1 text-sm font-medium text-foreground">{name}</span>
        {role === "user" ? (
          <div className="self-end rounded-xl px-4 py-2 text-primary-foreground bg-primary">
            {message}
          </div>
        ) : (
          <div
            className={cn(
              "prose prose-sm dark:prose-invert max-w-none text-foreground",
              role === "assistant" && "self-start",
              isLastMessage && "min-h-[calc(100vh-152px)]"
            )}
          >
            {status === "pending" ? (
              <div className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                {message}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

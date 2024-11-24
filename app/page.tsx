"use client";

import { BubbleChat } from "@/components/Feedback/BubbleChat";
import { InputChat } from "@/components/Inputs/InputChat";
import { useChat } from "@/store";
import { useEffect, useRef } from "react";

export default function Home() {
  const { messages, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

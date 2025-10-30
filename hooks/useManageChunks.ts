"use client";

import { useCallback, useEffect, useRef } from "react";
import { useChatActions } from "@/store";

export const useManageChunks = () => {
  const chunkBufferRef = useRef("");
  const currentMessageIdRef = useRef("");
  const flushIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { updateMessageContent } = useChatActions();

  const flushChunks = useCallback(() => {
    if (chunkBufferRef.current && currentMessageIdRef.current) {
      updateMessageContent(currentMessageIdRef.current, chunkBufferRef.current);
      chunkBufferRef.current = "";
    }
  }, [updateMessageContent]);

  const accumulateChunk = useCallback(
    (messageId: string, chunk: string) => {
      chunkBufferRef.current += chunk;
      currentMessageIdRef.current = messageId;

      if (!flushIntervalRef.current) {
        flushIntervalRef.current = setInterval(() => {
          flushChunks();
        }, 500);
      }
    },
    [flushChunks]
  );

  useEffect(() => {
    return () => {
      if (flushIntervalRef.current) {
        clearInterval(flushIntervalRef.current);
      }
    };
  }, []);

  return { accumulateChunk, flushChunks, flushIntervalRef };
};

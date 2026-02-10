"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, useChat, useChatActions } from "@/store";

function useStoreHydration() {
  const [hydrated, setHydrated] = useState(false);
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    if (useStore.persist.hasHydrated()) {
      // Already hydrated: schedule state update for next tick to avoid sync setState in effect
      queueMicrotask(() => setHydrated(true));
      return;
    }

    const unsub = useStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsub;
  }, []);

  return hydrated;
}

export function useConversationRouter(conversationId?: string) {
  const router = useRouter();
  const { currentConversationId, conversations } = useChat();
  const { setCurrentConversation } = useChatActions();
  const hydrated = useStoreHydration();

  useEffect(() => {
    if (!hydrated) return;

    if (conversationId) {
      const exists = conversations.some((c) => c.id === conversationId);
      if (!exists) {
        router.replace("/");
        return;
      }
      if (currentConversationId !== conversationId) {
        setCurrentConversation(conversationId);
      }
    } else {
      if (currentConversationId !== null) {
        setCurrentConversation(null);
      }
    }
  }, [
    hydrated,
    conversationId,
    conversations,
    currentConversationId,
    setCurrentConversation,
    router,
  ]);
}

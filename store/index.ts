import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUISlice } from "./slices/uiSlice";
import { createChatSlice } from "./slices/chatSlice";
import { StoreState } from "./types";

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUISlice(...a),
        ...createChatSlice(...a),
      }),
      {
        name: "chat-store",
        partialize: (state) => ({
          chat: {
            messages: state.chat.messages,
          },
        }),
      }
    )
  )
);

// Selector hooks for better performance
export const useUI = () => useStore((state) => state.ui);

// Split the actions into individual hooks for better memoization
export const useUIActions = () => {
  const setStatus = useStore((state) => state.setStatus);
  const showModal = useStore((state) => state.showModal);
  const hideModal = useStore((state) => state.hideModal);
  const setConfig = useStore((state) => state.setConfig);

  return {
    setStatus,
    showModal,
    hideModal,
    setConfig,
  };
};

export const useChat = () => useStore((state) => state.chat);

export const useChatActions = () => {
  const addMessage = useStore((state) => state.addMessage);
  const setTyping = useStore((state) => state.setTyping);
  const setChatError = useStore((state) => state.setChatError);
  const clearChat = useStore((state) => state.clearChat);

  return {
    addMessage,
    setTyping,
    setChatError,
    clearChat,
  };
};

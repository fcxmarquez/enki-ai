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
            conversations: state.chat.conversations,
            currentConversationId: state.chat.currentConversationId,
          },
        }),
      }
    )
  )
);

// Selector hooks
export const useUI = () => useStore((state) => state.ui);

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

export const useChat = () => {
  const chat = useStore((state) => state.chat);
  const currentConversation = useStore((state) =>
    state.chat.conversations.find((conv) => conv.id === state.chat.currentConversationId)
  );

  return {
    ...chat,
    messages: currentConversation?.messages || [],
  };
};

export const useChatActions = () => {
  const addMessage = useStore((state) => state.addMessage);
  const setTyping = useStore((state) => state.setTyping);
  const setChatError = useStore((state) => state.setChatError);
  const clearChat = useStore((state) => state.clearChat);
  const createNewConversation = useStore((state) => state.createNewConversation);
  const setCurrentConversation = useStore((state) => state.setCurrentConversation);
  const updateConversationTitle = useStore((state) => state.updateConversationTitle);
  const deleteConversation = useStore((state) => state.deleteConversation);

  return {
    addMessage,
    setTyping,
    setChatError,
    clearChat,
    createNewConversation,
    setCurrentConversation,
    updateConversationTitle,
    deleteConversation,
  };
};

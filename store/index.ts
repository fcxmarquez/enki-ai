import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUISlice } from "./slices/uiSlice";
import { createChatSlice } from "./slices/chatSlice";
import { createConfigSlice } from "./slices/configSlice";
import { createUserSlice } from "./slices/userSlice";
import { StoreState } from "./types";

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createUISlice(set, get, api),
        ...createChatSlice(set, get, api),
        ...createConfigSlice(set, get, api),
        ...createUserSlice(set, get, api),
      }),
      {
        name: "chat-store",
        partialize: (state) => ({
          chat: {
            conversations: state.chat.conversations,
            currentConversationId: state.chat.currentConversationId,
          },
          config: state.config,
        }),
        migrate: (persistedState: unknown) => {
          return persistedState;
        },
        version: 1,
      }
    )
  )
);

// Selector hooks
export const useUI = () => {
  const ui = useStore((state) => state.ui);
  return ui;
};

export const useUIActions = () => {
  const setStatus = useStore((state) => state.setStatus);
  const showModal = useStore((state) => state.showModal);
  const hideModal = useStore((state) => state.hideModal);
  const setSettingsModalOpen = useStore((state) => state.setSettingsModalOpen);

  return {
    setStatus,
    showModal,
    hideModal,
    setSettingsModalOpen,
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

export const useConfig = () => {
  const config = useStore((state) => state.config);
  const setConfig = useStore((state) => state.setConfig);
  const clearConfig = useStore((state) => state.clearConfig);
  const hasValidApiKey = useStore((state) => state.hasValidApiKey);

  return {
    config,
    setConfig,
    clearConfig,
    hasValidApiKey,
  };
};

export const useUser = () => {
  return useStore((state) => state.user);
};

export const useUserActions = () => {
  const setIsSignedIn = useStore((state) => state.setIsSignedIn);
  const setUserEmail = useStore((state) => state.setUserEmail);
  const setLogout = useStore((state) => state.setLogout);

  return { setIsSignedIn, setUserEmail, setLogout };
};

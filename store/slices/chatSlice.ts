import { StateCreator } from "zustand";
import { StoreState } from "../types";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastModified: number;
}

export interface ChatSlice {
  chat: {
    conversations: Conversation[];
    currentConversationId: string | null;
    isTyping: boolean;
    error: string | null;
  };
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  setTyping: (isTyping: boolean) => void;
  setChatError: (error: string | null) => void;
  clearChat: () => void;
  createNewConversation: (initialMessage: string) => string;
  setCurrentConversation: (conversationId: string) => void;
  updateConversationTitle: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
}

export const createChatSlice: StateCreator<
  StoreState,
  [["zustand/devtools", never]],
  [],
  ChatSlice
> = (set) => ({
  chat: {
    conversations: [],
    currentConversationId: null,
    isTyping: false,
    error: null,
  },

  createNewConversation: (initialMessage) => {
    const newId = crypto.randomUUID();
    set((state) => {
      const newConversation: Conversation = {
        id: newId,
        title:
          initialMessage.length > 30
            ? initialMessage.slice(0, 30) + "..."
            : initialMessage,
        messages: [],
        lastModified: Date.now(),
      };

      return {
        chat: {
          ...state.chat,
          conversations: [newConversation, ...state.chat.conversations],
          currentConversationId: newId,
        },
      };
    });
    return newId;
  },

  setCurrentConversation: (conversationId) =>
    set((state) => ({
      chat: {
        ...state.chat,
        currentConversationId: conversationId,
      },
    })),

  updateConversationTitle: (conversationId, title) =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = conversations.findIndex(
        (conv) => conv.id === conversationId
      );

      if (conversationIndex === -1) return state;

      conversations[conversationIndex] = {
        ...conversations[conversationIndex],
        title,
        lastModified: Date.now(),
      };

      return {
        chat: {
          ...state.chat,
          conversations,
        },
      };
    }),

  addMessage: (message) =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = conversations.findIndex(
        (conv) => conv.id === state.chat.currentConversationId
      );

      if (conversationIndex === -1) return state;

      const updatedConversation = {
        ...conversations[conversationIndex],
        messages: [
          ...conversations[conversationIndex].messages,
          {
            ...message,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          },
        ],
        lastModified: Date.now(),
      };

      conversations[conversationIndex] = updatedConversation;

      return {
        chat: {
          ...state.chat,
          conversations,
        },
      };
    }),

  setTyping: (isTyping) => set((state) => ({ chat: { ...state.chat, isTyping } })),

  setChatError: (error) => set((state) => ({ chat: { ...state.chat, error } })),

  clearChat: () =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = conversations.findIndex(
        (conv) => conv.id === state.chat.currentConversationId
      );

      if (conversationIndex === -1) return state;

      conversations[conversationIndex] = {
        ...conversations[conversationIndex],
        messages: [],
        lastModified: Date.now(),
      };

      return {
        chat: {
          ...state.chat,
          conversations,
        },
      };
    }),

  deleteConversation: (conversationId) =>
    set((state) => {
      const conversations = state.chat.conversations.filter(
        (conv) => conv.id !== conversationId
      );

      return {
        chat: {
          ...state.chat,
          conversations,
          currentConversationId:
            state.chat.currentConversationId === conversationId
              ? null
              : state.chat.currentConversationId,
        },
      };
    }),
});

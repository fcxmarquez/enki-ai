import { StateCreator } from "zustand";
import { StoreState } from "../types";

type MessageStatus = "pending" | "success" | "error";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
  status: MessageStatus;
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
    error: string | null;
  };
  addMessage: (message: Omit<Message, "id" | "timestamp" | "status">) => Message;
  setChatError: (error: string | null) => void;
  clearChat: () => void;
  createNewConversation: (initialMessage: string) => string;
  setCurrentConversation: (conversationId: string) => void;
  updateConversationTitle: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
  deleteLastMessage: () => void;
  updateMessageContent: (messageId: string, additionalContent: string) => void;
  lastMessageToError: () => void;
  lastMessageToSuccess: () => void;
}

const getCurrentConversationIndex = (state: StoreState) => {
  return state.chat.conversations.findIndex(
    (conv) => conv.id === state.chat.currentConversationId
  );
};

export const createChatSlice: StateCreator<
  StoreState,
  [["zustand/devtools", never]],
  [],
  ChatSlice
> = (set) => ({
  chat: {
    conversations: [],
    currentConversationId: null,
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

  addMessage: (message) => {
    const messageId = crypto.randomUUID();
    const status: MessageStatus = message.role === "user" ? "success" : "pending";

    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = getCurrentConversationIndex(state);

      if (conversationIndex === -1) return state;

      const updatedConversation = {
        ...conversations[conversationIndex],
        messages: [
          ...conversations[conversationIndex].messages,
          {
            ...message,
            id: messageId,
            timestamp: Date.now(),
            status,
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
    });
    return {
      id: messageId,
      ...message,
      timestamp: Date.now(),
      status,
    };
  },

  deleteLastMessage: () =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = getCurrentConversationIndex(state);

      if (conversationIndex === -1) return state;

      const updatedConversation = {
        ...conversations[conversationIndex],
        messages: conversations[conversationIndex].messages.slice(0, -1),
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

  setChatError: (error) => set((state) => ({ chat: { ...state.chat, error } })),

  clearChat: () =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = getCurrentConversationIndex(state);

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

  updateMessageContent: (messageId, additionalContent) =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = getCurrentConversationIndex(state);

      if (conversationIndex === -1) return state;

      const messages = [...conversations[conversationIndex].messages];
      const messageIndex = messages.findIndex((msg) => msg.id === messageId);

      if (messageIndex === -1) return state;

      messages[messageIndex] = {
        ...messages[messageIndex],
        status: "success",
        content: messages[messageIndex].content + additionalContent,
      };

      conversations[conversationIndex] = {
        ...conversations[conversationIndex],
        messages,
        lastModified: Date.now(),
      };

      return {
        chat: {
          ...state.chat,
          conversations,
        },
      };
    }),

  lastMessageToSuccess: () =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = getCurrentConversationIndex(state);

      if (conversationIndex === -1) return state;

      const messages = [...conversations[conversationIndex].messages];
      const lastMessageIndex = messages.length - 1;
      const lastMessage = messages[lastMessageIndex];

      if (lastMessage.status !== "success") {
        messages[lastMessageIndex] = {
          ...lastMessage,
          status: "success",
        };

        conversations[conversationIndex] = {
          ...conversations[conversationIndex],
          messages,
          lastModified: Date.now(),
        };

        return {
          chat: {
            ...state.chat,
            conversations,
          },
        };
      }

      return state;
    }),

  lastMessageToError: () =>
    set((state) => {
      const conversations = [...state.chat.conversations];
      const conversationIndex = getCurrentConversationIndex(state);

      if (conversationIndex === -1) return state;

      const messages = [...conversations[conversationIndex].messages];
      const lastMessageIndex = messages.length - 1;
      const lastMessage = messages[lastMessageIndex];

      if (lastMessage.status !== "error") {
        messages[lastMessageIndex] = {
          ...lastMessage,
          status: "error",
        };

        conversations[conversationIndex] = {
          ...conversations[conversationIndex],
          messages,
          lastModified: Date.now(),
        };

        return {
          chat: {
            ...state.chat,
            conversations,
          },
        };
      }

      return state;
    }),
});

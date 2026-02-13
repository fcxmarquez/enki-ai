import type { StateCreator } from "zustand";
import type { StoreState } from "../types";

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
  setCurrentConversation: (conversationId: string | null) => void;
  updateConversationTitle: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
  deleteMessage: (messageId: string) => void;
  deleteLastMessage: () => void;
  updateMessageContent: (messageId: string, additionalContent: string) => void;
  setMessageStatus: (messageId: string, status: MessageStatus) => void;
  lastMessageToError: () => void;
}

const getCurrentConversationIndex = (state: StoreState) => {
  return state.chat.conversations.findIndex(
    (conv) => conv.id === state.chat.currentConversationId
  );
};

const findMessageLocation = (state: StoreState, messageId: string) => {
  const currentConversationIndex = getCurrentConversationIndex(state);

  if (currentConversationIndex !== -1) {
    const currentConversation = state.chat.conversations[currentConversationIndex];
    const messageIndex = currentConversation.messages.findIndex(
      (msg) => msg.id === messageId
    );

    if (messageIndex !== -1) {
      return { conversationIndex: currentConversationIndex, messageIndex };
    }
  }

  for (
    let conversationIndex = 0;
    conversationIndex < state.chat.conversations.length;
    conversationIndex++
  ) {
    if (conversationIndex === currentConversationIndex) continue;

    const conversation = state.chat.conversations[conversationIndex];
    const messageIndex = conversation.messages.findIndex((msg) => msg.id === messageId);

    if (messageIndex !== -1) {
      return { conversationIndex, messageIndex };
    }
  }

  return null;
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
            ? `${initialMessage.slice(0, 30)}...`
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
    const timestamp = Date.now();

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
            timestamp,
            status,
          },
        ],
        lastModified: timestamp,
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
      timestamp,
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

  deleteMessage: (messageId) =>
    set((state) => {
      const location = findMessageLocation(state, messageId);
      if (!location) return state;

      const { conversationIndex, messageIndex } = location;
      const conversation = state.chat.conversations[conversationIndex];

      const updatedConversation: Conversation = {
        ...conversation,
        messages: [
          ...conversation.messages.slice(0, messageIndex),
          ...conversation.messages.slice(messageIndex + 1),
        ],
        lastModified: Date.now(),
      };

      const conversations = [...state.chat.conversations];
      conversations[conversationIndex] = updatedConversation;

      return {
        chat: {
          ...state.chat,
          conversations,
        },
      };
    }),

  updateMessageContent: (messageId, additionalContent) =>
    set((state) => {
      const location = findMessageLocation(state, messageId);
      if (!location) return state;

      const { conversationIndex, messageIndex } = location;

      const conversation = state.chat.conversations[conversationIndex];

      const updatedMessage = {
        ...conversation.messages[messageIndex],
        status: "success" as const,
        content: conversation.messages[messageIndex].content + additionalContent,
      };

      const updatedMessages = [...conversation.messages];
      updatedMessages[messageIndex] = updatedMessage;

      const updatedConversation = {
        ...conversation,
        messages: updatedMessages,
        lastModified: Date.now(),
      };

      const updatedConversations = [...state.chat.conversations];
      updatedConversations[conversationIndex] = updatedConversation;

      return {
        chat: {
          ...state.chat,
          conversations: updatedConversations,
        },
      };
    }),

  setMessageStatus: (messageId, status) =>
    set((state) => {
      const location = findMessageLocation(state, messageId);
      if (!location) return state;

      const { conversationIndex, messageIndex } = location;
      const conversation = state.chat.conversations[conversationIndex];
      const message = conversation.messages[messageIndex];

      if (message.status === status) return state;

      const updatedMessage: Message = {
        ...message,
        status,
      };

      const updatedMessages = [...conversation.messages];
      updatedMessages[messageIndex] = updatedMessage;

      const updatedConversation: Conversation = {
        ...conversation,
        messages: updatedMessages,
        lastModified: Date.now(),
      };

      const conversations = [...state.chat.conversations];
      conversations[conversationIndex] = updatedConversation;

      return {
        chat: {
          ...state.chat,
          conversations,
        },
      };
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

import { StateCreator } from "zustand";
import { StoreState } from "../types";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export interface ChatSlice {
  chat: {
    messages: Message[];
    isTyping: boolean;
    error: string | null;
  };
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  setTyping: (isTyping: boolean) => void;
  setChatError: (error: string | null) => void;
  clearChat: () => void;
}

export const createChatSlice: StateCreator<StoreState, [], [], ChatSlice> = (set) => ({
  chat: {
    messages: [],
    isTyping: false,
    error: null,
  },

  addMessage: (message) =>
    set((state) => ({
      chat: {
        ...state.chat,
        messages: [
          ...state.chat.messages,
          {
            ...message,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          },
        ],
      },
    })),

  setTyping: (isTyping) => set((state) => ({ chat: { ...state.chat, isTyping } })),

  setChatError: (error) => set((state) => ({ chat: { ...state.chat, error } })),

  clearChat: () => set((state) => ({ chat: { ...state.chat, messages: [] } })),
});

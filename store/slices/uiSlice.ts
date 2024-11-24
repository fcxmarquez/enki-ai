import { StateCreator } from "zustand";
import { StoreState } from "../types";

export interface UISlice {
  ui: {
    status: "idle" | "loading" | "success" | "error";
    message: string;
    modal: {
      isOpen: boolean;
      children: JSX.Element | null;
    };
    config: boolean;
  };
  setStatus: (status: UISlice["ui"]["status"], message: string) => void;
  showModal: (children: JSX.Element) => void;
  hideModal: () => void;
  setConfig: (value: boolean) => void;
}

export const createUISlice: StateCreator<StoreState, [], [], UISlice> = (set) => ({
  ui: {
    status: "idle",
    message: "",
    modal: {
      isOpen: false,
      children: null,
    },
    config: false,
  },

  setStatus: (status, message) =>
    set((state) => ({ ui: { ...state.ui, status, message } })),

  showModal: (children) =>
    set((state) => ({ ui: { ...state.ui, modal: { isOpen: true, children } } })),

  hideModal: () =>
    set((state) => ({ ui: { ...state.ui, modal: { isOpen: false, children: null } } })),

  setConfig: (value) => set((state) => ({ ui: { ...state.ui, config: value } })),
});

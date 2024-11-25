import { StateCreator } from "zustand";
import { StoreState } from "../types";
import { UIState } from "../types";

export interface UISlice {
  ui: UIState;
  setStatus: (status: UIState["status"], message: string) => void;
  showModal: (children: JSX.Element) => void;
  hideModal: () => void;
}

export const createUISlice: StateCreator<
  StoreState,
  [["zustand/devtools", never]],
  [],
  UISlice
> = (set) => ({
  ui: {
    status: "idle",
    message: "",
    modal: {
      isOpen: false,
      children: null,
    },
  },

  setStatus: (status, message) =>
    set((state) => ({ ui: { ...state.ui, status, message } })),

  showModal: (children) =>
    set((state) => ({ ui: { ...state.ui, modal: { isOpen: true, children } } })),

  hideModal: () =>
    set((state) => ({ ui: { ...state.ui, modal: { isOpen: false, children: null } } })),
});

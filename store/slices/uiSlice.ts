import { StateCreator } from "zustand";
import { StoreState } from "../types";
import { UIState } from "../types";

export interface UISlice {
  ui: UIState;
  showModal: (children: React.JSX.Element) => void;
  hideModal: () => void;
  setSettingsModalOpen: (open: boolean) => void;
  setSearchChatsModalOpen: (open: boolean) => void;
}

export const createUISlice: StateCreator<
  StoreState,
  [["zustand/devtools", never]],
  [],
  UISlice
> = (set) => ({
  ui: {
    modal: {
      isOpen: false,
      children: null,
    },
    modals: {
      settings: false,
      searchChats: false,
    },
  },

  showModal: (children) =>
    set((state) => ({ ui: { ...state.ui, modal: { isOpen: true, children } } })),

  hideModal: () =>
    set((state) => ({ ui: { ...state.ui, modal: { isOpen: false, children: null } } })),

  setSettingsModalOpen: (open) =>
    set((state) => ({
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          settings: open,
        },
      },
    })),

  setSearchChatsModalOpen: (open) =>
    set((state) => ({
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          searchChats: open,
        },
      },
    })),
});

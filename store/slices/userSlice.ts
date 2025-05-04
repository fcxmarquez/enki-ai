import { StateCreator } from "zustand";
import { StoreState } from "../types";

export interface UserSlice {
  user: {
    isSignedIn: boolean;
    email: string;
  };
  setIsSignedIn: (isSignedIn: boolean) => void;
  setUserEmail: (email: string) => void;
  setLogout: () => void;
}

export const createUserSlice: StateCreator<
  StoreState,
  [["zustand/devtools", never]],
  [],
  UserSlice
> = (set) => ({
  user: {
    isSignedIn: false,
    email: "",
  },

  setIsSignedIn: (isSignedIn: boolean) =>
    set((state) => ({ user: { ...state.user, isSignedIn } })),

  setUserEmail: (email: string) => set((state) => ({ user: { ...state.user, email } })),

  setLogout: () =>
    set((state) => ({ user: { ...state.user, isSignedIn: false, email: "" } })),
});

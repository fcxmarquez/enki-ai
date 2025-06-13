import { UISlice } from "./slices/uiSlice";
import { ChatSlice } from "./slices/chatSlice";
import { ConfigSlice } from "./slices/configSlice";
import { UserSlice } from "./slices/userSlice";

export type ModelType =
  | "claude-sonnet-4-20250514"
  | "gpt-4.1"
  | "gpt-4.1-mini"
  | "gpt-4.1-nano"
  | "o4-mini"
  | "o3";

export interface Config {
  openAIKey: string;
  anthropicKey: string;
  selectedModel: ModelType;
  enabledModels: ModelType[];
}

export interface UIState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  modal: {
    isOpen: boolean;
    children: React.JSX.Element | null;
  };
  modals: {
    settings: boolean;
  };
}

export type StoreState = UISlice & ChatSlice & ConfigSlice & UserSlice;

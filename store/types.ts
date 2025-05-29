import { UISlice } from "./slices/uiSlice";
import { ChatSlice } from "./slices/chatSlice";
import { ConfigSlice } from "./slices/configSlice";
import { UserSlice } from "./slices/userSlice";

export type ModelType = "claude-3-5-sonnet-20241022" | "gpt-4o-mini";

export interface Config {
  openAIKey: string;
  anthropicKey: string;
  selectedModel: ModelType;
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

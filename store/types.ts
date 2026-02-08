import { UISlice } from "./slices/uiSlice";
import { ChatSlice } from "./slices/chatSlice";
import { ConfigSlice } from "./slices/configSlice";
import { UserSlice } from "./slices/userSlice";
import { MODEL_VALUES } from "@/constants/models";

export type ModelType = (typeof MODEL_VALUES)[number];

export interface Config {
  openAIKey: string;
  anthropicKey: string;
  selectedModel: ModelType;
  enabledModels: ModelType[];
}

export interface UIState {
  modal: {
    isOpen: boolean;
    children: React.JSX.Element | null;
  };
  modals: {
    settings: boolean;
  };
}

export type StoreState = UISlice & ChatSlice & ConfigSlice & UserSlice;

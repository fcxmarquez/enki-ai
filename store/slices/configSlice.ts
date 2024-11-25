import { StateCreator } from "zustand";
import { StoreState } from "../types";
import { Config } from "../types";

export interface ConfigSlice {
  config: Config;
  setConfig: (config: Partial<Config>) => void;
  clearConfig: () => void;
  hasValidApiKey: () => boolean;
}

const initialConfig: Config = {
  openAIKey: "",
  anthropicKey: "",
  selectedModel: "claude-3-5-sonnet-20241022",
};

export const createConfigSlice: StateCreator<
  StoreState,
  [["zustand/devtools", never]],
  [],
  ConfigSlice
> = (set, get) => ({
  config: initialConfig,

  setConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),

  clearConfig: () =>
    set(() => ({
      config: initialConfig,
    })),

  hasValidApiKey: () => {
    const { config } = get();
    const hasKey = Boolean(config.openAIKey || config.anthropicKey);
    if (!hasKey) return false;

    return !(
      (config.selectedModel === "claude-3-5-sonnet-20241022" && !config.anthropicKey) ||
      (config.selectedModel === "gpt-4o-mini" && !config.openAIKey)
    );
  },
});

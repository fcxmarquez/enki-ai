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
  selectedModel: "claude-sonnet-4-20250514",
  enabledModels: ["claude-sonnet-4-20250514", "gpt-4.1-mini"],
};

export const createConfigSlice: StateCreator<
  StoreState,
  [["zustand/devtools", never]],
  [],
  ConfigSlice
> = (set, get) => ({
  config: initialConfig,

  setConfig: (newConfig) =>
    set((state) => {
      const updatedConfig = { ...state.config, ...newConfig };

      if (!updatedConfig.enabledModels) {
        updatedConfig.enabledModels = ["claude-sonnet-4-20250514", "gpt-4.1-mini"];
      }

      return {
        config: updatedConfig,
      };
    }),

  clearConfig: () =>
    set(() => ({
      config: initialConfig,
    })),

  hasValidApiKey: () => {
    const { config } = get();
    const hasKey = Boolean(config.openAIKey || config.anthropicKey);
    if (!hasKey) return false;

    const modelRequirements = {
      "claude-sonnet-4-20250514": "anthropicKey",
      "gpt-4.1": "openAIKey",
      "gpt-4.1-mini": "openAIKey",
      "gpt-4.1-nano": "openAIKey",
      "o4-mini": "openAIKey",
      o3: "openAIKey",
    } as const;

    return config.enabledModels.every((model) => {
      const requiredKey = modelRequirements[model];
      return requiredKey && Boolean(config[requiredKey]);
    });
  },
});

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
  enabledModels: ["claude-3-5-sonnet-20241022", "gpt-4o-mini"],
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
        updatedConfig.enabledModels = ["claude-3-5-sonnet-20241022", "gpt-4o-mini"];
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
      "claude-3-5-sonnet-20241022": "anthropicKey",
      "claude-3-haiku-20240307": "anthropicKey",
      "gpt-4o": "openAIKey",
      "gpt-4o-mini": "openAIKey",
    } as const;

    return config.enabledModels.every((model) => {
      const requiredKey = modelRequirements[model];
      return requiredKey && Boolean(config[requiredKey]);
    });
  },
});

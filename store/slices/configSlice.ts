import { StateCreator } from "zustand";
import { StoreState } from "../types";
import { Config } from "../types";
import { MODEL_OPTIONS } from "@/constants/models";

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

    const modelRequirements = MODEL_OPTIONS.reduce(
      (acc, option) => {
        acc[option.value] = option.requiresKey;
        return acc;
      },
      {} as Record<string, string>
    );

    return config.enabledModels.every((model) => {
      const requiredKey = modelRequirements[model];
      return requiredKey && Boolean(config[requiredKey as keyof Config]);
    });
  },
});

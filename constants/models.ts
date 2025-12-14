// Reasoning levels unified across providers
export type ReasoningLevel = "none" | "low" | "medium" | "high" | "max";

export type ModelProvider = "OpenAI" | "Anthropic" | "Google";

export type ApiKeyType = "openAIKey" | "anthropicKey" | "googleKey";

export interface ModelReasoning {
  configurable: boolean; // Can user adjust reasoning level?
  supportsTemperature: boolean; // Can pass temperature param when reasoning is off?
  defaultLevel: ReasoningLevel; // App default (lowest available)
  levels: ReasoningLevel[]; // Available levels for this model
}

export interface ModelDefinition {
  value: string;
  label: string;
  provider: ModelProvider;
  requiresKey: ApiKeyType;
  description: string;
  reasoning: ModelReasoning;
}

export const MODEL_OPTIONS: ModelDefinition[] = [
  {
    value: "claude-sonnet-4-5-20250929",
    label: "Claude 4.5 Sonnet",
    provider: "Anthropic",
    requiresKey: "anthropicKey",
    description: "Best coding model with enhanced capabilities",
    reasoning: {
      configurable: true,
      supportsTemperature: true, // Only when reasoning is off
      defaultLevel: "none",
      levels: ["none", "low", "medium", "high"],
    },
  },
  {
    value: "claude-opus-4-5-20251101",
    label: "Claude 4.5 Opus",
    provider: "Anthropic",
    requiresKey: "anthropicKey",
    description: "Most intelligent model for complex reasoning",
    reasoning: {
      configurable: true,
      supportsTemperature: true, // Only when reasoning is off
      defaultLevel: "none",
      levels: ["none", "low", "medium", "high", "max"],
    },
  },
  {
    value: "claude-haiku-4-5-20251001",
    label: "Claude 4.5 Haiku",
    provider: "Anthropic",
    requiresKey: "anthropicKey",
    description: "Fastest, most cost-efficient Claude model",
    reasoning: {
      configurable: false,
      supportsTemperature: true,
      defaultLevel: "none",
      levels: ["none"],
    },
  },
  {
    value: "gpt-5.2",
    label: "GPT-5.2",
    provider: "OpenAI",
    requiresKey: "openAIKey",
    description: "Flagship reasoning model for complex tasks",
    reasoning: {
      configurable: true,
      supportsTemperature: false, // Never supports temperature
      defaultLevel: "none",
      levels: ["none", "low", "medium", "high", "max"],
    },
  },
  {
    value: "gpt-5-mini",
    label: "GPT-5 Mini",
    provider: "OpenAI",
    requiresKey: "openAIKey",
    description: "Balanced for intelligence, speed, and cost",
    reasoning: {
      configurable: false,
      supportsTemperature: true,
      defaultLevel: "none",
      levels: ["none"],
    },
  },
  {
    value: "gpt-5-nano",
    label: "GPT-5 Nano",
    provider: "OpenAI",
    requiresKey: "openAIKey",
    description: "Fastest, most cost-effective GPT model",
    reasoning: {
      configurable: false,
      supportsTemperature: true,
      defaultLevel: "none",
      levels: ["none"],
    },
  },
];

// Default configuration
export const DEFAULT_MODEL = "claude-sonnet-4-5-20250929";
export const DEFAULT_ENABLED_MODELS = ["claude-sonnet-4-5-20250929", "gpt-5-mini"];

// Helper to get model config by value
export function getModelConfig(modelValue: string): ModelDefinition | undefined {
  return MODEL_OPTIONS.find((m) => m.value === modelValue);
}

// Derived exports for backward compatibility
export const MODEL_LABELS = MODEL_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = { label: option.label, provider: option.provider };
    return acc;
  },
  {} as Record<string, { label: string; provider: string }>
);

export const MODEL_VALUES_TYPES = MODEL_OPTIONS.reduce((acc, option) => {
  acc.push(option.value);
  return acc;
}, [] as string[]);

export const MODEL_VALUES = MODEL_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

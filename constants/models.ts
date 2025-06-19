export const MODEL_OPTIONS = [
  {
    value: "claude-sonnet-4-20250514",
    label: "Claude 4 Sonnet",
    requiresKey: "anthropicKey",
    provider: "Anthropic",
    description: "Latest Claude model with enhanced capabilities",
  },
  {
    value: "gpt-4.1",
    label: "GPT-4.1",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Flagship GPT model for complex tasks",
  },
  {
    value: "gpt-4.1-mini",
    label: "GPT-4.1 Mini",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Balanced for intelligence, speed, and cost",
  },
  {
    value: "gpt-4.1-nano",
    label: "GPT-4.1 Nano",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Fastest, most cost-effective GPT-4.1 model",
  },
  {
    value: "o4-mini",
    label: "o4-mini",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Faster, more affordable reasoning model",
  },
  {
    value: "o3",
    label: "o3",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Most powerful reasoning model",
  },
] as const;

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

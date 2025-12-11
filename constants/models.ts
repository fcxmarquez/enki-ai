export const MODEL_OPTIONS = [
  {
    value: "claude-sonnet-4-5-20250929",
    label: "Claude 4.5 Sonnet",
    requiresKey: "anthropicKey",
    provider: "Anthropic",
    description: "Best model for complex agents and coding",
  },
  {
    value: "claude-opus-4-5-20251101",
    label: "Claude 4.5 Opus",
    requiresKey: "anthropicKey",
    provider: "Anthropic",
    description: "Most intelligent model with maximum capability",
  },
  {
    value: "claude-haiku-4-5-20251001",
    label: "Claude 4.5 Haiku",
    requiresKey: "anthropicKey",
    provider: "Anthropic",
    description: "Fastest Haiku with near-frontier performance",
  },
  {
    value: "gpt-5.2",
    label: "GPT-5.2",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Flagship model for coding and agentic tasks",
  },
  {
    value: "gpt-5-mini",
    label: "GPT-5 Mini",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Faster, more cost-efficient GPT-5",
  },
  {
    value: "gpt-5-nano",
    label: "GPT-5 Nano",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Fastest, most affordable GPT-5 model",
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

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useConfig } from "@/store";
import { ModelType } from "@/store/types";

const MODEL_LABELS: Record<ModelType, { label: string; provider: string }> = {
  "claude-sonnet-4-20250514": { label: "Claude 4 Sonnet", provider: "Anthropic" },
  "gpt-4.1": { label: "GPT-4.1", provider: "OpenAI" },
  "gpt-4.1-mini": { label: "GPT-4.1 Mini", provider: "OpenAI" },
  "gpt-4.1-nano": { label: "GPT-4.1 Nano", provider: "OpenAI" },
  "o4-mini": { label: "o4-mini", provider: "OpenAI" },
  o3: { label: "o3", provider: "OpenAI" },
};

export function ModelSelector() {
  const { config, setConfig, hasValidApiKey } = useConfig();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<ModelType>(config.selectedModel);

  useEffect(() => {
    setCurrentModel(config.selectedModel);
  }, [config.selectedModel]);

  const handleModelSelect = (model: ModelType) => {
    setCurrentModel(model);
    setConfig({ selectedModel: model });
  };

  const hasValidKeys = hasValidApiKey();

  const getValidModels = () => {
    if (!hasValidKeys) return [];

    return (config.enabledModels || []).filter((model) => {
      const modelInfo = MODEL_LABELS[model];
      if (!modelInfo) return false;

      if (model.startsWith("claude-")) {
        return Boolean(config.anthropicKey);
      } else if (model.startsWith("gpt-") || model.startsWith("o")) {
        return Boolean(config.openAIKey);
      }
      return false;
    });
  };

  const availableModels = getValidModels();

  if ((config.enabledModels || []).length === 0) {
    return (
      <Button variant="ghost" className="text-muted-foreground cursor-not-allowed">
        No models configured
      </Button>
    );
  }

  if (!hasValidKeys || availableModels.length === 0) {
    return (
      <Button variant="ghost" className="text-muted-foreground cursor-not-allowed">
        No model selected
      </Button>
    );
  }

  const displayModel = availableModels.includes(currentModel)
    ? currentModel
    : availableModels[0];
  const currentModelInfo = MODEL_LABELS[displayModel];

  return (
    <DropdownMenu onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger className="focus-visible:ring-transparent" asChild>
        <Button variant="ghost" className="text-foreground">
          <div className="flex items-center gap-2">
            <span>{currentModelInfo?.label || "Select Model"}</span>
            <Badge variant="secondary" className="text-xs">
              {currentModelInfo?.provider}
            </Badge>
          </div>
          <ChevronDown
            className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px]">
        {availableModels.map((model) => {
          const modelInfo = MODEL_LABELS[model];
          const isSelected = model === displayModel;
          return (
            <DropdownMenuItem
              key={model}
              onClick={() => handleModelSelect(model)}
              className={`flex items-center justify-between ${isSelected ? "bg-accent" : ""}`}
            >
              <span>{modelInfo.label}</span>
              <Badge variant="outline" className="text-xs">
                {modelInfo.provider}
              </Badge>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

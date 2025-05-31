"use client";

import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, Settings2, LogOut, KeyRound, Cpu } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MultipleCombobox,
  MultipleComboboxOption,
} from "@/components/ui/multiple-combobox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useConfig, useUserActions } from "@/store";
import { ModelType } from "@/store/types";
import { createClient } from "@/utils/supabase/client";

const MODEL_OPTIONS = [
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    requiresKey: "anthropicKey",
    provider: "Anthropic",
    description: "Most capable model for complex reasoning",
  },
  {
    value: "claude-3-haiku-20240307",
    label: "Claude 3 Haiku",
    requiresKey: "anthropicKey",
    provider: "Anthropic",
    description: "Fast and cost-effective for simple tasks",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Advanced reasoning with multimodal capabilities",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o Mini",
    requiresKey: "openAIKey",
    provider: "OpenAI",
    description: "Fast and efficient for most tasks",
  },
] as const;

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const settingsFormSchema = z.object({
  openAIKey: z.string().optional(),
  anthropicKey: z.string().optional(),
  selectedModel: z.enum([
    "claude-3-5-sonnet-20241022",
    "claude-3-haiku-20240307",
    "gpt-4o",
    "gpt-4o-mini",
  ]),
  enabledModels: z
    .array(
      z.enum([
        "claude-3-5-sonnet-20241022",
        "claude-3-haiku-20240307",
        "gpt-4o",
        "gpt-4o-mini",
      ])
    )
    .min(1, "Please enable at least one model"),
});

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { config, setConfig } = useConfig();
  const { setLogout } = useUserActions();

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      openAIKey: config.openAIKey || "",
      anthropicKey: config.anthropicKey || "",
      selectedModel: (config.selectedModel || "claude-3-5-sonnet-20241022") as ModelType,
      enabledModels: (config.enabledModels || [
        "claude-3-5-sonnet-20241022",
        "gpt-4o-mini",
      ]) as ModelType[],
    },
  });

  const [showPasswords, setShowPasswords] = useState({
    openAI: false,
    anthropic: false,
  });

  // Watch form values to get current state
  const watchedValues = form.watch();

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to logout");
      return;
    }

    setLogout();
    handleClose();
    toast.success("Logged out successfully");
  };

  const onSubmit = (data: z.infer<typeof settingsFormSchema>) => {
    const missingKeys = data.enabledModels.filter((modelValue) => {
      const modelConfig = MODEL_OPTIONS.find((option) => option.value === modelValue);
      return modelConfig && !data[modelConfig.requiresKey as keyof typeof data];
    });

    if (missingKeys.length > 0) {
      const modelNames = missingKeys
        .map((modelValue) => {
          const modelConfig = MODEL_OPTIONS.find((option) => option.value === modelValue);
          return modelConfig?.label;
        })
        .join(", ");
      toast.error(`Please provide API keys for: ${modelNames}`);
      return;
    }

    setConfig({
      openAIKey: data.openAIKey || "",
      anthropicKey: data.anthropicKey || "",
      selectedModel: data.selectedModel,
      enabledModels: data.enabledModels,
    });
    handleClose();
    toast.success("Settings saved successfully");
  };

  // Prepare options for the multiple combobox
  const modelOptions: MultipleComboboxOption[] = MODEL_OPTIONS.map((option) => {
    const hasRequiredKey = Boolean(
      watchedValues[option.requiresKey as keyof typeof watchedValues]
    );
    return {
      value: option.value,
      label: option.label,
      description: option.description,
      badge: option.provider,
      disabled: !hasRequiredKey,
    };
  });

  const availableDefaultModels = MODEL_OPTIONS.filter((option) =>
    watchedValues.enabledModels.includes(option.value)
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your AI model preferences and API keys
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Model Selection Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <h3 className="text-md font-medium">AI Models</h3>
              </div>
              {/* Available Models with Checkboxes */}
              <FormField
                control={form.control}
                name="enabledModels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Models</FormLabel>
                    <FormDescription>
                      Select which models appear in your model selector. You need valid
                      API keys for each enabled model.
                    </FormDescription>
                    <FormControl>
                      <MultipleCombobox
                        options={modelOptions}
                        value={field.value}
                        onValueChange={(newValue) => {
                          field.onChange(newValue);

                          // Auto-select first model if enabling and none selected
                          if (
                            newValue.length > 0 &&
                            !newValue.includes(watchedValues.selectedModel)
                          ) {
                            form.setValue("selectedModel", newValue[0] as ModelType);
                          }
                        }}
                        placeholder="Select AI models..."
                        searchPlaceholder="Search models..."
                        emptyText="No models found."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Default Model Selection */}
              {watchedValues.enabledModels.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Model</FormLabel>
                      <FormDescription>
                        This model will be selected by default for new conversations.
                      </FormDescription>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose default model" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDefaultModels.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                  <span>{option.label}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {option.provider}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Separator />
            {/* API Keys Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                <h3 className="text-md font-medium">API Keys</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Provide the API key for your selected model. Your keys are securely stored
                in your browser.
              </p>
              {/* OpenAI Key */}
              <FormField
                control={form.control}
                name="openAIKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OpenAI API Key</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPasswords.openAI ? "text" : "password"}
                          placeholder="sk-..."
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              openAI: !prev.openAI,
                            }))
                          }
                        >
                          {showPasswords.openAI ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Anthropic Key */}
              <FormField
                control={form.control}
                name="anthropicKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anthropic API Key</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPasswords.anthropic ? "text" : "password"}
                          placeholder="sk-ant-..."
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              anthropic: !prev.anthropic,
                            }))
                          }
                        >
                          {showPasswords.anthropic ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="w-full">
                  Save Settings
                </Button>
              </div>
            </div>
            <Separator />
            {/* Profile Section */}
            <div className="space-y-4">
              <Button variant="outline" onClick={handleLogout} className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

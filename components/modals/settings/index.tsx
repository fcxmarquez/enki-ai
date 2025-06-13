"use client";

import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, Settings2, LogOut, KeyRound, Cpu, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
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
    value: "claude-sonnet-4-20250514",
    label: "Claude 4 Sonnet",
    requiresKey: "anthropicKey",
    provider: "Anthropic",
    description: "Latest Claude model with enhanced capabilities",
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
    "claude-sonnet-4-20250514",
    "claude-3-haiku-20240307",
    "gpt-4o",
    "gpt-4.1",
    "gpt-4.1-mini",
    "gpt-4.1-nano",
    "o4-mini",
    "o3",
    "gpt-4o-mini",
  ]),
  enabledModels: z
    .array(
      z.enum([
        "claude-3-5-sonnet-20241022",
        "claude-sonnet-4-20250514",
        "claude-3-haiku-20240307",
        "gpt-4o",
        "gpt-4.1",
        "gpt-4.1-mini",
        "gpt-4.1-nano",
        "o4-mini",
        "o3",
        "gpt-4o-mini",
      ])
    )
    .min(1, "Please enable at least one model")
    .max(10, "You can select a maximum of 10 models"),
});

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { config, setConfig } = useConfig();
  const { setLogout } = useUserActions();
  const { theme = "system", setTheme } = useTheme();

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      openAIKey: config.openAIKey || "",
      anthropicKey: config.anthropicKey || "",
      selectedModel: (config.selectedModel || "claude-sonnet-4-20250514") as ModelType,
      enabledModels: (config.enabledModels || [
        "claude-sonnet-4-20250514",
        "gpt-4o-mini",
      ]) as ModelType[],
    },
  });

  React.useEffect(() => {
    form.reset({
      openAIKey: config.openAIKey || "",
      anthropicKey: config.anthropicKey || "",
      selectedModel: (config.selectedModel || "claude-sonnet-4-20250514") as ModelType,
      enabledModels: (config.enabledModels || [
        "claude-sonnet-4-20250514",
        "gpt-4o-mini",
      ]) as ModelType[],
    });
  }, [config, form]);

  const [showPasswords, setShowPasswords] = useState({
    openAI: false,
    anthropic: false,
  });

  // Watch form values to get current state
  const watchedValues = form.watch();

  const hasAnyApiKey = Boolean(watchedValues.openAIKey || watchedValues.anthropicKey);

  React.useEffect(() => {
    if (!hasAnyApiKey && watchedValues.enabledModels.length > 0) {
      form.setValue("enabledModels", []);
    }
  }, [hasAnyApiKey, watchedValues.enabledModels.length, form]);

  const handleClose = (next: boolean) => {
    onOpenChange(next);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to logout");
      return;
    }

    setLogout();
    handleClose(false);
    toast.success("Logged out successfully");
  };

  const onSubmit = (data: z.infer<typeof settingsFormSchema>) => {
    if (!data.openAIKey && !data.anthropicKey) {
      toast.error("Please provide at least one API key.");
      return;
    }

    if (data.enabledModels.length === 0) {
      toast.error("Please enable at least one model.");
      return;
    }

    if (!data.enabledModels.includes(data.selectedModel)) {
      return toast.error("Default model must be one of the enabled models.");
    }

    const atLeastOneKey = data.enabledModels.some((modelValue) => {
      const modelConfig = MODEL_OPTIONS.find((option) => option.value === modelValue);
      return modelConfig && data[modelConfig.requiresKey as keyof typeof data];
    });

    if (!atLeastOneKey) {
      toast.error("Please provide API keys for at least one provider.");
      return;
    }

    setConfig({
      openAIKey: data.openAIKey || "",
      anthropicKey: data.anthropicKey || "",
      selectedModel: data.selectedModel,
      enabledModels: data.enabledModels,
    });
    handleClose(false);
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
            {/* Theme Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SunMoon className="h-4 w-4" />
                <h3 className="text-md font-medium">Theme</h3>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            {/* Model Selection Section */}
            <div
              className={`space-y-4 ${!hasAnyApiKey ? "opacity-50 pointer-events-none" : ""}`}
            >
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <h3 className="text-md font-medium">AI Models</h3>
                {!hasAnyApiKey && (
                  <Badge variant="secondary" className="text-xs">
                    Requires API Key
                  </Badge>
                )}
              </div>
              {!hasAnyApiKey && (
                <p className="text-sm text-muted-foreground">
                  Please provide at least one API key below to enable model selection.
                </p>
              )}
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
                        value={hasAnyApiKey ? field.value : []}
                        onValueChange={(newValue) => {
                          if (!hasAnyApiKey) return;

                          if (newValue.length > 10) {
                            toast.error("You can select a maximum of 10 models");
                            return;
                          }

                          field.onChange(newValue);

                          // Auto-select first model if enabling and none selected
                          if (
                            newValue.length > 0 &&
                            !newValue.includes(watchedValues.selectedModel)
                          ) {
                            form.setValue("selectedModel", newValue[0] as ModelType);
                          }
                        }}
                        placeholder={
                          hasAnyApiKey ? "Select AI models..." : "Provide API keys first"
                        }
                        searchPlaceholder="Search models..."
                        emptyText="No models found."
                        disabled={!hasAnyApiKey}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Default Model Selection */}
              {hasAnyApiKey && watchedValues.enabledModels.length > 0 && (
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

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  MultipleCombobox,
  MultipleComboboxOption,
} from "@/components/ui/multiple-combobox";

const meta: Meta<typeof MultipleCombobox> = {
  title: "components/ui/MultipleCombobox",
  component: MultipleCombobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-select combobox component with search functionality, badges, and responsive design.",
      },
    },
  },
  argTypes: {
    options: {
      description: "Array of options to display in the combobox",
      control: { type: "object" },
    },
    value: {
      description: "Array of selected values",
      control: { type: "object" },
    },
    onValueChange: {
      description: "Callback function when selection changes",
      action: "valueChanged",
    },
    placeholder: {
      description: "Placeholder text when no items are selected",
      control: { type: "text" },
    },
    searchPlaceholder: {
      description: "Placeholder text for the search input",
      control: { type: "text" },
    },
    emptyText: {
      description: "Text to display when no options match the search",
      control: { type: "text" },
    },
    disabled: {
      description: "Whether the combobox is disabled",
      control: { type: "boolean" },
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultipleCombobox>;

// Sample data for stories
const basicOptions: MultipleComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
];

const detailedOptions: MultipleComboboxOption[] = [
  {
    value: "react",
    label: "React",
    description: "A JavaScript library for building user interfaces",
    badge: "Popular",
  },
  {
    value: "vue",
    label: "Vue.js",
    description: "The Progressive JavaScript Framework",
    badge: "Easy",
  },
  {
    value: "angular",
    label: "Angular",
    description: "Platform for building mobile and desktop web applications",
    badge: "Enterprise",
  },
  {
    value: "svelte",
    label: "Svelte",
    description: "Cybernetically enhanced web apps",
    badge: "Fast",
  },
  {
    value: "nextjs",
    label: "Next.js",
    description: "The React Framework for Production",
    badge: "Full-stack",
  },
  {
    value: "nuxt",
    label: "Nuxt.js",
    description: "The Intuitive Vue Framework",
    badge: "SSR",
  },
  {
    value: "gatsby",
    label: "Gatsby",
    description: "Build blazing fast, modern apps and websites with React",
    badge: "Static",
  },
  {
    value: "remix",
    label: "Remix",
    description: "Full stack web framework focused on web standards",
    badge: "New",
  },
];

const manyOptions: MultipleComboboxOption[] = Array.from({ length: 50 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
  description: `Description for option ${i + 1}`,
  badge: i % 3 === 0 ? "Featured" : undefined,
}));

// Interactive wrapper component for stories
interface InteractiveWrapperProps {
  initialValue?: string[];
  options: MultipleComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
}

const InteractiveWrapper = ({ initialValue = [], ...props }: InteractiveWrapperProps) => {
  const [value, setValue] = useState<string[]>(initialValue);

  return (
    <div className="w-[400px]">
      <MultipleCombobox {...props} value={value} onValueChange={setValue} />
      <div className="mt-4 p-3 bg-muted rounded-md">
        <p className="text-sm font-medium mb-2">Selected values:</p>
        <code className="text-xs">
          {value.length > 0 ? JSON.stringify(value, null, 2) : "No items selected"}
        </code>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: basicOptions,
    placeholder: "Select frameworks...",
    searchPlaceholder: "Search frameworks...",
    emptyText: "No frameworks found.",
  },
};

export const WithDescriptionsAndBadges: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: detailedOptions,
    placeholder: "Choose your tech stack...",
    searchPlaceholder: "Search technologies...",
    emptyText: "No technologies found.",
  },
};

export const PreSelected: Story = {
  render: (args) => (
    <InteractiveWrapper initialValue={["react", "nextjs", "vue"]} {...args} />
  ),
  args: {
    options: detailedOptions,
    placeholder: "Choose your tech stack...",
    searchPlaceholder: "Search technologies...",
  },
};

export const ManyOptions: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: manyOptions,
    placeholder: "Select from many options...",
    searchPlaceholder: "Search options...",
    emptyText: "No options found.",
  },
};

export const ManySelected: Story = {
  render: (args) => (
    <InteractiveWrapper
      initialValue={Array.from({ length: 15 }, (_, i) => `option-${i + 1}`)}
      {...args}
    />
  ),
  args: {
    options: manyOptions,
    placeholder: "Select from many options...",
    searchPlaceholder: "Search options...",
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: [
      { value: "react", label: "React", description: "Available option" },
      { value: "vue", label: "Vue.js", description: "Available option" },
      {
        value: "angular",
        label: "Angular",
        description: "Disabled option",
        disabled: true,
      },
      { value: "svelte", label: "Svelte", description: "Available option" },
      {
        value: "nextjs",
        label: "Next.js",
        description: "Disabled option",
        disabled: true,
      },
    ],
    placeholder: "Select available frameworks...",
    searchPlaceholder: "Search frameworks...",
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveWrapper initialValue={["react", "vue"]} {...args} />,
  args: {
    options: basicOptions,
    disabled: true,
    placeholder: "Disabled combobox...",
  },
};

export const CustomStyling: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: detailedOptions,
    className: "border-2 border-primary",
    placeholder: "Custom styled combobox...",
    searchPlaceholder: "Search with style...",
  },
};

export const Empty: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    options: [],
    placeholder: "No options available...",
    searchPlaceholder: "Search...",
    emptyText: "No options to display.",
  },
};

export const SingleSelection: Story = {
  render: (args) => <InteractiveWrapper initialValue={["react"]} {...args} />,
  args: {
    options: detailedOptions,
    placeholder: "Single item selected...",
    searchPlaceholder: "Search technologies...",
  },
};
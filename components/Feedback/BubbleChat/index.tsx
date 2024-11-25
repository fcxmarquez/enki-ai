import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEffect, useState } from "react";
import { colors } from "@/constants/systemDesign/colors";
import { Bot, User } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

interface BubbleChatProps {
  message: string;
  name: string;
  isTyping?: boolean;
  role?: "user" | "assistant";
}

type CodeBlockProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  className?: string;
};

export const BubbleChat = ({
  message,
  name,
  isTyping,
  role = "user",
}: BubbleChatProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const components: Components = {
    code({ inline, className, children, ...props }: CodeBlockProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <div className="rounded-md bg-gray-900 p-4">
          <SyntaxHighlighter
            language={match[1]}
            style={vscDarkPlus}
            PreTag="div"
            children={String(children).replace(/\n$/, "")} // eslint-disable-line react/no-children-prop
          />
        </div>
      ) : (
        <code
          className="rounded-sm bg-gray-200 px-1 py-0.5 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
          {...props}
        >
          {children}
        </code>
      );
    },
    p: ({ children, ...props }) => (
      <p className="mb-2 last:mb-0" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-2 list-disc pl-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-2 list-decimal pl-4" {...props}>
        {children}
      </ol>
    ),
    a: ({ children, href, ...props }) => (
      <a
        className="text-blue-500 hover:underline dark:text-blue-400"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    table: ({ children, ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse text-left" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-gray-200 px-4 py-2 dark:border-gray-700" {...props}>
        {children}
      </td>
    ),
  };

  return (
    <div
      className={`group w-full ${
        role === "assistant"
          ? "bg-background-conversation-dark dark:bg-background-conversation-dark"
          : ""
      }`}
    >
      <div className="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl m-auto flex gap-4 p-4 text-base">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
          {role === "assistant" ? (
            <Bot className="h-6 w-6 text-text-default" />
          ) : (
            <User className="h-6 w-6 text-text-default" />
          )}
        </div>
        <div className="flex w-[calc(100%-50px)] flex-col">
          <span className="mb-1 text-sm font-medium text-text-default">{name}</span>
          {role === "user" ? (
            <div
              style={{
                backgroundColor: colors.chat.user.background,
                color: colors.chat.user.text,
              }}
              className="self-end rounded-xl px-4 py-2"
            >
              {message}
            </div>
          ) : (
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              style={{
                color: colors.chat.assistant.text.dark,
              }}
            >
              {isTyping ? (
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                  {message}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

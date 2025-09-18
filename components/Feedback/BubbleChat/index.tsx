import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEffect, useState } from "react";
import { Bot, User } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface BubbleChatProps {
  message: string;
  name: string;
  role?: "user" | "assistant";
  status?: "pending" | "success" | "error" | undefined;
  isLastMessage?: boolean;
}

type CodeBlockProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  className?: string;
};

export const BubbleChat = ({
  message,
  name,
  role = "user",
  status = "pending",
  isLastMessage = false,
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
        <div className="rounded-md p-4">
          <SyntaxHighlighter
            language={match[1]}
            style={vscDarkPlus}
            customStyle={{
              borderRadius: "0.5rem",
              padding: "1rem",
            }}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="rounded-sm bg-muted px-1 py-0.5 text-muted-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },
    p: ({ children, ...props }) => (
      <p className="mb-2 last:mb- break-all" {...props}>
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
        className="text-primary hover:underline"
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
      <th className="border border-border bg-muted px-4 py-2" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-border px-4 py-2" {...props}>
        {children}
      </td>
    ),
  };

  return (
    <div className="group w-full">
      <div className="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl m-auto flex gap-4 p-4 text-base">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
          {role === "assistant" ? (
            <Bot className="h-6 w-6 text-foreground" />
          ) : (
            <User className="h-6 w-6 text-foreground" />
          )}
        </div>
        <div className="flex w-full flex-col">
          <span className="mb-1 text-sm font-medium text-foreground">{name}</span>
          {role === "user" ? (
            <div className="self-end rounded-xl px-4 py-2 text-primary-foreground bg-primary">
              {message}
            </div>
          ) : (
            <div
              className={cn(
                "prose prose-sm dark:prose-invert max-w-none text-foreground",
                role === "assistant" && "self-start",
                isLastMessage && "min-h-[calc(100vh-152px)]"
              )}
            >
              {status === "pending" ? (
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

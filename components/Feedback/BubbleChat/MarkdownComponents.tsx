import { Components } from "react-markdown";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { ComponentPropsWithoutRef } from "react";

type CodeBlockProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  className?: string;
};

export const MarkdownComponents: Components = {
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
      <code className="rounded-sm bg-muted px-1 py-0.5 text-muted-foreground" {...props}>
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

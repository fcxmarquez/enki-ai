import { Components } from "react-markdown";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { ComponentPropsWithoutRef } from "react";
import { motion } from "motion/react";

type CodeBlockProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  className?: string;
};

const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const MarkdownComponents: Components = {
  code({ inline, className, children, ...props }: CodeBlockProps) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <motion.div className="rounded-md overflow-hidden max-w-full" {...fadeInAnimation}>
        <SyntaxHighlighter
          language={match[1]}
          style={vscDarkPlus}
          customStyle={{
            borderRadius: "0.5rem",
            padding: "1rem",
            margin: 0,
            maxWidth: "100%",
            overflow: "hidden",
          }}
          PreTag="div"
          wrapLongLines={true}
          codeTagProps={{ style: { whiteSpace: "pre-wrap", wordBreak: "break-word" } }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </motion.div>
    ) : (
      <code className="rounded-sm bg-muted px-1 py-0.5 text-muted-foreground" {...props}>
        {children}
      </code>
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  p: ({ children, node: _node, ...props }) => (
    <motion.p
      className="mb-2 last:mb-0 break-words"
      {...(props as Record<string, unknown>)}
      {...fadeInAnimation}
    >
      {children}
    </motion.p>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ul: ({ children, node: _node, ...props }) => (
    <motion.ul
      className="mb-2 list-disc pl-4"
      {...(props as Record<string, unknown>)}
      {...fadeInAnimation}
    >
      {children}
    </motion.ul>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ol: ({ children, node: _node, ...props }) => (
    <motion.ol
      className="mb-2 list-decimal pl-4"
      {...(props as Record<string, unknown>)}
      {...fadeInAnimation}
    >
      {children}
    </motion.ol>
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
    <motion.div className="my-4 overflow-x-auto" {...fadeInAnimation}>
      <table className="w-full border-collapse text-left" {...props}>
        {children}
      </table>
    </motion.div>
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

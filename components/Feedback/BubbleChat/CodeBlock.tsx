"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { motion } from "motion/react";
import { HiOutlineBars3BottomLeft, HiOutlineClipboard, HiCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CodeBlockProps {
  language: string;
  children: string;
}

const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const CodeBlock = ({ language, children }: CodeBlockProps) => {
  const [isWrapped, setIsWrapped] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const toggleWrap = () => {
    setIsWrapped((prev) => !prev);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setIsCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <motion.div className="rounded-md overflow-hidden max-w-full relative group my-4" {...fadeInAnimation}>
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-md border border-white/10 backdrop-blur-sm"
                onClick={toggleWrap}
              >
                <HiOutlineBars3BottomLeft className={`h-4 w-4 ${isWrapped ? "text-primary" : ""}`} />
                <span className="sr-only">Toggle word wrap</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isWrapped ? "Disable word wrap" : "Enable word wrap"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-md border border-white/10 backdrop-blur-sm"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <HiCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <HiOutlineClipboard className="h-4 w-4" />
                )}
                <span className="sr-only">Copy code</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: "0.5rem",
          padding: "1rem",
          margin: 0,
          maxWidth: "100%",
          overflow: isWrapped ? "hidden" : "auto",
        }}
        PreTag="div"
        wrapLongLines={isWrapped}
        codeTagProps={{
          style: {
            whiteSpace: isWrapped ? "pre-wrap" : "pre",
            wordBreak: isWrapped ? "break-word" : "normal",
          },
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </motion.div>
  );
};

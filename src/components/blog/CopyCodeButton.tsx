"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";

interface CopyCodeButtonProps {
  code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(code)}
      className={cn(
        "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md",
        "border border-border bg-background/80 text-muted-foreground backdrop-blur-sm",
        "transition-colors hover:bg-muted hover:text-foreground",
      )}
      aria-label="Copy code"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

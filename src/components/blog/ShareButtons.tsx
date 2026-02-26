"use client";

import { Twitter, Linkedin, Link2 } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const btnStyles = cn(
  "flex h-9 w-9 items-center justify-center rounded-full",
  "border border-border text-muted-foreground",
  "transition-colors hover:border-primary hover:text-primary",
);

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const { copy } = useCopyToClipboard();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnStyles}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnStyles}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={() => copy(url)}
        className={btnStyles}
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </button>
    </div>
  );
}

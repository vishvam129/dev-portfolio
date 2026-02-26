import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/types";
import { cn } from "@/lib/cn";

interface PostNavigationProps {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className={cn(
            "group flex items-center gap-3 rounded-lg border border-border p-4",
            "transition-colors hover:border-primary/50",
          )}
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Previous</p>
            <p className="truncate text-sm font-medium text-foreground">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className={cn(
            "group flex items-center justify-end gap-3 rounded-lg border border-border p-4",
            "transition-colors hover:border-primary/50 sm:text-right",
          )}
        >
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Next</p>
            <p className="truncate text-sm font-medium text-foreground">
              {next.title}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
}

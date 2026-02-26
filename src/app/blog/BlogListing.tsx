"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { BlogPostMeta } from "@/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/cn";

interface BlogListingProps {
  posts: BlogPostMeta[];
  tags: string[];
}

export function BlogListing({ posts, tags }: BlogListingProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !debouncedSearch ||
        post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesTag = !activeTag || post.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, debouncedSearch, activeTag]);

  return (
    <>
      {/* Search & Filters */}
      <div className="mt-10 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full rounded-lg border border-border bg-muted/30 py-2.5 pl-10 pr-4",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring",
            )}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              !activeTag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No articles found. Try a different search or filter.
        </p>
      )}
    </>
  );
}

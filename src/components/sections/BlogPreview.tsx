import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/types";
import { BlogCard } from "@/components/blog/BlogCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

interface BlogPreviewProps {
  posts: BlogPostMeta[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-heading text-sm font-medium uppercase tracking-widest text-primary">
                Blog
              </p>
              <h2 className="text-h2 mt-2 text-foreground">
                Latest articles
              </h2>
            </div>
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

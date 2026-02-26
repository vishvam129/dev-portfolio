import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/cn";
import { Clock } from "lucide-react";

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border",
        "bg-card transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg",
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="primary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

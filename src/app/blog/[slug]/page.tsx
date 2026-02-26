import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/Badge";
import { PostNavigation } from "@/components/blog/PostNavigation";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { siteConfig } from "@/data/siteConfig";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const postUrl = `${siteConfig.url}/blog/${slug}`;

  return (
    <article className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-h2 mt-4 text-foreground">{post.title}</h1>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="primary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border border-border">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert mt-10 max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-pre:border prose-pre:border-border prose-pre:bg-muted/30">
          <MDXRemote source={post.content} />
        </div>

        {/* Share */}
        <div className="mt-10 border-t border-border pt-6">
          <ShareButtons title={post.title} url={postUrl} />
        </div>

        {/* Navigation */}
        <PostNavigation prev={prev} next={next} />
      </div>
    </article>
  );
}

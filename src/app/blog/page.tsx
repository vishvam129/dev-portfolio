import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { BlogListing } from "./BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, technology, and building great software.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Blog
        </p>
        <h1 className="text-h2 mt-2 text-foreground">
          Latest articles
        </h1>

        <BlogListing posts={posts} tags={tags} />
      </div>
    </section>
  );
}

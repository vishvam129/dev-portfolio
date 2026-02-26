import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): BlogPostMeta[] {
  return getMdxFiles()
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, filename);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(source);

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        updatedDate: data.updatedDate,
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "/images/blog/default.jpg",
        coverImageAlt: data.coverImageAlt || data.title || "",
        tags: data.tags || [],
        readingTime: readingTime(content).text,
      } satisfies BlogPostMeta;
    })
    .filter((post) => post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    updatedDate: data.updatedDate,
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "/images/blog/default.jpg",
    coverImageAlt: data.coverImageAlt || data.title || "",
    tags: data.tags || [],
    published: data.published !== false,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

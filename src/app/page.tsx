import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Marquee } from "@/components/ui/Marquee";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { getAllPosts } from "@/lib/mdx";

const marqueeWords = [
  "Python",
  "React",
  "Django",
  "Node.js",
  "PostgreSQL",
  "FastAPI",
  "JavaScript",
  "Docker",
  "AWS",
  "Odoo",
  "MERN Stack",
  "Tailwind CSS",
];

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Marquee>{marqueeWords}</Marquee>
      <Experience />
      <Testimonials />
      <Certifications />
      <BlogPreview posts={latestPosts} />
      <Contact />
    </>
  );
}

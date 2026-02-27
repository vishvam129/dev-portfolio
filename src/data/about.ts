import type { AboutData } from "@/types";

export const aboutData: AboutData = {
  bio: [
    "I'm Vishvam Patel, a Software Developer from Gujarat, India, currently pursuing my B.E. in Computer Science at LJ University. I specialize in Python, full-stack web development with the MERN stack, and building scalable backend systems.",
    "I have hands-on experience developing and customizing Odoo ERP modules, engineering PostgreSQL database schemas, and integrating RESTful APIs for real-world business applications in manufacturing and retail. I'm passionate about writing clean, efficient code and always eager to learn new technologies.",
  ],
  stats: [
    { label: "Projects Built", value: 2, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Cups of Coffee", value: 500, suffix: "+" },
  ],
  funFacts: [
    { emoji: "🐍", label: "Python Enthusiast" },
    { emoji: "☕", label: "Coffee Addict" },
    { emoji: "🎮", label: "Gamer" },
    { emoji: "📖", label: "Lifelong Learner" },
  ],
  profileImage: "/images/about/profile.webp",
  profileImageAlt: "Vishvam Patel — Software Developer",
};

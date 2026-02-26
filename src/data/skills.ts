import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: "⚛️", category: "frontend", proficiency: 4, yearsUsed: 2 },
      { name: "JavaScript", icon: "🟨", category: "frontend", proficiency: 4, yearsUsed: 3 },
      { name: "HTML/CSS", icon: "🌐", category: "frontend", proficiency: 5, yearsUsed: 4 },
      { name: "Tailwind CSS", icon: "🎨", category: "frontend", proficiency: 4, yearsUsed: 2 },
      { name: "Material-UI", icon: "🎯", category: "frontend", proficiency: 3, yearsUsed: 1 },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "Python", icon: "🐍", category: "backend", proficiency: 5, yearsUsed: 3 },
      { name: "Django", icon: "🌿", category: "backend", proficiency: 4, yearsUsed: 2 },
      { name: "FastAPI", icon: "⚡", category: "backend", proficiency: 3, yearsUsed: 1 },
      { name: "Node.js", icon: "🟩", category: "backend", proficiency: 4, yearsUsed: 2 },
      { name: "Java", icon: "☕", category: "backend", proficiency: 4, yearsUsed: 3 },
      { name: "C/C++", icon: "⚙️", category: "backend", proficiency: 3, yearsUsed: 3 },
    ],
  },
  {
    category: "database",
    label: "Database",
    skills: [
      { name: "PostgreSQL", icon: "🐘", category: "database", proficiency: 5, yearsUsed: 2 },
      { name: "SQL", icon: "📊", category: "database", proficiency: 5, yearsUsed: 3 },
      { name: "MongoDB", icon: "🍃", category: "database", proficiency: 3, yearsUsed: 1 },
    ],
  },
  {
    category: "devops",
    label: "DevOps & Tools",
    skills: [
      { name: "Git", icon: "📦", category: "devops", proficiency: 4, yearsUsed: 3 },
      { name: "Docker", icon: "🐳", category: "devops", proficiency: 3, yearsUsed: 1 },
      { name: "AWS", icon: "☁️", category: "devops", proficiency: 3, yearsUsed: 1 },
      { name: "GitHub", icon: "🐙", category: "devops", proficiency: 4, yearsUsed: 3 },
      { name: "VS Code", icon: "💻", category: "devops", proficiency: 5, yearsUsed: 4 },
      { name: "PyCharm", icon: "🔧", category: "devops", proficiency: 4, yearsUsed: 2 },
    ],
  },
];

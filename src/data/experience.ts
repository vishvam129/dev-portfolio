import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "1",
    type: "work",
    title: "Odoo Developer",
    organization: "RdFlex",
    location: "Gandhinagar, India",
    startDate: "2024-07",
    endDate: "present",
    current: true,
    description:
      "Developing and customizing Odoo ERP modules using Python and the ORM framework, creating new models, views, and business logic to meet specific client requirements.",
    highlights: [
      "Develop and customize Odoo modules using Python and the ORM framework, creating models, views (XML), and business logic",
      "Engineer and manage PostgreSQL database schemas within Odoo, ensuring data integrity and optimizing queries",
      "Build custom reports and QWeb templates for actionable client insights and professional documents",
      "Assist in the full development lifecycle, including requirements gathering, debugging, and technical support",
    ],
    techStack: ["Python", "Odoo", "PostgreSQL", "XML", "QWeb"],
    order: 1,
  },
  {
    id: "2",
    type: "work",
    title: "Python Developer Intern",
    organization: "RdFlex",
    location: "Gandhinagar, India",
    startDate: "2024-01",
    endDate: "2024-06",
    current: false,
    description:
      "Developed and maintained backend components for a large-scale business management platform using Python, delivering custom features for clients in manufacturing and retail sectors.",
    highlights: [
      "Developed and maintained backend components for a large-scale business management platform using Python",
      "Engineered and optimized PostgreSQL database schemas and queries for high data integrity and performance",
      "Integrated various third-party RESTful APIs for e-commerce and inventory management systems",
      "Participated in the full SDLC, from requirements gathering to debugging production systems",
    ],
    techStack: ["Python", "PostgreSQL", "REST APIs", "FastAPI", "Docker"],
    order: 2,
  },
  {
    id: "3",
    type: "education",
    title: "B.E. in Computer Science & Technology",
    organization: "LJ University (LJIET)",
    location: "Gujarat, India",
    startDate: "2022-06",
    endDate: "2026-06",
    current: true,
    description:
      "Pursuing Bachelor of Engineering in Computer Science and Technology. Coursework covers DSA, DBMS, Computer Networks, Python, Java, MERN Stack Development, and AWS Cloud Computing.",
    highlights: [
      "Relevant coursework: DSA, DBMS, Computer Networks, Python, Java, MERN Stack, AWS",
      "Built multiple full-stack projects including a Job Portal (MERN) and Stock Price Prediction (Django + ML)",
      "Gained hands-on experience with cloud computing, containerization, and modern development practices",
    ],
    techStack: ["Python", "Java", "C/C++", "JavaScript", "SQL"],
    order: 3,
  },
];

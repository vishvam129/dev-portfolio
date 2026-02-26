import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "job-portal",
    title: "Job Portal",
    shortDescription:
      "A full-stack job portal built with the MERN stack, featuring a responsive UI for browsing listings and managing applications.",
    fullDescription:
      "Engineered a complete job portal application using MongoDB, Express.js, React, and Node.js. The platform enables users to seamlessly browse job listings, apply to positions, and manage their applications through an intuitive, responsive interface.",
    problem:
      "Job seekers needed a streamlined platform to discover opportunities and manage applications without the clutter and complexity of existing job boards.",
    solution:
      "Built a full-stack MERN application with a responsive React frontend for intuitive browsing, a Node.js/Express.js backend powering a RESTful API, and implemented advanced search and filtering capabilities for efficient job discovery.",
    impact:
      "Delivered a fully functional job portal with real-time search, advanced filtering, and a clean user experience that simplifies the job hunting process.",
    thumbnail: "/images/projects/job-portal-thumb.webp",
    thumbnailAlt: "Job Portal application interface",
    screenshots: [
      "/images/projects/job-portal-1.webp",
      "/images/projects/job-portal-2.webp",
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript"],
    category: "fullstack",
    featured: true,
    githubUrl: "https://github.com/vishvamp129/job-portal",
    date: "2024-06",
    learnings: [
      "Built a complete RESTful API with Express.js and MongoDB",
      "Implemented advanced search and filtering on both frontend and backend",
      "Learned to manage complex state across a full-stack MERN application",
    ],
    order: 1,
  },
  {
    id: "2",
    slug: "stock-price-prediction",
    title: "Stock Price Prediction",
    shortDescription:
      "A machine learning web app built with Django and Scikit-learn that forecasts stock market trends with interactive visualizations.",
    fullDescription:
      "Developed a stock prediction web application using Django and Python, applying various Scikit-learn machine learning models to analyze historical data and forecast market trends. The app integrates the Yahoo Finance API for real-time data and uses Plotly for interactive visualizations.",
    problem:
      "Retail investors lacked accessible tools to visualize stock market trends and see ML-based predictions without needing data science expertise.",
    solution:
      "Built a Django web application that fetches historical stock data via the Yahoo Finance API, runs multiple Scikit-learn prediction models, and presents results through interactive Plotly charts that are easy to understand.",
    impact:
      "Created an intuitive tool that makes ML-powered stock analysis accessible to non-technical users, with interactive charts for exploring predictions across different models and timeframes.",
    thumbnail: "/images/projects/stock-prediction-thumb.webp",
    thumbnailAlt: "Stock Price Prediction app with charts",
    screenshots: [
      "/images/projects/stock-prediction-1.webp",
      "/images/projects/stock-prediction-2.webp",
    ],
    techStack: ["Python", "Django", "Scikit-learn", "Plotly", "Yahoo Finance API", "Pandas"],
    category: "fullstack",
    featured: true,
    githubUrl: "https://github.com/vishvamp129/stock-prediction",
    date: "2024-03",
    learnings: [
      "Applied multiple ML models (Linear Regression, Random Forest, etc.) to real-world financial data",
      "Integrated third-party APIs for live data fetching and processing",
      "Built interactive data visualizations with Plotly for clear, insightful presentations",
    ],
    order: 2,
  },
];

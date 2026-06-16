import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AiPage from "@/pages/AiPage";
import Placeholder from "@/pages/Placeholder";

const router = createBrowserRouter([
  { path: "/", element: <AiPage /> },
  { path: "/backend", element: <Placeholder title="Backend — Production" /> },
  { path: "/full-stack", element: <Placeholder title="Full-Stack — The Studio" /> },
  { path: "*", element: <AiPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

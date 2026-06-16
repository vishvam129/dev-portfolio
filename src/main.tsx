import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AiPage from "@/pages/AiPage";
import BackendPage from "@/pages/BackendPage";
import FullStackPage from "@/pages/FullStackPage";

const router = createBrowserRouter([
  { path: "/", element: <AiPage /> },
  { path: "/backend", element: <BackendPage /> },
  { path: "/full-stack", element: <FullStackPage /> },
  { path: "*", element: <AiPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

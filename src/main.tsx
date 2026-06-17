import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MotionPage from "@/pages/MotionPage";
import Chooser from "@/pages/Chooser";
import VariantPage from "@/pages/VariantPage";
import Placeholder from "@/pages/Placeholder";

const router = createBrowserRouter([
  { path: "/", element: <MotionPage /> },
  { path: "/all", element: <Chooser /> },
  { path: "/v/:variant", element: <VariantPage /> },
  { path: "/backend", element: <Placeholder title="Backend — Production" /> },
  { path: "/full-stack", element: <Placeholder title="Full-Stack — The Studio" /> },
  { path: "*", element: <MotionPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";
import MotionPage from "@/pages/MotionPage";

// non-default routes are code-split so the main site bundle stays lean
const Chooser = lazy(() => import("@/pages/Chooser"));
const VariantPage = lazy(() => import("@/pages/VariantPage"));
const BackendPage = lazy(() => import("@/pages/BackendPage"));
const FullStackPage = lazy(() => import("@/pages/FullStackPage"));

function Fallback() {
  return (
    <div className="grid min-h-screen place-items-center" style={{ background: "var(--bg)" }}>
      <span className="font-mono text-[12px]" style={{ color: "var(--accent)" }}>loading<span className="caret" /></span>
    </div>
  );
}
const lazyEl = (node: React.ReactNode) => <Suspense fallback={<Fallback />}>{node}</Suspense>;

const router = createBrowserRouter([
  { path: "/", element: <MotionPage /> },
  { path: "/all", element: lazyEl(<Chooser />) },
  { path: "/v/:variant", element: lazyEl(<VariantPage />) },
  { path: "/backend", element: lazyEl(<BackendPage />) },
  { path: "/full-stack", element: lazyEl(<FullStackPage />) },
  { path: "*", element: <MotionPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>,
);

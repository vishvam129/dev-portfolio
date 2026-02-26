import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Glitch-style 404 */}
      <h1 className="text-[8rem] font-black leading-none tracking-tight sm:text-[12rem]">
        <span className="gradient-text">404</span>
      </h1>

      <h2 className="mt-4 text-h3 text-foreground">Page not found</h2>

      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-8">
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}

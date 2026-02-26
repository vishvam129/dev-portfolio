"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-h2 text-foreground">Something went wrong</h1>

      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again or contact me if the
        problem persists.
      </p>

      <div className="mt-8">
        <Button variant="primary" size="lg" onClick={reset}>
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </section>
  );
}

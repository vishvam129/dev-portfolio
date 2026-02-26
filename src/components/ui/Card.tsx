import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "default" | "glass";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border p-6",
          "transition-colors duration-200",
          variant === "default" && "bg-card text-card-foreground",
          variant === "glass" && "glass-card text-card-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-h3 text-foreground", className)} {...props} />
));

CardTitle.displayName = "CardTitle";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-muted-foreground", className)} {...props} />
));

CardContent.displayName = "CardContent";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "primary" | "secondary" | "outline" | "success";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  outline: "border border-border bg-transparent text-foreground",
  success: "bg-success/10 text-success",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5",
        "text-xs font-medium",
        "transition-colors duration-200",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

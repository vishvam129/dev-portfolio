"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-md hover:shadow-glow",
  secondary:
    "bg-secondary text-secondary-foreground hover:opacity-90",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost:
    "bg-transparent text-foreground hover:bg-muted",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-md gap-1.5",
  md: "h-10 px-5 text-sm rounded-lg gap-2",
  lg: "h-12 px-7 text-base rounded-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

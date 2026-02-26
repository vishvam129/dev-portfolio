import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: string[];
  separator?: string;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  separator = " — ",
  reverse = false,
  className,
}: MarqueeProps) {
  const content = children.join(separator) + separator;

  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap py-6",
        "border-y border-border bg-muted/30",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "inline-flex",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "hover:[animation-play-state:paused]",
        )}
      >
        <span className="text-h3 font-bold uppercase tracking-widest text-muted-foreground/50">
          {content}
        </span>
        <span className="text-h3 font-bold uppercase tracking-widest text-muted-foreground/50">
          {content}
        </span>
      </div>
    </div>
  );
}

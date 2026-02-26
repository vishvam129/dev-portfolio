"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-heading text-sm font-medium uppercase tracking-widest text-primary">
                Testimonials
              </p>
              <h2 className="text-h2 mt-2 text-foreground">
                What people say
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "border border-border text-muted-foreground",
                  "transition-colors hover:border-primary hover:text-primary",
                )}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "border border-border text-muted-foreground",
                  "transition-colors hover:border-primary hover:text-primary",
                )}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Carousel */}
        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-0 shrink-0 basis-full pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

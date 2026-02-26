"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send, Mail, MapPin } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { sendContactEmail } from "@/lib/email";
import { siteConfig } from "@/data/siteConfig";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const inputStyles = cn(
  "w-full rounded-lg border border-border bg-muted/30 px-4 py-3",
  "text-sm text-foreground placeholder:text-muted-foreground",
  "transition-colors duration-200",
  "focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring",
);

export function Contact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    // Honeypot check
    if (data.website) return;

    setLoading(true);
    const { success, message } = await sendContactEmail(data);
    setLoading(false);

    if (success) {
      toast.success(message);
      reset();
    } else {
      toast.error(message);
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="font-heading text-sm font-medium uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="text-h2 mt-2 text-foreground">
            Get in touch
          </h2>
        </AnimateOnScroll>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <AnimateOnScroll>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision. Feel free to reach
                out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-medium text-foreground hover:text-primary"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {siteConfig.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Form */}
          <AnimateOnScroll delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Honeypot — hidden from users */}
              <input
                type="text"
                {...register("website")}
                className="absolute -left-[9999px] opacity-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className={inputStyles}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={inputStyles}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject (optional) */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Subject{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  className={inputStyles}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message..."
                  className={cn(inputStyles, "resize-none")}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" loading={loading}>
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

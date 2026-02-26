import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/data/siteConfig";

const socialLinks = [
  { icon: Github, href: siteConfig.socials.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

const quickLinks = siteConfig.navLinks.filter(
  (link) => link.href !== "/blog" && link.href !== "#home",
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Branding */}
          <div>
            <p className="font-heading text-lg font-bold text-foreground">
              {siteConfig.name.split(" ")[0]}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    "border border-border text-muted-foreground",
                    "transition-colors hover:border-primary hover:text-primary",
                  )}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {siteConfig.location}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1 inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-hover"
            >
              {siteConfig.email}
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Download Resume
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

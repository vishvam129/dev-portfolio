import { ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/cn";

export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Certifications
          </p>
          <h2 className="text-h2 mt-2 text-foreground">
            Credentials & awards
          </h2>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={cn(
                "group rounded-xl border border-border bg-card p-6",
                "transition-all duration-300",
                "hover:border-primary/50 hover:shadow-glow",
              )}
            >
              <h3 className="font-semibold text-foreground">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {cert.issuer}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Issued {formatDate(cert.date)}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-hover"
                >
                  View credential
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

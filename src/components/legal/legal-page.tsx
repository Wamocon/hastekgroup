import { AlertTriangle } from "lucide-react";
import type { LegalDocument } from "@/lib/legal-content";

export function LegalPageView({
  document,
  draftBanner,
}: {
  document: LegalDocument;
  draftBanner: string;
}) {
  return (
    <section className="container-hastek py-16 md:py-20">
      <div className="mb-8 flex gap-3 rounded-2xl border border-accent/40 bg-surface-muted p-4 text-sm text-muted-foreground">
        <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
        <p>{draftBanner}</p>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{document.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{document.updated}</p>

      <div className="mt-10 max-w-3xl space-y-8">
        {document.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            <div className="mt-2 space-y-2">
              {section.body.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

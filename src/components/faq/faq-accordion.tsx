"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen ? (
              <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

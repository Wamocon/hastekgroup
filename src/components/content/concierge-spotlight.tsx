"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { MessageSquareText, ArrowRight } from "lucide-react";
import type { AidasLoveContent } from "@/lib/aidaslove-content";
import { OPEN_CHAT_EVENT } from "@/components/chat/chat-widget";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { MockupConciergePhone } from "@/components/illustrations/mockup-concierge-phone";
import { Guilloche } from "@/components/ornament/guilloche";
import { Reveal } from "@/components/ui/reveal";

type ConciergeSpotlightProps = {
  content: AidasLoveContent;
};

export function ConciergeSpotlight({ content }: ConciergeSpotlightProps) {
  const tc = useTranslations("concierge");
  const [draft, setDraft] = useState("");
  const trustNote = content.sections.find((section) => section.stage === "Like/Dislike");
  const loyaltyNote = content.sections.find((section) => section.stage === "Love/Hate");

  function handleAskConcierge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { prefill: draft } }));
  }

  return (
    <section className="relative overflow-hidden bg-[color:var(--obsidian)] py-20 text-white">
      {/* Guilloche watermark spanning the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 hidden h-[46rem] w-[46rem] -translate-y-1/2 text-accent opacity-[0.06] [mask-image:radial-gradient(closest-side,black,transparent)] md:block"
      >
        <Guilloche />
      </div>
      <div className="container-hastek relative">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {content.heroEyebrow}
          </span>
          <h2 className="text-gold-metallic font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            {content.heroTitle}
          </h2>
          <p className="mt-3 max-w-xl text-white/70">{content.heroSubtitle}</p>
        </Reveal>

        <Reveal className="panel-obsidian border-gold-metallic--obsidian mt-10 overflow-hidden rounded-2xl">
          <div className="grid md:grid-cols-[1fr_1fr_auto] md:divide-x md:divide-[color:var(--obsidian-line)]">
            <form onSubmit={handleAskConcierge} className="flex flex-col gap-4 p-7 md:p-9">
              <div className="flex items-center gap-2 text-accent">
                <MessageSquareText className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">{tc("advisorLabel")}</span>
              </div>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={tc("placeholder")}
                className="font-display h-11 rounded-full border border-white/15 bg-white/5 px-4 text-sm italic text-white outline-none placeholder:text-white/40 focus:border-accent"
              />
              <button type="submit" className="btn-primary w-fit">
                {content.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-col gap-4 p-7 md:p-9">
              <div className="flex items-center gap-2 text-accent">
                <ArrowRight className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">{tc("whatsappLabel")}</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                {tc("whatsappBody")}
              </p>
              <WhatsAppButton className="btn-secondary w-fit !border-[color:var(--border-gold)] !text-accent" label={content.ctaSecondary} />
            </div>

            <div className="hidden flex-col items-center justify-end gap-2 px-8 pt-6 lg:flex">
              <MockupConciergePhone className="h-56 w-auto text-white/50" />
              <span className="pb-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/40">
                {tc("sampleView")}
              </span>
            </div>
          </div>
        </Reveal>

        {trustNote || loyaltyNote ? (
          <Reveal className="mt-6 grid gap-4 text-sm text-white/60 md:grid-cols-2">
            {trustNote ? <p>{trustNote.body}</p> : null}
            {loyaltyNote ? <p>{loyaltyNote.body}</p> : null}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

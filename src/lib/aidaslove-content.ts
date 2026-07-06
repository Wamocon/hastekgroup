import { aidasloveContentDe } from "./aidaslove-content.de";
import { aidasloveContentEn } from "./aidaslove-content.en";
import { aidasloveContentRu } from "./aidaslove-content.ru";
import { aidasloveContentTr } from "./aidaslove-content.tr";

export type AidasLoveSection = {
  stage: "Attention" | "Interest" | "Search" | "Desire" | "Action" | "Like/Dislike" | "Share" | "Love/Hate";
  heading: string;
  body: string;
};

export type AidasLoveContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: AidasLoveSection[];
  ctaPrimary: string;
  ctaSecondary: string;
};

export const AIDASLOVE_PAGE_KEYS = [
  "home",
  "private-homes",
  "new-build-developers",
  "hospitality",
  "retail-markets",
  "gastronomy",
  "commercial-parking",
  "ai-whatsapp-spotlight",
] as const;

export type AidasLovePageKey = (typeof AIDASLOVE_PAGE_KEYS)[number];

export type AidasLoveRegistry = Record<AidasLovePageKey, AidasLoveContent>;

const REGISTRY: Record<string, AidasLoveRegistry> = {
  de: aidasloveContentDe,
  en: aidasloveContentEn,
  ru: aidasloveContentRu,
  tr: aidasloveContentTr,
};

export function getAidasLoveContent(locale: string, page: string): AidasLoveContent {
  const registry = REGISTRY[locale] ?? aidasloveContentDe;
  return registry[page as AidasLovePageKey];
}

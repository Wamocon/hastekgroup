import { legalContentDe } from "./legal-content.de";
import { legalContentEn } from "./legal-content.en";
import { legalContentTr } from "./legal-content.tr";
import { legalContentRu } from "./legal-content.ru";

export type LegalSection = { heading: string; body: string[] };
export type LegalDocument = { title: string; updated: string; sections: LegalSection[] };
export type LegalContent = {
  draftBanner: string;
  impressum: LegalDocument;
  agb: LegalDocument;
  datenschutz: LegalDocument;
};

const LEGAL_CONTENT: Record<string, LegalContent> = {
  de: legalContentDe,
  en: legalContentEn,
  tr: legalContentTr,
  ru: legalContentRu,
};

export function getLegalContent(locale: string): LegalContent {
  return LEGAL_CONTENT[locale] ?? legalContentEn;
}

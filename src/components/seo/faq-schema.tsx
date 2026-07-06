import { getTranslations } from "next-intl/server";

type FaqSchemaProps = {
  locale: string;
};

export async function FaqSchema({ locale }: FaqSchemaProps) {
  const t = await getTranslations({ locale, namespace: "faq" });
  const items = t.raw("items") as { q: string; a: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

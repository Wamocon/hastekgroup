import { routing } from "@/i18n/routing";

type WebsiteSchemaProps = {
  locale: string;
};

export function WebsiteSchema({ locale }: WebsiteSchemaProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "HAS Teknoloji (Hastek Group)",
        url: `${appUrl}/${locale}`,
        inLanguage: [...routing.locales],
      },
      {
        "@type": "Organization",
        name: "HAS Teknoloji (Hastek Group)",
        url: appUrl,
        foundingDate: "2017",
        founder: [
          { "@type": "Person", name: "Emre Altuntaş" },
          { "@type": "Person", name: "Harun Çoban" },
        ],
        // Left intentionally empty until social profiles are confirmed.
        sameAs: [],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import { SERVICE_KEYS } from "@/lib/segments";

type LocalBusinessSchemaProps = {
  locale: string;
  name: string;
  description: string;
};

export function LocalBusinessSchema({ locale, name, description }: LocalBusinessSchemaProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url: `${appUrl}/${locale}`,
    foundingDate: "2017",
    founder: [{ "@type": "Person", name: "Emre Altuntaş" }, { "@type": "Person", name: "Harun Çoban" }],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alanya",
      addressRegion: "Antalya",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Alanya ve Antalya ili / Alanya and Antalya Province",
    },
    makesOffer: SERVICE_KEYS.map((key) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: key },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

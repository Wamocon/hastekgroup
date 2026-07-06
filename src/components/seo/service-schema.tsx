import { getTranslations } from "next-intl/server";
import { SEGMENT_SLUGS, type SegmentKey } from "@/lib/segments";

type ServiceSchemaProps = {
  locale: string;
  segmentKey: SegmentKey;
};

export async function ServiceSchema({ locale, segmentKey }: ServiceSchemaProps) {
  const t = await getTranslations({ locale, namespace: "segments" });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const slug = SEGMENT_SLUGS[segmentKey];
  const serviceName = t(`${segmentKey}.label`);
  const homeUrl = `${appUrl}/${locale}`;
  const segmentUrl = `${homeUrl}/segments/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: serviceName,
        serviceType: t(`${segmentKey}.shortLabel`),
        provider: {
          "@type": "LocalBusiness",
          name: "HAS Teknoloji (Hastek Group)",
          url: homeUrl,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Alanya ve Antalya ili / Alanya and Antalya Province",
        },
        url: segmentUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "HAS Teknoloji",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: serviceName,
            item: segmentUrl,
          },
        ],
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

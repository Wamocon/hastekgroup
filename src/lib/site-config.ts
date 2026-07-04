/**
 * Central place for facts that are still pending client confirmation
 * (see IDEA.md "Zusaetzliche Hinweise"). Kept null/undefined rather than
 * invented so CTAs can degrade to a clearly-labelled demo state instead
 * of linking to a fabricated number or address.
 */
export const siteConfig = {
  legalName: "Hastek Group Yazilim Ve Otomasyon Sistemleri Ith.Ihr.Tur.Tic.Ltd.Sti.",
  brandName: "HAS Teknoloji",
  groupName: "Hastek Group",
  foundedYear: 2017,
  founders: ["Emre Altuntas", "Harun Coban"],
  city: "Alanya",
  region: "Antalya, Türkiye",
  whatsappNumber: null as string | null,
  phoneNumber: null as string | null,
  contactEmail: null as string | null,
  addressConfirmed: false,
};

export function whatsappHref(prefilledMessage?: string) {
  if (!siteConfig.whatsappNumber) return null;
  const text = prefilledMessage ? `?text=${encodeURIComponent(prefilledMessage)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}

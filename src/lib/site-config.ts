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
  // Confirmed WhatsApp number of contact person Emre Altuntaş (+90 506 600 92 29).
  // Stored in wa.me format: digits only, country code, no "+" or spaces.
  whatsappNumber: "905066009229" as string | null,
  phoneNumber: null as string | null,
  contactEmail: null as string | null,
  addressConfirmed: false,
  /**
   * Instagram handle is pending client confirmation of account ownership
   * (@hasteknoloji found in research but not confirmed - see IDEA.md).
   * Kept null so the Instagram section degrades to a clearly-labelled
   * "activates after confirmation" state instead of linking to an
   * unverified account or fabricating posts.
   */
  instagramHandle: null as string | null,
};

export function whatsappHref(prefilledMessage?: string) {
  if (!siteConfig.whatsappNumber) return null;
  const text = prefilledMessage ? `?text=${encodeURIComponent(prefilledMessage)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}

export function instagramHref() {
  if (!siteConfig.instagramHandle) return null;
  return `https://instagram.com/${siteConfig.instagramHandle.replace(/^@/, "")}`;
}

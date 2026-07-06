/**
 * Rule-based, backend-free multilingual assistant.
 *
 * Matches a free-text visitor question to an intent by scanning for keywords
 * across all four site languages (TR/EN/RU/DE), then the caller returns the
 * localized prepared answer (messages: chat.answers.<id>). No API key, no
 * account, works everywhere — including the shared deployment link.
 */

export type Intent = { id: string; keywords: string[] };

/** Cyrillic → Latin so Russian-script input matches the Latin keyword stems. */
const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
  й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
  э: "e", ю: "yu", я: "ya",
};

/** Strip case + diacritics + transliterate so TR/RU/DE variants all normalise. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => CYRILLIC[c] ?? c)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u");
}

/**
 * Intents in priority order (earlier wins ties). Keywords are already
 * normalised. Multi-word keywords match as a phrase; single tokens match a
 * word by prefix (handles Turkish/Russian suffixes) — except very short ones
 * (<= 3 chars) which must match a whole word to avoid false positives.
 */
export const INTENTS: Intent[] = [
  {
    id: "pricing",
    keywords: [
      "preis", "price", "kost", "cost", "fiyat", "ucret", "cena", "stoimost", "stoit",
      "wie viel", "how much", "kac para", "ne kadar", "skolko", "quote", "angebot",
      "kostenvoranschlag", "budget", "teuer",
    ],
  },
  {
    id: "booking",
    keywords: [
      "termin", "appointment", "buchen", "book", "randevu", "besichtigung", "visit",
      "vstrec", "zapis", "vor ort", "site visit", "beratung", "consult", "besuch",
    ],
  },
  {
    id: "whatsapp",
    keywords: [
      "whatsapp", "kontakt", "contact", "iletisim", "svyaz", "telefon", "phone",
      "anruf", "call", "nummer", "number", "erreich", "reach",
    ],
  },
  {
    id: "about",
    keywords: [
      "wer seid", "who are you", "who is", "kim", "kto", "uber euch", "about you",
      "firma", "company", "sirket", "kompan", "gegrundet", "founded", "kuruldu",
      "osnovan", "2017", "erfahrung", "experience", "referenz", "vertrauen", "trust",
    ],
  },
  {
    id: "coverage",
    keywords: [
      "wo seid", "where are you", "area", "gebiet", "region", "bolge", "rayon",
      "sprache", "sprach", "sprech", "speak", "language", "dil", "yazyk", "yazik",
      "russi", "russk", "german", "englis", "anglii", "deuts", "turk", "turec",
      "almanca", "ingiliz", "rusca", "nemec", "govor", "alanya", "antalya",
    ],
  },
  {
    id: "maintenance",
    keywords: [
      "wartung", "maintenance", "servis", "obsluz", "reparatur", "repair", "tamir",
      "remont", "garantie", "warranty", "garanti", "garant", "storung", "defekt",
      "ariza", "polomka",
    ],
  },
  {
    id: "smartHome",
    keywords: [
      "smart home", "smart-home", "akilli ev", "umnyi dom", "umnyj dom", "automat",
      "automation", "otomasyon", "avtomat", "szene", "scene", "senaryo", "licht",
      "beleuchtung", "isik", "svet", "klima", "heizung",
    ],
  },
  {
    id: "business",
    keywords: [
      "hotel", "otel", "restaurant", "restoran", "cafe", "kafe",
      "laden", "shop", "geschaft", "markt", "market", "magaza", "magazin", "retail",
      "gastro", "kasse", "pos", "adisyon", "kassa", "buro", "office", "ofis",
      "gewerbe", "park", "schranke", "bariyer", "shlagbaum", "feuer", "brand",
      "yangin", "pozar", "fire", "beschallung", "sound",
    ],
  },
  {
    id: "homeSecurity",
    keywords: [
      "kamera", "camera", "cctv", "uberwach", "surveillance", "gozetim", "videonabl",
      "alarm", "einbruch", "hirsiz", "sicherheit", "guvenlik", "bezopas", "signaliz",
      "kilit", "schloss", "lock", "zamok", "keyless", "intercom", "gegensprech",
      "diafon", "domofon", "sensor", "melder", "villa", "wohnung", "haus", "ev",
      "dom", "home", "zuhause", "daire",
    ],
  },
  {
    id: "services",
    keywords: [
      "service", "leistung", "angebot", "hizmet", "uslug", "sluzb", "what do you",
      "was bietet", "was macht", "ne yap", "chto vy", "produkt", "system",
      "uberblick", "overview", "hilfe", "help", "yardim", "pomoc",
    ],
  },
  {
    id: "greeting",
    keywords: [
      "hi", "hello", "hallo", "merhaba", "privet", "zdravstvu", "selam", "guten tag",
      "hey", "hola", "iyi gunler", "dobryi",
    ],
  },
];

/**
 * Action/goal intents outweigh topic intents: "what does a camera cost?" is a
 * pricing question first and a camera question second, so a pricing hit counts
 * double. Ties still break by INTENTS order (these come first).
 */
const STRONG_INTENTS = new Set(["pricing", "booking", "whatsapp", "about", "coverage", "maintenance"]);

function wordMatches(tokens: string[], phrase: string, keyword: string): boolean {
  if (keyword.includes(" ")) return phrase.includes(keyword);
  if (keyword.length <= 3) return tokens.includes(keyword);
  return tokens.some((token) => token.startsWith(keyword));
}

/** Returns the best-matching intent id, or "fallback" when nothing matches. */
export function matchIntent(text: string): string {
  const phrase = normalize(text);
  const tokens = phrase.split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.length === 0) return "fallback";

  let bestId = "fallback";
  let bestScore = 0;
  for (const intent of INTENTS) {
    const weight = STRONG_INTENTS.has(intent.id) ? 2 : 1;
    let score = 0;
    for (const keyword of intent.keywords) {
      if (wordMatches(tokens, phrase, keyword)) score += weight;
    }
    if (score > bestScore) {
      bestScore = score;
      bestId = intent.id;
    }
  }
  return bestScore > 0 ? bestId : "fallback";
}

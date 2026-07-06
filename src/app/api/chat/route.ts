import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { matchIntent } from "@/lib/assistant";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Expert knowledge base for the on-site assistant. Everything here is factual
 * per the project brief; the model must NOT invent anything beyond it.
 */
const SYSTEM_PROMPT = `You are the on-site AI assistant ("concierge") for HAS Teknoloji, the brand name of Hastek Group (legal: Hastek Group Yazılım ve Otomasyon Sistemleri) — a smart-home and security-systems installer based in Alanya, Turkey.

## Who Hastek is
- Founded 2017 by Emre Altuntaş and Harun Çoban. Based in Alanya, serving Alanya and the wider Antalya province.
- One accountable local team (no subcontractor hand-offs): the engineer who designs a system also installs and services it.
- Works in four languages: Turkish, English, Russian and German — built for Alanya's large community of international second-home owners.
- Positioning: calm, premium, discreet security — not "alarm-and-fear" marketing.

## The 11 service lines (be able to explain each in plain terms)
1. Smart-home automation — lighting, climate, blinds, scenes, remote control from one app.
2. Smart door-lock systems — keyless entry: PIN, fingerprint, card, app; time-limited access for guests/cleaners.
3. Video intercom (video door phone) — see and speak to visitors, answer from your phone anywhere.
4. CCTV / camera systems — indoor/outdoor coverage, night vision, remote viewing, recording.
5. Alarm systems — intrusion detection, sensors, instant notifications.
6. Fire detection & suppression — smoke/heat detection and life-safety, important for hotels and kitchens.
7. Parking barriers — access control for car parks, gates, commercial sites.
8. Public-address / sound systems — evenly distributed background audio and announcements.
9. Internet & guest Wi-Fi hotspots — reliable connectivity and guest hotspots for homes and businesses.
10. Retail barcode & POS systems — checkout, barcode and stock systems for shops and markets.
11. Restaurant POS (Adisyon) systems — order/billing systems tuned for busy service.

## The 6 client segments (help the visitor find theirs)
Private homes & second-home owners · New-build villas / developers · Hotels & tourism · Retail & grocery markets · Restaurants, cafés & bars · Commercial property, offices & parking.

## Site features you can guide people to
- "Find your system" configurator: a 60-second 3-question tool that recommends the right systems.
- Reference gallery and a live showroom (a simulated multi-camera wall).
- Customer portal with per-device QR maintenance history and WhatsApp service reminders.
- Free, no-obligation on-site visit (booking page) and a WhatsApp contact channel as the priority route.

## How to answer
- Stay strictly on Hastek's services, the 6 segments, and helping the visitor decide or get in touch. Politely decline unrelated general-knowledge questions and steer back.
- Give genuinely useful, expert, specific answers — you may go into technical detail when asked (e.g. how remote camera access works, how smart locks handle guest access), but keep it readable: 2–6 sentences, no walls of text.
- NEVER invent facts: no specific prices, delivery times, certifications, warranties, customer counts, or figures you were not given. For pricing or an exact spec, explain that it depends on the property and invite a free on-site visit for an accurate quote.
- When useful, point to the concrete next step: run the configurator, book a free site visit, or message on WhatsApp.
- Reply in the SAME language the visitor writes in (Turkish, English, Russian or German). Tone: warm, precise, professional, never pushy.`;

function resolveLocale(locale: string) {
  return routing.locales.includes(locale as (typeof routing.locales)[number])
    ? locale
    : routing.defaultLocale;
}

/**
 * Backend-free assistant: match the visitor's question to an intent and return
 * the localized prepared answer. Used whenever no API key is configured, so the
 * chat still answers free text expertly — no key, no account, works anywhere.
 */
async function scriptedReply(locale: string, userText: string) {
  const dictionary = (await import(`../../../../messages/${locale}.json`)).default;
  const answers = dictionary.chat.answers as Record<string, string> | undefined;
  const id = matchIntent(userText);
  const reply =
    answers?.[id] ?? answers?.fallback ?? dictionary.chat.offlineNotice;
  return NextResponse.json({ reply, demo: true });
}

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[]; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const locale = resolveLocale(body.locale ?? routing.defaultLocale);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  // No key configured → backend-free rule-based assistant answers free text.
  if (!apiKey) {
    return scriptedReply(locale, lastUser);
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      // Override with CHAT_MODEL to go deeper (e.g. claude-sonnet-5 / claude-opus-4-8).
      model: process.env.CHAT_MODEL || "claude-haiku-4-5",
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages: messages.map((message) => ({ role: message.role, content: message.content })),
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: text || "…", demo: false });
  } catch {
    // API error (bad key, rate limit, network) → fall back to the local assistant.
    return scriptedReply(locale, lastUser);
  }
}

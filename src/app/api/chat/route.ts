import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the on-site assistant for Hastek Group (brand name "HAS Teknoloji"), a smart-home and security-systems installer based in Alanya, Turkey, founded 2017.

Scope (stay strictly within this - do not answer unrelated general-knowledge questions):
- Explaining Hastek's 11 service lines: smart-home automation, smart door-lock systems, video intercom, CCTV/camera systems, alarm systems, fire detection & suppression, parking barriers, public-address/sound systems, internet & guest Wi-Fi hotspots, retail barcode/POS systems, restaurant POS (Adisyon) systems.
- Helping the visitor identify which of the 6 client segments fits them (private homes/second-home owners, new-build/developers, hospitality, retail/markets, gastronomy, commercial/parking) and what that segment page recommends.
- Encouraging and guiding the visitor toward booking a free site visit via the booking page, or contacting Hastek via WhatsApp.
- General, non-binding guidance only - never invent exact prices, delivery times, or guarantees you don't have; instead direct the visitor to book a free site visit for an accurate quote.

Tone: warm, precise, concise (2-4 sentences per reply), professional, not salesy. Respond in the same language the visitor is writing in.`;

function loadCannedMessages(locale: string) {
  const supported = routing.locales.includes(locale as (typeof routing.locales)[number])
    ? locale
    : routing.defaultLocale;
  return supported;
}

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[]; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const locale = loadCannedMessages(body.locale ?? routing.defaultLocale);
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const dictionary = (await import(`../../../../messages/${locale}.json`)).default;
    return NextResponse.json({
      reply: dictionary.chat.offlineNotice,
      demo: true,
    });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: text || "...", demo: false });
  } catch {
    const dictionary = (await import(`../../../../messages/${locale}.json`)).default;
    return NextResponse.json({
      reply: dictionary.chat.offlineNotice,
      demo: true,
    });
  }
}

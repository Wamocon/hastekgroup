"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MessageSquareText, Send, X } from "lucide-react";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { subscribeConsent, hasConsent, hasConsentServer } from "@/lib/cookie-consent";

type ChatMessage = { role: "user" | "assistant"; content: string };

export const OPEN_CHAT_EVENT = "hastek-open-chat";

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: t("greeting") },
  ]);
  // Lift the floating cluster above the cookie bar while it is still showing.
  const consented = useSyncExternalStore(subscribeConsent, hasConsent, hasConsentServer);

  useEffect(() => {
    function handleOpenRequest(event: Event) {
      setOpen(true);
      const prefill = (event as CustomEvent<{ prefill?: string }>).detail?.prefill;
      if (prefill) setInput(prefill);
    }
    window.addEventListener(OPEN_CHAT_EVENT, handleOpenRequest);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handleOpenRequest);
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, locale }),
      });
      const data = await response.json();
      setDemoMode(Boolean(data.demo));
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply ?? t("offlineNotice") },
      ]);
    } catch {
      setDemoMode(true);
      setMessages((current) => [...current, { role: "assistant", content: t("offlineNotice") }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className={`fixed right-5 z-50 flex flex-col items-end gap-3 transition-[bottom] duration-300 ${
        consented ? "bottom-5" : "bottom-32 sm:bottom-20"
      }`}
    >
      {open ? (
        <div className="flex h-[28rem] max-h-[70vh] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-[color:var(--obsidian-line)] bg-[color:var(--obsidian)] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{t("windowTitle")}</p>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide">
                {t("demoBadge")}
              </span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-surface-muted text-foreground"
                    : "ml-auto bg-accent text-accent-contrast"
                }`}
              >
                {message.content}
              </div>
            ))}
            {pending ? (
              <div className="max-w-[70%] rounded-2xl bg-surface-muted px-3 py-2 text-sm text-muted-foreground">
                &hellip;
              </div>
            ) : null}
            {demoMode ? (
              <p className="pt-1 text-center text-[0.65rem] text-muted-foreground">
                {t("disclaimer")}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2">
            {t.raw("quickReplies").map((reply: string) => (
              <button
                key={reply}
                type="button"
                onClick={() => sendMessage(reply)}
                className="rounded-full border border-border px-2.5 py-1 text-[0.7rem] text-foreground/75 hover:border-accent hover:text-accent"
              >
                {reply}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t("placeholder")}
              className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              aria-label={t("send")}
              disabled={pending}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      {open ? null : <FloatingWhatsApp />}

      <div className="float-bob--offset relative h-14 w-14">
        <span
          aria-hidden="true"
          className="float-halo absolute inset-0 rounded-full bg-[color:var(--accent)] opacity-40"
        />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={t("launcherLabel")}
          className="relative z-10 flex h-full w-full items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-[color:var(--obsidian)] text-accent shadow-xl transition-transform duration-200 hover:scale-110"
        >
          {open ? <X className="h-5 w-5" /> : <MessageSquareText className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}

# instruction.md — Arbeits- & Kontinuitätsleitfaden (HAS Teknoloji / Hastek Group)

> Für Claude (und Mitwirkende): Dieses Dokument bündelt alles, was man braucht, um an den
> nächsten Phasen weiterzuarbeiten, ohne Kontext zu verlieren. Bei jeder Phase zuerst hier lesen,
> danach aktuell halten (Abschnitt „Phasen-Log" + „Offene Punkte" fortschreiben).

**Stand:** 2026-07-06 · Git-HEAD `001b2f5` (nur der initiale Demo-Build ist committet) · das gesamte
Redesign + alle Features liegen **uncommitted** im Arbeitsbaum (~65 geänderte Dateien) · Message-Keys: **358 × 4 Sprachen**.

## 1. Projekt in einem Absatz
Backend-freie **Demo-Website** für **HAS Teknoloji** (Markenname der **Hastek Group**), einem Smart-Home-
und Sicherheitssystem-Installateur in **Alanya / Provinz Antalya, Türkei** (gegründet **2017** von
**Emre Altuntaş** und **Harun Çoban**). Ziel: ein per Link (GitHub/Vercel) teilbarer, edler Auftritt
zur **Kundenpräsentation und Freigabe**. Mehrsprachig **TR · EN · RU · DE** (Default TR). Kein echtes
Backend — Buchung/Portal nutzen localStorage/sessionStorage; KI-Chat nutzt optional die Anthropic-API
mit regelbasiertem Fallback.

## 2. Tech-Stack
- **Next.js 16.2** App Router, **React 19.2**, **TypeScript (strict)**, **Tailwind CSS v4**.
- i18n: **next-intl** (`src/i18n/routing.ts`, Navigation via `@/i18n/navigation`, **`src/proxy.ts`** statt middleware.ts).
- Icons: `lucide-react` (KEINE Marken-Icons — Instagram/WhatsApp sind eigene Inline-SVGs unter `src/components/brand/`).
- Anthropic SDK `@anthropic-ai/sdk` (nur im Chat-Route, optional).

## 3. Betrieb, Build & Verifikation (WICHTIG)
- **Dev-Server (dediziert Port 3200):** `npx next dev --turbopack -p 3200`
- **Typecheck:** `npm run typecheck`  · **Lint:** `npm run lint`  · **Build:** `npm run build`
- ⚠️ **REGEL: Vor jedem `npm run build` den Dev-Server stoppen und `.next` löschen.** Build und Dev teilen
  sich `.next` → gleichzeitig = korrupter Dev-Server (HTTP 500). Ablauf:
  1. Prozess auf Port 3200 killen, 2. `.next` entfernen, 3. `npm run build`, 4. Dev neu starten.
- **Message-Parität prüfen** (nach jeder Textänderung Pflicht — alle Keys müssen in allen 4 Sprachen existieren):
  ```js
  // node -e … : leaves(en) vs tr/ru/de → miss/extra müssen 0 sein. Aktuell: 358 Keys × 4.
  ```
- **PowerShell-Falle beim Testen:** `$home`/`$HOME` ist reserviert (nicht als Variablenname nutzen).
  Kyrillische API-Antworten in PS 5.1 nur mit `[System.Text.Encoding]::UTF8.GetString($r.RawContentStream.ToArray())`
  korrekt dekodieren, sonst Mojibake → falsche Testergebnisse.

### Sicherer Build + Neustart (PowerShell, Copy-Paste)
```powershell
# Dev auf 3200 stoppen → .next löschen → bauen
Get-NetTCPConnection -LocalPort 3200 -State Listen -EA SilentlyContinue | Select -Expand OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force -EA SilentlyContinue }
Remove-Item -Recurse -Force .next -EA SilentlyContinue
npm run build
# Danach Dev neu starten (Bash-Tool, im Hintergrund): npx next dev --turbopack -p 3200
```

### Abschluss-Checkliste je Phase (alles grün, bevor „fertig")
1. `npm run typecheck` ✓ · 2. `npm run lint` ✓ · 3. sicherer `npm run build` ✓
4. Message-Parität 0 miss/extra über alle 4 Sprachen ✓ · 5. Smoke-Test der geänderten Routen (HTTP 200 + Inhalt) ✓
6. Bei Text: keine türkischen Fremdwörter in DE/EN/RU ✓ · 7. Bei Animation: `prefers-reduced-motion`-Guard ✓

## 4. Eiserne Regeln
- **ZERO-FABRICATION:** Niemals Statistiken, Zertifikate, Kundenzahlen, echte Bewertungen, echte Fotos oder
  Instagram-Posts erfinden. Offene Kundendaten bleiben `null` und degradieren zu klar gekennzeichneten
  Platzhaltern („Örnek Görünüm" / „Beispielansicht" / „Simulation"), niemals Fake-Werte.
- **Sprachreinheit:** Auf **nicht-türkischen** Seiten keine türkischen Fremdwörter (die früheren „size özel",
  „ayrıcalıklı", „İki Kapı, Tek Anahtar" wurden entfernt). TR-Datei behält türkische Wendungen bewusst.
  Ausnahme: der bewusste, selbsterklärende Galerie-Hinweis „Örnek Görünüm (Beispielansicht)".
- **Design-Sprache „Kara Elmas":** Obsidian-Schwarz + metallisches Gold, türkischer Elite-Register. **Rot
  (`--color-brand`) NUR** fürs echte Logo und die Live-Signal-Punkte.
- **Reduced-Motion:** Jede neue Animation muss unter `@media (prefers-reduced-motion: reduce)` in
  `globals.css` abgeschaltet/entschärft werden.

## 5. Architektur-Landkarte (wo liegt was)
- **Design-System / Animationen:** `src/app/globals.css` (Tokens, `.text-gold-metallic`, `.border-gold-metallic`,
  `.panel-obsidian`, `.card-elevated`, `.btn-primary/secondary`, Keyframes: facet-draw/node-pulse, signal-ring,
  rec-blink, glint-line, scene-window, cctv-scan, bubble-in, typing-dot, arc-pulse, soft-breathe, float-bob,
  float-halo, page-enter …). Ornamente: `src/components/ornament/*`, Gold-Gradient via `#goldFoil` (GoldDefs).
- **i18n-Texte:** `messages/{tr,en,ru,de}.json` (Parität!). Lange Marketing-Inhalte (AIDASLove) in
  `src/lib/aidaslove-content.{tr,en,ru,de}.ts`.
- **Synergie-Spine (Kundenreise):** `src/lib/demo-store.ts` — EIN typisiertes localStorage-Modell:
  Account · Device (mit QR-Token) · MaintenanceRecord · ReminderSettings · ConfiguratorResult. `useDemoStore()`
  (useSyncExternalStore, stabiler Snapshot). Fluss: Konfigurator → Buchung (Vorbefüllung) → Portal → Geräte/QR →
  Wartung/WhatsApp-Erinnerung. Segment wird durchgängig als **Slug** geführt.
- **Premium-Features (A–I):** Konfigurator (`/configurator`, `src/lib/configurator-logic.ts` + `components/configurator`),
  Before/After-Slider (`components/proof`), Live-Showroom (`/showroom`, `components/showroom`),
  Kundenportal + QR (`/portal`, `/device/[token]`, `components/portal`), GEO-Schemas (`components/seo/*`),
  Seitenübergänge (`components/layout/page-transition.tsx`, kein React-`ViewTransition` — in 19.2 nicht exportiert).
- **Illustrationen (animierte SVGs):** `src/components/illustrations/*` (Segment-Szenen, Mockup-Dashboard,
  Mockup-Concierge-Phone — beide animiert), Hero-Nachtszene `components/marketing/hero-night-scene.tsx` +
  Scroll-Choreografie `hero-scene-choreo.tsx` (`src/lib/use-scroll-progress.ts`).
- **KI-Chat:** `src/app/api/chat/route.ts` — mit `ANTHROPIC_API_KEY` → echtes Claude (Modell via `CHAT_MODEL`,
  Default `claude-haiku-4-5`); ohne Key → **regelbasierter Assistent** `src/lib/assistant.ts` (Intent-Matching
  über 4 Sprachen inkl. Kyrillisch-Transliteration; Antworten in `messages.*.chat.answers`, 12 Themen).
  Widget: `src/components/chat/chat-widget.tsx`. Schlüssel-Einstieg: **`.env.local`** (git-ignoriert).
- **Schwebende Aktionen:** `components/layout/floating-whatsapp.tsx` (grün) + Chat-Launcher (schwarz) unten rechts,
  animiert, weichen dem Cookie-Banner aus (`src/lib/cookie-consent.ts`).
- **Zentrale Kundendaten:** `src/lib/site-config.ts` (Firmenfakten + offene/bestätigte Kontaktdaten).

## 6. Status der Kundendaten (`site-config.ts`)
- ✅ **WhatsApp bestätigt:** Emre Altuntaş — `whatsappNumber: "905066009229"` (+90 506 600 92 29, wa.me-Format).
- ⏳ **Noch offen (bleiben `null`, nicht erfinden):** `phoneNumber`, `contactEmail`, `addressConfirmed`
  (exakte Hausnummer 8-B vs 8/A), `instagramHandle` (@hasteknoloji unbestätigt), Steuer-/MERSİS-Nummer.

## 7. Deployment-Status
- Git-HEAD: `001b2f5` (nur der initiale Demo-Build ist committet). Das gesamte Redesign + alle Features sind
  **uncommitted** (~65 Dateien) — also weder lokal committet noch gepusht.
- **Push/Commit braucht ausdrückliche Nutzerfreigabe.** Ziel-Deploy: Vercel. Branch: `main`.
- `.env.local` ist git-ignoriert (API-Schlüssel wandern NICHT ins Repo). Die WhatsApp-Nummer steht in
  `site-config.ts` und würde beim Push mit ins Repo — gewollt (geschäftliche Kontaktnummer).
- Commit-Message-Konvention: am Ende `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

## 8. Phasen-Log (was ist erledigt)
1. Initialer Demo-Aufbau (Seiten, Buchung, Admin, Legal, KI-Chat-Grundgerüst, echtes rotes Logo).
2. „Kara Elmas"-Redesign (Gold/Obsidian, Ornamente, AIDASLove-Inhalte, Illustrationen).
3. Elite-Elevation (mehr Visualisierung, saubere 4-Sprachen-Übersetzung).
4. Premium-Paket-Lücken geschlossen: **Fotogalerie** (`/gallery`) + **Instagram-Integration** (graceful pending).
5. Cinematische **Hero-Nachtszene** „Alanya bei Nacht" (animiert, mobil sichtbar).
6. **Features A–I** gegen den `demo-store`-Vertrag (Konfigurator, Before/After, Showroom, Portal+QR+Erinnerungen,
   GEO-Schema, Seitenübergänge) — inkl. adversarialer Review (7 Funde behoben).
7. Bildschirmfoto-Fixes: Bento-Grafik-Beschnitt, sichtbare Ghost-Zahlen, Logo als vergoldete Plakette,
   Concierge in 4 Sprachen lokalisiert, türkische Fremdwörter aus DE/EN/RU entfernt, schwebende WhatsApp/Chat-
   Buttons, Mobile-Optimierung.
8. Mockups **animiert** (Dashboard + Concierge-Phone) + **regelbasierter KI-Assistent** (frei-Text, 4 Sprachen).
9. **WhatsApp-Nummer** von Emre eingetragen und technisch getestet (wa.me-Links auf allen Seiten, 0 fehlerhaft).

## 9. Naheliegende nächste Phasen (Ideen / offen)
- Echte Projektfotos in die Galerie (ersetzen die „Örnek Görünüm"-Illustrationen 1:1, gleiche Slots).
- Instagram-Handle bestätigen → `instagramHandle` setzen (Feed wird automatisch live).
- Optional echten Claude-Chat aktivieren (`ANTHROPIC_API_KEY` in `.env.local`; ggf. `CHAT_MODEL` erhöhen).
- Restliche Kontaktdaten (Telefon, E-Mail, Adresse, Steuer-/MERSİS) nach Kundenbestätigung eintragen.
- Bei Bedarf echtes Backend (Supabase) für Portal/Buchung/Bewertungen statt localStorage.
- Commit & Push + Vercel-Deploy (nach Freigabe) → teilbarer Link.

## 10. Weitere Referenzen
- `IDEA.md` — vollständige Projekt-/Markt-/Wettbewerbsgrundlage (maßgeblich für Scope & Zielgruppen).
- `AGENTS.md`, `HOWTO.md`, `README.md` — Repo-/Prozess-Hinweise.
- Memory: `MEMORY.md` (Index) unter dem Claude-Projektverzeichnis für dauerhafte Fakten/Feedback.

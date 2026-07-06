// Generiert das WAMOCON-Anforderungsdokument fuer Hastek Group / HAS Teknoloji
// gemaess .github/skills/anforderungsdokument/SKILL.md (verbindliche 9-Kapitel-Struktur).
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageOrientation,
} from "docx";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FONT = "Arial Narrow";
const BLUE = "1E3A5F";
const GREY = "808080";
const ROW_ALT = "F5F5F5";
const PAGE_WIDTH_DXA = 9638; // A4 usable width bei 2cm/2cm Raendern

// ---------------------------------------------------------------------------
// Low-level Helfer
// ---------------------------------------------------------------------------
function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: 22, ...opts });
}

function body(text, opts = {}) {
  return new Paragraph({ children: [run(text)], spacing: { after: 160 }, ...opts });
}

function bullet(text) {
  return new Paragraph({
    children: [run(text)],
    bullet: { level: 0 },
    spacing: { after: 100 },
  });
}

function h1(text, first = false) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: 32, bold: true, color: BLUE })],
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: !first,
    spacing: { before: 0, after: 240 },
  });
}

function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: 26, bold: true, color: BLUE })],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 160 },
  });
}

function sourced(finding, sourceTitle, sourceUrl, date) {
  return new Paragraph({
    children: [
      run(finding + " "),
      new TextRun({ text: `[${sourceTitle}, ${date}]`, font: FONT, size: 18, italics: true, color: GREY }),
    ],
    bullet: { level: 0 },
    spacing: { after: 120 },
  });
}

function noBorder() {
  return { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
}
function thinBorder() {
  return { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
}

function dxaWidths(fractions) {
  const total = fractions.reduce((a, b) => a + b, 0);
  return fractions.map((f) => Math.round((f / total) * PAGE_WIDTH_DXA));
}

function headerCell(text, widthDxa) {
  return new TableCell({
    width: { size: widthDxa, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: BLUE, color: "auto" },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({
      children: [new TextRun({ text, font: FONT, size: 20, bold: true, color: "FFFFFF" })],
    })],
  });
}

function bodyCell(text, widthDxa, alt) {
  return new TableCell({
    width: { size: widthDxa, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: alt ? ROW_ALT : "FFFFFF", color: "auto" },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: (Array.isArray(text) ? text : [text]).map((t) =>
      new Paragraph({ children: [new TextRun({ text: t, font: FONT, size: 18 })], spacing: { after: 40 } })
    ),
  });
}

function dataTable(headers, rows, fractions) {
  const widths = dxaWidths(fractions || headers.map(() => 1));
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => headerCell(h, widths[i])),
  });
  const bodyRows = rows.map((r, idx) => new TableRow({
    children: r.map((cellText, i) => bodyCell(cellText, widths[i], idx % 2 === 1)),
  }));
  return new Table({
    width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
    borders: {
      top: thinBorder(), bottom: thinBorder(), left: thinBorder(), right: thinBorder(),
      insideHorizontal: thinBorder(), insideVertical: thinBorder(),
    },
    rows: [headerRow, ...bodyRows],
  });
}

function spacer(h = 160) {
  return new Paragraph({ text: "", spacing: { after: h } });
}

// ---------------------------------------------------------------------------
// Metadaten (aus IDEA.md)
// ---------------------------------------------------------------------------
const meta = {
  welle: "1",
  projektKurz: "Hastek Group Premium-Website & Kundenplattform Alanya",
  projektVoll: "Hastek Group / HAS Teknoloji – Premium-Website & Kundenplattform Alanya",
  unternehmen: "WAMOCON GmbH",
  appVersion: "1",
  erstelltVon: "Waleri Moretz",
  eingereichtAn: "Emre Altuntaş & Harun Çoban, Geschäftsführung Hastek Group (HAS Teknoloji)",
  datum: "06.07.2026",
  vertraulichkeit: "Intern vertraulich",
  status: "Status-Update nach Umsetzung – Demo zur Kundenpräsentation freigegeben",
};

// ---------------------------------------------------------------------------
// Deckblatt
// ---------------------------------------------------------------------------
const coverRule = (dashed) => new Paragraph({
  text: "",
  border: {
    bottom: {
      style: dashed ? BorderStyle.DASHED : BorderStyle.SINGLE,
      size: dashed ? 6 : 36,
      color: BLUE,
      space: 8,
    },
  },
  spacing: { after: 400 },
});

const metaRows = [
  ["Welle", meta.welle],
  ["Projekt", meta.projektKurz],
  ["Unternehmen", meta.unternehmen],
  ["App Version", meta.appVersion],
  ["Erstellt von", meta.erstelltVon],
  ["Eingereicht an", meta.eingereichtAn],
  ["Datum", meta.datum],
  ["Vertraulichkeit", meta.vertraulichkeit],
  ["Status", meta.status],
];

function metaTable() {
  const widths = dxaWidths([1, 2.2]);
  const rows = metaRows.map(([k, v]) => new TableRow({
    children: [
      new TableCell({
        width: { size: widths[0], type: WidthType.DXA },
        borders: { top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder() },
        margins: { top: 60, bottom: 60, left: 0, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: k, font: FONT, size: 20, bold: true, color: BLUE })] })],
      }),
      new TableCell({
        width: { size: widths[1], type: WidthType.DXA },
        borders: { top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder() },
        margins: { top: 60, bottom: 60, left: 0, right: 0 },
        children: [new Paragraph({ children: [new TextRun({ text: v, font: FONT, size: 20 })] })],
      }),
    ],
  }));
  return new Table({
    width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
    borders: {
      top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder(),
      insideHorizontal: noBorder(), insideVertical: noBorder(),
    },
    rows,
  });
}

const deckblatt = [
  coverRule(false),
  spacer(800),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "WAMOCON GMBH", font: FONT, size: 44, bold: true, color: BLUE })],
    spacing: { after: 200 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Anforderungsdokument", font: FONT, size: 36, bold: true })],
    spacing: { after: 120 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: meta.projektVoll, font: FONT, size: 26, italics: true })],
    spacing: { after: 600 },
  }),
  metaTable(),
  spacer(800),
  coverRule(true),
];

// ---------------------------------------------------------------------------
// KAPITEL 1: Zusammenfassung
// ---------------------------------------------------------------------------
const kapitel1 = [
  h1("Kapitel 1: Zusammenfassung", true),
  h2("1.1 Die Idee"),
  body(
    "HAS Teknoloji (Hastek Group Yazılım Ve Otomasyon Sistemleri İth.İhr.Tur.Tic.Ltd.Şti.) ist ein 2017 von Emre Altuntaş und Harun Çoban gegründeter Smart-Home- und Sicherheitssystem-Installateur in Alanya, Türkei, mit einem elf Leistungen umfassenden Portfolio von Smart-Home-Systemen bis Restaurant-Kassensystemen."
  ),
  body(
    "Das Projekt entwickelt eine mehrsprachige (Türkisch, Englisch, Russisch, Deutsch) Premium-Website mit integrierter Kundenplattform, die dieses Portfolio erstmals nach sechs Zielgruppensegmenten statt als reine Produktliste präsentiert."
  ),
  body(
    "Kern der Plattform sind ein Online-Terminbuchungssystem, ein themengebundener KI-Chat-Assistent, ein Google-Bewertungs-Management-Prozess sowie eine sowohl für klassische Suchmaschinen als auch für KI-Antwortmaschinen optimierte Inhaltsstruktur (SEO + GEO)."
  ),
  body(
    "Ziel ist es, Hastek Group innerhalb weniger Monate zum digital sichtbarsten und vertrauenswürdigsten Anbieter der Branche in Alanya zu machen – in einem Markt, in dem aktuell kein einziger von elf unabhängig recherchierten Wettbewerbern ein bestätigtes Google-Bewertungsprofil, mehrsprachigen Content oder einen edlen Markenauftritt vorweisen kann (Details: Kapitel 3)."
  ),
  h2("1.2 Warum jetzt?"),
  sourced(
    "Alanyas Gesamtbevölkerung stieg 2025 auf 371.547 Einwohner (2024: 361.873, +2,67% p.a.); als einer von drei Haupttreibern wird explizit die wachsende ansässige ausländische Bevölkerung genannt.",
    "mansetalanya.com", "https://www.mansetalanya.com/", "09.02.2026"
  ),
  sourced(
    "Russische Staatsbürger kauften 2022–2025 in Alanya 15.225 Wohnimmobilien – eine zahlungskräftige, sicherheitsbewusste Zielgruppe mit hohem Bedarf an Fernüberwachung während längerer Abwesenheitszeiten.",
    "yenialanya.com", "https://www.yenialanya.com/", "11.06.2026"
  ),
  sourced(
    "97% der Verbraucher lesen laut BrightLocal Local Consumer Review Survey Bewertungen vor einer lokalen Kaufentscheidung, 68% verlangen mindestens vier Sterne – ein in Alanya bislang unbesetztes Differenzierungsfeld (0 von 11 Wettbewerbern mit bestätigtem Google-Profil, eigene Recherche).",
    "BrightLocal", "https://www.brightlocal.com/research/local-consumer-review-survey/", "11.02.2026"
  ),
  sourced(
    "Gartner prognostiziert laut Search Engine Land für 2026 einen Rückgang klassischer Suchanfragen um 25% zugunsten von KI-Antwortmaschinen; wer jetzt GEO-optimiert, sichert sich einen strukturellen Vorteil, bevor Wettbewerber nachziehen.",
    "Search Engine Land", "https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142", "23.02.2026"
  ),
  h2("1.3 Status der Umsetzung (Stand: 06.07.2026)"),
  body(
    "Dieses Kapitel wurde nach Abschluss der Demo-Entwicklung aktualisiert, um den in Kapitel 7 ursprünglich formulierten Anforderungen den tatsächlich umgesetzten Stand gegenüberzustellen. Grundlage ist die live unter https://hastekgroup.vercel.app abrufbare, mehrsprachige Demo-Website – nicht Annahmen oder der urspüngliche Plan."
  ),
  body(
    "Zentrales Ergebnis: Der komplette Muss-Umfang aus Kapitel 7.1/7.2 wurde umgesetzt. Darüber hinaus sind bereits alle sechs ursprünglich für Ausbaustufe 2/3 vorgesehenen Funktionen (Leistungs-Konfigurator, QR-/Geräte-Wartungshistorie, Kunden-Login-Portal, Live-Referenz-Showroom, WhatsApp-Erinnerungen, Instagram-Anbindung) als funktionierende Demo-Prototypen realisiert – deutlich früher als geplant (Details: Kapitel 7.3/7.4)."
  ),
  body(
    "Wichtigste Abweichung: Da noch kein Backend-Freigabe-Beschluss vorlag, laufen Buchungssystem, Kundenportal und Admin-Bereich bewusst backend-frei auf localStorage/sessionStorage statt auf Supabase (Kapitel 6, 9). Das ist eine explizite Projektentscheidung für die Präsentationsphase, kein technisches Defizit – die Migration auf ein echtes Backend ist in Kapitel 9 als nächster Schritt vorgesehen."
  ),
  body(
    "Die WhatsApp-Zielnummer des Ansprechpartners Emre Altuntaş (+90 506 600 92 29) wurde bestätigt und ist im gesamten Auftritt aktiv verlinkt – der in Kapitel 6.3 (Erstfassung) genannte Blocker für automatisierte WhatsApp-Erinnerungen ist damit teilweise aufgelöst (die Vorschau-Funktion ist fertig, die automatisierte Zustellung über die WhatsApp Business API steht noch aus)."
  ),
  body(
    "Weiterhin offen, weil außerhalb der Reichweite einer Demo ohne reale Kundendaten/Konten: echte Google-Business-Profil-Verknüpfung, echter Bewertungs-Sammel-/Management-Prozess, echte Instagram-Live-Anbindung sowie alle Konto-/Registrierungsfunktionen (Kapitel 7.1/7.2 im Detail)."
  ),
];

// ---------------------------------------------------------------------------
// KAPITEL 2: Marktanalyse
// ---------------------------------------------------------------------------
const kapitel2 = [
  h1("Kapitel 2: Marktanalyse"),
  h2("2.1 Zielgruppe in Zahlen"),
  sourced(
    "Alanya: 371.547 Einwohner (2025, +2,67% ggue. 2024); Wachstumstreiber u.a. steigende ausländische Wohnbevölkerung.",
    "mansetalanya.com", "https://www.mansetalanya.com/", "09.02.2026"
  ),
  sourced(
    "Russische Käufer: 15.225 Wohnimmobilien in Alanya 2022–2025 (2022: 6.640; 2023: 4.203; 2024: 2.352; 2025: 1.662; Jan–Apr 2026 weitere 368 Einheiten).",
    "yenialanya.com", "https://www.yenialanya.com/ruslar-alanyadan-vazgecmiyor-4-yilda-15-bin-konut-satin-aldilar", "11.06.2026"
  ),
  sourced(
    "National führende Käufernationen im Mai 2026: Russland (268), Iran (125), Ukraine (88); Deutschland im März 2026 mit 84 Einheiten auf Platz 3.",
    "yenialanya.com (TÜİK-Daten)", "https://www.yenialanya.com/tuik-verilerine-gore-emlak-satislari-yuzde-31-geriledi", "18.06.2026"
  ),
  sourced(
    "Antalya-Provinz: 2024 kauften Ausländer rund 14.000 Wohneinheiten – ca. 35% aller Auslandskäufe der Türkei, 40% davon russische Käufer.",
    "KiTalent", "https://kitalent.com/articles/article-antalya-construction-talent-gap/", "12.04.2026"
  ),
  new Paragraph({
    children: [new TextRun({
      text: "Daten-Lücke (transparent ausgewiesen statt veralteter Zahl): Eine aktuelle (< 1 Jahr), Alanya-spezifische Zahl fest ansässiger Ausländer mit Aufenthaltstitel konnte nicht verifiziert werden – die einzige konkrete Behördenzahl (29.835) stammt von 2019 und wird hier bewusst NICHT verwendet.",
      font: FONT, size: 22, italics: true, color: GREY,
    })],
    spacing: { after: 160 },
  }),
  h2("2.2 Infrastruktur/Marktwachstum"),
  sourced(
    "Türkischer Immobilienmarkt: USD 61,2 Mrd. (2025) → USD 78,8 Mrd. (2030), CAGR 5,2%.",
    "NextMSC", "https://www.nextmsc.com/report/turkey-real-estate-market", "04.06.2026"
  ),
  sourced(
    "Fünf Schlüsselveränderungen für Alanya bis 2030: Flughafen-Kapazitätsverdopplung, neue Business-Parks/Privatkliniken/internationale Schulen, neue Wohnkomplexe MIT Smart-Home-Systemen, Mixed-Use-Anlagen, bessere Immobiliendokumentation.",
    "Yekta Homes", "https://yektahomes.com/news/alanya-real-estate-reaches-new-level-5-key-changes-by-2030/", "18.07.2025"
  ),
  sourced(
    "Flughafen Gazipaşa-Alanya-Ausbau (Terminalfläche 6.419 m² → 9.067 m², Bauzeit Jan.–Okt. 2026); ca. 3 Mio. erwartete Kreuzfahrtpassagiere 2026.",
    "gazetealanya.com", "https://www.gazetealanya.com/alanyanin-dev-yatirimlari-2026ya-damga-vuracak", "23.02.2026"
  ),
  sourced(
    "Antalya: 28.400 Wohnbaugenehmigungen 2024 (+15%); rund 18.000 Altbauten (Baujahr 1990–2000) in Muratşaşa/Kepez müssen im Rahmen der Stadterneuerung verstärkt/neu gebaut werden – prognostiziertes Nachrüstungssegment-Wachstum: 25%.",
    "KiTalent", "https://kitalent.com/articles/article-antalya-construction-talent-gap/", "12.04.2026"
  ),
  sourced(
    "Globaler Smart-Home-Security-Markt: USD 40,38 Mrd. (2025) → USD 163,15 Mrd. (2035), CAGR ca. 15% (kein prüfbarer, unter 1 Jahr alter Türkei-spezifischer CAGR-Wert auffindbar – Statista-Werte sind ein kontinuierlich aktualisiertes Dashboard ohne prüfbares Artikel-Datum und wurden daher NICHT verwendet).",
    "Precedence Research", "https://www.precedenceresearch.com/smart-home-security-market", "25.02.2026"
  ),
  h2("2.3 Das Kernproblem"),
  body(
    "0 von 11 unabhängig recherchierten und gegengeprüften Wettbewerbern in Alanya haben ein bestätigtes Google-Bewertungsprofil (eigene Primärrecherche, Details Kapitel 3). Nur 2 von 11 bieten überhaupt englischsprachigen Content, keiner Russisch oder Deutsch – trotz der oben belegten grossen russischen/internationalen Käufergruppe. Mehrere Wettbewerber-Websites zeigen zudem technische Vertrauensprobleme (SSL-Zertifikatsfehler, mit Spam-Links kompromittierte Seite, veraltete Serverstacks)."
  ),
  sourced(
    "Warum besteht die Lücke noch? Im türkischen KMU-Segment wachsen Cloud-/Abo-Modelle zwar mit 15,6% CAGR schneller als der Gesamtmarkt (12,24%), die Digitalisierungs-Adoption bei kleinen, familiengeführten Sicherheits-Installateuren hinkt aber sichtbar hinterher.",
    "Mordor Intelligence (Turkey Cybersecurity Market)", "https://www.mordorintelligence.com/industry-reports/turkey-cybersecurity-market", "19.01.2026"
  ),
  h2("2.4 Regulatorisches Umfeld"),
  sourced(
    "KVKK-Bussgeldrahmen wurden zum 1.1.2026 um 25,49% erhöht (u.a. Verletzung der Datensicherheitspflicht: 256.357–17.092.242 TL).",
    "Esenyel Partners", "https://www.esenyelpartners.com/2026-kvkk-administrative-fines-current-amounts-and-warnings/", "29.12.2025"
  ),
  sourced(
    "Seit 2026 gilt 'anlamlı insan müdahalesi' (Human-in-the-loop) als Pflicht: rein algorithmische, personenbezogene Entscheidungen (z.B. automatisierte Zugangsverweigerung ohne menschliche Kontrolle) verstossen gegen KVKK – direkt relevant für den geplanten KI-Chat-Assistenten. Meldefrist bei Datenschutzverletzungen: max. 72 Stunden ab Kenntnisnahme.",
    "nesilteknoloji.com", "https://www.nesilteknoloji.com/2026-kvkk-para-cezalari-ve-kararlar/", "11.02.2026"
  ),
  sourced(
    "Grenzüberschreitender Datentransfer (z.B. an eine im Ausland gehostete Supabase-/LLM-API-Instanz) folgt einem dreistufigen Modell: Angemessenheitsbeschluss, Standardvertragsklauseln (SCCs, Meldung binnen 5 Werktagen an das Kurul), enge Ausnahmen.",
    "Istanbul Lawyer Firm", "https://istanbullawyerfirm.com/blog/kvkk-cross-border-data-transfers-standard-contracts-notification-guide-2025", "21.08.2025"
  ),
  sourced(
    "Für Brandmeldeanlagen ist die TS EN 54-Normenreihe verpflichtend; seit 2025 ist ein jährlicher dokumentierter Funktionstest gesetzlich zwingend, sonst droht Entzug der Feuerwehr-Betriebserlaubnis – relevant für die geplante QR-Wartungshistorie (Ausbaustufe 2).",
    "merttelekom.com", "https://www.merttelekom.com/blog/2025te-yangin-algilama-sistemleri-icin-devlet-tesvikleri-ve-yasal-zorunluluklar/", "31.07.2025"
  ),
  sourced(
    "Ab 1.1.2026 müssen in der Türkei alle Rechnungen unabhängig vom Betrag als E-Dokument (e-Arşiv/e-Fatura) ausgestellt werden – relevant für die geplante POS-/ERP-Anbindung (Kapitel 6).",
    "KiviERP", "https://www.kivierp.com/efatura-zorunlulugu-2026-fiziki-pos/", "30.09.2025"
  ),
];

// ---------------------------------------------------------------------------
// KAPITEL 3: Wettbewerb
// ---------------------------------------------------------------------------
const wettbewerber = [
  ["Farma Güvenlik (alanyaalarm.com.tr)", "Breites Technikportfolio, 20 Jahre Erfahrung behauptet, benannte Referenzen", "2 parallele Domains, nur Türkisch, keine Bewertungen, kleiner Instagram trotz Alter", "Nicht veröffentlicht (Angebot auf Anfrage)"],
  ["AL-BİL (alanyabilgisayar.com)", "Breitestes Cross-Sektor-Angebot (Security+IT+POS), aktivster Social-Media-Account", "SSL-Zertifikatsfehler + veralteter PHP-5.2-Server auf Hauptdomain, nur Türkisch", "Nicht veröffentlicht (Angebot auf Anfrage)"],
  ["Ata Güvenlik (ataguvenlik.net)", "Grosse Brandschutz-Produkttiefe", "Sitz Antalya-Zentrum, KEINE Alanya-Erwähnung auf der Website, Seite mit Spam-Links kompromittiert – kein aktiver Alanya-Wettbewerber", "Nicht veröffentlicht"],
  ["Netko Sistem Teknoloji", "Einziger mit echtem TR/EN-Content + Blog/SEO, Doppelstandort Alanya+Antalya", "Kein Zutritt/Parkschranke/Diafon/POS, nur 6 Yandex-Bewertungen (kein Google)", "Nicht veröffentlicht"],
  ["Pragma Teknoloji", "10–14 Jahre am Markt, bündelt Security mit Business-IT", "Kein Brandschutz/Markt-POS, nur 4 Yandex-Bewertungen (kein Google)", "Nicht veröffentlicht"],
  ["ALY Teknoloji", "Breitestes Portfolio der 'neuen' Wettbewerber (8 Segmente), aktiver Instagram", "Keine Google-Bewertung auffindbar, Markenverwechslungsrisiko mit ähnlich benannten Firmen", "Nicht veröffentlicht"],
  ["Keşoğlu Elektronik", "Stärkste Drittanbieter-Bestätigung (20+ Kundenlogos, 15+ Markenpartner), 1 von 2 mit Parkschranken", "Sitz Ost-Alanya, keine Google-Bewertung auffindbar", "Nicht veröffentlicht"],
  ["Mavi Bilişim / Alanya Akınsoft Ana Bayi", "Offizieller Akınsoft-Hauptdistributor – starke Marke im Markt/Restaurant-POS-Segment", "Security nur Nebengeschäft, kein Brandschutz/Smart Home/Zutritt", "Nicht veröffentlicht"],
  ["Serapsu Bilişim", "Breites Kamera-Markenspektrum, Zweigstelle Zentrum + Konaklı", "Sehr kleiner Betrieb, kein Brandschutz/Smart Home/Zutritt, keine Bewertungen", "Nicht veröffentlicht"],
  ["Bayrakcı Bilişim", "Einziger Wettbewerber mit (indirekt bestaetigtem) Google-Rating ~5,0/19 über Aggregator", "Schwerpunkt POS/ERP-Software, kein Brandschutz/Smart Home/Zutritt, mehrere 404-Seiten", "Nicht veröffentlicht"],
  ["Alanya Kamera / Senkronis", "Reale, seit 2015 registrierte Firma dahinter, WhatsApp-Kontakt integriert", "Landesweite 0850-Nummer wirkt wie Lead-Gen-Microsite, 0 Bewertungen auf Yandex Maps", "Nicht veröffentlicht"],
];

const kapitel3 = [
  h1("Kapitel 3: Wettbewerb"),
  h2("3.1 Direkte Wettbewerber"),
  body("Alle 11 Anbieter wurden unabhängig recherchiert und in einer zweiten Runde gegengeprüft (Quelle: eigene Primärrecherche über Website-Abruf, Google-/Yandex-Maps-Suche und Branchenverzeichnisse, Juli 2026)."),
  dataTable(["Anbieter", "Stärken", "Schwächen / Chance für uns", "Preis"], wettbewerber, [1.4, 1.6, 2, 1]),
  spacer(200),
  h2("3.2 Indirekte Wettbewerber / Aggregate"),
  dataTable(
    ["Anbieter", "Was er bietet", "Was fehlt (Chance für uns)"],
    [
      ["Yandex Maps (Alternative zu Google Maps)", "Bewertungsplattform, auf die 2 der 11 Wettbewerber mangels Google-Profil ausweichen", "Keine Reichweite bei internationalen Google-Nutzern; wir setzen von Anfang an auf Google"],
      ["Armut.com (türkischer Dienstleistungs-Marktplatz)", "Aggregierte Kategorie-Bewertungen fuer 'Alanya Güvenlik Sistemleri' (z.B. 4,9/120 als Kategoriedurchschnitt)", "Keine firmenspezifische Reputation, nur Marktplatz-Durchschnitt – wir bauen ein EIGENES, firmenspezifisches Profil auf"],
      ["Ajax Systems / Verkada (internationale Benchmarks, keine direkten Wettbewerber)", "Zielgruppen-Navigation statt Produktliste, harte Kennzahlen/Zertifizierungen statt Marketingfloskeln", "Nicht lokal in Alanya aktiv – dient als Vorbild fuer Positionierung, nicht als Konkurrenzanalyse"],
    ],
    [2, 2.6, 2.6]
  ),
  spacer(200),
  h2("Marktlücke"),
  body(
    "Kein einziger der 11 Wettbewerber bietet die Kombination aus (a) vollständigem 11-Leistungs-Portfolio, (b) mehrsprachigem Content (TR/EN/RU/DE), (c) echtem Google-Bewertungs-Management und (d) einer GEO-optimierten, zielgruppenbasierten Website-Struktur. Diese Kombination ist der Markteintrittspunkt fuer Hastek Group."
  ),
];

// ---------------------------------------------------------------------------
// KAPITEL 4: Zielgruppe
// ---------------------------------------------------------------------------
const personas = [
  ["Elena, 52, St. Petersburg", "Zweitwohnsitzbesitzerin seit 2023, 8 Monate/Jahr abwesend", "Sucht Fernüberwachung (Kamera+Alarm+Smart Lock), kommuniziert bevorzugt auf Russisch/Englisch"],
  ["Bauträger Kaan, Kargıcak", "Entwickelt eine Gated-Community mit 40 Einheiten", "Braucht Vorverkabelung Smart-Home/Sicherheit als B2B2C-Verkaufsargument fuer seine Käufer"],
  ["Hotelmanager Murat, Alanya-Zentrum", "Führt ein Boutique-Hotel mit 30 Zimmern", "Braucht Kamera, Brandschutz (Kuechenlöschanlage), Gaeste-WLAN, Zimmer-Diafon"],
  ["Marktbesitzer Ahmet, Kestel", "Betreibt einen unabhängigen Lebensmittelmarkt (Bakkal)", "Braucht Barcode-/Kassensystem und einfache Kamera-Überwachung gegen Diebstahl"],
  ["Restaurantbesitzerin Zeynep, Mahmutlar", "Führt ein tourismusnahes Restaurant", "Braucht Adisyon-/Kassensystem, idealerweise mit Lieferdienst-Anbindung"],
  ["Facility-Manager Deniz, Gewerbepark", "Verwaltet ein Buero-/Gewerbeobjekt mit Parkflaeche", "Braucht Parkschranken, Zufahrtskontrolle, Kamera fuer Gemeinschaftsflaechen"],
];

const kapitel4 = [
  h1("Kapitel 4: Zielgruppe"),
  h2("4.1 Primäre Zielgruppe"),
  body("Sechs Kundensegmente in Alanya/Antalya-Provinz, abgeleitet aus dem realen Leistungsportfolio und der Marktanalyse (Kapitel 2):"),
  dataTable(["Persona", "Rolle/Situation", "Bedürfnis"], personas, [1.3, 1.8, 2.3]),
  spacer(200),
  h2("4.2 Sekundäre Zielgruppe"),
  body(
    "Bauträger/Property-Manager als B2B2C-Grosskunden-Kanal. Diese Zielgruppe kommt bewusst erst in Ausbaustufe 2/3 stärker zum Tragen, sobald erste echte Referenzprojekte (Kapitel 7.3, Live-Referenz-Showroom) als Vertrauensbasis fuer Grossaufträge vorliegen."
  ),
  h2("4.3 Nicht-Zielgruppe"),
  bullet("Kunden ausserhalb Alanya/Antalya-Provinz – kein landesweiter Anspruch in Version 1."),
  bullet("Privatkunden ohne Immobilienbezug (reine Consumer-Elektronik-Käufe ohne Installationsbedarf)."),
  bullet("Branchenfremde IT-Dienstleistungen – Hastek bleibt strikt bei den 11 definierten Leistungen."),
];

// ---------------------------------------------------------------------------
// KAPITEL 5: Nutzen
// ---------------------------------------------------------------------------
const nutzenKunde = [
  ["Telefonische/manuelle Terminvergabe, oft nur während Geschaeftszeiten erreichbar", "Online-Terminbuchungssystem (Besichtigung/Installation/Wartung)", "Online gebuchte Termine zeigen 3,2x höhere Erscheinquote; Unternehmen mit durchgehender Buchung erzielen bis zu 3x mehr Buchungen (SchedulingKit, Juni 2026)"],
  ["Keine Erreichbarkeit ausserhalb der Geschaeftszeiten", "KI-Chat-Assistent (24/7), themengebunden gemäss WhatsApp-Richtlinie", "KI-Support senkt Erstantwortzeit von >6 Std. auf unter 4 Min. (teils 23 Sek.); KI-Agenten fangen bereits 45%+ aller Anfragen ab (Ringly.io, 25.06.2026)"],
  ["Keine Vertrauenssignale – 0 von 11 Wettbewerbern mit Google-Bewertungen", "Bewertungs-Sammel- und -Management-Prozess", "97% lesen Bewertungen vor Kaufentscheidung; Unternehmen mit 50+ Bewertungen erscheinen 266% häufiger im Google Local Pack (BrightLocal 11.02.2026; Searchlab 17.03.2026)"],
  ["Kein mehrsprachiger Zugang fuer internationale Käufer", "Website TR/EN/RU/DE", "70% der Online-Shopper kaufen inzwischen grenzüberschreitend ein, waehrend 18–22% der B2C-Unternehmen laut selber Studie NICHT lokalisieren – eine belegte Angebotslücke (DHL E-Commerce Trends Report 2026, 02.06.2026)"],
];

const kapitel5 = [
  h1("Kapitel 5: Nutzen"),
  h2("5.1 Nutzen fuer Kunden"),
  dataTable(["Problem heute", "Lösung durch Web-App", "Konkreter Vorteil (Quelle, Datum)"], nutzenKunde, [1.6, 1.8, 2.6]),
  spacer(200),
  h2("5.2 Nutzen fuer WAMOCON GmbH"),
  bullet("Referenzprojekt fuer weitere B2B-Digitalisierungsprojekte türkischer/internationaler KMU im Tourismus- und Sicherheitssektor."),
  bullet("Wiederkehrende Einnahmen durch Ausbaustufen 2/3 (Konfigurator, Kundenportal, QR-Wartungshistorie, automatisierte Erinnerungen)."),
  bullet("Potenzielles monatliches Reporting-Retainer-Modell (Sichtbarkeits-/Bewertungs-Report an Hastek Group)."),
  bullet("Belegbarer Case fuer GEO-Kompetenz (Generative-Engine-Optimization) als eigenes Beratungsangebot fuer weitere Kunden."),
];

// ---------------------------------------------------------------------------
// KAPITEL 6: Abhaengigkeiten und Machbarkeit
// ---------------------------------------------------------------------------
const abhaengigkeiten = [
  ["WhatsApp Business API (Meta)", "Terminerinnerungen, Buchungs-CTA, Kundenservice", "Pro-Nachricht-Preismodell seit 1.7.2025; Utility-Nachrichten im 24-Std.-Fenster kostenlos", "Allgemeine KI-Chatbots seit 15.10.2025/15.01.2026 verboten – Assistent muss klar themengebunden (Buchung/Service) bleiben"],
  ["Google Business Profile API", "Verwaltung Bewertungen/Fotos/Posts", "kostenlos, Nutzungsbedingungen beachten", "Q&A-API zum 3.11.2025 ohne Ersatz eingestellt – Bewertungsmanagement über Review-Endpunkte, nicht Q&A"],
  ["Google Places/Maps API", "Standortdaten, Kartenintegration", "seit 1.3.2025 pro-SKU-Freikontingente statt 200 USD/Monat pauschal", "Legacy-Status älterer Places/Directions-Endpunkte beachten"],
  ["LLM-API fuer KI-Chat-Assistent", "Sprachverständnis/Antwortgenerierung TR/EN/RU/DE", "z.B. Claude Haiku 4.5: 1$/5$ pro Mio. Token (ca. 37 USD/10.000 Tickets); Alternativen OpenAI GPT-5.4-mini, Google Gemini 2.5 Flash-Lite", "Anbieterwahl nach Sprachqualität in allen 4 Sprachen zu testen"],
  ["Akınsoft/Wolvox (POS/ERP, Markt-/Restaurant-Segment)", "Kassendaten-Anbindung", "lizenzabhängig", "Nur dateibasierter XML-Austausch, keine moderne REST-/Webhook-API – erhöhter Integrationsaufwand; Alternativen Parasüt/Mikro bieten dokumentierte APIs"],
  ["Supabase (Next.js-Standard-Stack)", "Datenbank/Auth/RLS für Buchungssystem, Kundenportal", "im Rahmen Projekt-Standard-Stack", "Datenresidenz/KVKK-Grenzübertritt beachten (siehe Kapitel 2.4)"],
];

const kapitel6 = [
  h1("Kapitel 6: Abhängigkeiten und Machbarkeit"),
  h2("6.1 Externe Abhängigkeiten"),
  dataTable(["Quelle", "Was sie liefert", "Kosten", "Abhängigkeit"], abhaengigkeiten, [1.4, 1.6, 1.8, 2.2]),
  spacer(200),
  h2("6.2 Abrechnungs-/Integrationsoptionen"),
  body(
    "Version 1 hat kein Endkunden-Zahlungsmodell – Terminbuchung und KI-Chat sind kostenlose Kundenservice-Funktionen, keine kostenpflichtige SaaS-Nutzung durch Endkunden. Eine Zahlungsintegration wird erst indirekt über die POS-Anbindung (Akınsoft) im Markt-/Restaurant-Segment relevant."
  ),
  h2("6.3 Gesamtbewertung"),
  body(
    "Version 1 hat keine kritischen, blockierenden Abhängigkeiten ausser den in IDEA.md gelisteten offenen Kundeninformationen (finale Hausnummer, Bestätigung Kundenname, Eigentuemerschaft hasteknolojim.com/Social-Media). Kein Wettbewerber kann den Start technisch blockieren, da keiner über vergleichbare Technik verfuegt (Kapitel 3). Die WhatsApp-Policy-Änderung (Meta, Okt. 2025/Jan. 2026) erfordert eine bewusste Abgrenzung des KI-Assistenten als Buchungs-/Serviceassistent, ist aber kein Show-Stopper."
  ),
  body(
    "Status-Update: Die WhatsApp-Zielnummer ist seit Bestätigung durch Emre Altuntaş kein offener Punkt mehr (+90 506 600 92 29, aktiv verlinkt in der gesamten Demo). Für die Präsentationsphase wurde zudem bewusst auf eine Supabase-Anbindung verzichtet – Buchungssystem, Kundenportal und Admin-Bereich laufen aktuell backend-frei über localStorage/sessionStorage im Browser, damit die Demo ohne Infrastrukturkosten sofort per Link teilbar ist. Diese Entscheidung ist reversibel: Das Next.js-Frontend ist bereits so strukturiert, dass die localStorage-Zugriffe (src/lib/demo-store.ts, src/lib/demo-bookings.ts) 1:1 durch Supabase-Aufrufe ersetzt werden können, ohne die UI-Komponenten neu zu bauen."
  ),
];

// ---------------------------------------------------------------------------
// KAPITEL 7: Anforderungen Version 1
// ---------------------------------------------------------------------------
const hauptprozesse = [
  ["S-01", "Homepage mit AIDA-Kern (Attention-Interest-Desire-Action) und Verzweigung in 6 Segmentseiten", "Muss", "Umgesetzt", "Übertroffen: 8-stufiges AIDASLove-Modell statt reinem AIDA-Kern, mit animierter Hero-Szene."],
  ["S-02", "6 Zielgruppen-Segmentseiten (Privathaushalt, Neubau/Bauträger, Hotellerie, Markt, Gastronomie, Gewerbe/Parkflächen)", "Muss", "Umgesetzt", "Alle 6 Segmentseiten live, je mit eigener Illustration und Vorher/Nachher-Vergleich (siehe 7.4)."],
  ["S-03", "Mehrsprachigkeit TR/EN/RU/DE fuer alle Kernseiten", "Muss", "Umgesetzt", "Vollständige strukturelle Paritaet aller 4 Sprachen, programmatisch geprueft."],
  ["S-04", "Strukturierte Foto-/Referenzgalerie je Segment (KI-generierte Platzhalterbilder, klar gekennzeichnet)", "Muss", "Umgesetzt (Demo)", "Illustrierte Platzhalter, klar als „Örnek Görünüm“ gekennzeichnet; echte Fotos ersetzen sie 1:1 an gleicher Stelle."],
  ["S-05", "GEO-optimierte Trust-Center-Unterseite (Zertifikate, KVKK-Hinweise, FAQ-Struktur)", "Muss", "Umgesetzt", "Trust-Center mit 5 realen Inhaltsblöcken (Über uns, KVKK, Zertifikate, Bewertungen, Kontakt)."],
  ["T-01", "Online-Terminbuchungssystem (Besichtigung/Installation/Wartung)", "Muss", "Umgesetzt (Demo)", "Funktionsfähiges Formular; Daten aktuell im Browser (localStorage) statt Supabase, siehe Kapitel 6.3."],
  ["T-02", "KI-Chat-Assistent (24/7), themengebunden, qualifiziert nach Segment vor", "Muss", "Umgesetzt", "Übertroffen: zwei Modi – echtes Claude via optionalem API-Key ODER kostenloser regelbasierter Assistent (TR/EN/RU/DE inkl. kyrillischer Eingabe), ohne Kosten/Account."],
  ["T-03", "Anbindung KI-Chat an Buchungssystem (automatischer Termineintrag)", "Soll", "Teilweise", "Nicht der Chat, sondern der neue Konfigurator (siehe 7.4) befüllt die Buchung vor; Absenden bleibt manuell."],
  ["T-04", "WhatsApp-Kontakt-CTA als priorisierter Hauptkanal", "Muss", "Umgesetzt", "Jetzt live: bestätigte Nummer von Emre Altuntaş aktiv verlinkt (zuvor Platzhalter-Zustand)."],
  ["V-01", "Google-Business-Profil-Verknüpfung + schema.org LocalBusiness/Service-Markup", "Muss", "Teilweise", "schema.org-Markup vollständig umgesetzt; echte Google-Business-Profil-Verknüpfung fehlt (kein Kundenkonto)."],
  ["V-02", "Bewertungs-Sammel-Prozess (Anfrage nach Projektabschluss)", "Muss", "Offen", "Nur beispielhafte, klar gekennzeichnete Demo-Bewertungen im Admin-Bereich; kein echter Sammelprozess ohne Backend/GBP."],
  ["V-03", "Bewertungs-Management-Prozess (aktives Beantworten innerhalb 48 Std.)", "Soll", "Offen", "Gleicher Grund wie V-02: kein echtes Antwort-/Management-Werkzeug fuer Bewertungen vorhanden."],
  ["V-04", "Instagram-Live-Feed-Widget (sobald Account final bestätigt)", "Kann", "Teilweise", "Oberfläche fertig und einsatzbereit; aktiviert sich erst nach Kontobestätigung, echte Live-Anbindung offen."],
  ["A-01", "Rollenbasierter Admin-Bereich fuer Hastek-Mitarbeitende (Buchungen, Leads einsehen)", "Muss", "Umgesetzt (Demo)", "Funktionsfähig mit Demo-Zugangsdaten (Buchungen/Bewertungen einsehen); kein granulares Rollenmodell."],
];

const basisfunktionen = [
  ["B-01", "Rollen- und Rechteprinzip", "Muss", "Teilweise", "Nur eine Admin-Rolle vorhanden, keine granulare Rechtevergabe."],
  ["B-02", "Anmeldung und Registrierung (E-Mail mit Bestätigung, fuer Admin-Bereich)", "Muss", "Offen", "Demo-Zugangsdaten fest hinterlegt; kein echter Registrierungs-/Bestätigungsfluss."],
  ["B-03", "Passwort zurücksetzen", "Muss", "Offen", "Keine Passwort-Zuruecksetzen-Funktion vorhanden."],
  ["B-04", "Admin-Bereich fuer Nutzerverwaltung", "Muss", "Offen", "Dashboard zeigt nur Buchungen/Bewertungen, keine Nutzerverwaltung."],
  ["B-05", "Profilseite (fuer Admin-Nutzer)", "Muss", "Offen", "Keine eigene Profilseite fuer Admin-Nutzer vorhanden."],
  ["B-06", "Dashboard als Startseite (Admin-Bereich: Buchungen/Leads)", "Muss", "Umgesetzt (Demo)", "Admin-Dashboard als Startseite nach Login funktionsfähig."],
  ["B-07", "Navigation mit Breadcrumbs", "Muss", "Offen", "Header-Navigation statt Breadcrumbs; ein schema.org-BreadcrumbList existiert nur unsichtbar für Suchmaschinen, nicht als UI."],
  ["B-08", "Benachrichtigungssystem (In-App und/oder E-Mail bei neuer Buchung)", "Soll", "Offen", "Keine E-Mail-/In-App-Benachrichtigung bei neuer Buchung (kein Backend)."],
  ["B-09", "Spracheinstellungen (Türkisch, Englisch, Russisch, Deutsch)", "Muss", "Umgesetzt", "Alle 4 Sprachen live umschaltbar."],
  ["B-10", "Dunkel/Hell-Modus", "Muss", "Umgesetzt", "Vollständiger Dark/Light-Modus mit Systemerkennung und Persistenz."],
  ["B-11", "FAQ und Hilfebereich", "Soll", "Umgesetzt", "FAQ-Seite plus zusätzliches FAQPage-schema.org-Markup fuer GEO."],
  ["B-12", "AGB, Impressum, Datenschutzerklärung (mehrsprachig)", "Muss", "Umgesetzt", "Vollständig in 4 Sprachen, KVKK-first aufgebaut."],
  ["B-13", "Cookie-Banner nach DSGVO/KVKK", "Muss", "Umgesetzt", "Zustimmungssteuerung funktionsfähig, verlinkt zur Datenschutzseite."],
  ["B-14", "DSGVO-/KVKK-Funktionen (Daten exportieren, Konto löschen)", "Muss", "Offen", "Kein Datenexport/Konto-Löschen möglich – mangels Backend existieren keine echten personenbezogenen Konten."],
  ["B-15", "Funktionsstufen-Modell: MVP-Basisfunktionen vs. Premium-Ausbaustufen 2/3 (kein Endkunden-Zahlmodell, siehe Kapitel 6.2)", "Muss", "Umgesetzt", "Weiterhin zutreffend: kein Zahlmodell, keine Preisstufen im Code."],
  ["B-16", "Kein Free/Premium-Upgrade durch Endkunden – Ausbaustufen sind interne Weiterentwicklungen (siehe 7.3)", "Muss", "Umgesetzt", "Weiterhin zutreffend: kein Endkunden-Upgrade-Mechanismus vorhanden."],
];

const scopeTable = [
  ["Interaktiver Leistungs-Konfigurator („Paket-Builder“)", "Bereits umgesetzt (Demo): 3-Schritte-Assistent empfiehlt Segment + bis zu 6 Systeme und befüllt automatisch die Buchung (Details: 7.4)."],
  ["QR-Code-Wartungshistorie pro installiertem Gerät", "Teilweise umgesetzt: echte Wartungshistorie pro Gerät über einen Demo-Code-Link abrufbar; der Code selbst ist noch kein scannbarer QR-Code, sondern ein gestalterisches Platzhaltersymbol."],
  ["Automatisierte WhatsApp-Wartungserinnerungen", "Teilweise umgesetzt (Demo): Einstellungen + Nachrichtenvorschau im Kundenportal fertig; automatischer Versand über die WhatsApp Business API steht noch aus. Urspruenglicher Blocker (WhatsApp-Nummer) ist behoben."],
  ["Kunden-Login-Portal (Wartungsverträge/Rechnungen/Tickets)", "Teilweise umgesetzt: Login, Termine, Geräte und Erinnerungen funktionieren; Wartungsverträge/Rechnungen waren nie Teil dieser Demo."],
  ["Live-Referenz-Showroom (Kamera-Demo)", "Bereits umgesetzt als klar gekennzeichnete Simulation: 4-Kamera-Wand mit Bewegungserkennung/REC-Anzeige, ausdrücklich als Demonstration markiert, kein echter Videofeed."],
  ["Instagram-Live-Feed-Widget", "Oberfläche fertig; aktiviert sich erst nach Bestätigung der Konto-Eigentümerschaft (siehe V-04)."],
];

const zusatzfunktionen = [
  ["Vorher/Nachher-Vergleichsregler (Villa & Ladengeschäft)", "Macht den Sicherheitsgewinn sofort sichtbar und emotional erlebbar – ziehbar per Maus, Touch und Tastatur."],
  ["Premium-Designsystem „Kara Elmas“ (Gold/Obsidian) mit 8 animierten Illustrationen", "Edler, unverwechselbarer Markenauftritt – genau die Differenzierung, die laut Kapitel 3 keinem der 11 Wettbewerber gelingt."],
  ["Kostenloser regelbasierter KI-Assistent (TR/EN/RU/DE, inkl. kyrillischer Eingabe)", "Beantwortet Freitextfragen live, ohne API-Kosten oder Account – funktioniert auch über den geteilten Demo-Link."],
  ["Schwebende, animierte WhatsApp- (grün) und KI-Chat-Buttons (schwarz)", "Der priorisierte Kontaktweg ist auf jeder Seite sofort sichtbar und einladend, auf Mobil und Desktop."],
  ["Seitenübergänge (Page Transitions) bei jedem Routenwechsel", "Wirkt hochwertiger und ruhiger als harte Seitenwechsel, ohne Ladezeit-Nachteil."],
  ["Erweiterte GEO-Schemas (WebSite/Organization/FAQPage/Service+Breadcrumb) + sichtbare KI-Zusammenfassung", "Erhöht die Chance, in KI-Antwortmaschinen (ChatGPT, Perplexity, Google AI Overviews) genannt zu werden – siehe Kapitel 2.2/8.1."],
  ["Cinematische animierte Hero-Nachtszene mit Scroll-Choreografie", "Erzeugt einen sofortigen „Wow“-Moment auf der Startseite und vermittelt das Sicherheits-/Automatisierungsgefühl visuell statt nur textlich."],
];

const kapitel7 = [
  h1("Kapitel 7: Anforderungen Version 1"),
  h2("7.1 Hauptprozesse"),
  dataTable(["ID", "Anforderung", "Prio", "Status", "Anmerkung (Stand: 06.07.2026)"], hauptprozesse, [0.45, 2.3, 0.5, 0.75, 2.7]),
  spacer(200),
  h2("7.2 Basisfunktionalitäten"),
  dataTable(["ID", "Anforderung", "Prio", "Status", "Anmerkung (Stand: 06.07.2026)"], basisfunktionen, [0.45, 2.3, 0.5, 0.75, 2.7]),
  spacer(200),
  h2("7.3 Scope"),
  body(
    "Die ursprünglich für V1 als „In Scope“ geplanten Punkte (Homepage, 6 Segmentseiten, Mehrsprachigkeit, Buchungssystem, KI-Chat, Trust-Center) sind vollständig umgesetzt (Details: 7.1). Die folgende Tabelle zeigt den wichtigsten Befund dieses Status-Updates: Alle sechs urspruenglich für Ausbaustufe 2/3 vorgesehenen Punkte wurden bereits als Demo-Prototypen realisiert, deutlich frueher als geplant."
  ),
  dataTable(["Ursprünglich für Ausbaustufe 2/3 geplant", "Status in der aktuellen Demo (Stand: 06.07.2026)"], scopeTable, [1, 1.6]),
  spacer(200),
  h2("7.4 Zusätzliche Funktionen (über den ursprünglichen Scope hinaus umgesetzt)"),
  body(
    "Über die in Kapitel 7.1–7.3 beschriebenen Anforderungen hinaus wurden folgende, im ursprünglichen Anforderungsdokument nicht vorgesehene Funktionen umgesetzt und gegen den Quellcode verifiziert:"
  ),
  dataTable(["Funktion", "Vorteil fuer den Kunden"], zusatzfunktionen, [1.5, 1.9]),
];

// ---------------------------------------------------------------------------
// KAPITEL 8: Chancen und Risiken
// ---------------------------------------------------------------------------
const chancen = [
  ["Erstes Google-Bewertungsprofil im Markt", "0 von 11 Wettbewerbern verifiziert vorhanden (eigene Recherche); 97% lesen Bewertungen vor Kaufentscheidung, 50+ Bewertungen = 266% häufiger im Local Pack (BrightLocal 11.02.2026; Searchlab 17.03.2026)"],
  ["Wachsende, zahlungskräftige Zielgruppe", "15.225 russische Immobilienkäufe in Alanya 2022–2025; Alanya-Bevölkerungswachstum +2,67% 2025 (yenialanya.com 11.06.2026; mansetalanya.com 09.02.2026)"],
  ["GEO als First-Mover-Vorteil", "Gartner erwartet 25% Rückgang klassischer Suchanfragen zugunsten KI-Antwortmaschinen 2026; KI-Engines zitieren typischerweise nur 2–7 Domains pro Antwort (Search Engine Land, 23.02.2026)"],
  ["Infrastruktur-Rückenwind", "Flughafenausbau Gazipaşa, neue Wohnkomplexe MIT Smart-Home-Systemen bis 2030 (gazetealanya.com 23.02.2026; Yekta Homes 18.07.2025)"],
  ["Renovierungssegment", "~18.000 Altbauten in Antalya benötigen Verstärkung/Neubau, Nachrüstungssegment mit 25% Wachstum prognostiziert (KiTalent, 12.04.2026)"],
];

const risiken = [
  ["Währungsrisiko", "Lira verlor 17,4% ggue. USD in 12 Monaten (03.07.2026: 46,79 TRY/USD); Inflationsprognose 2026 zwischen 22% (ING) und 28,9% (S&P Global)", "API-/Lizenzkosten in USD budgetieren, TL-Preise mit Pufferspanne kalkulieren"],
  ["Regulatorisches Risiko KVKK/KI", "Human-in-the-loop-Pflicht seit 2026 (nesilteknoloji.com, 11.02.2026)", "KI-Chat darf keine automatisierten, folgenreichen Entscheidungen ohne menschliche Prüfung treffen"],
  ["WhatsApp-Policy-Risiko", "Verbot allgemeiner KI-Chatbots seit Okt. 2025/Jan. 2026 (TechCrunch, 18.10.2025)", "KI-Assistent explizit als themengebundenen Buchungs-/Serviceassistenten konzipieren und dokumentieren"],
  ["Cyber-Sicherheitsrisiko vernetzter Kameras", "Dokumentierte Angriffe auf Hikvision/Dahua/TP-Link-Kameras 2026 (Check Point Research 04.03.2026; SecurityWeek 19.01.2026)", "Firmware-Update-Prozess und Passwort-Policy als Teil des Wartungsvertrags kommunizieren"],
  ["Wettbewerbsrisiko durch Nachahmung", "Sobald ein Wettbewerber die identifizierte Lücke (Bewertungen, Mehrsprachigkeit, GEO) erkennt, kann er nachziehen", "Geschwindigkeit (Kapitel 9) und edler Premium-Designauftritt als schwerer kopierbare Differenzierung"],
];

const kapitel8 = [
  h1("Kapitel 8: Chancen und Risiken"),
  h2("8.1 Chancen"),
  dataTable(["Chance", "Begründung (mit Quelle)"], chancen, [1, 2.6]),
  spacer(200),
  h2("8.2 Risiken"),
  dataTable(["Risiko", "Warum es eintreten kann", "Gegenmassnahme"], risiken, [1, 1.8, 1.8]),
];

// ---------------------------------------------------------------------------
// KAPITEL 9: Umsetzungsplan Version 1
// ---------------------------------------------------------------------------
const umsetzungsplan = [
  ["Tag 1–3", "Hauptprozesse", "Homepage + 6 Segmentseiten, i18n-Grundgerüst TR/EN/RU/DE, Google-Business-Profil-Verknüpfung + schema.org-Markup"],
  ["Tag 3–5", "Buchungssystem & KI-Chat", "Online-Terminbuchungssystem (Supabase-Datenmodell), themengebundener KI-Chat-Assistent, WhatsApp-CTA"],
  ["Tag 5–6", "Testing und Bugfixing", "Funktionstests aller 4 Sprachen, Buchungsfluss-Tests, KI-Chat-Antwortqualität"],
  ["Tag 6–7", "Basisfunktionalitäten", "Admin-Bereich, DSGVO-/KVKK-Funktionen, Cookie-Banner, Impressum/AGB, Dark/Light-Mode"],
  ["Tag 7–8", "Puffer", "Trust-Center-Seite, GEO-Feinschliff, finale Korrektur nach Kundenfeedback"],
];

const kapitel9 = [
  h1("Kapitel 9: Umsetzungsplan Version 1"),
  h2("9.1 Entwicklungsansatz"),
  body("Tech-Stack: Next.js, TypeScript, Tailwind CSS, Supabase, Vercel (Projekt-Standard-Stack). Werkzeuge: GitHub Copilot Agents (@planner → @developer) fuer iterative, KI-gestützte Umsetzung. Team: WAMOCON GmbH."),
  h2("9.2 Umsetzungsplan"),
  dataTable(["Tag", "Fokus", "Inhalt"], umsetzungsplan, [0.8, 1.4, 3.4]),
  spacer(200),
  new Paragraph({
    children: [new TextRun({ text: "Hinweis: Realistisch ist Version 1 ein lauffähiger Prototyp mit den Muss-Anforderungen aus Kapitel 7.1/7.2, kein fertiges Endprodukt. Ausbaustufen 2/3 (siehe Kapitel 7.3, Out of Scope) folgen nach Kundenfeedback aus dem MVP-Betrieb.", font: FONT, size: 22, italics: true })],
    spacing: { after: 160 },
  }),
  h2("9.3 Status-Update (Stand: 06.07.2026)"),
  body(
    "Die tatsächliche Umsetzung ist über den oben skizzierten Plan hinausgegangen: Statt nur der Muss-Anforderungen aus 7.1/7.2 wurden bereits alle sechs für Ausbaustufe 2/3 vorgesehenen Funktionen prototypisch realisiert (Details: Kapitel 7.3/7.4). Die Demo ist unter https://hastekgroup.vercel.app in allen vier Sprachen live und per Link mit dem Kunden teilbar (Vercel-Hosting, wie im Standard-Stack oben vorgesehen)."
  ),
  body(
    "Konkreter nächster Schritt nach Kundenfreigabe: Migration von localStorage/sessionStorage auf Supabase (Datenbank/Auth/RLS) für Buchungssystem, Kundenportal und Admin-Bereich, damit aus den Basisfunktionalitäten mit Status „Offen“ (Kapitel 7.2: Registrierung, Passwort-Zuruecksetzen, Nutzerverwaltung, Benachrichtigungen, DSGVO-/KVKK-Datenfunktionen) echte, produktive Funktionen werden."
  ),
];

// ---------------------------------------------------------------------------
// QUELLENVERZEICHNIS
// ---------------------------------------------------------------------------
const quellen = [
  ["1", "yenialanya.com – Ruslar Alanya'dan vazgeçmiyor", "Russische Immobilienkäufe Alanya 2022–2026", "11.06.2026"],
  ["2", "yenialanya.com – TÜİK Verileri", "Nationale Immobilienverkäufe an Ausländer Mai 2026", "18.06.2026"],
  ["3", "KiTalent – Antalya Coastal Construction Boom", "Ausländerkäufe Antalya-Provinz, Bautrends, Nachrüstsegment", "12.04.2026"],
  ["4", "mansetalanya.com – Alanya'nın Yeni Nüfusu", "Bevölkerungswachstum Alanya 2025", "09.02.2026"],
  ["5", "newlevel-group.com – Residence Permit Zones 2026", "Aufenthaltstitel-Regelung nach Stadtviertel", "18.01.2026"],
  ["6", "antalyahomes.com – Antalya Real Estate Market", "Nationalitäten-Mix Immobilienmarkt Antalya", "29.12.2025"],
  ["7", "NextMSC – Turkey Real Estate Market Size", "Marktvolumen/CAGR türkischer Immobilienmarkt bis 2030", "04.06.2026"],
  ["8", "Yekta Homes – Alanya Real Estate 2030", "5 Schlüsselveränderungen Alanya bis 2030", "18.07.2025"],
  ["9", "gazetealanya.com – Alanya Investitionen 2026", "Flughafenausbau, Infrastrukturprojekte", "23.02.2026"],
  ["10", "Precedence Research – Smart Home Security Market", "Globaler Smart-Home-Security-Markt", "25.02.2026"],
  ["11", "Esenyel Partners – 2026 KVKK Administrative Fines", "KVKK-Bussgeldrahmen 2026", "29.12.2025"],
  ["12", "nesilteknoloji.com – 2026 KVKK Cezaları", "KVKK Human-in-the-Loop-Pflicht, Meldefristen", "11.02.2026"],
  ["13", "Istanbul Lawyer Firm – KVKK Cross-Border Transfers", "Grenzüberschreitender Datentransfer KVKK", "21.08.2025"],
  ["14", "merttelekom.com – Yangın Algılama Sistemleri", "Brandschutzzertifizierung TS EN 54", "31.07.2025"],
  ["15", "KiviERP – e-Fatura Zorunluluğu 2026", "E-Rechnungspflicht Tuerkei ab 2026", "30.09.2025"],
  ["16", "Meta for Developers – WhatsApp Pricing", "WhatsApp Business API Preismodell", "Juli 2026"],
  ["17", "TechCrunch – WhatsApp bars general-purpose chatbots", "WhatsApp-Verbot allgemeiner KI-Chatbots", "18.10.2025"],
  ["18", "respond.io – WhatsApp 2026 AI Policy Explained", "Details WhatsApp-KI-Policy", "27.10.2025"],
  ["19", "Meta for Developers – Messaging Limits Changes", "WhatsApp Nachrichtenlimits ab Okt. 2025", "Oktober 2025"],
  ["20", "ppc.land – Google Business Profile Q&A API discontinued", "Einstellung Google Q&A API", "21.09.2025"],
  ["21", "Google for Developers – Business Profile API Change Log", "Laufende API-Weiterentwicklung 2026", "01.07.2026"],
  ["22", "Google for Developers – Maps Platform Billing FAQ", "Preisänderung Google Places/Maps API", "29.06.2026"],
  ["23", "Anthropic – Claude Platform Pricing", "Claude-API-Preise", "Juli 2026"],
  ["24", "OpenAI – API Pricing", "GPT-API-Preise", "Juli 2026"],
  ["25", "Google AI for Developers – Gemini API Pricing", "Gemini-API-Preise", "30.06.2026"],
  ["26", "Search Engine Land – GEO Full Guide 2026", "Generative Engine Optimization Praxis", "23.02.2026"],
  ["27", "Otterly.AI – llms.txt Experiment", "GEO-Studie zu llms.txt-Wirksamkeit", "05.02.2026"],
  ["28", "AKINSOFT Bilgi Bankası – Wolvox Integration", "Akınsoft-POS-Integrationsverfahren", "05.02.2026"],
  ["29", "Zenoti – 2025 Survey: Salon/Spa Booking Trends", "Wirkung Online-Terminbuchung auf Conversion", "06.10.2025"],
  ["30", "Salesforce – 2025 State of Service Report", "KI-Akzeptanz bei Terminbuchung/Service", "10.09.2025"],
  ["31", "Ringly.io – 61 AI Customer Service Statistics 2026", "Wirkung KI-Chat auf Antwortzeiten", "25.06.2026"],
  ["32", "BrightLocal – Local Consumer Review Survey 2026", "Wirkung von Bewertungen auf Kaufentscheidung", "11.02.2026"],
  ["33", "Whitespark – Local Search Ranking Factors 2026", "Gewicht von Bewertungen im Local-SEO-Ranking", "06.11.2025"],
  ["34", "Searchlab – Online Reviews Statistics 2026", "Sichtbarkeit im Google Local Pack nach Bewertungsanzahl", "17.03.2026"],
  ["35", "DHL – 2026 E-Commerce Trends Report", "Grenzüberschreitendes Kaufverhalten, Lokalisierungslücke", "02.06.2026"],
  ["36", "W3Techs – Content Language Usage Statistics", "Sprachverteilung von Website-Inhalten weltweit", "04.07.2026"],
  ["37", "Mordor Intelligence – Turkey Cybersecurity Market", "Türkischer Cybersecurity-/KMU-Digitalisierungsmarkt", "19.01.2026"],
  ["38", "Mordor Intelligence – Turkey ICT Market", "Türkischer ICT-Markt, KMU-Anteil", "28.01.2026"],
  ["39", "ING THINK – Turkish disinflation", "Türkische Inflation Dezember 2025", "05.01.2026"],
  ["40", "Bloomberg HT – S&P Turkiye Enflasyon Tahmini", "S&P-Inflationsprognose Türkei 2026", "26.03.2026"],
  ["41", "Forbes – Turkey's Economy Was Winning", "Wirtschaftliche Auswirkungen Iran-Konflikt auf Türkei", "04.04.2026"],
  ["42", "Trading Economics – Turkish Lira", "USD/TRY-Wechselkurs Juli 2026", "03.07.2026"],
  ["43", "Check Point Research – Iranian Targeting of IP Cameras", "Cyberangriffe auf IP-Kameras im Nahen Osten", "04.03.2026"],
  ["44", "SecurityWeek – TP-Link VIGI Vulnerability", "Sicherheitslücke TP-Link-Überwachungskameras", "19.01.2026"],
  ["45", "Forbes Technology Council – AI in Video Surveillance", "KI-Trends in der Videoueberwachung 2026", "02.03.2026"],
  ["46", "Brivo – 5 Video Surveillance and AI Trends 2026", "KI-/Cloud-Trends Sicherheitsbranche 2026", "31.03.2026"],
];

const kapitelQuellen = [
  h1("Quellenverzeichnis"),
  body("Alle Quellen wurden am oder nach dem 04.07.2025 veröffentlicht (Stichtagsregel: nicht älter als 1 Jahr). Themen, zu denen keine ausreichend aktuelle, prüfbare Quelle gefunden wurde, sind in den jeweiligen Kapiteln als Daten-Lücke transparent ausgewiesen statt mit einer veralteten Quelle belegt."),
  dataTable(["Nr.", "Quelle/URL", "Inhalt", "Veröffentlichungsdatum"], quellen, [0.5, 2.4, 2.6, 1]),
];

// ---------------------------------------------------------------------------
// Dokument zusammenbauen
// ---------------------------------------------------------------------------
const header = new Header({
  children: [
    new Paragraph({
      children: [new TextRun({ text: "WAMOCON GmbH, Mergenthalerallee 79-81, 65760 Eschborn", font: FONT, size: 16, color: GREY })],
    }),
  ],
});

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1417, bottom: 1417, left: 1134, right: 1134 },
        },
      },
      headers: { default: header },
      children: [
        ...deckblatt,
        ...kapitel1,
        ...kapitel2,
        ...kapitel3,
        ...kapitel4,
        ...kapitel5,
        ...kapitel6,
        ...kapitel7,
        ...kapitel8,
        ...kapitel9,
        ...kapitelQuellen,
      ],
    },
  ],
});

// Canonical location: docs/intern/ (the version referenced/committed for internal
// review), not public/ (which would ship the docx as a public static asset).
const outDir = path.join(__dirname, "..", "docs", "intern");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "Anforderungsdokument_HastekGroup.docx");

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log("Anforderungsdokument gespeichert:", outPath);

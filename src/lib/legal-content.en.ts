import type { LegalContent } from "./legal-content";

export const legalContentEn: LegalContent = {
  draftBanner:
    "Draft for internal review: These legal texts are provisional. Company data (tax number/VKN, MERSİS number, final street number) is pending customer confirmation. Before publication, a review by a lawyer licensed in Turkey (KVKK) is required.",
  impressum: {
    title: "Legal Notice (Impressum)",
    updated: "Draft status: July 2026",
    sections: [
      {
        heading: "Information pursuant to Art. 29 of the Turkish Commercial Code (TTK)",
        body: [
          "Hastek Group Yazılım Ve Otomasyon Sistemleri İth.İhr.Tur.Tic.Ltd.Şti. (brand name: HAS Teknoloji)",
          "Alanya, Antalya, Türkiye (full address including street number to be added after customer confirmation - see IDEA.md, open items).",
        ],
      },
      {
        heading: "Authorized Representatives (Management)",
        body: ["Emre Altuntaş", "Harun Çoban"],
      },
      {
        heading: "Register Entry",
        body: [
          "Commercial register/MERSİS number: [to be confirmed]",
          "Tax number (Vergi Kimlik Numarası): [to be confirmed]",
        ],
      },
      {
        heading: "Contact",
        body: ["Email: [project email to be confirmed]", "Phone/WhatsApp: [to be confirmed]"],
      },
      {
        heading: "Information about the Offering",
        body: [
          "This website provides information about the installation and maintenance services offered by HAS Teknoloji (smart home, security, and networking systems) in Alanya and Antalya Province, and allows visitors to request a free, non-binding on-site inspection. This is a services website, not a commercial platform with online payment processing.",
        ],
      },
    ],
  },
  agb: {
    title: "General Terms and Conditions (Draft)",
    updated: "Draft status: July 2026",
    sections: [
      {
        heading: "§ 1 Scope of Application",
        body: [
          "These General Terms and Conditions apply to all consultation appointments and on-site inspections requested via this website, as well as any resulting installation and maintenance orders from Hastek Group (HAS Teknoloji), Alanya, Türkiye.",
          "Customers include both private individuals (in particular property owners and second-home owners) and businesses (hospitality, retail, food service, commercial enterprises, property developers).",
        ],
      },
      {
        heading: "§ 2 Appointment Requests and Conclusion of Contract",
        body: [
          "The presentation of services on this website does not constitute a binding offer, but rather an invitation to request a free on-site inspection.",
          "A contract for specific installation or maintenance services is only concluded through a separate, individual offer made after the on-site inspection, together with its written or verbal acceptance by the customer.",
        ],
      },
      {
        heading: "§ 3 Scope of Services",
        body: [
          "The precise scope of services (e.g., smart home systems, camera systems, alarm systems, fire detection systems, parking barriers, point-of-sale systems) is determined individually on the basis of the on-site inspection and the offer.",
        ],
      },
      {
        heading: "§ 4 Prices",
        body: [
          "This website does not state any binding final prices. Binding prices result exclusively from the individual, written offer provided after the on-site inspection.",
        ],
      },
      {
        heading: "§ 5 Warranty and Maintenance",
        body: [
          "The statutory warranty provisions of the Republic of Türkiye apply to installed systems, along with the maintenance terms agreed in the individual offer.",
        ],
      },
      {
        heading: "§ 6 Data Protection",
        body: [
          "The processing of personal data in connection with an appointment request is governed by this website's separate Privacy Policy.",
        ],
      },
      {
        heading: "§ 7 Final Provisions",
        body: [
          "Turkish law applies. To the extent legally permissible, the place of jurisdiction is Alanya/Antalya.",
          "This draft does not replace individual legal advice and must be reviewed by a lawyer licensed in Turkey before publication.",
        ],
      },
    ],
  },
  datenschutz: {
    title: "Privacy Policy (Draft)",
    updated: "Draft status: July 2026",
    sections: [
      {
        heading: "1. Data Controller (Veri Sorumlusu)",
        body: [
          "The data controller within the meaning of the Turkish data protection law KVKK (Kişisel Verilerin Korunması Kanunu, Law No. 6698) is Hastek Group Yazılım Ve Otomasyon Sistemleri İth.İhr.Tur.Tic.Ltd.Şti. (HAS Teknoloji), Alanya, Antalya, Türkiye. Full contact details will be added once confirmed by the customer.",
        ],
      },
      {
        heading: "2. What Data We Process",
        body: [
          "Appointment booking: name, email address, phone/WhatsApp number, property type, desired service, preferred appointment date, and any voluntary additional information.",
          "AI chat assistant: the chat history you enter, in order to respond to your inquiry.",
          "Technically necessary cookies: language setting and display setting (light/dark).",
        ],
      },
      {
        heading: "3. Purpose and Legal Basis",
        body: [
          "Processing takes place in order to handle your appointment request or chat inquiry (pre-contractual measures, Art. 5(2) KVKK), as well as to meet the technical requirements of operating the website.",
          "For customers residing in the EU/EEA, the principles of the GDPR are additionally observed, to the extent applicable.",
        ],
      },
      {
        heading: "4. Hosting and Data Processors",
        body: [
          "This demo website is hosted via Vercel Inc.; in the process, technical connection data (IP address, timestamp, browser information) is processed.",
          "For the AI chat assistant, an AI language model API (Anthropic) may optionally be connected; in demo mode, without a configured API key, no chat content is transmitted to third parties.",
        ],
      },
      {
        heading: "5. Storage Duration",
        body: [
          "In this demo version, appointment bookings are stored exclusively locally in the user's browser and are not transmitted to any Hastek Group server. In later production operation, this statement will be replaced by the actual storage duration in the production database.",
        ],
      },
      {
        heading: "6. Your Rights",
        body: [
          "Under Art. 11 KVKK, you have, among other things, the right to access, rectification, erasure, and objection regarding your personal data. EU customers may additionally invoke the corresponding rights under Art. 15-21 GDPR, to the extent applicable.",
        ],
      },
      {
        heading: "7. Changes",
        body: [
          "This Privacy Policy is a draft and will be finally reviewed prior to production operation and adapted to the company data confirmed at that time.",
        ],
      },
    ],
  },
};

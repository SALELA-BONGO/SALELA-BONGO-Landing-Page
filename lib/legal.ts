export type Language = "fr" | "en" | "ln";

export const LANG_STORAGE_KEY = "salelabongo-lang";

export type LegalSection = {
  number?: string;
  title: string;
  body?: string;
  list?: string[];
  subsections?: { title: string; body?: string; list?: string[] }[];
};

export type LegalPageContent = {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  footerNote?: string;
};

export type LegalContent = {
  common: {
    backToHome: string;
    backToLegal: string;
    legalIndexTitle: string;
    legalIndexSub: string;
    companyFooter: string;
  };
  index: {
    cards: { href: string; label: string; description: string }[];
  };
  privacy: LegalPageContent;
  terms: LegalPageContent;
  communityGuidelines: LegalPageContent;
  dataDeletion: LegalPageContent;
};

import en from "../content/legal/en.json";
import fr from "../content/legal/fr.json";
import ln from "../content/legal/ln.json";

const content: Record<Language, LegalContent> = { en, fr, ln };

export function getLegalContent(lang: Language): LegalContent {
  return content[lang] ?? content.en;
}

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "fr";
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored === "en" || stored === "fr" || stored === "ln") return stored;
  return "fr";
}

export const LANG_CHANGE_EVENT = "salelabongo-lang-change";

export function storeLanguage(lang: Language) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: lang }));
  }
}

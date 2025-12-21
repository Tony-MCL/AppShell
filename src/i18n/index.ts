// src/i18n/index.ts
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Lang = "no" | "en";

type I18nContextValue = {
  lang: Lang;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
};

const translations: Record<Lang, Record<string, string>> = {
  no: {
    "header.appName": "Manage Progress",
    "header.tagline": "Fremdriftsplan gjort enkelt",
    "header.help": "Hjelp",

    "help.title": "Hva kan du gjøre her?",
    "help.text1":
      "Dette er grunnmuren i fremdriftsplanen din. Du kan strukturere aktiviteter i hierarki og justere datoer direkte i tabellen.",
    "help.text2":
      "Bruk Alt + høyre/venstre pil for å endre innrykk. Dra rader for å flytte dem.",
    "help.text3": "Senere kommer Gantt-visning med samme data.",

    "progress.title": "Fremdriftsplan (tabellvisning)",
    "progress.subtitle":
      "LITE-utgaven: ren og rask tabell. Gantt, lagring og mer kommer.",
  },

  en: {
    "header.appName": "Manage Progress",
    "header.tagline": "Project timeline made simple",
    "header.help": "Help",

    "help.title": "What can you do here?",
    "help.text1":
      "This is the foundation of your progress plan. Structure tasks and adjust dates directly.",
    "help.text2":
      "Use Alt + left/right to change indent. Drag rows to reorder.",
    "help.text3": "Later we’ll add the full Gantt view.",

    "progress.title": "Progress plan (table view)",
    "progress.subtitle":
      "LITE edition: clean and fast table. Gantt and storage coming soon.",
  },
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const LANG_KEY = "mcl-progress-lang";

function loadInitialLang(): Lang {
  if (typeof window === "undefined") return "no";
  const stored = window.localStorage.getItem(LANG_KEY) as Lang | null;
  if (stored === "no" || stored === "en") return stored;

  const browser = window.navigator.language.toLowerCase();
  if (browser.startsWith("no") || browser.startsWith("nb") || browser.startsWith("nn")) {
    return "no";
  }
  return "en";
}

export function I18nProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [lang, setLangState] = useState<Lang>("no");

  useEffect(() => {
    setLangState(loadInitialLang());
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_KEY, next);
    }
  };

  const t = (key: string): string => {
    const dict = translations[lang] ?? translations.no;
    return dict[key] ?? key;
  };

  const value: I18nContextValue = { lang, t, setLang };

  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return ctx;
}

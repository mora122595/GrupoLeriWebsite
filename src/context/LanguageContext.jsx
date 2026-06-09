import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("leri_lang") || "es");

  const toggle = useCallback(() => {
    setLang((current) => {
      const next = current === "es" ? "en" : "es";
      localStorage.setItem("leri_lang", next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      lang,
      toggle,
      t: translations[lang],
    }),
    [lang, toggle]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

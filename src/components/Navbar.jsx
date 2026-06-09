import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

const NAV_LINKS = [
  { id: "services", key: "services" },
  { id: "specialized", key: "specialized" },
  { id: "coverage", key: "coverage" },
  { id: "clients", key: "testimonials" },
  { id: "contact", key: "contact" },
];

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const [navTheme, setNavTheme] = useState("transparent");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const updateTheme = () => {
      if (window.scrollY < 80) {
        setNavTheme("transparent");
        return;
      }

      const probe = document.elementFromPoint(window.innerWidth / 2, 96);
      const section = probe?.closest?.("section, footer");
      const sectionId = section?.id;
      const testId = section?.getAttribute?.("data-testid");
      const overDarkSurface =
        testId === "hero-section" ||
        sectionId === "specialized" ||
        testId === "site-footer";

      setNavTheme(overDarkSurface ? "transparent" : "glass");
    };

    updateTheme();

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;

      updateTheme();
      setHidden(scrollingDown && currentY > 90);
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        navTheme === "glass" || open
          ? "bg-[#040B16]/88 backdrop-blur-xl border-b border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            data-testid="navbar-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <img
              src="/images/logo_solo.png"
              alt="Grupo LERI logo"
              className="h-9 w-[6.3rem] sm:h-12 sm:w-[8.4rem] object-fill object-left"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                data-testid={`nav-${link.id}`}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium link-underline transition-colors ${
                  "text-slate-200 hover:text-blue-300"
                }`}
              >
                {t.nav[link.key]}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              data-testid="lang-toggle"
              onClick={toggle}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                "text-slate-200 hover:text-blue-300"
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" strokeWidth={1.5} />
              <span>{lang === "es" ? "ES / EN" : "EN / ES"}</span>
            </button>
            <button
              data-testid="navbar-cta"
              onClick={() => scrollTo("contact")}
              className="hidden md:inline-flex bg-[#0052FF] hover:bg-[#003ECC] text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              {t.nav.cta}
            </button>
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-white"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div data-testid="mobile-menu" className="lg:hidden pb-6 border-t border-slate-200 pt-4 space-y-1 bg-white">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-3 text-base font-medium text-slate-800"
              >
                {t.nav[link.key]}
              </button>
            ))}
            <button
              data-testid="lang-toggle-mobile"
              onClick={toggle}
              className="block w-full text-left py-3 text-xs font-semibold uppercase tracking-widest text-slate-500"
            >
              {lang === "es" ? "Switch to English" : "Cambiar a Español"}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="mt-3 w-full bg-[#0052FF] hover:bg-[#003ECC] text-white text-sm font-medium px-5 py-3"
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

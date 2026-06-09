import { useEffect, useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const NAV_LINKS = [
  { id: "services", key: "services" },
  { id: "specialized", key: "specialized" },
  { id: "coverage", key: "coverage" },
  { id: "clients", key: "testimonials" },
  { id: "contact", key: "contact" },
];

export default function ScrollNavbar() {
  const { lang, toggle, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;

      setAtTop(currentY < 80);
      setHidden(scrollingDown && currentY > 140);
      lastY = currentY;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const useSecondNavbar = !atTop || open;

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        useSecondNavbar
          ? "bg-[#040B16] border-b border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-20 flex items-center justify-between">
          <button
            data-testid="navbar-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
          >
            <img
              src="/images/logo_solo.png"
              alt="Grupo LERI logo"
              className="h-9 w-[6.3rem] sm:h-12 sm:w-[8.4rem] object-fill object-left"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                data-testid={`nav-${link.id}`}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-slate-200 hover:text-blue-300 link-underline transition-colors"
              >
                {t.nav[link.key]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              data-testid="lang-toggle"
              onClick={toggle}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200 hover:text-blue-300 transition-colors"
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
              onClick={() => setOpen((value) => !value)}
              className="lg:hidden p-2 text-white"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            data-testid="mobile-menu"
            className="lg:hidden pb-6 border-t border-white/10 pt-4 space-y-1 bg-[#040B16]/95"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-3 text-base font-medium text-slate-100"
              >
                {t.nav[link.key]}
              </button>
            ))}
            <button
              data-testid="lang-toggle-mobile"
              onClick={toggle}
              className="block w-full text-left py-3 text-xs font-semibold uppercase tracking-widest text-slate-400"
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

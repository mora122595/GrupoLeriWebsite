import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const HERO_BG = `${process.env.PUBLIC_URL}/images/header.png`;

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[100svh] sm:min-h-[100vh] bg-[#040B16] text-white overflow-hidden grain-overlay"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Global logistics"
          className="w-full sm:w-[130%] h-full object-cover object-[46%_50%] sm:object-[0%_48%] opacity-35 sm:opacity-30 sm:translate-x-[12%] sm:-translate-y-[5%]"
          style={{ mixBlendMode: "luminosity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040B16] via-[#040B16]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040B16]" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-20 sm:pb-24 min-h-[100svh] sm:min-h-[100vh] flex flex-col justify-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8 sm:mb-10"
        >
          <span className="h-px w-10 bg-[#0052FF]" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
            {t.hero.eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <div className="max-w-5xl">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[88px] leading-[0.95] font-light tracking-tighter">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              {t.hero.title_1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block text-blue-300 italic font-extralight"
            >
              {t.hero.title_2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden sm:block mt-10 max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed font-light"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>

        {/* CTAs + objective card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 sm:mt-14 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16"
        >
          <div className="flex flex-wrap items-center gap-4">
            <button
              data-testid="hero-cta-primary"
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-3 bg-[#0052FF] hover:bg-[#003ECC] text-white text-sm font-medium px-7 py-4 transition-colors"
            >
              {t.hero.cta_primary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </button>
            <button
              data-testid="hero-cta-secondary"
              onClick={() => scrollTo("services")}
              className="inline-flex items-center gap-3 bg-transparent border border-white/20 hover:border-white/60 hover:bg-white/5 text-white text-sm font-medium px-7 py-4 transition-all"
            >
              {t.hero.cta_secondary}
            </button>
          </div>

          {/* Objective floating card */}
          <div className="lg:ml-auto border-l border-white/15 pl-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
              {t.hero.objective_label}
            </p>
            <p className="font-display text-xl sm:text-2xl font-medium tracking-tight text-white max-w-xs">
              {t.hero.objective_value}
            </p>
          </div>
        </motion.div>

        {/* Bottom ticker */}
        <div className="absolute left-0 right-0 bottom-0 border-t border-white/10 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center gap-6">
            <ArrowDown className="w-4 h-4 text-blue-300 animate-bounce" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Scroll
            </span>
            <div className="hidden md:flex items-center gap-6 ml-auto text-[11px] uppercase tracking-[0.2em] text-slate-500">
              <span>{t.hero.ticker_transport}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>{t.hero.ticker_region}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>{t.hero.ticker_hazmat}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

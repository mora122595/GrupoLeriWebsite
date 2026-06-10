import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const WAREHOUSE_IMG = `${process.env.PUBLIC_URL}/images/bodega.png`;

export default function SpecializedServices() {
  const { lang, t } = useLanguage();
  const [showAllMobile, setShowAllMobile] = useState(false);
  const mobileItems = showAllMobile ? t.specialized.items : t.specialized.items.slice(0, 6);

  return (
    <section
      id="specialized"
      data-testid="specialized-section"
      className="bg-[#040B16] text-white border-b border-slate-900 grain-overlay relative"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-32 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: heading + image */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
                {t.specialized.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.05]">
              {t.specialized.title}
            </h2>
            <div className="mt-8 sm:mt-12 group relative overflow-hidden border border-white/10 bg-slate-950 shadow-2xl shadow-blue-950/30">
              <img
                src={WAREHOUSE_IMG}
                alt={lang === "es" ? "Bodega LERI con montacargas y mercancía paletizada" : "LERI warehouse with forklift and palletized goods"}
                className="w-full h-52 sm:h-[430px] object-cover object-center saturate-[0.85] contrast-[1.06] brightness-[0.82] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#040B16]/80 via-[#040B16]/20 to-blue-500/10 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#040B16]/90 via-[#040B16]/55 to-transparent px-5 py-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-200/80">
                    {lang === "es" ? "Bodega Laredo TX" : "Laredo TX Warehouse"}
                  </p>
                  <p className="mt-1 font-display text-lg font-light tracking-tight text-white">
                    {lang === "es" ? "27,500 ft² de capacidad" : "27,500 ft² capacity"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: list */}
          <div className="lg:col-span-7">
            <ul className="sm:hidden divide-y divide-white/10 border-y border-white/10">
              {mobileItems.map((item, idx) => (
                <motion.li
                  key={item}
                  data-testid={`specialized-mobile-item-${idx}`}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  className="flex items-start gap-4 py-3.5"
                >
                  <span className="font-mono text-[10px] text-slate-500 w-7 pt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-light leading-snug tracking-tight flex-1">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <button
              type="button"
              data-testid="specialized-mobile-toggle"
              onClick={() => setShowAllMobile((value) => !value)}
              className="sm:hidden mt-5 w-full border border-white/15 px-5 py-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"
              aria-expanded={showAllMobile}
            >
              <span>{showAllMobile ? (lang === "es" ? "Ver menos" : "Show less") : (lang === "es" ? "Ver todos" : "Show all")}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showAllMobile ? "rotate-180" : ""}`}
                strokeWidth={1.5}
              />
            </button>

            <ul className="hidden sm:block divide-y divide-white/10 border-y border-white/10">
              {t.specialized.items.map((item, idx) => (
                <motion.li
                  key={item}
                  data-testid={`specialized-item-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="group flex items-center gap-4 py-4 sm:py-4 hover:px-4 transition-all duration-300 cursor-default"
                >
                  <span className="font-mono text-[11px] text-slate-500 w-7">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base sm:text-lg font-light tracking-tight flex-1 group-hover:text-blue-300 transition-colors">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

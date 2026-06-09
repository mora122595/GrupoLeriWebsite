import { useState } from "react";
import { motion } from "framer-motion";
import {
  Ship, Globe2, FileSearch, Compass, Truck, Warehouse,
  Repeat, PackageCheck, Forklift, ArrowUpRight, ChevronDown,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ICONS = [Globe2, Compass, FileSearch, Ship, Truck, Warehouse, Repeat, PackageCheck, Forklift];

export default function Services() {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState(0);

  return (
    <section
      id="services"
      data-testid="services-section"
      className="bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#0052FF]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0052FF]">
              {t.services.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.05]">
            {t.services.title}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="sm:hidden border border-slate-200 bg-slate-200">
          {t.services.items.map((s, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const isActive = activeService === idx;

            return (
              <div key={s.title} className="bg-white border-b border-slate-200 last:border-b-0">
                <button
                  type="button"
                  data-testid={`service-mobile-${idx}`}
                  onClick={() => setActiveService(isActive ? -1 : idx)}
                  className="w-full min-h-20 px-5 py-4 flex items-center gap-4 text-left"
                  aria-expanded={isActive}
                >
                  <Icon className="w-5 h-5 text-[#0052FF] shrink-0" strokeWidth={1.5} />
                  <span className="flex-1 font-display text-lg font-medium tracking-tight text-slate-900">
                    {s.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isActive ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 pl-14 text-sm text-slate-600 leading-relaxed"
                  >
                    {s.desc}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {t.services.items.map((s, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.article
                key={s.title}
                data-testid={`service-card-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: idx * 0.16 }}
                className="group bg-white p-8 lg:p-10 relative hover:bg-[#0A192F] transition-colors duration-500 cursor-default"
              >
                <div className="flex items-start justify-between mb-12">
                  <Icon
                    className="w-7 h-7 text-[#0052FF] group-hover:text-blue-300 transition-colors"
                    strokeWidth={1.25}
                  />
                  <ArrowUpRight
                    className="w-5 h-5 text-slate-300 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-slate-900 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed">
                  {s.desc}
                </p>
                <span className="absolute top-8 right-8 left-auto text-[10px] font-mono text-slate-300 group-hover:text-slate-600 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

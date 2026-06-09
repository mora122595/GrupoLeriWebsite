import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Stats() {
  const { t } = useLanguage();
  return (
    <section data-testid="stats-section" className="bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#0052FF]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0052FF]">
                {t.stats.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.05]">
              {t.stats.title}
            </h2>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:gap-10">
            {t.stats.items.map((item, idx) => (
              <motion.div
                key={item.label}
                data-testid={`stat-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="border-t border-slate-900 pt-5"
              >
                <p className="font-display text-5xl sm:text-6xl font-light tracking-tighter text-slate-900">
                  {item.value}
                </p>
                <p className="mt-3 text-sm text-slate-500 max-w-[180px]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

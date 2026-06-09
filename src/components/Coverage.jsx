import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const GOOGLE_MAP_SRC =
  "https://www.google.com/maps/d/u/0/embed?mid=1rEwQyoBx6hknm1WMnBhq8LHgFK6W4X0&ehbc=2E312F&noprof=1";

export default function Coverage() {
  const { t } = useLanguage();

  return (
    <section
      id="coverage"
      data-testid="coverage-section"
      className="bg-white border-b border-slate-200"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <div className="grid min-w-0 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-stretch">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#0052FF]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0052FF]">
                {t.coverage.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.05]">
              {t.coverage.title}
            </h2>
            <p className="mt-6 text-base text-slate-600 leading-relaxed">
              {t.coverage.subtitle}
            </p>

            <ul className="mt-10 space-y-4">
              {t.coverage.locations.map((loc, idx) => (
                <motion.li
                  key={loc.name}
                  data-testid={`coverage-loc-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex items-start gap-4 border-b border-slate-200 pb-4 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-[#0052FF] mt-1 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-display font-medium text-slate-900">{loc.name}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative min-w-0">
            <div className="relative max-w-full bg-[#0A192F] aspect-[16/12] lg:aspect-auto lg:h-full min-h-[420px] overflow-hidden border border-slate-200">
              <iframe
                data-testid="coverage-google-map"
                title="Grupo LERI coverage map"
                src={GOOGLE_MAP_SRC}
                className="absolute inset-0 block w-full max-w-full h-full grayscale-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute left-0 right-0 bottom-0 p-6 bg-gradient-to-t from-[#040B16]/90 via-[#040B16]/60 to-transparent pointer-events-none">
                <p className="font-display text-2xl sm:text-3xl font-light tracking-tight text-white">
                  Network
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

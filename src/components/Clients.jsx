import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const imagePath = (file) => `${process.env.PUBLIC_URL}/images/${file}`;

const CLIENTS = [
  { name: "MEXEX", logo: imagePath("mexex.png") },
  { name: "Org@tec", logo: imagePath("orgatec.png") },
  { name: "KAZA Logistics", logo: imagePath("kaza.png") },
  { name: "Eclipse Mold, Inc.", logo: imagePath("exlipse.png") },
  { name: "Hirotai", logo: imagePath("hirotai.png") },
  { name: "Pack3000", logo: imagePath("pack3000.png") },
  { name: "DJGM S.A. de C.V." },
  { name: "Almacenadora Mexico", logo: imagePath("almacenadoramexico.png") },
  { name: "Lubrinor S.A. de C.V." },
  { name: "Almex", logo: imagePath("almex.png") },
  { name: "Logistica Lex S. de R.L. de C.V." },
];

export default function Clients() {
  const { lang } = useLanguage();
  const [showAllMobile, setShowAllMobile] = useState(false);
  const mobileClients = showAllMobile ? CLIENTS : CLIENTS.slice(0, 5);

  const copy =
    lang === "es"
      ? {
          eyebrow: "Clientes",
          title: "Empresas líderes que han depositado su confianza en nosotros.",
          subtitle:
            "A lo largo de nuestra trayectoria, hemos tenido el privilegio de colaborar con empresas líderes en distintos sectores, quienes confían en Grupo LERI para gestionar sus operaciones aduanales.",
        }
      : {
          eyebrow: "Clients",
          title: "Industry leaders that have placed their trust in us.",
          subtitle:
            "Throughout our journey we've had the privilege of working with leading companies across multiple sectors who trust Grupo LERI to manage their customs operations.",
        };

  return (
    <section
      id="clients"
      data-testid="clients-section"
      className="bg-white border-b border-slate-200"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-10 lg:mb-12 items-end">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#0052FF]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0052FF]">
                {copy.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.05]">
              {copy.title}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pb-2">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {copy.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:hidden gap-px bg-slate-200 border border-slate-200">
          {mobileClients.map((c, idx) => (
            <motion.div
              key={c.name}
              data-testid={`client-mobile-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group bg-white aspect-[5/3] flex flex-col items-center justify-center text-center p-5 relative"
            >
              {c.logo ? (
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  className="max-h-12 max-w-[76%] object-contain"
                />
              ) : (
                <span className="font-display text-sm font-semibold tracking-tight text-slate-700">
                  {c.name}
                </span>
              )}
              {c.note && (
                <span className="mt-3 text-[9px] font-mono uppercase tracking-widest text-slate-400">
                  {c.note}
                </span>
              )}
              <span className="absolute top-3 left-3 font-mono text-[10px] text-slate-300">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}

          <motion.button
            type="button"
            data-testid="clients-mobile-toggle"
            onClick={() => setShowAllMobile((value) => !value)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: mobileClients.length * 0.08 }}
            className="bg-white aspect-[5/3] flex items-center justify-center text-center p-5 relative"
            aria-expanded={showAllMobile}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              {showAllMobile
                ? lang === "es"
                  ? "- ver menos"
                  : "- show less"
                : lang === "es"
                  ? "+ ver mas"
                  : "+ show more"}
            </span>
          </motion.button>
        </div>

        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {CLIENTS.map((c, idx) => (
            <motion.div
              key={c.name}
              data-testid={`client-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: idx * 0.14 }}
              className="group bg-white aspect-[5/3] flex flex-col items-center justify-center text-center p-6 hover:bg-[#F8FAFC] transition-colors relative"
            >
              {c.logo ? (
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  className="max-h-16 max-w-[72%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="font-display text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-slate-700 group-hover:text-[#0052FF] transition-colors">
                  {c.name}
                </span>
              )}
              {c.note && (
                <span className="mt-3 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {c.note}
                </span>
              )}
              <span className="absolute top-3 left-3 font-mono text-[10px] text-slate-300 group-hover:text-slate-500 transition-colors">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
          <motion.div
            data-testid="client-more"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: CLIENTS.length * 0.14 }}
            className="group bg-white aspect-[5/3] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors relative"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              + {lang === "es" ? "muchos mas" : "many more"}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

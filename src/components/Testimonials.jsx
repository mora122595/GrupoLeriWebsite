import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "";

const FALLBACK_ITEMS = [
  {
    id: "fallback-1",
    name: "Alejandro Ramírez",
    company: "",
    role_es: "Coordinador de Importaciones",
    role_en: "Import Coordinator",
    quote_es:
      "Su atención y capacidad de respuesta hacen la diferencia. Siempre recibimos la documentación correcta y a tiempo para mantener nuestras operaciones en marcha.",
    quote_en:
      "Their attention and responsiveness make the difference. We always receive the correct documentation on time to keep our operations moving.",
  },
  {
    id: "fallback-2",
    name: "Carlos Martínez",
    company: "",
    role_es: "Gerente de Logística",
    role_en: "Logistics Manager",
    quote_es:
      "Nuestra mercancía siempre llega en excelentes condiciones, incluso en operaciones especializadas. El cuidado, seguimiento y profesionalismo de Grupo LERI nos brindan total confianza.",
    quote_en:
      "Our goods always arrive in excellent condition, even in specialized operations. Grupo LERI's care, follow-up, and professionalism give us complete confidence.",
  },
  {
    id: "fallback-3",
    name: "Ana Rodríguez",
    company: "",
    role_es: "Coordinadora de Logística",
    role_en: "Logistics Coordinator",
    quote_es:
      "Su flexibilidad y atención hacen la diferencia. Incluso fuera de horario, siempre encontramos apoyo y soluciones rápidas cuando más las necesitamos.",
    quote_en:
      "Their flexibility and attention make the difference. Even after hours, we always find support and quick solutions when we need them most.",
  },
];

export default function Testimonials() {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!API) {
      setItems(FALLBACK_ITEMS);
      return;
    }

    let alive = true;
    axios
      .get(`${API}/testimonials`)
      .then((r) => alive && setItems(r.data || []))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (activeIndex >= items.length) setActiveIndex(0);
  }, [activeIndex, items.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  const getAttribution = (tm) => {
    const role = lang === "es" ? tm.role_es : tm.role_en;
    return tm.company ? `${role} · ${tm.company}` : role;
  };

  const renderCard = (tm, idx, extraClass = "") => (
    <article
      key={tm.id}
      data-testid={`testimonial-${idx}`}
      className={`bg-white p-8 lg:p-10 flex flex-col ${extraClass}`}
    >
      <Quote className="w-7 h-7 text-[#0052FF] mb-6" strokeWidth={1.25} />
      <p className="font-display text-lg sm:text-xl font-light leading-relaxed text-slate-900 flex-1">
        "{lang === "es" ? tm.quote_es : tm.quote_en}"
      </p>
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div>
          <p className="font-medium text-sm text-slate-900">{tm.name}</p>
          <p className="text-xs text-slate-500 mt-1">
            {getAttribution(tm)}
          </p>
        </div>
      </div>
    </article>
  );

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#0052FF]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0052FF]">
              {t.testimonials.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.05]">
            {t.testimonials.title}
          </h2>
        </div>

        {items.length > 0 && (
          <div className="md:hidden">
            <div className="border border-slate-200">
              {renderCard(items[activeIndex], activeIndex, "min-h-[430px]")}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {items.map((tm, idx) => (
                  <button
                    key={tm.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeIndex === idx ? "w-8 bg-[#0052FF]" : "w-1.5 bg-slate-300"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid="testimonial-prev"
                  onClick={goToPrevious}
                  className="w-11 h-11 border border-slate-200 bg-white flex items-center justify-center text-slate-700"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  data-testid="testimonial-next"
                  onClick={goToNext}
                  className="w-11 h-11 border border-slate-200 bg-white flex items-center justify-center text-slate-700"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {items.map((tm, idx) => renderCard(tm, idx))}
        </div>
      </div>
    </section>
  );
}

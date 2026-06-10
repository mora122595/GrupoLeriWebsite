import { useState } from "react";
import axios from "axios";
import { ArrowRight, ShieldCheck, Clock, Mail, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "";
const FORM_SUBMIT_EMAIL = process.env.REACT_APP_FORM_SUBMIT_EMAIL || "mora_mrls@hotmail.com";
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`;

const INITIAL = {
  full_name: "",
  company: "",
  email: "",
  phone: "",
  service_type: "",
  origin: "",
  destination: "",
  message: "",
};

export default function QuoteForm() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.service_type) {
      toast.error(lang === "es" ? "Completa los campos obligatorios." : "Please fill required fields.");
      return;
    }
    setLoading(true);
    try {
      if (API) {
        await axios.post(`${API}/quotes`, { ...form, language: lang });
      } else {
        await axios.post(
          FORM_SUBMIT_URL,
          {
            _subject: `Nueva solicitud de cotizacion - ${form.company || form.full_name}`,
            _template: "table",
            _captcha: "false",
            nombre: form.full_name,
            empresa: form.company || "No especificada",
            email: form.email,
            telefono: form.phone,
            servicio: form.service_type,
            origen: form.origin || "No especificado",
            destino: form.destination || "No especificado",
            mensaje: form.message || "Sin mensaje adicional",
            idioma: lang,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
      }
      toast.success(t.quote.success);
      setForm(INITIAL);
    } catch (err) {
      toast.error(t.quote.error);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0052FF] transition-colors";
  const labelCls = "text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 block";

  return (
    <section
      id="contact"
      data-testid="quote-section"
      className="bg-white border-b border-slate-200"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: value prop */}
          <div className="lg:col-span-5 flex flex-col lg:min-h-full lg:justify-between">
            <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#0052FF]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0052FF]">
                {t.quote.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.05]">
              {t.quote.title}
            </h2>
            <p className="mt-6 text-base text-slate-600 leading-relaxed max-w-md">
              {t.quote.subtitle}
            </p>

            <ul className="mt-10 space-y-5 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{lang === "es" ? "Respuesta en < 24 h hábiles." : "Reply within 24 business hours."}</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{lang === "es" ? "Asesoría aduanal sin costo · NDA bajo solicitud." : "Free customs consultation · NDA on request."}</span>
              </li>
            </ul>

            <div className="hidden lg:grid mt-14 grid-cols-3 border-y border-slate-200 divide-x divide-slate-200">
              {[
                { value: "+30", label: lang === "es" ? "años de experiencia" : "years of experience" },
                { value: "MX/USA", label: lang === "es" ? "operación binacional" : "binational operation" },
                { value: "24/7", label: lang === "es" ? "emergencias" : "emergencies" },
              ].map((item) => (
                <div key={item.value} className="py-5 px-3 text-center">
                  <p className="font-mono text-sm text-[#0052FF] tracking-[0.18em]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            </div>

            {/* Two-office contact card */}
            <div className="hidden lg:grid mt-14 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
              <div data-testid="contact-office-usa" className="bg-white px-6 py-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#0052FF] mb-2">
                  USA · Laredo, TX
                </p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo-leri-azul.png`}
                  alt="LERI Forwarding logo"
                  className="mb-5 h-14 w-full object-contain object-center"
                />
                <p className="text-sm font-semibold text-slate-900">LERI Forwarding Inc.</p>
                <p className="text-xs text-slate-500 mt-0.5">210 Flecha Ln.</p>
                <div className="mt-5 space-y-2.5">
                  <a href="tel:+19567255002" className="flex items-center justify-center gap-2 text-xs font-mono text-slate-700 hover:text-[#0052FF]">
                    <Phone className="w-3 h-3" strokeWidth={1.5} /> +1 (956) 725-5002
                  </a>
                  <a href="mailto:ricardo.salinas@grupo-leri.com" className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-700 hover:text-[#0052FF] whitespace-nowrap">
                    <Mail className="w-3 h-3 shrink-0" strokeWidth={1.5} /> ricardo.salinas@grupo-leri.com
                  </a>
                </div>
              </div>
              <div data-testid="contact-office-mx" className="bg-white px-6 py-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#0052FF] mb-2">
                  MX · Nuevo Laredo
                </p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo-sv-azul.png`}
                  alt="Salinas Vela logo"
                  className="mb-5 h-14 w-full object-contain object-center"
                />
                <p className="text-sm font-semibold text-slate-900">Salinas Vela Asesores SC</p>
                <p className="text-xs text-slate-500 mt-0.5">Privada Chihuahua 1546</p>
                <div className="mt-5 space-y-2.5">
                  <a href="tel:+528677193410" className="flex items-center justify-center gap-2 text-xs font-mono text-slate-700 hover:text-[#0052FF]">
                    <Phone className="w-3 h-3" strokeWidth={1.5} /> +52 (867) 719-3410
                  </a>
                  <a href="mailto:ventas@grupo-leri.com" className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-700 hover:text-[#0052FF] whitespace-nowrap">
                    <Mail className="w-3 h-3 shrink-0" strokeWidth={1.5} /> ventas@grupo-leri.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <form
              data-testid="quote-form"
              onSubmit={onSubmit}
              className="bg-[#F8FAFC] border border-slate-200 p-8 sm:p-10 lg:p-12"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelCls}>{t.quote.labels.full_name} *</label>
                  <input
                    data-testid="input-full-name"
                    name="full_name"
                    value={form.full_name}
                    onChange={onChange}
                    placeholder={t.quote.placeholders.full_name}
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>{t.quote.labels.company}</label>
                  <input
                    data-testid="input-company"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    placeholder={t.quote.placeholders.company}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t.quote.labels.phone} *</label>
                  <input
                    data-testid="input-phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder={t.quote.placeholders.phone}
                    className={inputCls}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>{t.quote.labels.email} *</label>
                  <input
                    data-testid="input-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder={t.quote.placeholders.email}
                    className={inputCls}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>{t.quote.labels.service_type} *</label>
                  <select
                    data-testid="input-service"
                    name="service_type"
                    value={form.service_type}
                    onChange={onChange}
                    className={inputCls}
                    required
                  >
                    <option value="" disabled>
                      {t.quote.placeholders.service}
                    </option>
                    {t.quote.service_options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>{t.quote.labels.origin}</label>
                  <input
                    data-testid="input-origin"
                    name="origin"
                    value={form.origin}
                    onChange={onChange}
                    placeholder={t.quote.placeholders.origin}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t.quote.labels.destination}</label>
                  <input
                    data-testid="input-destination"
                    name="destination"
                    value={form.destination}
                    onChange={onChange}
                    placeholder={t.quote.placeholders.destination}
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>{t.quote.labels.message}</label>
                  <textarea
                    data-testid="input-message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder={t.quote.placeholders.message}
                    rows={4}
                    className={inputCls + " resize-none"}
                  />
                </div>
              </div>

              <button
                data-testid="quote-submit"
                type="submit"
                disabled={loading}
                className="mt-8 group inline-flex items-center justify-center gap-3 bg-[#0052FF] hover:bg-[#003ECC] disabled:opacity-50 text-white text-sm font-medium px-8 py-4 transition-colors w-full sm:w-auto"
              >
                {loading ? t.quote.submitting : t.quote.submit}
                {!loading && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                )}
              </button>
            </form>
          </div>

          <div className="lg:hidden">
            <div className="grid grid-cols-3 border-y border-slate-200 divide-x divide-slate-200">
              {[
                { value: "+30", label: lang === "es" ? "años de experiencia" : "years of experience" },
                { value: "MX/USA", label: lang === "es" ? "operación binacional" : "binational operation" },
                { value: "24/7", label: lang === "es" ? "emergencias" : "emergencies" },
              ].map((item) => (
                <div key={item.value} className="py-5 px-3 text-center">
                  <p className="font-mono text-sm text-[#0052FF] tracking-[0.18em]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
              <div data-testid="contact-office-usa-mobile" className="bg-white px-6 py-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#0052FF] mb-2">
                  USA · Laredo, TX
                </p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo-leri-azul.png`}
                  alt="LERI Forwarding logo"
                  className="mb-5 h-14 w-full object-contain object-center"
                />
                <p className="text-sm font-semibold text-slate-900">LERI Forwarding Inc.</p>
                <p className="text-xs text-slate-500 mt-0.5">210 Flecha Ln.</p>
                <div className="mt-5 space-y-2.5">
                  <a href="tel:+19567255002" className="flex items-center justify-center gap-2 text-xs font-mono text-slate-700 hover:text-[#0052FF]">
                    <Phone className="w-3 h-3" strokeWidth={1.5} /> +1 (956) 725-5002
                  </a>
                  <a href="mailto:ricardo.salinas@grupo-leri.com" className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-700 hover:text-[#0052FF] whitespace-nowrap">
                    <Mail className="w-3 h-3 shrink-0" strokeWidth={1.5} /> ricardo.salinas@grupo-leri.com
                  </a>
                </div>
              </div>
              <div data-testid="contact-office-mx-mobile" className="bg-white px-6 py-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#0052FF] mb-2">
                  MX · Nuevo Laredo
                </p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo-sv-azul.png`}
                  alt="Salinas Vela logo"
                  className="mb-5 h-14 w-full object-contain object-center"
                />
                <p className="text-sm font-semibold text-slate-900">Salinas Vela Asesores SC</p>
                <p className="text-xs text-slate-500 mt-0.5">Privada Chihuahua 1546</p>
                <div className="mt-5 space-y-2.5">
                  <a href="tel:+528677193410" className="flex items-center justify-center gap-2 text-xs font-mono text-slate-700 hover:text-[#0052FF]">
                    <Phone className="w-3 h-3" strokeWidth={1.5} /> +52 (867) 719-3410
                  </a>
                  <a href="mailto:ventas@grupo-leri.com" className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-700 hover:text-[#0052FF] whitespace-nowrap">
                    <Mail className="w-3 h-3 shrink-0" strokeWidth={1.5} /> ventas@grupo-leri.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

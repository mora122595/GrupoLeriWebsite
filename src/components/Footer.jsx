import { useLanguage } from "../context/LanguageContext";
import { ArrowUpRight, Mail, Phone, MapPin, AlertCircle, Clock } from "lucide-react";

const OFFICES = [
  {
    id: "usa",
    brand: "LERI Forwarding Inc.",
    address: "210 Flecha Ln., Laredo, Texas",
    phone: "+1 (956) 725-5002",
    email: "ricardo.salinas@grupo-leri.com",
    hours: "9 am – 6 pm",
    emergency: "+1 (956) 324-1816",
    flag: "USA",
  },
  {
    id: "mx",
    brand: "Salinas Vela Asesores SC",
    address: "Privada Chihuahua 1546, Nuevo Laredo, Tamps.",
    phone: "+52 (867) 719-3410",
    email: "ventas@grupo-leri.com",
    hours: "9 am – 6 pm",
    emergency: "+52 (867) 171-2643",
    flag: "MX",
  },
];

export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer data-testid="site-footer" className="bg-[#040B16] text-white">
      {/* Director bar */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl sm:text-3xl font-light tracking-tight">
              LRI. Ricardo I. Salinas Vela
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {lang === "es" ? "Director General" : "Managing Director"}
            </p>
          </div>
          <div className="lg:col-span-7 flex lg:justify-end items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-[#0052FF]/10 border border-[#0052FF]/30 text-blue-300 px-4 py-2 text-xs font-medium uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {lang === "es" ? "Asesoría aduanal sin costo" : "Free customs consultation"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">
        {/* Top */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img
              src="/images/logo_solo.png"
              alt="Grupo LERI logo"
              className="mb-6 h-12 w-[8.4rem] object-fill object-left"
            />
            <p className="font-display text-xl sm:text-2xl font-light tracking-tight max-w-md leading-snug">
              {t.footer.tagline}
            </p>
            <a
              data-testid="footer-cta"
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-white transition-colors link-underline"
            >
              {t.nav.cta}
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>

          {/* Offices */}
          {OFFICES.map((o) => (
            <div key={o.id} data-testid={`office-${o.id}`} className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-300">
                  {o.flag}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <p className="font-display text-base font-semibold tracking-tight text-white">
                {o.brand}
              </p>
              <ul className="mt-5 space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-blue-300 shrink-0" strokeWidth={1.5} />
                  <span>{o.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-blue-300 shrink-0" strokeWidth={1.5} />
                  <a href={`tel:${o.phone.replace(/\s|\(|\)|-/g, "")}`} className="font-mono hover:text-white transition-colors">
                    {o.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-blue-300 shrink-0" strokeWidth={1.5} />
                  <a href={`mailto:${o.email}`} className="font-mono hover:text-white transition-colors break-all">
                    {o.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-blue-300 shrink-0" strokeWidth={1.5} />
                  <span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 block">
                      {lang === "es" ? "Horario" : "Hours"}
                    </span>
                    {o.hours}
                  </span>
                </li>
                <li className="flex items-start gap-3 pt-3 mt-3 border-t border-white/5">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" strokeWidth={1.5} />
                  <span>
                    <span className="text-[10px] uppercase tracking-widest text-orange-300/80 block">
                      {lang === "es" ? "Emergencias 24/7" : "Emergencies 24/7"}
                    </span>
                    <a href={`tel:${o.emergency.replace(/\s|\(|\)|-/g, "")}`} className="font-mono hover:text-white transition-colors">
                      {o.emergency}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} Grupo LERI. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

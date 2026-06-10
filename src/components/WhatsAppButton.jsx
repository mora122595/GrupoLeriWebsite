import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "19565161917";
const WHATSAPP_MESSAGE =
  "Hola, me gustaría ponerme en contacto con un asesor de Grupo LERI para conocer más sobre sus servicios.";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex h-14 items-center gap-3 rounded-full bg-[#25D366] px-4 text-white shadow-2xl shadow-emerald-950/25 ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1FB855] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-6 sm:right-6 sm:h-16 sm:px-5 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-6 w-6 sm:h-7 sm:w-7"
        fill="currentColor"
      >
        <path d="M16.01 3.2c-7.07 0-12.82 5.72-12.82 12.75 0 2.25.6 4.45 1.73 6.38L3.08 29l6.86-1.8a12.9 12.9 0 0 0 6.07 1.53c7.07 0 12.82-5.72 12.82-12.76S23.08 3.2 16.01 3.2Zm0 23.36c-1.94 0-3.84-.52-5.5-1.51l-.39-.23-4.07 1.07 1.09-3.96-.26-.41a10.48 10.48 0 0 1-1.61-5.57c0-5.83 4.82-10.58 10.74-10.58 5.91 0 10.73 4.75 10.73 10.58 0 5.84-4.82 10.61-10.73 10.61Zm5.89-7.95c-.32-.16-1.91-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.59-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.5.14-.66.15-.14.32-.38.49-.57.16-.19.22-.32.33-.53.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.15 3.09 1.31 3.3.16.21 2.26 3.43 5.48 4.81.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.91-.78 2.18-1.54.27-.75.27-1.4.19-1.54-.08-.13-.29-.21-.62-.37Z" />
      </svg>
      <span className="hidden pr-1 text-sm font-semibold tracking-tight sm:block">
        WhatsApp
      </span>
    </a>
  );
}

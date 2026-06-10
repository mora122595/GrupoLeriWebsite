import ScrollNavbar from "../components/ScrollNavbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import SpecializedServices from "../components/SpecializedServices";
import Coverage from "../components/Coverage";
import Clients from "../components/Clients";
import Testimonials from "../components/Testimonials";
import QuoteForm from "../components/QuoteForm";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Landing() {
  return (
    <main data-testid="landing-page" className="bg-white">
      <ScrollNavbar />
      <Hero />
      <Stats />
      <Services />
      <SpecializedServices />
      <Coverage />
      <Clients />
      <Testimonials />
      <QuoteForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

import Hero from "@/components/Hero";
import SignalStrip from "@/components/sections/SignalStrip";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Tech from "@/components/sections/Tech";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="home-page">
      <Hero />
      <SignalStrip />
      <Work limit={4} />
      <Services />
      <Tech />
      <About />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}

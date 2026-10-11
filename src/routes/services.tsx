import Navbar from "@/components/Navbar";
import Services from "@/components/sections/Services";
import Footer from "@/components/sections/Footer";

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <div className="page-banner">
        <Navbar />
      </div>
      <Services standalone />
      <Footer />
    </main>
  );
}

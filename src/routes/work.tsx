import Navbar from "@/components/Navbar";
import Work from "@/components/sections/Work";
import Footer from "@/components/sections/Footer";

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      <div className="page-banner">
        <Navbar />
      </div>
      <Work />
      <Footer />
    </main>
  );
}

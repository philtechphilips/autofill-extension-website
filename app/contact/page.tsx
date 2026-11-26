import SiteShell from "@/components/site/SiteShell";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Contact from "@/components/landing/Contact";

export default function ContactPage() {
  return (
    <SiteShell>
      <Navbar />
      <main>
        <Contact />
      </main>
      <Footer />
    </SiteShell>
  );
}

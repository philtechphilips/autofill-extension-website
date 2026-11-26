import SiteShell from "@/components/site/SiteShell";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FormTypes from "@/components/landing/FormTypes";
import Statement from "@/components/landing/Statement";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <SiteShell>
      <Navbar />
      <main>
        <Hero />
        <FormTypes />
        <Statement />
        <Problem />
        <HowItWorks />
        <Features />
        <Security />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </SiteShell>
  );
}

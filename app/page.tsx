import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import Testimonials from "@/components/landing/Testimonials";
import Demo from "@/components/landing/Demo";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Pricing />
      <Security />
      {/* <Testimonials /> */}
      <Demo />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import WhyChoose from "@/components/sections/WhyChoose";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" id="main-content">
        <Hero />
        <TrustStrip />
        <WhyChoose />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
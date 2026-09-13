import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChoose from "@/components/sections/WhyChoose";
import HoursContactSection from "@/components/sections/HoursContact";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" id="main-content">
        <Hero />
        <ServicesSection />
        <WhyChoose />
        <HoursContactSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
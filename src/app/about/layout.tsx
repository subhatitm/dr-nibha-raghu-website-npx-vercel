import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
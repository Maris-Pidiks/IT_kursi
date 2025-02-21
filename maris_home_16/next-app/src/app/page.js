import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <HeroSection />
      <Footer />
    </div>
  );
}

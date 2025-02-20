import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Content from "./components/Content";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Content />
      <Footer />
    </>
  );
}

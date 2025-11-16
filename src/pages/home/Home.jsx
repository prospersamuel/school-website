import HeroSection from "./HeroSection";
import ProgramsSection from "./ProgramsSection";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import AdmissionsSection from "./AdmissionsSection";
import Contact from "./Contact";
import ScrollToTop from "../../components/ScrollToTop";

export default function Home() {
  return (
    <div className="bg-white overflow-hidden text-blue-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <AdmissionsSection />
      <Contact />
      <Footer />
      <ScrollToTop/>
    </div>
  );
}
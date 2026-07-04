import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import GallerySection from '../components/GallerySection';
import ProgramSection from '../components/ProgramSection';
import DivisiSection from '../components/DivisiSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ProgramSection />
      <DivisiSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

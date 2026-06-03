import { useSmoothScroll } from './hooks/useSmoothScroll';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';
import Navbar from './components/ui/Navbar';
import BackgroundEffects from './components/ui/BackgroundEffects';
import FilmGrain from './components/ui/FilmGrain';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ExpertiseSection from './components/sections/ExpertiseSection';
import FeaturedWork from './components/sections/FeaturedWork';
import BooksSection from './components/sections/BooksSection';
import PodcastSection from './components/sections/PodcastSection';
import ComedySection from './components/sections/ComedySection';
import MusicSection from './components/sections/MusicSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import SocialSection from './components/sections/SocialSection';
import ContactSection from './components/sections/ContactSection';
import BlogSection from './components/blog/BlogSection';
import Footer from './components/sections/Footer';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <BackgroundEffects />
      <FilmGrain />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <AchievementsSection />
        <ExpertiseSection />
        <FeaturedWork />
        <BooksSection />
        <PodcastSection />
        <ComedySection />
        <MusicSection />
        <TestimonialsSection />
        <BlogSection />
        <SocialSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}


import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Headphones, ArrowUpRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const podcasts = [
  { 
    title: "Vibefully #02 - Keerthika on studying in NIFT, Science behind fashion, Work, Life & More...", 
    year: '2022', 
    image: 'https://img.youtube.com/vi/R1TRpT99PSo/hqdefault.jpg', 
    description: 'A deep dive into fashion science and NIFT experiences.', 
    link: 'https://youtu.be/R1TRpT99PSo' 
  },
  { 
    title: "Vibefully #01 - Shirish Pelakur on living & studying in the US, education and more...", 
    year: '2022', 
    image: 'https://img.youtube.com/vi/_dOINxqAbEs/hqdefault.jpg', 
    description: 'Discussions on living abroad, US education, and adapting to a new culture.', 
    link: 'https://youtu.be/_dOINxqAbEs' 
  },
  { 
    title: "The Podcast Thingy Ep.01 - Parenting, Culture & More | Vinod Naraen ft. Tess", 
    year: '2021', 
    image: 'https://img.youtube.com/vi/tmeP2RHBEPc/hqdefault.jpg', 
    description: 'An engaging talk exploring parenting dynamics and cultural perspectives.', 
    link: 'https://youtu.be/tmeP2RHBEPc' 
  },
  { 
    title: "School Stories | VinSanity Reads Reddit", 
    year: '2023', 
    image: 'https://img.youtube.com/vi/WDOoDxy8HSE/hqdefault.jpg', 
    description: 'Reacting to some of the wildest and most relatable school stories from Reddit.', 
    link: 'https://youtu.be/WDOoDxy8HSE' 
  },
  { 
    title: "Red Flags Stories | VinSanity Reads Reddit", 
    year: '2023', 
    image: 'https://img.youtube.com/vi/CACIU-fwaXk/hqdefault.jpg', 
    description: 'Uncovering hilarious and shocking relationship red flags submitted online.', 
    link: 'https://youtu.be/CACIU-fwaXk' 
  },
  { 
    title: "Cheating Stories | VinSanity Reads Reddit", 
    year: '2023', 
    image: 'https://img.youtube.com/vi/ueOpj2f-IGU/hqdefault.jpg', 
    description: 'Reading through dramatic cheating confessions and stories from the internet.', 
    link: 'https://youtu.be/ueOpj2f-IGU' 
  },
];

export default function PodcastSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isWheeling = useRef(false);
  const touchStartX = useRef(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % podcasts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length);
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only react to horizontal scrolling and throttle it
    if (isWheeling.current || Math.abs(e.deltaX) < 20) return;
    
    isWheeling.current = true;
    if (e.deltaX > 0) {
      handleNext();
    } else {
      handlePrev();
    }
    
    setTimeout(() => {
      isWheeling.current = false;
    }, 500); // 500ms cooldown between scroll triggers
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext(); // Swiped left -> next
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> prev
    }
  };

  const getCardStyle = (index: number) => {
    let offset = (index - currentIndex) % podcasts.length;
    // Normalize offset to be between -Math.floor(length/2) and Math.floor(length/2)
    if (offset < -Math.floor(podcasts.length / 2)) offset += podcasts.length;
    if (offset > Math.floor(podcasts.length / 2)) offset -= podcasts.length;

    if (offset === 0) {
      return { x: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0 };
    } else if (offset === 1) {
      return { x: '70%', scale: 0.85, zIndex: 5, opacity: 0.5, rotateY: -15 };
    } else if (offset === -1) {
      return { x: '-70%', scale: 0.85, zIndex: 5, opacity: 0.5, rotateY: 15 };
    } else {
      return { x: 0, scale: 0.6, zIndex: 1, opacity: 0, rotateY: 0 };
    }
  };

  return (
    <section id="podcasts" className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Podcast Episodes" subtitle="Listen in on conversations that entertain, inspire, and make you think." />
        <div 
          className="relative w-full h-[550px] flex items-center justify-center perspective-[1200px] mt-12 cursor-grab active:cursor-grabbing touch-pan-y"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false}>
            {podcasts.map((pod, i) => {
              const { x, scale, zIndex, opacity, rotateY } = getCardStyle(i);
              const isActive = zIndex === 10;
              
              return (
                <motion.div
                  key={pod.title}
                  className="absolute w-[300px] md:w-[380px] glass-card rounded-2xl overflow-hidden cursor-pointer"
                  animate={{ x, scale, zIndex, opacity, rotateY }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center center' }}
                  onClick={() => {
                    // Clicking a side card brings it to center
                    if (zIndex !== 10 && opacity > 0) {
                      setCurrentIndex(i);
                    }
                  }}
                >
                  {/* Cover image */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img src={pod.image} alt={pod.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-900 via-wine-900/40 to-transparent" />
                    
                    {/* Play button overlay - only fully active when card is center */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100 group-hover:opacity-100' : 'opacity-0'}`}>
                      <motion.a 
                        href={pod.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center shadow-lg" 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }} 
                        data-cursor="hover"
                      >
                        <Play size={24} weight="fill" className="text-wine-900 ml-1" />
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-6 bg-wine-900/80 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-3">
                      <Headphones size={14} className="text-gold-500" weight="fill" />
                      <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-mono">{pod.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-cream-100 mb-2 transition-colors duration-300 font-display line-clamp-2" title={pod.title}>{pod.title}</h3>
                    <p className="text-cream-300 text-sm leading-relaxed mb-6 line-clamp-2">{pod.description}</p>
                    
                    {isActive && (
                      <motion.a 
                        href={pod.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gold-500/70 hover:text-gold-500 text-sm transition-colors uppercase tracking-widest font-mono" 
                        whileHover={{ x: 4 }} 
                        data-cursor="hover"
                      >
                        <span>Listen Now</span>
                        <ArrowUpRight size={14} />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-8 mt-12 relative z-20">
          <button 
            onClick={handlePrev} 
            className="w-14 h-14 rounded-full border border-gold-500/30 flex items-center justify-center text-cream-300 hover:text-gold-500 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
            aria-label="Previous podcast"
            data-cursor="hover"
          >
            <CaretLeft size={24} weight="light" />
          </button>
          <button 
            onClick={handleNext} 
            className="w-14 h-14 rounded-full border border-gold-500/30 flex items-center justify-center text-cream-300 hover:text-gold-500 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
            aria-label="Next podcast"
            data-cursor="hover"
          >
            <CaretRight size={24} weight="light" />
          </button>
        </div>

      </div>
    </section>
  );
}

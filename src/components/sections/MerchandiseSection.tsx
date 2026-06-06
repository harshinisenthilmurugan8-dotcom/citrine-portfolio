import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CaretLeft, CaretRight, TShirt } from '@phosphor-icons/react';
import SectionHeading from '../ui/SectionHeading';

const products = [
  {
    title: "Navy Classic Tee",
    collection: 'Signature Series',
    image: '/tshirts/navy_f.png',
    description: 'Premium cotton blend designed for everyday comfort.',
  },
  {
    title: "Lavender Essential",
    collection: 'Signature Series',
    image: '/tshirts/lavender_f.png',
    description: 'A soft, muted tone that elevates your casual wardrobe.',
  },
  {
    title: "Butter Yellow Drop",
    collection: 'Signature Series',
    image: '/tshirts/butter_f.png',
    description: 'Vibrant and fresh, perfect for making a subtle statement.',
  },
  {
    title: "Olive Earth Tone",
    collection: 'Signature Series',
    image: '/tshirts/olive_f.png',
    description: 'Nature-inspired hue with a timeless, versatile appeal.',
  },
  {
    title: "Grey Melange",
    collection: 'Signature Series',
    image: '/tshirts/grey_f.png',
    description: 'The ultimate staple piece for any layered or minimal look.',
  },
];

export default function MerchandiseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isWheeling = useRef(false);
  const touchStartX = useRef(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isWheeling.current || Math.abs(e.deltaX) < 20) return;

    isWheeling.current = true;
    if (e.deltaX > 0) {
      handleNext();
    } else {
      handlePrev();
    }

    setTimeout(() => {
      isWheeling.current = false;
    }, 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const getCardStyle = (index: number) => {
    let offset = (index - currentIndex) % products.length;
    if (offset < -Math.floor(products.length / 2)) offset += products.length;
    if (offset > Math.floor(products.length / 2)) offset -= products.length;

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
    <section id="apparel" className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden bg-wine-950">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Signature Apparel" subtitle="Wearable expressions crafted with premium materials and thoughtful design." />
        <div
          className="relative w-full h-[550px] flex items-center justify-center perspective-[1200px] mt-12 cursor-grab active:cursor-grabbing touch-pan-y"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false}>
            {products.map((prod, i) => {
              const { x, scale, zIndex, opacity, rotateY } = getCardStyle(i);
              const isActive = zIndex === 10;

              return (
                <motion.div
                  key={prod.title}
                  className="absolute w-[300px] md:w-[350px] glass-card rounded-2xl overflow-hidden cursor-pointer bg-wine-900 border border-wine-800"
                  animate={{ x, scale, zIndex, opacity, rotateY }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center center' }}
                  onClick={() => {
                    if (zIndex !== 10 && opacity > 0) {
                      setCurrentIndex(i);
                    }
                  }}
                >
                  {/* Cover image */}
                  <div className="relative h-[300px] overflow-hidden bg-white/5 flex items-center justify-center p-4">
                    <motion.img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-900 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Info */}
                  <div className="p-6 bg-wine-900/80 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-3">
                      <TShirt size={14} className="text-gold-500" weight="fill" />
                      <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-mono">{prod.collection}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-cream-100 mb-2 transition-colors duration-300 font-display">{prod.title}</h3>
                    <p className="text-cream-300 text-sm leading-relaxed mb-4">{prod.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Swipe hints */}
          <div className="absolute left-1 md:left-4 bottom-10 md:top-1/2 md:-translate-y-1/2 z-20 pointer-events-none">
            <span className="text-gold-500/50 text-[9px] md:text-xs tracking-widest md:tracking-[0.25em] uppercase font-mono bg-wine-900/50 md:bg-transparent px-2 py-1 rounded-full backdrop-blur-sm md:backdrop-blur-none">
              ← Swipe
            </span>
          </div>
          <div className="absolute right-1 md:right-4 bottom-10 md:top-1/2 md:-translate-y-1/2 z-20 pointer-events-none">
            <span className="text-gold-500/50 text-[9px] md:text-xs tracking-widest md:tracking-[0.25em] uppercase font-mono bg-wine-900/50 md:bg-transparent px-2 py-1 rounded-full backdrop-blur-sm md:backdrop-blur-none">
              Swipe →
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-8 mt-6 relative z-20">
          <button
            onClick={handlePrev}
            className="w-14 h-14 rounded-full border border-gold-500/30 flex items-center justify-center text-cream-300 hover:text-gold-500 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
            aria-label="Previous product"
            data-cursor="hover"
          >
            <CaretLeft size={24} weight="light" />
          </button>
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full border border-gold-500/30 flex items-center justify-center text-cream-300 hover:text-gold-500 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
            aria-label="Next product"
            data-cursor="hover"
          >
            <CaretRight size={24} weight="light" />
          </button>
        </div>

        {/* Shop Link Below Animation */}
        <div className="flex items-center justify-center mt-12 relative z-20">
          <motion.a 
            href="https://www.franklywearing.com/creator/vinodnaraen?product_id=all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 text-cream-100 hover:text-gold-500 transition-colors duration-500 uppercase tracking-widest text-sm font-display group/btn"
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
          >
            <TShirt size={20} weight="light" className="text-wine-600 group-hover/btn:text-gold-500 transition-colors" />
            <span className="border-b border-gold-500/30 group-hover/btn:border-gold-500 pb-1 transition-colors">Shop Now</span>
            <ArrowUpRight size={16} />
          </motion.a>
        </div>

      </div>
    </section>
  );
}

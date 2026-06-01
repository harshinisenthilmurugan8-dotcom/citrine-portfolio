import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';

const categories = [
  { id: 'books', label: 'Books' },
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'comedy', label: 'Comedy' },
];

export default function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState('books');

  return (
    <section id="featured" className="relative py-32 px-6 lg:px-12 border-t border-wine-700/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
        
        {/* Header */}
        <ScrollReveal className="lg:w-1/3">
          <p className="text-gold-500 tracking-[0.2em] uppercase text-xs mb-6 font-mono">Portfolio</p>
          <h2 className="text-5xl md:text-6xl font-display text-cream-100 mb-8 leading-tight">Featured <br/><span className="italic text-cream-300">Works</span></h2>
          <p className="text-cream-300 font-light text-lg">Explore creative works spanning literature, audio narratives, and live comedy performances.</p>
        </ScrollReveal>

        {/* Categories */}
        <div className="lg:w-2/3 flex flex-col gap-12 mt-4">
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-8 md:gap-12 pb-6 border-b border-wine-600/50">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative pb-4 text-base md:text-lg uppercase tracking-[0.2em] transition-colors duration-500 font-display ${
                    activeCategory === cat.id ? 'text-gold-500 italic' : 'text-cream-300 hover:text-cream-100'
                  }`}
                  data-cursor="hover"
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <motion.div
                      className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gold-500"
                      layoutId="activeCategory"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Quick Preview CTA */}
          <ScrollReveal delay={0.3}>
            <motion.a
              href={`#${activeCategory}`}
              className="inline-flex items-center gap-4 text-cream-200 hover:text-gold-500 transition-colors group"
              data-cursor="hover"
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-sm tracking-[0.2em] uppercase font-mono">
                View {categories.find((c) => c.id === activeCategory)?.label} Details
              </span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
                weight="light"
              />
            </motion.a>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { MaskHappy, Ticket } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const shows = [
  { title: 'Jokes Blend Of Languages', image: '/images/comedy-blend.png', description: 'A hilarious multilingual comedy experience blending Tamil, Hindi, English, and everything in between.' },
  { title: 'Everything is Political', image: '/images/comedy-political.png', description: 'Sharp political satire that makes you laugh, think, and question everything.' },
];

export default function ComedySection() {
  return (
    <section id="comedy" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Comedy Shows" subtitle="Finding humor in life's absurdities — one punchline at a time." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shows.map((show, i) => (
            <ScrollReveal key={show.title} delay={i * 0.2} direction={i === 0 ? 'left' : 'right'}>
              <motion.div className="group relative rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500" whileHover={{ y: -5, scale: 1.01 }}>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img src={show.image} alt={show.title} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  {/* Floating emoji */}
                  <motion.div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                    <MaskHappy size={22} className="text-gold" weight="fill" />
                  </motion.div>
                </div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-ivory mb-2 group-hover:text-gold transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>{show.title}</h3>
                  <p className="text-ivory-dim text-sm leading-relaxed mb-4 max-w-md">{show.description}</p>
                  <motion.button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300 text-sm" whileHover={{ scale: 1.05 }} data-cursor="hover">
                    <Ticket size={16} weight="duotone" />
                    <span style={{ fontFamily: "'Space Grotesk', monospace" }}>Learn More</span>
                  </motion.button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

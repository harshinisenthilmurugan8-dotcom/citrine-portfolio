import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quotes, CaretLeft, CaretRight } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const testimonials = [
  {
    quote: "Vinod Naraen's writing style is conversational and cinematic.",
    person: 'Sakshee Sahu',
    org: 'The Literature Times',
  },
  {
    quote: 'Vinod Naraen is an emerging voice in contemporary Indian fiction, known for his witty storytelling and relatable characters.',
    person: 'Sakshee Sahu',
    org: 'The Literature Times',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="What People Are Saying" subtitle="Testimonials from listeners, readers, and audience members." />
        <ScrollReveal>
          <div className="relative glass-card rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            {/* Big decorative quote */}
            <Quotes size={80} className="text-gold/10 mx-auto mb-6" weight="fill" />
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <p className="text-2xl md:text-3xl text-ivory leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "{testimonials[current].quote}"
                </p>
                <div>
                  <p className="text-gold font-semibold text-lg">{testimonials[current].person}</p>
                  <p className="text-ivory-dim text-sm" style={{ fontFamily: "'Space Grotesk', monospace" }}>{testimonials[current].org}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <motion.button onClick={prev} className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} data-cursor="hover" aria-label="Previous">
                <CaretLeft size={18} weight="bold" />
              </motion.button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrent(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-gold w-6' : 'bg-gold/30'}`} data-cursor="hover" aria-label={`Testimonial ${idx + 1}`} />
                ))}
              </div>
              <motion.button onClick={next} className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} data-cursor="hover" aria-label="Next">
                <CaretRight size={18} weight="bold" />
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

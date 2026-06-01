import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';
import MagneticButton from '../ui/MagneticButton';

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Spotify', href: '#' },
  { label: 'TikTok', href: '#' },
];

export default function SocialSection() {
  return (
    <section id="social" className="relative py-32 px-6 lg:px-12 border-t border-wine-700/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        <ScrollReveal className="lg:w-1/3">
          <p className="text-gold-500 tracking-[0.2em] uppercase text-xs mb-6 font-mono">Connect</p>
          <h2 className="text-5xl md:text-6xl font-display text-cream-100 mb-6 leading-tight">Digital <br/><span className="italic text-cream-300">Presence</span></h2>
          <p className="text-cream-300 font-light text-lg max-w-sm">Follow the journey, join the conversation, and stay updated across all platforms.</p>
        </ScrollReveal>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {socials.map((social, i) => (
            <ScrollReveal key={social.label} delay={i * 0.1}>
              <MagneticButton strength={0.1}>
                <motion.a 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-8 border-b border-wine-600 hover:border-gold-500 transition-colors duration-500 w-full"
                  data-cursor="hover"
                >
                  <motion.span 
                    className="text-3xl font-display text-cream-100 group-hover:text-gold-500 transition-colors duration-500 font-light"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {social.label}
                  </motion.span>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowUpRight size={24} className="text-wine-600 group-hover:text-gold-500 transition-colors duration-500" />
                  </motion.div>
                </motion.a>
              </MagneticButton>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

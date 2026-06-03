import { motion } from 'framer-motion';
import { WhatsappLogo, ArrowRight, ChatCircleDots } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

export default function ContactSection() {
  const whatsappUrl = "https://wa.me/919363275290?text=Hello";

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Let's Connect" subtitle="Prefer a quick chat? Reach out directly on WhatsApp!" />
        
        <ScrollReveal>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full bg-navy-light/50 border border-gold-500/30 rounded-3xl p-8 md:p-12 overflow-hidden hover:border-gold-500 transition-colors duration-500"
            whileHover="hover"
            data-cursor="hover"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-500/5 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-navy flex items-center justify-center border border-gold-500/30 text-[#25D366] group-hover:scale-110 group-hover:border-[#25D366] shadow-[0_0_0_0_rgba(217,177,90,0)] group-hover:shadow-[0_0_30px_0_rgba(37,211,102,0.3)] transition-all duration-500">
                  <WhatsappLogo size={48} weight="fill" />
                </div>
                
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-ivory mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Drop a Message
                  </h3>
                  <p className="text-ivory-dim font-light text-lg flex items-center justify-center md:justify-start gap-2" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                    <ChatCircleDots size={22} className="text-gold-500 group-hover:text-[#25D366] transition-colors duration-500" weight="duotone" />
                    Usually replies within a few hours
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 mt-4 md:mt-0">
                <div className="flex items-center gap-3 px-8 py-5 rounded-full border border-gold-500/50 text-ivory group-hover:text-navy group-hover:border-[#25D366] group-hover:bg-[#25D366] transition-all duration-500 font-bold text-sm tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                  <span>Start Chat</span>
                  <ArrowRight size={18} weight="bold" />
                </div>
              </div>
            </div>
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}

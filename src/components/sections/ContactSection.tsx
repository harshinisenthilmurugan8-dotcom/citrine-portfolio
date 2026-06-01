import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperPlaneTilt, User, Envelope, ChatText, CircleNotch } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeading title="Let's Connect" subtitle="Have a project in mind? Want to collaborate? Let's talk!" />
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory-dim group-focus-within:text-gold transition-colors" />
              <input
                type="text" required value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-navy-light border border-gold/15 rounded-xl pl-12 pr-4 py-4 text-ivory placeholder:text-ivory-dim/50 focus:border-gold/50 focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-gold/20"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              />
            </div>
            {/* Email */}
            <div className="relative group">
              <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory-dim group-focus-within:text-gold transition-colors" />
              <input
                type="email" required value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address"
                className="w-full bg-navy-light border border-gold/15 rounded-xl pl-12 pr-4 py-4 text-ivory placeholder:text-ivory-dim/50 focus:border-gold/50 focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-gold/20"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              />
            </div>
            {/* Message */}
            <div className="relative group">
              <ChatText size={18} className="absolute left-4 top-4 text-ivory-dim group-focus-within:text-gold transition-colors" />
              <textarea
                required rows={5} value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
                className="w-full bg-navy-light border border-gold/15 rounded-xl pl-12 pr-4 py-4 text-ivory placeholder:text-ivory-dim/50 focus:border-gold/50 focus:outline-none transition-all duration-300 resize-none focus:ring-1 focus:ring-gold/20"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              />
            </div>
            {/* Submit */}
            <motion.button
              type="submit" disabled={isSending}
              className="w-full py-4 rounded-xl bg-gold text-navy font-bold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-gold-light disabled:opacity-70 transition-all duration-300"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              data-cursor="hover"
            >
              {isSending ? (
                <><CircleNotch size={20} className="animate-spin" /> Sending...</>
              ) : isSent ? (
                'Message Sent! ✓'
              ) : (
                <><PaperPlaneTilt size={20} weight="fill" /> Send Your Message</>
              )}
            </motion.button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

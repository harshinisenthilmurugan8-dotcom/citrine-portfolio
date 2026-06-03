import { motion } from 'framer-motion';
import { InstagramLogo, YoutubeLogo, LinkedinLogo, Heart, EnvelopeSimple, Phone } from '@phosphor-icons/react';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Books', href: '#books' },
  { label: 'Podcast', href: '#podcasts' },
  { label: 'Comedy', href: '#comedy' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: InstagramLogo, href: 'https://www.instagram.com/vinodnaraen/', label: 'Instagram' },
  { icon: YoutubeLogo, href: 'https://youtube.com/@vinodnaraen?si=A44XYMTSI5YgEQaV', label: 'YouTube' },
  { icon: LinkedinLogo, href: 'https://share.google/7is0AGdmZqGhoyWWX', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <a href="#hero" className="group" data-cursor="hover">
            <span className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="gradient-text">Vinod</span>{' '}
              <span className="text-ivory">Naraen</span>
            </span>
          </a>
          {/* Quick nav */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-ivory-dim hover:text-gold transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', monospace" }} data-cursor="hover">{link.label}</a>
            ))}
          </nav>
          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-ivory-dim hover:text-gold hover:border-gold/50 transition-all duration-300" data-cursor="hover" aria-label={social.label} target="_blank" rel="noopener noreferrer">
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vinodnaraen@gmail.com" target="_blank" rel="noopener noreferrer" className="text-sm text-ivory-dim hover:text-gold transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            <EnvelopeSimple size={16} /> vinodnaraen@gmail.com
          </a>
          <a href="tel:+919363275290" className="text-sm text-ivory-dim hover:text-gold transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            <Phone size={16} /> +91 9363275290
          </a>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory-dim text-xs" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            © 2026 Vinod Naraen. All rights reserved.
          </p>
          <p className="text-ivory-dim text-xs" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            Author • Publisher • Lyricist • Composer • Standup Comedian • Podcaster
          </p>
          <motion.p className="text-ivory-dim text-xs flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            Made with <Heart size={12} weight="fill" className="text-gold" /> and creativity
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

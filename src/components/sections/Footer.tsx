import { motion } from 'framer-motion';
import { InstagramLogo, YoutubeLogo, TwitterLogo, LinkedinLogo, Heart } from '@phosphor-icons/react';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Books', href: '#books' },
  { label: 'Podcast', href: '#podcasts' },
  { label: 'Comedy', href: '#comedy' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: InstagramLogo, href: '#', label: 'Instagram' },
  { icon: YoutubeLogo, href: '#', label: 'YouTube' },
  { icon: TwitterLogo, href: '#', label: 'Twitter' },
  { icon: LinkedinLogo, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 pt-16 pb-8 px-6">
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
              <a key={social.label} href={social.href} className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-ivory-dim hover:text-gold hover:border-gold/50 transition-all duration-300" data-cursor="hover" aria-label={social.label}>
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory-dim text-xs" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            © 2026 Vinod Naraen. All rights reserved.
          </p>
          <p className="text-ivory-dim text-xs" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            Author • Podcaster • Comedian • Content Writer
          </p>
          <motion.p className="text-ivory-dim text-xs flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', monospace" }}>
            Made with <Heart size={12} weight="fill" className="text-gold" /> and creativity
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

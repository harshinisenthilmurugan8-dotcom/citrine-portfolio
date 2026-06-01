import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import { gsap } from 'gsap';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#expertise' },
  { label: 'Work', href: '#featured' },
  { label: 'Books', href: '#books' },
  { label: 'Podcast', href: '#podcasts' },
  { label: 'Comedy', href: '#comedy' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The GSAP hero timeline in HeroSection will drive `.nav-link .line-inner`.
  // We just need to ensure all nav link inners start off-screen.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.set(nav.querySelectorAll('.nav-link .line-inner'), { y: '100%' });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled
            ? 'bg-wine-900/85 backdrop-blur-xl border-b border-gold-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="nav-link overflow-hidden inline-block"
            data-cursor="hover"
          >
            <span
              className="line-inner block text-2xl font-medium tracking-tight hover:text-gold-500 transition-colors duration-300"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              <span className="text-gold-500">V</span><span className="text-cream-100">N.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link overflow-hidden inline-block"
                data-cursor="hover"
              >
                <span className="line-inner block text-xs uppercase tracking-[0.2em] text-cream-300 hover:text-gold-500 transition-colors duration-500 font-mono py-2">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden text-cream-100 hover:text-gold-500 transition-colors"
            data-cursor="hover"
            aria-label="Open menu"
          >
            <List size={26} weight="light" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[10001] bg-wine-900/97 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-6 right-6 text-cream-100 hover:text-gold-500 transition-colors"
              aria-label="Close menu"
            >
              <X size={28} weight="light" />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-4xl font-display text-cream-100 hover:text-gold-500 transition-colors italic"
                  style={{ fontFamily: "'Fraunces', serif" }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, InstagramLogo, YoutubeLogo, TwitterLogo, LinkedinLogo } from '@phosphor-icons/react';
import MagneticButton from '../ui/MagneticButton';

const socialLinks = [
  { icon: InstagramLogo, href: '#', label: 'Instagram' },
  { icon: YoutubeLogo, href: '#', label: 'YouTube' },
  { icon: TwitterLogo, href: '#', label: 'Twitter' },
  { icon: LinkedinLogo, href: '#', label: 'LinkedIn' },
];

const subtitleLines = [
  'Author • Publisher • Lyricist • Composer • Standup Comedian • Podcaster',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Ensure all line-inner elements start off-screen
    gsap.set(section.querySelectorAll('.line-inner'), { y: '100%' });
    gsap.set(imageRef.current, { opacity: 0 });

    // Wait for the LoadingScreen to finish (~1.6s) before animating
    const tl = gsap.timeline({ delay: 1.8 });

    // 1. Nav links slide up
    tl.to('.nav-link .line-inner', {
      y: '0%',
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05,
    })

    // 3. Name lines — the centrepiece
    .to('#hero-name .line-inner', {
      y: '0%',
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.12,
    }, '-=0.2')
    // 4. Photo fades in alongside name
    .to(imageRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.8')
    // 5. Subtitle lines
    .to('#hero-subtitle .line-inner', {
      y: '0%',
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
    }, '-=0.6')
    // 6. Scroll label
    .to('#scroll-label .line-inner', {
      y: '0%',
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.05,
    }, '-=0.4');

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden bg-wine-900"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* ── Left Typography ─────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 relative z-20 mt-12 lg:mt-0">



          {/* Name — masked line reveal, two lines */}
          <h1
            id="hero-name"
            className="leading-[0.88] tracking-tight font-medium mb-4"
            style={{
              fontFamily: "'Fraunces', serif",
              fontVariationSettings: '"opsz" 144, "WONK" 0',
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
            }}
            aria-label="Vinod Naraen"
          >
            {/* Line 1 */}
            <span className="line-mask block overflow-hidden">
              <span className="line-inner block text-cream-100">Vinod</span>
            </span>
            {/* Line 2 */}
            <span className="line-mask block overflow-hidden">
              <span className="line-inner block text-cream-200 italic font-light">Naraen.</span>
            </span>
          </h1>

          {/* Self-drawing gold SVG underline */}
          <SvgUnderline />

          {/* Subtitle — each phrase on its own masked line */}
          <div
            id="hero-subtitle"
            className="flex flex-col gap-6 md:flex-row md:gap-12 md:items-start mt-2 mb-12"
          >
            <div className="w-12 h-[1px] bg-gold-500/40 hidden md:block mt-4 flex-shrink-0" />
            <p className="text-cream-300 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              {subtitleLines.map((line, i) => (
                <span key={i} className="line-mask block overflow-hidden">
                  <span className="line-inner block">{line}</span>
                </span>
              ))}
            </p>
          </div>


        </div>

        {/* ── Right Portrait ───────────────────────────
             opacity starts at 0 — GSAP fades it in.
             No transform, no rotation, no flip.        */}
        <div className="lg:col-span-5 relative order-2 -ml-8 lg:-ml-16 mt-8 lg:mt-0">
          <div
            ref={imageRef}
            className="relative flex-shrink-0 w-[115%] h-[45vh] md:h-[75vh] max-h-[850px] mx-auto pointer-events-none"
            style={{ opacity: 0 }}
          >
            {/* Photo — Organic fade mask */}
            <img
              src="/ProfilePhoto.jpeg"
              alt="Vinod Naraen"
              className="w-full h-full object-cover object-top"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse closest-side at 50% 45%, black 20%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse closest-side at 50% 45%, black 20%, transparent 100%)',
              }}
            />
            {/* Vignette from bottom to ground it in the layout */}
            <div 
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{ background: 'linear-gradient(to top, #1a0a0a 0%, transparent 40%)' }}
            />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        id="scroll-label"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
      >
        <span className="line-mask overflow-hidden block">
          <span className="line-inner block text-cream-300 text-[10px] tracking-[0.3em] uppercase font-mono">
            Scroll
          </span>
        </span>
        <ArrowDownBounce />
      </div>
    </section>
  );
}

/** Self-drawing SVG curved underline — fires once after name lands */
function SvgUnderline() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    // Draw after name lines have settled (~1.6s from GSAP tl start + 1.8s initial delay)
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power3.out',
      delay: 3.4,
    });
  }, []);

  return (
    <svg
      className="w-full max-w-xl mb-6 overflow-visible"
      height="18"
      viewBox="0 0 500 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M 0 14 Q 120 2 250 10 Q 380 18 500 8"
        stroke="#D9B15A"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

/** Bouncing arrow — rendered after tl completes via CSS animation only */
function ArrowDownBounce() {
  return (
    <div
      style={{
        animation: 'arrowBounce 2.4s ease-in-out infinite',
        animationDelay: '5.2s',
        opacity: 0,
      }}
    >
      <ArrowDown size={18} className="text-gold-500/60" weight="light" />
      <style>{`
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

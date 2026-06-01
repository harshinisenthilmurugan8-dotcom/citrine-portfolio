import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * Section heading with masked line reveal on scroll entry.
 * No scramble. No flicker. Pure upward unveil — the luxury editorial standard.
 */
export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const hasRevealed = useRef(false);

  useEffect(() => {
    if (!inView || hasRevealed.current) return;
    hasRevealed.current = true;

    const container = containerRef.current;
    if (!container) return;

    gsap.to(container.querySelectorAll('.line-inner'), {
      y: '0%',
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
    });
  }, [inView]);

  const setRefs = (node: HTMLDivElement | null) => {
    inViewRef(node);
    // @ts-expect-error ref assignment
    containerRef.current = node;
  };

  return (
    <div
      ref={setRefs}
      className={`mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {/* Eyebrow label */}
      <div className={`flex items-center gap-6 mb-6 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="w-8 h-[1px] bg-gold-500/50" />
        <div className="line-mask overflow-hidden">
          <span
            className="line-inner block text-gold-500 text-[10px] tracking-[0.35em] uppercase font-mono"
            style={{ transform: 'translateY(100%)' }}
          >
            {title}
          </span>
        </div>
        <span className="w-8 h-[1px] bg-gold-500/50" />
      </div>

      {/* Main heading — masked reveal */}
      <div className="line-mask overflow-hidden">
        <h2
          className="line-inner text-5xl md:text-6xl lg:text-7xl text-cream-100 tracking-tight mb-6"
          style={{
            fontFamily: "'Fraunces', serif",
            fontVariationSettings: '"opsz" 72, "WONK" 0',
            fontWeight: 400,
            transform: 'translateY(100%)',
            display: 'block',
          }}
          aria-label={title}
        >
          {title}
        </h2>
      </div>

      {subtitle && (
        <div className="line-mask overflow-hidden mt-4">
          <p
            className="line-inner text-cream-300 font-light text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ transform: 'translateY(100%)' }}
          >
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}

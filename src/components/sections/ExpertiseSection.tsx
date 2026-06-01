import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../ui/ScrollReveal';
import TextScramble from '../ui/TextScramble';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    number: '01',
    title: 'Author',
    descriptor: 'Crafting narratives that explore the human experience',
    anchor: 'bottom-left',
    image: '/images/author_photo.png',
  },
  {
    number: '02',
    title: 'Podcaster',
    descriptor: 'Intentional conversations — unfiltered, deep, alive',
    anchor: 'top-right',
    image: '/images/podcaster_photo.png',
  },
  {
    number: '03',
    title: 'Comedian',
    descriptor: 'Truth through laughter — multilingual, sharp, human',
    anchor: 'bottom-left',
    image: '/images/comedian_photo.png',
  },
];

export default function ExpertiseSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Horizontal scroll on all devices
    const mm = gsap.matchMedia();

    mm.add('all', () => {
      const panelEls = track.querySelectorAll('.expertise-panel');
      const totalWidth = (panelEls.length - 1) * window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, { 
        x: () => -(track.scrollWidth - window.innerWidth), 
        ease: 'none' 
      });

      // Variable font WONK morphing per panel
      panelEls.forEach((panel, i) => {
        const titleEl = panel.querySelector('.panel-title');
        if (!titleEl) return;
        gsap.fromTo(
          titleEl,
          { fontVariationSettings: '"opsz" 9, "WONK" 0' },
          {
            fontVariationSettings: '"opsz" 144, "WONK" 1',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        );
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative bg-wine-900 border-t border-wine-700/30 overflow-hidden h-screen"
    >
      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${panels.length * 100}vw` }}
      >
        {panels.map((panel, i) => {
          const isTopRight = panel.anchor === 'top-right';
          return (
            <div
              key={panel.title}
              className="expertise-panel relative flex-shrink-0 h-full border-r border-gold-500/15"
              style={{ width: '100vw' }}
            >
              {/* Ghost watermark number */}
              <span
                className="absolute inset-0 flex items-center justify-center font-display text-[40vw] leading-none select-none pointer-events-none text-wine-700/30 tracking-tighter"
                aria-hidden="true"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: '"opsz" 144, "WONK" 0',
                  opacity: 0.12,
                }}
              >
                {panel.number}
              </span>

              {/* Background Image placed opposite to text */}
              <div
                className={`absolute w-[90%] md:w-[60%] lg:w-[45%] h-[60vh] max-h-[700px] z-0 pointer-events-none opacity-80 ${
                  isTopRight ? 'bottom-0 left-0 md:bottom-12 md:left-24' : 'top-0 right-0 md:top-12 md:right-24'
                }`}
              >
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover mix-blend-screen grayscale-[30%] sepia-[10%] hue-rotate-[-10deg]"
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse closest-side at center, black 20%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse closest-side at center, black 20%, transparent 100%)',
                  }}
                />
              </div>

              {/* Panel content — asymmetric anchoring */}
              <div
                className={`absolute px-12 lg:px-20 py-20 max-w-3xl z-10 ${
                  isTopRight
                    ? 'top-0 right-0 text-right'
                    : 'bottom-0 left-0 text-left'
                }`}
              >
                {/* Role title — massive Fraunces */}
                <h2
                  className="panel-title text-[18vw] md:text-[12vw] lg:text-[9rem] leading-[0.85] tracking-tight text-cream-100 mb-6"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: '"opsz" 9, "WONK" 0',
                  }}
                >
                  {panel.title}
                </h2>

                {/* Gold thin rule */}
                <div
                  className={`h-[1px] bg-gold-500/40 w-24 mb-6 ${
                    isTopRight ? 'ml-auto' : ''
                  }`}
                />

                {/* Italic descriptor — small caps feel */}
                <p
                  className="text-cream-300 font-light text-xl italic tracking-wide"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {panel.descriptor}
                </p>

                {/* Number in corner — small mono */}
                <span className="absolute top-8 left-12 lg:left-20 text-gold-500/40 font-mono text-xs tracking-[0.3em]">
                  {panel.number} / 03
                </span>
              </div>

              {/* Vertical gold rule at right edge */}
              {i < panels.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
              )}
            </div>
          );
        })}
      </div>


    </section>
  );
}

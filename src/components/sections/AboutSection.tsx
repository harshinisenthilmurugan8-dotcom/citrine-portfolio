import ScrollReveal from '../ui/ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-12 bg-wine-900 border-t border-wine-700/30">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-display text-cream-100 mb-16 italic font-light tracking-wide" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            About Vinod Naraen
          </h2>
          
          <div className="space-y-12 text-cream-200 text-xl md:text-3xl font-light leading-relaxed">
            <p className="opacity-80" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              Some people choose a profession.<br/>
              Some choose a passion.
            </p>
            
            <p className="text-gold-500 font-medium text-2xl md:text-4xl" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              Vinod Naraen chose curiosity.
            </p>
            
            <p className="opacity-80 text-lg md:text-2xl leading-loose max-w-3xl mx-auto font-body">
              From winning national championships to crafting stories, composing music, publishing books, performing on stage, and building creative worlds through words and art — his journey is driven by one simple belief:
            </p>
            
            <div className="py-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold-500/40" />
              <p className="text-2xl md:text-4xl italic text-cream-100 tracking-wide" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                Create something that makes people feel.
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold-500/40" />
            </div>
            
            <p className="opacity-80 text-lg md:text-xl font-body">
              Every story, every song, every page, and every performance is an invitation to experience life through a different lens.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

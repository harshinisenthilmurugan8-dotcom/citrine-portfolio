import ScrollReveal from '../ui/ScrollReveal';

const achievements = [
  'National-Level Kabaddi Champion',
  'National-Level English Debate Champion',
  'Trained Carnatic Singer',
  'Journalist',
  'Stand-Up Comedian',
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 bg-wine-900 border-t border-wine-700/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Heading */}
          <ScrollReveal>
            <div>
              <p className="text-gold-500 tracking-[0.3em] uppercase text-xs mb-6 font-mono">Beyond Boundaries</p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl text-cream-100 mb-8 leading-[0.95]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Achievements &{' '}
                <span className="italic text-cream-300">Creative Journey</span>
              </h2>
              <div className="w-16 h-[1px] bg-gold-500/40 mb-8" />
              <p className="text-cream-300/80 font-light text-lg md:text-xl leading-relaxed max-w-lg" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Vinod Naraen has never limited himself to a single passion. His diverse accomplishments reflect a lifelong belief in exploring every opportunity that sparks curiosity and creativity.
              </p>
            </div>
          </ScrollReveal>

          {/* Right — Achievement List */}
          <div className="flex flex-col justify-center">
            {achievements.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.08}>
                <div className={`py-6 ${i < achievements.length - 1 ? 'border-b border-wine-700/40' : ''}`}>
                  <div className="flex items-baseline gap-6">
                    <span className="text-gold-500/40 font-mono text-xs tracking-[0.2em] shrink-0">
                      0{i + 1}
                    </span>
                    <h3
                      className="text-cream-100 text-xl md:text-2xl lg:text-3xl font-light tracking-wide"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {item}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

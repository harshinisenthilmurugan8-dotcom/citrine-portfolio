import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, CaretDown } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';

const videos = [
  {
    id: 'XhQIeSqKyA8',
    title: 'Vinod Naraen - Crowds & Corpses (Official Lyric Video)',
    url: 'https://youtu.be/XhQIeSqKyA8?si=Tp63yAASRw4-51Hl',
  },
  {
    id: 'xyAR5PZV8R0',
    title: 'Vinod Naraen - Beach Beach Mein (Official Lyric Video)',
    url: 'https://youtu.be/xyAR5PZV8R0?si=Qj6p26iGHu0rqTtK',
  },
  {
    id: 'PdpB-ilhE-M',
    title: 'Vinod Naraen - Front Page Love (Official Lyric Video)',
    url: 'https://www.youtube.com/watch?v=PdpB-ilhE-M',
  },
  {
    id: 'FanMobfGRnk',
    title: 'Vinod Naraen - Song Of Dreams (Official Lyric Video)',
    url: 'https://www.youtube.com/watch?v=FanMobfGRnk',
  },
  {
    id: 'kO-BIRv5OYA',
    title: 'Vinod Naraen - The Nation Wants To Know Version.1 (Official Lyric Video)',
    url: 'https://www.youtube.com/watch?v=kO-BIRv5OYA',
  },
  {
    id: 'CyhxwFH-dVE',
    title: 'Vinod Naraen - Doo-bee-doo-bah! (Official Lyric Video)',
    url: 'https://www.youtube.com/watch?v=CyhxwFH-dVE',
  },
];

export default function MusicSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="music" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 bg-wine-900 border-t border-wine-700/30">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 md:mb-20 text-center">
            <p className="text-gold-500 tracking-[0.2em] uppercase text-xs mb-4 font-mono">Original Music</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-cream-100 mb-6 leading-tight">
              Lyricist & <span className="italic text-cream-300">Composer</span>
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/30 mx-auto mb-6" />
            <p className="text-cream-300 font-light text-lg max-w-xl mx-auto">
              Expressing emotions through melody and words — crafting memorable musical experiences.
            </p>
          </div>
        </ScrollReveal>

        {/* Always visible top 3 videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.slice(0, 3).map((video) => (
            <div key={video.id} className="group">
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group/card"
                data-cursor="hover"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-wine-700/50 group-hover/card:border-gold-500/50 transition-all duration-500 shadow-xl mb-4">
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                    alt={video.title} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-wine-900/40 group-hover/card:bg-wine-900/10 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-wine-900/50 backdrop-blur-sm flex items-center justify-center border border-gold-500/30 group-hover/card:scale-110 group-hover/card:bg-gold-500/90 transition-all duration-500">
                      <PlayCircle size={32} weight="fill" className="text-gold-500 group-hover/card:text-wine-900 transition-colors duration-500" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-cream-100 font-display text-lg md:text-xl group-hover/card:text-gold-500 transition-colors duration-300 px-2" style={{ fontFamily: "'Fraunces', serif" }}>
                  {video.title}
                </h3>
              </a>
            </div>
          ))}
        </div>

        {/* Animated Wrapper for remaining videos */}
        <AnimatePresence initial={false}>
          {showAll && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 pb-4">
                {videos.slice(3).map((video, i) => (
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    key={video.id}
                    className="group"
                  >
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block group/card"
                      data-cursor="hover"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-wine-700/50 group-hover/card:border-gold-500/50 transition-all duration-500 shadow-xl mb-4">
                        <img 
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                          alt={video.title} 
                          className="w-full h-full object-cover grayscale-[20%] group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 bg-wine-900/40 group-hover/card:bg-wine-900/10 transition-colors duration-500" />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-wine-900/50 backdrop-blur-sm flex items-center justify-center border border-gold-500/30 group-hover/card:scale-110 group-hover/card:bg-gold-500/90 transition-all duration-500">
                            <PlayCircle size={32} weight="fill" className="text-gold-500 group-hover/card:text-wine-900 transition-colors duration-500" />
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-cream-100 font-display text-lg md:text-xl group-hover/card:text-gold-500 transition-colors duration-300 px-2" style={{ fontFamily: "'Fraunces', serif" }}>
                        {video.title}
                      </h3>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {videos.length > 3 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-3 px-8 py-3 rounded-full border border-gold-500/30 text-cream-100 hover:text-gold-500 hover:border-gold-500 hover:bg-gold-500/5 transition-all duration-300 font-mono text-sm tracking-widest uppercase group/btn"
              data-cursor="hover"
            >
              {showAll ? 'Show Less' : 'Watch More'}
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaretDown size={16} weight="bold" />
              </motion.div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CalendarBlank } from '@phosphor-icons/react';
import { getAllBlogPosts } from '@/utils/blogParser';
import type { BlogPost } from '@/types/blog';
import ArticleModal from './ArticleModal';
import ScrollReveal from '../ui/ScrollReveal';

export default function BlogSection() {
  const posts = getAllBlogPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePost = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <section id="blog" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 bg-wine-800/20 border-y border-wine-700/30">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-gold-500 tracking-[0.2em] uppercase text-xs mb-4 font-mono">Journal</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-cream-100">Writings & Thoughts</h2>
            </div>
            <p className="text-cream-300 font-light max-w-sm text-sm">
              Reflections on creativity, storytelling, and the art of navigating multiple passions.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <motion.button
                onClick={() => openPost(post)}
                className="group w-full text-left py-8 px-4 md:px-8 md:px-10 rounded-sm border border-wine-700/50 bg-wine-800/40 hover:bg-wine-700/40 transition-colors duration-500 relative overflow-hidden"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="hover"
              >
                {/* Shimmer animation restored from original */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-display text-cream-100 group-hover:text-gold-500 group-hover:italic transition-colors duration-500 mb-3 truncate">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <CalendarBlank size={14} className="text-gold-500/70" weight="light" />
                      <span className="text-cream-300 text-xs font-mono tracking-widest uppercase">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full border border-wine-600 flex items-center justify-center text-gold-500 opacity-0 group-hover:opacity-100 group-hover:border-gold-500 transition-all duration-500"
                    initial={false}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowRight size={18} weight="light" />
                  </motion.div>
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <ArticleModal post={selectedPost} isOpen={isModalOpen} onClose={closePost} />
    </section>
  );
}

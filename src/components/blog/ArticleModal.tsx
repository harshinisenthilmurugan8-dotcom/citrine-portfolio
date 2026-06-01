import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import type { BlogPost } from '@/types/blog';

interface ArticleModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({ post, isOpen, onClose }: ArticleModalProps) {
  // Prevent background scroll & stop Lenis from stealing wheel events
  useEffect(() => {
    if (!isOpen) return;

    // Freeze the page behind the modal
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Scroll-wrapper — this is the layer that actually scrolls */}
          <motion.div
            className="fixed inset-0 z-[10001] overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Centering shell — uses padding to push modal to vertical center */}
            <div
              className="flex min-h-full items-center justify-center px-4 py-16 md:px-8 md:py-20"
              onClick={onClose}
            >
              <motion.div
                className="relative w-full max-w-3xl max-h-[80vh] bg-navy-light border border-gold/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header — fixed at top of modal */}
                <div className="sticky top-0 z-10 bg-navy-light/95 backdrop-blur-lg border-b border-gold/10 px-8 py-5 flex items-center justify-between flex-shrink-0">
                  <div className="min-w-0 flex-1 mr-4">
                    <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Space Grotesk', monospace" }}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h2 className="text-xl font-bold text-ivory truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {post.title}
                    </h2>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-ivory-dim hover:text-gold hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-cursor="hover"
                    aria-label="Close"
                  >
                    <X size={18} weight="bold" />
                  </motion.button>
                </div>

                {/* Scrollable content area */}
                <div
                  className="flex-1 overflow-y-auto overscroll-contain px-8 py-8"
                  onWheel={(e) => e.stopPropagation()}
                >
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full border border-gold/20 text-gold/70" style={{ fontFamily: "'Space Grotesk', monospace" }}>#{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="article-content" dangerouslySetInnerHTML={{ __html: post.body }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Star, StarHalf } from '@phosphor-icons/react';
import ScrollReveal from '../ui/ScrollReveal';

const books = [
  {
    title: 'Love Ka Jugaad',
    year: '2025',
    image: 'https://m.media-amazon.com/images/I/81UR2IFmX1L.jpg',
    description: 'Viraaj Naraen, a quirky Chennai journalist with a poet’s heart, crashes into Aneri Khongwir, a fiery Shillong girl caught between music and politics at the wedding of their cousins… to each other. What begins as teasing banter and moonlit duets soon turns into a love story tangled in rituals, laughter, and one very unwanted suitor. Will Viraaj and Aneri be able to overcome all odds to have a happy ending to their story or will it be the beginning of an epic chapter in their lives? Rom-com chaos meets political drama Love Ka Jugaad is a story of weddings, words, and the courage to love against all odds.',
    link: 'https://amzn.in/d/06Zsy0Li',
    genre: 'Romantic Comedy',
    rating: 4.3,
    imageClass: '',
  },
  {
    title: 'The Nation Wants to Know',
    year: '2025',
    image: 'https://m.media-amazon.com/images/I/61hmHP2wrNL.jpg',
    description: 'When journalist Viraaj Naraen and rising political leader Aneri Khongwir choose truth over comfort, they ignite a national conversation no one was ready for. Media turns hostile, politics turns personal, and love is forced to survive under public scrutiny. As power reacts and consequences spiral, Viraaj and Aneri discover that asking the right question in the wrong place can cost everything - reputation, safety, and each other. The Nation Wants To Know is a sharp, fast-paced political thriller about courage, conscience, and what happens when ordinary people refuse to stay silent.',
    link: 'https://amzn.in/d/0aEl76Kj',
    genre: 'Political Thriller',
    rating: 4,
    imageClass: 'contrast-[1.15] saturate-[1.2] brightness-[1.1] shadow-2xl',
  },
];

export default function BooksSection() {
  return (
    <section id="books" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 bg-wine-800/10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-10 md:mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-cream-100 mb-6">Published <span className="italic text-cream-300">Works</span></h2>
            <div className="w-12 h-[1px] bg-gold-500/30 mx-auto mb-6" />
            <p className="text-cream-300 font-light text-lg max-w-xl mx-auto">Exploring love, politics, courage, and the human experience through literature.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-32">
          {books.map((book, i) => (
            <ScrollReveal key={book.title} delay={i * 0.2}>
              <div className={`group flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Book Image with original 3D tilt interaction preserved */}
                <div className="lg:w-1/2 w-full flex justify-center">
                  <motion.div 
                    className="relative w-[70%] md:w-[60%] lg:w-[75%] max-w-md"
                    whileHover={{ rotateY: 8, rotateX: -5, scale: 1.05 }} 
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                    style={{ perspective: '1200px' }}
                    data-cursor="hover"
                  >
                    <div className="absolute -bottom-8 left-4 right-4 h-12 bg-wine-900/60 blur-2xl rounded-full mix-blend-multiply" />
                    <div className="absolute -inset-4 bg-gold-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative rounded-sm overflow-hidden border border-wine-700/50 group-hover:border-gold-500/40 transition-colors duration-500 shadow-2xl">
                      <img src={book.image} alt={book.title} className={`w-full aspect-[2/3] object-cover ${book.imageClass}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-900/90 via-wine-900/20 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <a href={book.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold-500 text-sm font-mono tracking-widest uppercase" data-cursor="hover">
                          View on Amazon <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Book Details - Editorial Typography */}
                <div className="lg:w-1/2 w-full flex flex-col justify-center text-center lg:text-left">
                  <p className="text-gold-500 tracking-[0.2em] uppercase text-xs mb-4 font-mono">
                    {book.genre} — {book.year}
                  </p>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-cream-100 mb-6 leading-tight group-hover:italic transition-all duration-500">
                    {book.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-gold-500/30 mx-auto lg:mx-0 mb-8" />
                  <p className="text-cream-300 font-light leading-relaxed mb-10 text-lg max-w-xl mx-auto lg:mx-0">
                    {book.description}
                  </p>
                  
                  <div className="flex items-center gap-1 justify-center lg:justify-start mb-10">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((starIdx) => {
                        if (book.rating >= starIdx) {
                          return <Star key={starIdx} size={16} weight="fill" className="text-gold-500/90" />;
                        } else if (book.rating >= starIdx - 0.5) {
                          return <StarHalf key={starIdx} size={16} weight="fill" className="text-gold-500/90" />;
                        } else {
                          return <Star key={starIdx} size={16} weight="regular" className="text-gold-500/30" />;
                        }
                      })}
                    </div>
                    <span className="text-cream-300/70 font-mono uppercase tracking-widest text-[10px] ml-3">{book.rating} / 5.0 Rating</span>
                  </div>

                  <motion.a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center lg:justify-start gap-4 text-cream-100 hover:text-gold-500 transition-colors duration-500 uppercase tracking-widest text-sm font-display group/btn"
                    whileHover={{ x: 10 }} 
                    whileTap={{ scale: 0.95 }} 
                    data-cursor="hover"
                  >
                    <BookOpen size={20} weight="light" className="text-wine-600 group-hover/btn:text-gold-500 transition-colors" />
                    <span className="border-b border-gold-500/30 group-hover/btn:border-gold-500 pb-1 transition-colors">Purchase Edition</span>
                    <ArrowUpRight size={16} />
                  </motion.a>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

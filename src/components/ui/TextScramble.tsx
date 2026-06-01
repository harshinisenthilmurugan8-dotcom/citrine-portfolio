import { useEffect, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number; // ms before scramble starts
  duration?: number; // ms total duration
  as?: keyof JSX.IntrinsicElements;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*';

/**
 * Text scramble decode effect — characters resolve left-to-right.
 * Delay controls when it starts (e.g. after name animation completes).
 */
export default function TextScramble({
  text,
  className = '',
  delay = 0,
  duration = 1200,
  as: Tag = 'p',
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = text.split('');
    const totalChars = chars.length;
    // Time each char gets to resolve
    const charInterval = duration / totalChars;
    let frame = 0;
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scramble = () => {
      let output = '';
      for (let i = 0; i < totalChars; i++) {
        // Chars to the left of the resolution front are already resolved
        if (i < frame) {
          output += chars[i] === ' ' ? ' ' : chars[i];
        } else {
          output += chars[i] === ' '
            ? ' '
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = output;

      if (frame < totalChars) {
        frame++;
        rafId = requestAnimationFrame(scramble);
      } else {
        el.textContent = text;
      }
    };

    // Scramble at charInterval pace (not every RAF frame — too fast)
    let startTime: number | null = null;

    const tick = (t: number) => {
      if (!startTime) startTime = t;
      const elapsed = t - startTime;
      const newFrame = Math.min(
        Math.floor((elapsed / duration) * totalChars),
        totalChars
      );

      let output = '';
      for (let i = 0; i < totalChars; i++) {
        if (i < newFrame) {
          output += chars[i];
        } else {
          output += chars[i] === ' '
            ? ' '
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = output;

      if (newFrame < totalChars) {
        rafId = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    };

    timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [text, delay, duration]);

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} aria-label={text}>{text}</Tag>;
}

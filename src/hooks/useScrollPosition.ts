import { useState, useEffect } from 'react';

export function useScrollPosition(threshold: number = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        setScrolled((current) => {
          if (!current && scrollY > threshold) return true;
          if (current && scrollY < threshold * 0.6) return false;
          return current;
        });

        animationFrameId = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [threshold]);

  return scrolled;
}

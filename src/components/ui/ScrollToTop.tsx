"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);

    const focusMain = () => {
      const main = document.getElementById('main-content');
      if (main) {
        main.focus({ preventScroll: true });
      }
    };

    requestAnimationFrame(focusMain);
  }, [pathname]);

  return null;
}

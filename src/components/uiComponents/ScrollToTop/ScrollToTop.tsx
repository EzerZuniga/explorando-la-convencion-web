import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

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

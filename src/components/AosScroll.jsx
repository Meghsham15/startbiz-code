import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

const EFFECTS = [
  'zoom-in',
  'fade-up',
  'zoom-out',
  'fade-right',
  'zoom-in-up',
  'fade-left',
  'zoom-in-left',
  'slide-up',
];

export default function AosScroll({ active }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const sections = [...document.querySelectorAll('main section')].filter(
        (section) => !section.parentElement?.closest('section')
      );
      let effect = 0;
      sections.forEach((section) => {
        if (section.id === 'home') return;
        if (section.getBoundingClientRect().top < window.innerHeight * 0.88) return;
        section.setAttribute('data-aos', EFFECTS[effect % EFFECTS.length]);
        section.setAttribute('data-aos-once', 'true');
        section.setAttribute('data-aos-duration', '650');
        section.setAttribute('data-aos-easing', 'ease-out-cubic');
        effect += 1;
      });
      AOS.init({
        once: true,
        duration: 650,
        easing: 'ease-out-cubic',
        offset: 60,
      });
      AOS.refreshHard();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, active]);

  return null;
}

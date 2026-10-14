import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollMotion({ active }) {
  const { pathname } = useLocation();
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let fast = false;
    const onScroll = () => {
      const now = performance.now();
      const speed = Math.abs(window.scrollY - lastY) / Math.max(now - lastT, 16);
      fast = speed > 1.6;
      lastY = window.scrollY;
      lastT = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (fast) return;
          entry.target.classList.add('reveal-in');
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.15 }
    );

    document.querySelectorAll('main section').forEach((section) => {
      if (section.id === 'home') return;
      if (section.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [pathname, active]);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}

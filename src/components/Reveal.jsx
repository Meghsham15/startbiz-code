import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(true);
      return undefined;
    }
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setVisible(true);
      return undefined;
    }
    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${className} ${armed ? 'reveal-arm' : ''} ${visible ? 'is-in' : ''}`}
    >
      {children}
    </div>
  );
}

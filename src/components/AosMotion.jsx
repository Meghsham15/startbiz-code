import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

const CARD = 'a.rounded-xl, a.rounded-2xl, article.rounded-xl, article.rounded-2xl';

function mark(el, effect) {
  el.setAttribute('data-aos', effect);
  el.setAttribute('data-aos-once', 'true');
  el.setAttribute('data-aos-duration', effect === 'zoom-out' ? '550' : '650');
}

export default function AosMotion({ active }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!active) return undefined;
    const main = document.querySelector('main');
    if (!main) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    main.querySelectorAll('[data-aos]').forEach((el) => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-once');
      el.removeAttribute('data-aos-duration');
      el.classList.remove('aos-init', 'aos-animate');
    });

    if (!reduce) {
      main.querySelectorAll('section').forEach((section) => {
        if (section.id === 'home') return;
        if (section.parentElement?.closest('section')) return;

        const cards = section.querySelectorAll(CARD);
        if (!cards.length) {
          mark(section, 'zoom-in');
          return;
        }

        const heading = section.querySelector('h1, h2');
        if (heading) mark(heading, 'zoom-in');
        cards.forEach((card) => mark(card, 'zoom-out'));
      });

      const heroMedia = document.querySelector('#home [role="img"]');
      if (heroMedia) mark(heroMedia, 'zoom-in');

      main.querySelectorAll('aside').forEach((aside) => {
        if (!aside.closest('[data-aos]')) mark(aside, 'zoom-in');
      });
    }

    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 16,
      mirror: false,
      disable: reduce,
    });
    AOS.refresh();

    return undefined;
  }, [pathname, active]);

  return null;
}

import { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchServices, serviceCount } from '../data/content';

function useTypedPlaceholder(phrases, active) {
  const phraseKey = phrases.join('\n');
  const [typed, setTyped] = useState(phrases[0] || '');

  useEffect(() => {
    const list = phraseKey.split('\n').filter(Boolean);
    if (!active || list.length === 0) return undefined;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setTyped(list[0]);
      return undefined;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const phrase = list[phraseIndex];
      if (!deleting) {
        charIndex += 1;
        setTyped(phrase.slice(0, charIndex));
        if (charIndex >= phrase.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1400);
          return;
        }
        timer = window.setTimeout(tick, 75);
        return;
      }
      charIndex -= 1;
      setTyped(phrase.slice(0, Math.max(charIndex, 0)));
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % list.length;
        timer = window.setTimeout(tick, 280);
        return;
      }
      timer = window.setTimeout(tick, 36);
    };

    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, [active, phraseKey]);

  return typed;
}

export default function ServiceSearch({
  variant = 'hero',
  placeholder = 'What are you looking for? e.g. start a food business, GST, trademark…',
  suggestions = [],
  className = '',
  autoFocus = false,
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const listId = useId();
  const navigate = useNavigate();
  const results = searchServices(query);
  const animatePlaceholder = suggestions.length > 0 && query.length === 0;
  const typed = useTypedPlaceholder(suggestions, animatePlaceholder);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const goTo = (slug) => {
    setQuery('');
    setOpen(false);
    navigate(`/services/${slug}`);
  };

  const onKeyDown = (e) => {
    if (!open || !results.length) {
      if (e.key === 'Enter' && results[0]) {
        e.preventDefault();
        goTo(results[0].slug);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) goTo(results[active].slug);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const isHero = variant === 'hero';
  const isNav = variant === 'nav';

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <label className="sr-only" htmlFor={listId}>
        Search business consulting services
      </label>
      <div
        className={`flex items-center gap-2 rounded-lg border bg-white shadow-soft transition focus-within:ring-2 focus-within:ring-brand-accent/40 ${
          isHero
            ? 'rounded-xl border-[#e4e4e4] px-4 py-3 shadow-soft'
            : 'border-[#dbdbdb] px-2.5 py-1.5'
        } ${isNav ? 'w-full max-w-xs' : 'w-full'}`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`shrink-0 text-brand-primary ${isHero ? 'h-5 w-5' : 'h-4 w-4'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m20 20-3.5-3.5" />
        </svg>
        <div className="relative min-w-0 flex-1">
          <input
            id={listId}
            type="search"
            value={query}
            autoFocus={autoFocus}
            autoComplete="off"
            placeholder={animatePlaceholder ? '' : placeholder}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={`w-full bg-transparent text-brand-text outline-none placeholder:text-brand-text-soft/70 ${
              isHero ? 'text-sm sm:text-base' : 'text-sm'
            }`}
            role="combobox"
            aria-expanded={open && results.length > 0}
            aria-controls={`${listId}-list`}
            aria-autocomplete="list"
          />
          {animatePlaceholder && (
            <span
              className="pointer-events-none absolute inset-0 flex items-center truncate text-sm text-brand-text-soft/75 sm:text-base"
              aria-hidden
            >
              Search {typed}
              <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-brand-text-soft" />
            </span>
          )}
        </div>
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            className="text-xs font-semibold text-brand-text-soft hover:text-brand-primary"
            onClick={() => {
              setQuery('');
              setOpen(false);
            }}
          >
            Clear
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div
          id={`${listId}-list`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-[#dbdbdb] bg-white py-2 shadow-soft"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-brand-text-soft">
              No services found. Try “GST”, “Trademark”, or “Company”.
            </p>
          ) : (
            results.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                role="option"
                aria-selected={index === active}
                className={`flex w-full flex-col items-start px-4 py-2.5 text-left transition ${
                  index === active ? 'bg-brand-muted' : 'hover:bg-brand-muted/70'
                }`}
                onMouseEnter={() => setActive(index)}
                onClick={() => goTo(item.slug)}
              >
                <span className="text-sm font-semibold text-brand-text">
                  {item.title}
                </span>
                <span className="text-xs text-brand-text-soft">{item.category}</span>
              </button>
            ))
          )}
          <Link
            to="/#services"
            onClick={() => setOpen(false)}
            className="mt-1 block border-t border-[#dbdbdb] px-4 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-muted"
          >
            Browse all {serviceCount}+ services →
          </Link>
        </div>
      )}
    </div>
  );
}

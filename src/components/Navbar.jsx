import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brand, megaMenus, slugify } from '../data/content';

function menuCount(menu) {
  return menu.groups.reduce((total, group) => total + group.items.length, 0);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const location = useLocation();
  const menus = megaMenus;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    setMobileMenu(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const current = menus.find((menu) => menu.id === activeMenu);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white ${
        scrolled || open || activeMenu ? 'shadow-nav' : 'border-b border-[#e6e6e6]'
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex h-[68px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="relative z-20 mr-2 flex shrink-0 items-center">
          <img
            src={brand.logo}
            alt={`${brand.name} — ${brand.tagline}`}
            width={640}
            height={210}
            decoding="async"
            fetchPriority="high"
            className="h-11 w-auto object-contain object-left sm:h-12"
          />
        </Link>

        <nav className="ml-2 hidden min-w-0 items-center gap-0.5 lg:flex">
          {menus.map((menu) => (
            <button
              key={menu.id}
              type="button"
              className={`whitespace-nowrap rounded px-2.5 py-2 text-[13px] font-semibold transition ${
                activeMenu === menu.id
                  ? 'text-brand-primary'
                  : 'text-brand-text hover:text-brand-primary'
              }`}
              aria-expanded={activeMenu === menu.id}
              onMouseEnter={() => setActiveMenu(menu.id)}
              onClick={() =>
                setActiveMenu((id) => (id === menu.id ? null : menu.id))
              }
            >
              <span className="xl:hidden">{menu.shortLabel || menu.label}</span>
              <span className="hidden xl:inline">{menu.label}</span>
              <span className="ml-1 text-[10px] text-brand-text-soft" aria-hidden>
                ▾
              </span>
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <a
            href={brand.phoneHref}
            className="text-sm font-semibold text-brand-text hover:text-brand-primary"
          >
            {brand.phone.replace('+91 ', '')}
          </a>
          <Link to="/finder" className="btn-primary px-4 py-2.5 text-[13px]">
            Get started
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="relative z-10 ml-auto inline-flex h-10 w-10 items-center justify-center rounded border border-[#dbdbdb] text-brand-text lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-brand-text transition ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-brand-text transition ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-brand-text transition ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {current && (
        <div className="absolute inset-x-0 top-full hidden border-t border-[#eee] bg-white shadow-soft lg:block">
          <div className="mx-auto grid max-w-7xl gap-8 px-8 py-6 xl:grid-cols-[minmax(0,1fr)_17rem]">
            <div
              className={`grid gap-6 ${
                current.groups.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
              }`}
            >
              {current.groups.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                    {group.label}
                  </p>
                  <ul className="mt-2 space-y-0.5">
                    {group.items.map((title) => (
                      <li key={title}>
                        <Link
                          to={`/services/${slugify(title)}`}
                          className="block rounded px-2 py-1.5 text-sm font-medium text-brand-text transition hover:bg-brand-muted hover:text-brand-primary"
                          onClick={() => setActiveMenu(null)}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <aside className="border-t border-[#eee] pt-4 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
              <p className="text-sm font-bold text-brand-primary">{current.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-soft">
                {current.description}
              </p>
              <Link
                to={current.path}
                className="mt-3 inline-block text-sm font-semibold text-brand-accent hover:underline"
                onClick={() => setActiveMenu(null)}
              >
                View all {menuCount(current)} services
              </Link>
              <p className="mt-5 text-sm text-brand-text-soft">
                Not sure which one applies?
              </p>
              <a
                href={brand.phoneHref}
                className="mt-1 block text-lg font-semibold text-brand-text"
              >
                {brand.phone}
              </a>
            </aside>
          </div>
        </div>
      )}

      <div className={`border-t border-[#eee] bg-white lg:hidden ${open ? 'block' : 'hidden'}`}>
        <nav className="section-wrap flex max-h-[calc(100svh-4.25rem)] flex-col overflow-y-auto py-2 pb-6">
          {menus.map((menu) => (
            <div key={menu.id} className="border-b border-[#eee]">
              <button
                type="button"
                className="flex w-full items-center justify-between px-1 py-3 text-left text-base font-semibold text-brand-text"
                onClick={() =>
                  setMobileMenu((id) => (id === menu.id ? null : menu.id))
                }
              >
                {menu.label}
                <span className="text-brand-accent">
                  {mobileMenu === menu.id ? '−' : '+'}
                </span>
              </button>
              {mobileMenu === menu.id && (
                <div className="space-y-3 px-1 pb-4">
                  <Link
                    to={menu.path}
                    className="text-sm font-semibold text-brand-primary"
                  >
                    View all {menu.label}
                  </Link>
                  {menu.groups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                        {group.label}
                      </p>
                      <ul className="mt-1">
                        {group.items.map((title) => (
                          <li key={title}>
                            <Link
                              to={`/services/${slugify(title)}`}
                              className="block rounded px-2 py-2 text-sm text-brand-text-soft hover:bg-brand-muted hover:text-brand-primary"
                            >
                              {title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/finder" className="btn-primary mt-4">
            Get started
          </Link>
          <a
            href={brand.phoneHref}
            className="mt-3 text-center text-sm font-semibold text-brand-primary"
          >
            Call {brand.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}

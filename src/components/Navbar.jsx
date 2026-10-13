import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brand, megaMenus, slugify } from '../data/content';
import {
  IconBuilding,
  IconClipboard,
  IconCompass,
  IconGrowth,
  IconHandshake,
  IconRefresh,
  IconShield,
  IconUsers,
} from './VisualIcons';

const menuHints = {
  'Private Limited Company Registration': 'Separate entity, limited liability',
  'Limited Liability Partnership Registration': 'Partners, with limited liability',
  'One Person Company Registration': 'One founder, company structure',
  'Partnership Firm Registration': 'Two or more partners',
  'Sole Proprietorship Firm Registration': 'Simplest way to begin',
  'Register an Indian Subsidiary': 'Indian company, foreign parent',
  'Section 8 Company Registration': 'For non-profits and NGOs',
  'Producer Company Registration': 'For farmers and producer groups',
  'Trademark Registration': 'Protect a name, logo or tagline',
  'Trademark Objection Reply': 'Reply if the examiner raises a query',
  'Trademark Opposition': 'Respond when someone opposes a mark',
  'Trademark Assignment': 'Transfer a mark to another owner',
  'Trademark Renewal': 'Keep a registered mark in force',
  'Patent Search': 'Check what is already filed',
  'Provisional Patent': 'Early filing while you develop',
  'Permanent Patent': 'Full patent application',
  'Copyright Registration': 'Protect original creative work',
  'Proprietorship to Partnership': 'Add partners to a sole setup',
  'Proprietorship to LLP': 'Move a sole setup into an LLP',
  'Proprietorship to Private Limited Company': 'Move a sole setup into a company',
  'Proprietorship to OPC': 'Move a sole setup into an OPC',
  'Partnership to LLP': 'Give partners limited liability',
  'Partnership to Private Limited Company': 'Move a firm into a company',
  'LLP to Private Limited Company': 'Move an LLP into a company',
  'OPC to Private Limited Company': 'Add shareholders to an OPC',
  'Private Limited Company to LLP': 'Move a company into an LLP',
  'Private Company to Public Company': 'Open the company to the public',
  'Add or Remove a Director': 'Update who runs the company',
  'Add or Remove a Partner (LLP)': 'Update who is in the LLP',
  'Change Business Activity': 'Update what the business does',
  'Change Registered Office': 'Update the official address',
  'Change Company Name': 'Update the registered name',
  'Change LLP Agreement': 'Update the LLP terms',
  'Change Partnership Deed': 'Update the firm deed',
  'Increase Authorised Share Capital': 'Raise the share capital limit',
  'Close a Private Limited Company': 'Wind up a private company',
  'Close a Limited Liability Partnership': 'Close an LLP',
  'Close a One Person Company': 'Close an OPC',
  'Dissolve a Partnership Firm': 'End a partnership',
  'GST Registration': 'For businesses that need a GSTIN',
  'Udyam MSME Registration': 'MSME recognition on Udyam',
  'Shop & Establishment Registration': 'Local shop or office licence',
  'Professional Tax Registration': 'State professional tax enrolment',
  'PAN Application': 'Tax identity for the business',
  'TAN Application': 'Needed when you deduct TDS',
  'Startup India Registration': 'Recognition for eligible startups',
  'LUT under GST': 'Export without paying IGST',
  'ESI Registration': 'Employee state insurance',
  'DSC Registration': 'Digital signature for filings',
  'FSSAI Registration': 'Food safety licence',
  'Import Export Code Registration': 'Code for cross-border trade',
  'Trade License': 'Local permission to trade',
  'ISO Certification': 'Process and quality certification',
  'Drug License': 'For selling or making medicines',
  'EPF Registration': 'Provident fund for employees',
  'GST Return Filing': 'Periodic GST returns',
  'ITR Filing': 'Income-tax return for the year',
  'e-Way Bill': 'For moving goods',
  'TDS Return Filing': 'Returns for tax deducted',
  'Business Consultancy': 'Guidance on the next decision',
  'Business Plan Preparation': 'A written plan for the business',
  'Funding Assistance': 'Help preparing for funding talks',
  'Branding & Digital Marketing': 'Name, look and online presence',
  'Business Process Support': 'How the day-to-day work runs',
  'Franchise & Business Expansion': 'Open another location or a franchise',
};

const panelCopy = {
  'start-business': {
    title: 'Starting a New Business',
    helpTitle: 'Not sure which structure?',
    helpText: 'Liability, cost and yearly filings differ. We will point you to one that fits.',
  },
  'intellectual-property': {
    title: 'Protecting Your Brand',
    helpTitle: 'Not sure what to protect?',
    helpText: 'A name, a logo and an invention are filed differently. Tell us what you use.',
  },
  'business-change': {
    title: 'Updating Your Business',
    helpTitle: 'Not sure what to change?',
    helpText: 'A conversion, an update and a closure follow different steps. We will confirm the right one.',
  },
  'registrations-filings': {
    title: 'Getting the Right Licence',
    helpTitle: 'Not sure which licence applies?',
    helpText: 'GST, Shop Act, FSSAI and the rest depend on what you do. We will sort the list with you.',
  },
  'grow-your-business': {
    title: 'Growing From Here',
    helpTitle: 'Not sure what comes next?',
    helpText: 'Tell us what you want to do. We will tell you what you need.',
  },
};

function menuCount(menu) {
  return menu.groups.reduce((total, group) => total + group.items.length, 0);
}

function iconFor(title) {
  const text = title.toLowerCase();
  if (/trademark|copyright|patent|brand/.test(text)) return IconShield;
  if (/gst|tax|itr|tds|e-way|lut|pan application|tan application/.test(text)) return IconClipboard;
  if (/fssai|licen[cs]e|iso|drug|epf|esi|dsc|udyam|startup/.test(text)) return IconClipboard;
  if (/close|dissolv/.test(text)) return IconRefresh;
  if (/change|add or remove|increase| to /.test(text)) return IconRefresh;
  if (/fund|franchise|marketing|expansion/.test(text)) return IconGrowth;
  if (/consult|plan|process/.test(text)) return IconCompass;
  if (/one person|sole|proprietor/.test(text)) return IconUsers;
  if (/partnership|llp|partner/.test(text)) return IconHandshake;
  return IconBuilding;
}

function panelIcon(menuId) {
  if (menuId === 'intellectual-property') return IconShield;
  if (menuId === 'business-change') return IconRefresh;
  if (menuId === 'registrations-filings') return IconClipboard;
  if (menuId === 'grow-your-business') return IconGrowth;
  return IconBuilding;
}

function MenuIconTile({ icon: Icon, solid = false }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg ${
        solid
          ? 'h-11 w-11 bg-brand-primary text-white'
          : 'mt-0.5 h-9 w-9 bg-[#e7f4f6] text-brand-primary'
      }`}
    >
      <span className={solid ? 'scale-[0.7]' : 'scale-[0.58]'}>
        <Icon />
      </span>
    </span>
  );
}

function MenuLink({ title, onClick }) {
  const Icon = iconFor(title);
  const hint = menuHints[title];
  return (
    <Link
      to={`/services/${slugify(title)}`}
      onClick={onClick}
      className="group flex items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-[#f3fafb]"
    >
      <MenuIconTile icon={Icon} />
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-snug text-brand-text group-hover:text-brand-primary">
          {title}
        </span>
        {hint ? (
          <span className="mt-0.5 block text-xs leading-snug text-brand-text-soft">{hint}</span>
        ) : null}
      </span>
    </Link>
  );
}

function PhoneMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M8.5 5.5h2l1 3-1.6 1a11 11 0 0 0 4.6 4.6l1-1.6 3 1v2A1.5 1.5 0 0 1 17 17 12.5 12.5 0 0 1 7 7a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuPanel({ menu, onNavigate }) {
  const copy = panelCopy[menu.id] || {
    title: menu.label,
    helpTitle: 'Not sure which one applies?',
    helpText: 'Tell us what you want to do. We will tell you what you need.',
  };
  const Icon = panelIcon(menu.id);
  return (
    <aside className="border-t border-[#eee] pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
      <MenuIconTile icon={Icon} solid />
      <p className="mt-4 font-display text-lg font-semibold leading-snug text-brand-text">
        {copy.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-brand-text-soft">{menu.description}</p>
      <Link
        to={menu.path}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-accent"
        onClick={onNavigate}
      >
        View all {menuCount(menu)} services
        <span aria-hidden>→</span>
      </Link>
      <div className="mt-5 rounded-xl border border-[#f3dcc8] bg-[#fff7f0] p-4">
        <p className="text-sm font-semibold text-brand-text">{copy.helpTitle}</p>
        <p className="mt-1 text-xs leading-relaxed text-brand-text-soft">{copy.helpText}</p>
        <a
          href={brand.phoneHref}
          className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-brand-primary/25 bg-white px-3 py-2.5 text-sm font-semibold text-brand-primary transition hover:border-brand-accent hover:text-brand-accent"
        >
          <PhoneMark />
          {brand.phone}
        </a>
      </div>
    </aside>
  );
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
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-8 py-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <div
              className={`grid gap-x-6 gap-y-6 ${
                current.groups.length > 2
                  ? 'lg:grid-cols-3'
                  : current.groups.length > 1
                    ? 'lg:grid-cols-2'
                    : ''
              }`}
            >
              {current.groups.map((group, index) => (
                <div
                  key={group.label}
                  className={index > 0 ? 'lg:border-l lg:border-[#eee] lg:pl-6' : ''}
                >
                  <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-text-soft">
                    {group.label}
                  </p>
                  <ul className="mt-2">
                    {group.items.map((title) => (
                      <li key={title}>
                        <MenuLink title={title} onClick={() => setActiveMenu(null)} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <MenuPanel menu={current} onNavigate={() => setActiveMenu(null)} />
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
                      <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-text-soft">
                        {group.label}
                      </p>
                      <ul className="mt-1">
                        {group.items.map((title) => (
                          <li key={title}>
                            <MenuLink title={title} />
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

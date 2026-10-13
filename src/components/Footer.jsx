import { Link } from 'react-router-dom';
import { brand, getWhatsAppUrl } from '../data/content';

const footerColumns = [
  {
    title: 'Business Solutions',
    links: [
      { label: 'Start a Business', to: '/category/start-business' },
      { label: 'Registrations & Licences', to: '/category/registrations-filings' },
      { label: 'Protect Your Business', to: '/category/intellectual-property' },
      { label: 'Change in Business', to: '/category/business-change' },
      { label: 'Grow Your Business', to: '/category/grow-your-business' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Solution Finder', to: '/finder' },
      { label: 'Compare Structures', to: '/compare' },
      { label: 'Knowledge Centre', to: '/knowledge' },
      { label: 'Industry Solutions', to: '/industries' },
      { label: 'All Services', to: '/#services' },
    ],
  },
  {
    title: 'Startbiz',
    links: [
      { label: 'About Us', to: '/#about' },
      { label: 'Why Startbiz', to: '/#why' },
      { label: 'FAQs', to: '/#faq' },
      { label: 'Contact', to: '/#contact' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms-and-conditions' },
      { label: 'Refund & Cancellation', to: '/refund-cancellation-policy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="border-b border-white/10 bg-brand-navy">
        <div className="section-wrap grid gap-4 py-5 sm:grid-cols-3">
          <a href={brand.phoneHref} className="text-sm">
            <span className="block text-xs uppercase tracking-wider text-white/50">Call us</span>
            <span className="mt-1 block font-semibold">{brand.phone}</span>
          </a>
          <a href="#contact" className="text-sm">
            <span className="block text-xs uppercase tracking-wider text-white/50">Contact us</span>
            <span className="mt-1 block font-semibold">Send an enquiry</span>
          </a>
          <a href={brand.emailHref} className="text-sm">
            <span className="block text-xs uppercase tracking-wider text-white/50">Email</span>
            <span className="mt-1 block break-all font-semibold">{brand.email}</span>
          </a>
        </div>
      </div>
      <div className="section-wrap py-10 sm:py-12 lg:py-14">
        <div className="mb-8 max-w-xl">
          <Link to="/" className="inline-block">
            <img
              src={brand.logo}
              alt={`${brand.name} — ${brand.tagline}`}
              width={640}
              height={210}
              decoding="async"
              loading="lazy"
              className="h-12 w-auto max-w-[220px] object-contain sm:h-14"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {brand.shortName} — {brand.tagline}. {brand.supportLine}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/75 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a href={brand.phoneHref} className="hover:text-white">
                  Call {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(brand.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={brand.emailHref}
                  className="break-all hover:text-white"
                >
                  {brand.email}
                </a>
              </li>
              <li>Mon–Sat · 09:00 – 18:00</li>
              <li>
                <Link
                  to="/finder"
                  className="font-semibold text-brand-accent hover:text-white"
                >
                  Find My Business Requirements
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/55 sm:mt-10">
          <p>
            © {new Date().getFullYear()} {brand.domain} — Business registrations,
            licences &amp; solutions for startups and MSMEs in Maharashtra.
          </p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed">
            Startbiz is an independent business facilitation service, not a
            government department. We connect entrepreneurs with registration and
            compliance support. Content on this website is for general
            informational purposes.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/refund-cancellation-policy"
                className="hover:text-white"
              >
                Refund &amp; Cancellation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

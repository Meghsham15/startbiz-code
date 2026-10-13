import { Link } from 'react-router-dom';
import { brand } from '../data/content';
import { asset } from '../utils/asset';
import OptimizedImage from './OptimizedImage';
import ServiceSearch from './ServiceSearch';

const searchSuggestions = [
  'Trademark Registration',
  'Company Registration',
  'GST Registration',
  'MSME Registration',
  'FSSAI Registration',
];

const quickLinks = [
  { label: 'Trademark Registration', to: '/services/trademark-registration' },
  { label: 'Company Registration', to: '/services/private-limited-company-registration' },
  { label: 'GST Registration', to: '/services/gst-registration' },
  { label: 'MSME Registration', to: '/services/udyam-msme-registration' },
];

const progressSteps = [
  { label: 'Name approved', state: 'Done' },
  { label: 'Incorporation filed', state: 'Done' },
  { label: 'PAN and TAN issued', state: 'Done' },
  { label: 'GST registration', state: 'In progress' },
];

export default function Hero() {
  return (
    <section id="home" className="bg-white pt-[68px]">
      <div className="section-wrap grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
        <div className="animate-fadeUp">
          <p className="text-sm font-semibold text-brand-accent sm:text-base">
            {brand.tagline}
          </p>
          <h1 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-brand-text sm:text-4xl lg:text-[2.7rem]">
            Your Business Starts Here.
            <span className="mt-1 block text-brand-primary">
              We Help You Take the Right Step.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-brand-text-soft sm:text-base">
            Starting a business can be confusing. What registration do you need?
            Which licence applies? What should you do first?
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-brand-text-soft sm:text-base">
            <span className="font-semibold text-brand-text">
              Startbiz.in helps you find the right business solution — simply,
              clearly and professionally.
            </span>{' '}
            From GST, MSME, Shop Act and FSSAI to company registration, LLP,
            trademark, ISO, Import Export and GeM, we help businesses across
            Maharashtra take the right step.
          </p>
          <p className="mt-3 max-w-lg text-sm font-medium text-brand-text sm:text-base">
            Tell us what you want to do. We&apos;ll tell you what you need.
          </p>

          <ServiceSearch
            variant="hero"
            className="mt-6 max-w-xl"
            suggestions={searchSuggestions}
          />
          <p className="mt-3 text-sm text-brand-text-soft">
            Most requested:{' '}
            {quickLinks.map((item, index) => (
              <span key={item.to}>
                {index > 0 ? ' ' : null}
                <Link to={item.to} className="font-semibold text-brand-primary hover:underline">
                  {item.label}
                </Link>
                {index < quickLinks.length - 1 ? ',' : null}
              </span>
            ))}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Talk to an expert
            </a>
            <a
              href={brand.phoneHref}
              className="text-center text-lg font-semibold text-brand-text hover:text-brand-primary sm:text-left"
            >
              {brand.phone}
            </a>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-brand-text">
            <li>Guidance before you file, so you do not register what you do not need</li>
            <li>One place for setup, licences and the next compliance step</li>
          </ul>
        </div>

        <div
          className="relative mx-auto w-full max-w-lg"
          role="img"
          aria-label="Startbiz workspace with a sample progress card: three of four steps complete, GST registration in progress"
        >
          <OptimizedImage
            src={asset('/images/hero-workspace.webp')}
            alt=""
            width={1280}
            height={720}
            priority
            className="w-full rounded-3xl"
            imgClassName="object-cover object-left"
          />

          <div className="relative z-10 -mt-10 ml-5 mr-8 rounded-3xl border border-[#f0f0f0] bg-white p-5 shadow-soft sm:-mt-16 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fde8ea] font-display text-lg font-semibold text-[#9b2c3a]">
                M
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-display text-base font-semibold text-brand-text">
                    Meera Foods
                  </p>
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                    Active
                  </span>
                </div>
                <p className="text-xs text-brand-text-soft">Private Limited Company</p>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {progressSteps.map((step) => {
                const done = step.state === 'Done';
                return (
                  <li key={step.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2.5 text-brand-text">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          done
                            ? 'bg-[#e7f6ee] text-brand-green'
                            : 'bg-[#fff1e4] text-brand-accent'
                        }`}
                      >
                        {done ? (
                          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                            <path
                              fillRule="evenodd"
                              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l4.1 4.1 6.5-6.5a1 1 0 0 1 1.4 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-brand-accent" />
                        )}
                      </span>
                      {step.label}
                    </span>
                    <span
                      className={`shrink-0 text-xs font-semibold ${
                        done ? 'text-brand-text-soft' : 'text-brand-accent'
                      }`}
                    >
                      {step.state}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#f3d5d8]">
              <div className="h-full w-3/4 rounded-full bg-[#9b2c3a]" />
            </div>
            <p className="mt-2 text-xs text-brand-text-soft">3 of 4 steps complete</p>
          </div>

          <div className="absolute left-0 top-[46%] sm:left-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9b2c3a] text-white shadow-soft">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
            </div>
            <div className="mx-auto -mt-1 h-4 w-7 bg-[#7a2230]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </div>

          <div className="absolute right-2 top-3 flex items-center gap-2 rounded-2xl border border-[#f3f3f3] bg-white px-3 py-2 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff1e0] text-[10px] font-bold text-brand-accent">
              TM
            </span>
            <span>
              <span className="block text-xs font-semibold text-brand-text">Trademark filed</span>
              <span className="block text-[11px] text-brand-text-soft">Class 30</span>
            </span>
          </div>

          <div className="absolute bottom-6 right-3 flex items-center gap-2 rounded-2xl border border-[#f3f3f3] bg-white px-3 py-2 shadow-soft sm:bottom-8">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e7f1ff] text-sky-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path strokeLinecap="round" d="M8 3v4M16 3v4M4 10h16" />
              </svg>
            </span>
            <span>
              <span className="block text-xs font-semibold text-brand-text">Annual filing</span>
              <span className="block text-[11px] text-brand-text-soft">Due 30 Sep</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

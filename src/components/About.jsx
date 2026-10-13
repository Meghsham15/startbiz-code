import { Link } from 'react-router-dom';
import {
  aboutDifferentiators,
  aboutText,
  brand,
  exploreSolutions,
} from '../data/content';
import OptimizedImage from './OptimizedImage';
import {
  IconBadge,
  differentiatorIcons,
  IconSearch,
} from './VisualIcons';

export default function About() {
  return (
    <section id="about" className="bg-brand-surface py-12 sm:py-16 lg:py-20">
      <div className="section-wrap">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <p className="section-label">About Startbiz</p>
            <h2 className="heading mt-2 text-2xl sm:text-3xl lg:text-4xl">
              From Idea to Business Growth — We&apos;re With You
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-text-soft sm:text-base">
              {aboutText}
            </p>
            <p className="mt-4 text-sm font-medium text-brand-text sm:text-base">
              We aim to make business registration and compliance simpler,
              clearer and more accessible for entrepreneurs and existing
              businesses across Maharashtra.
            </p>
            <Link to="/finder" className="btn-primary mt-6">
              Find My Business Requirements →
            </Link>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl bg-white p-4 shadow-soft transition hover:shadow-md">
                <p className="font-display text-2xl font-semibold text-brand-accent">
                  500+
                </p>
                <p className="mt-1 text-sm text-brand-text-soft">
                  Businesses Served
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-soft transition hover:shadow-md">
                <p className="font-display text-2xl font-semibold text-brand-accent">
                  MH
                </p>
                <p className="mt-1 text-sm text-brand-text-soft">
                  Maharashtra-Wide Support
                </p>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -left-3 -top-3 h-20 w-20 rounded-full bg-brand-accent/20 blur-2xl sm:-left-4 sm:-top-4 sm:h-24 sm:w-24" />
            <div className="absolute -bottom-4 -right-3 h-24 w-24 rounded-full bg-brand-primary/15 blur-2xl sm:-bottom-6 sm:-right-4 sm:h-28 sm:w-28" />
            <OptimizedImage
              src={brand.cover}
              alt={`${brand.name} business consulting services overview`}
              width={1280}
              height={720}
              className="relative w-full rounded-2xl shadow-soft"
            />
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <p className="section-label">What makes Startbiz different?</p>
          <h3 className="heading mt-2 text-xl sm:text-2xl lg:text-3xl">
            Clear guidance at every step
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {aboutDifferentiators.map((item) => {
              const Icon = differentiatorIcons[item.title] || IconSearch;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-xl border border-[#dbdbdb] bg-white p-5 hover:border-brand-accent hover:shadow-soft"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-primary/5 transition"
                    aria-hidden
                  />
                  <IconBadge className="mb-3">
                    <Icon />
                  </IconBadge>
                  <h4 className="relative font-semibold text-brand-text">
                    {item.title}
                  </h4>
                  <p className="relative mt-2 text-sm text-brand-text-soft">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <p className="section-label">Explore solutions</p>
          <h3 className="heading mt-2 text-xl sm:text-2xl lg:text-3xl">
            What Can We Help You With?
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {exploreSolutions.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#dbdbdb] bg-white hover:border-brand-accent hover:shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden bg-brand-muted">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    fill
                    imgClassName="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 border-t border-[#dbdbdb] px-4 py-4">
                  <h4 className="text-base font-semibold text-brand-text">
                    {item.title}
                  </h4>
                  <p className="text-sm text-brand-text-soft">{item.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:text-brand-accent">
                    Explore options <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

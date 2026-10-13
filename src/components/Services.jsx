import { Link } from 'react-router-dom';
import {
  serviceCategories,
  serviceCount,
  slugify,
} from '../data/content';
import { serviceSolutionGroups } from '../data/strategyContent';
import ServiceSearch from './ServiceSearch';
import { useMemo, useState } from 'react';
import {
  IconBadge,
  IconBuilding,
  IconShield,
  IconRefresh,
  IconClipboard,
  IconGrowth,
} from './VisualIcons';

const groupIcons = {
  start: IconBuilding,
  protect: IconShield,
  change: IconRefresh,
  registrations: IconClipboard,
  grow: IconGrowth,
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);

  const activeCat = useMemo(
    () =>
      serviceCategories.find((c) => c.id === activeCategory) ||
      serviceCategories[0],
    [activeCategory]
  );

  return (
    <section id="services" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="section-wrap">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Find the right business solution</p>
            <h2 className="heading mt-2 text-2xl sm:text-3xl lg:text-4xl">
              Find the Right Business Solution
            </h2>
            <p className="body-muted mt-3 text-sm sm:text-base">
              Not sure which registration, licence or business service you need?
              Tell us a little about your business — or browse by goal if you
              already know what you&apos;re looking for.
            </p>
          </div>
          <ServiceSearch variant="nav" className="w-full max-w-md" />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/finder" className="btn-primary">
            Find My Business Requirements →
          </Link>
          <a href="#service-catalogue" className="btn-outline">
            I Already Know What I Need →
          </a>
        </div>

        <div className="mt-10">
          <h3 className="heading text-xl sm:text-2xl">
            What are you trying to do?
          </h3>
          <p className="body-muted mt-2 max-w-2xl text-sm sm:text-base">
            Instead of starting with {serviceCount}+ service names, choose your
            goal — then explore the relevant options.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSolutionGroups.map((group) => {
              const Icon = groupIcons[group.id] || IconBuilding;
              return (
                <Link
                  key={group.title}
                  to={group.to}
                  className="group relative overflow-hidden rounded-xl border border-[#dbdbdb] bg-brand-surface p-5 hover:border-brand-accent hover:shadow-soft sm:p-6"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-accent/10"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-brand-primary/5"
                    aria-hidden
                  />
                  <IconBadge className="mb-4">
                    <Icon />
                  </IconBadge>
                  <h3 className="relative font-display text-lg font-semibold text-brand-text">
                    {group.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-brand-text-soft">
                    {group.text}
                  </p>
                  <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:text-brand-accent">
                    Explore <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div id="service-catalogue" className="mt-12 scroll-mt-28 sm:mt-14">
          <p className="section-label">Browse all services</p>
          <h3 className="heading mt-2 text-xl sm:text-2xl lg:text-3xl">
            Browse All Business Services
          </h3>
          <p className="body-muted mt-2 text-sm sm:text-base">
            {serviceCount}+ services available — search or filter when you
            already know the name.
          </p>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-muted text-brand-text hover:bg-brand-primary/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {activeCat.items.map((title) => (
              <Link
                key={title}
                to={`/services/${slugify(title)}`}
                className="rounded-lg border border-[#dbdbdb] bg-brand-surface px-4 py-3 text-sm font-medium text-brand-text transition hover:border-brand-accent hover:text-brand-primary hover:shadow-soft"
              >
                {title}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to={activeCat.path || `/category/${activeCat.id}`}
              className="btn-outline"
            >
              Open {activeCat.label} page →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

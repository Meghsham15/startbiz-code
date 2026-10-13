import { Link } from 'react-router-dom';
import { services } from '../data/content';

const featuredSlugs = [
  'trademark-registration',
  'private-limited-company-registration',
  'gst-registration',
  'llp-registration',
  'one-person-company-registration',
  'msme-registration',
];

export default function PopularServices() {
  const featured = featuredSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter(Boolean);

  return (
    <section id="popular" className="bg-brand-surface py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">Popular services</p>
        <h2 className="heading mt-2 max-w-2xl text-2xl sm:text-3xl">
          Registrations and filings businesses ask about first
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          Each service starts with what it is for and what usually comes next.
          Fees depend on the filing, so we explain them before you proceed.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col rounded-xl border border-[#e6e6e6] bg-white p-5"
            >
              <h3 className="font-display text-lg font-semibold text-brand-text">
                {service.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-brand-text-soft">
                {service.points.slice(0, 4).map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/services/${service.slug}`}
                className="mt-5 text-sm font-semibold text-brand-primary hover:underline"
              >
                View {service.title}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

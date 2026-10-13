import { Link, Navigate, useParams } from 'react-router-dom';
import Seo, { breadcrumbSchema } from '../components/Seo';
import {
  brand,
  getMegaMenuById,
  getServicesByCategoryId,
  slugify,
  whatsappHref,
} from '../data/content';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const menu = getMegaMenuById(categoryId);

  if (!menu) {
    return <Navigate to="/" replace />;
  }

  const services = getServicesByCategoryId(categoryId);
  const jsonLd = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: menu.label, path: menu.path },
  ]);

  return (
    <div className="bg-brand-surface">
      <Seo
        title={menu.seoTitle}
        description={menu.seoDescription}
        keywords={`${menu.label}, business consulting services, startbiz.in, ${menu.groups
          .flatMap((g) => g.items)
          .slice(0, 8)
          .join(', ')}`}
        path={menu.path}
        jsonLd={jsonLd}
      />

      <section className="border-b border-[#eee] bg-white pt-[68px]">
        <div className="section-wrap py-10 sm:py-14">
          <nav className="mb-5 text-sm text-brand-text-soft">
            <Link to="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-text">{menu.label}</span>
          </nav>
          <p className="section-label">Business consulting services</p>
          <h1 className="heading mt-2 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            {menu.label}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-text-soft sm:text-base">
            {menu.description} Expert support from {brand.name} —
            contact {brand.contactPerson} at {brand.phone}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Get My Business Solution
            </a>
            <a href={brand.phoneHref} className="btn-outline w-full sm:w-auto">
              Call {brand.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="section-wrap space-y-12">
          {menu.groups.map((group) => (
            <div key={group.label}>
              <p className="section-label">{group.label}</p>
              <h2 className="heading mt-2 text-2xl sm:text-3xl">{group.label}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((title) => {
                  const slug = slugify(title);
                  const service = services.find((s) => s.slug === slug);
                  return (
                    <Link
                      key={title}
                      to={`/services/${slug}`}
                      className="group rounded-2xl border border-[#eee] bg-white p-5 hover:border-brand-primary hover:shadow-soft"
                    >
                      <h3 className="text-base font-semibold text-brand-text group-hover:text-brand-primary">
                        {title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-brand-text-soft">
                        {service?.summary ||
                          `${title} support from ${brand.name}.`}
                      </p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-brand-primary">
                        Know more
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-primary py-10 text-white sm:py-12">
        <div className="section-wrap flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Need help choosing the right option?
            </h2>
            <p className="mt-2 text-sm text-white/80 sm:text-base">
              Speak with {brand.contactPerson} for guided {menu.label.toLowerCase()}{' '}
              support across Maharashtra.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              WhatsApp
            </a>
            <a href={brand.phoneHref} className="btn-ghost-light w-full sm:w-auto">
              Call {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

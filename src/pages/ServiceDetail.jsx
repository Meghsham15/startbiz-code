import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import Reveal from '../components/Reveal';
import Seo, { breadcrumbSchema, serviceSchema } from '../components/Seo';
import StructureTable, { ServiceFactTable } from '../components/StructureTable';
import {
  brand,
  getRelatedServices,
  getServiceBySlug,
  megaMenus,
  serviceCount,
  trustStats,
} from '../data/content';
import { STANDARD_PROCESS } from '../data/serviceGuides';
import { getServiceFacts, structureColumns } from '../data/structureTables';
import { absoluteUrl } from '../data/site';
import { sitePath } from '../utils/asset';

const SERVICE_POSTER = {
  'fssai-registration.webp': [960, 639],
  'gst-registration.webp': [960, 640],
  'import-export-code-registration.webp': [960, 960],
  'iso-certification.webp': [960, 960],
  'limited-liability-partnership-registration.webp': [960, 639],
  'one-person-company-registration.webp': [960, 639],
  'partnership-firm-registration.webp': [960, 640],
  'private-limited-company-registration.webp': [960, 640],
  'shop-and-establishment-registration.webp': [960, 639],
  'trademark-registration.webp': [960, 960],
  'udyam-msme-registration.webp': [960, 639],
};

function posterSize(src = '') {
  const name = src.split('/').pop();
  return SERVICE_POSTER[name] || [960, 640];
}

function CheckItem({ children }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-brand-text sm:text-base">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e7f6ee] text-brand-green">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l4.1 4.1 6.5-6.5a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

function buildFaqs(service, documents) {
  const faqs = [];
  const overview = service.whatIsIt || service.about;
  if (overview) {
    faqs.push({ q: `What is ${service.title}?`, a: overview });
  }
  const who = service.whoNeedsIt || service.whoCanApply || [];
  if (who.length) {
    faqs.push({
      q: `Who may need ${service.title}?`,
      a: who.join(' '),
    });
  }
  if (documents.length) {
    faqs.push({
      q: 'Which documents are usually needed to start?',
      a: `${documents.slice(0, 6).join(', ')}.`,
    });
  }
  if (service.ifYouDont) {
    faqs.push({
      q: 'What if this applies and it is skipped?',
      a: service.ifYouDont,
    });
  }
  if (service.pricingNote) {
    faqs.push({
      q: 'How long does this take, and what does it cost?',
      a: service.pricingNote,
    });
  }
  return faqs;
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const [showAllPoints, setShowAllPoints] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeId, setActiveId] = useState('overview');

  const facts = service ? getServiceFacts(service.slug) : null;
  const structureMatch = service
    ? structureColumns.find((column) => column.slug === service.slug)
    : null;
  const documents = service?.documents || [];
  const faqs = service ? buildFaqs(service, documents) : [];
  const sectionIds = [
    'overview',
    'included',
    'benefits',
    facts || structureMatch ? 'compare' : null,
    documents.length ? 'documents' : null,
    'process',
    'timeline',
    faqs.length ? 'faqs' : null,
  ].filter(Boolean);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.15, 0.4] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [slug, sectionIds.join('|')]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const related = getRelatedServices(service.slug, 3);
  const categoryPath =
    megaMenus.find((menu) => menu.id === service.categoryId)?.path || '/';
  const pageTitle =
    service.seoTitle ||
    `${service.title} | ${brand.name} Business Consulting Services`;
  const pageDescription =
    service.seoDescription ||
    `${service.summary} Expert business consulting services from ${brand.name} across Maharashtra, India.`;
  const pageKeywords = Array.isArray(service.keywords)
    ? service.keywords.join(', ')
    : undefined;
  const servicePath = `/services/${service.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    ...(service.categoryId
      ? [{ name: service.category, path: categoryPath }]
      : []),
    { name: service.title, path: servicePath },
  ];
  const overview = service.whatIsIt || service.about || service.summary;
  const benefits = service.benefits || [];
  const whoNeeds = service.whoNeedsIt || service.whoCanApply || [];
  const included = service.points?.length ? service.points : [];
  const process = service.process?.length ? service.process : STANDARD_PROCESS;
  const previewPoints = included.slice(0, 3);
  const hiddenCount = Math.max(included.length - previewPoints.length, 0);
  const visiblePoints = showAllPoints ? included : previewPoints;
  const highlights = trustStats.slice(0, 3);
  const [posterWidth, posterHeight] = posterSize(service.image);
  const posterUrl = service.image ? absoluteUrl(sitePath(service.image)) : undefined;
  const tallPoster = posterHeight / posterWidth >= 0.9;
  const sections = [
    { id: 'overview', label: 'Overview' },
    included.length ? { id: 'included', label: "What's included" } : null,
    benefits.length ? { id: 'benefits', label: 'Benefits' } : null,
    facts || structureMatch ? { id: 'compare', label: 'Compare' } : null,
    documents.length ? { id: 'documents', label: 'Documents' } : null,
    { id: 'process', label: 'Process' },
    { id: 'timeline', label: 'Timeline' },
    faqs.length ? { id: 'faqs', label: 'FAQs' } : null,
  ].filter(Boolean);

  return (
    <div className="bg-white">
      <Seo
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        path={servicePath}
        image={posterUrl}
        jsonLd={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: service.title,
            description: pageDescription,
            path: servicePath,
            category: service.category,
            image: posterUrl,
          }),
        ]}
      />

      <div className="bg-[#f6f7f8] pt-[68px]">
        <div
          className={`section-wrap grid items-start gap-8 py-8 sm:py-10 lg:py-12 ${
            service.image
              ? tallPoster
                ? 'lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-x-12'
                : 'lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,30rem)] lg:gap-x-12'
              : ''
          }`}
        >
          <div>
            <nav className="mb-5 flex flex-wrap items-center text-sm text-brand-text-soft">
              <Link to="/" className="hover:text-brand-primary">
                Home
              </Link>
              {service.categoryId ? (
                <>
                  <span className="mx-2">/</span>
                  <Link to={categoryPath} className="hover:text-brand-primary">
                    {service.category}
                  </Link>
                </>
              ) : null}
              <span className="mx-2">/</span>
              <span className="text-brand-text">{service.title}</span>
            </nav>

            <h1 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-brand-text sm:text-4xl lg:text-[2.6rem]">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-text-soft sm:text-base">
              {service.summary}
            </p>
            {service.needPrompt ? (
              <p className="mt-3 text-sm font-semibold text-brand-accent">
                {service.needPrompt.question}
              </p>
            ) : null}

            {visiblePoints.length ? (
              <ul className="mt-6 space-y-3">
                {visiblePoints.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
            ) : null}
            {hiddenCount > 0 ? (
              <button
                type="button"
                className="mt-3 text-sm font-semibold text-brand-primary hover:underline"
                onClick={() => setShowAllPoints((open) => !open)}
              >
                {showAllPoints ? 'Show less' : `+${hiddenCount} more`}
              </button>
            ) : null}

            <ul className="mt-8 grid gap-3 border-t border-[#e6e6e6] pt-5 sm:grid-cols-3">
              {highlights.map((item) => (
                <li key={item.label}>
                  <p className="font-display text-lg font-semibold text-brand-text">{item.value}</p>
                  <p className="text-xs text-brand-text-soft">{item.label}</p>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-brand-text-soft">
              Prefer to talk to someone first?{' '}
              <a href={brand.phoneHref} className="font-semibold text-brand-primary hover:underline">
                {brand.phone}
              </a>
            </p>
          </div>

          {service.image ? (
            <aside className={tallPoster ? 'mx-auto w-full max-w-[22rem] lg:mx-0 lg:justify-self-end' : undefined}>
              <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-soft">
                <OptimizedImage
                  src={service.image}
                  alt={`${service.title} service overview`}
                  width={posterWidth}
                  height={posterHeight}
                  priority
                  imgClassName="bg-white object-contain object-top"
                />
              </div>
            </aside>
          ) : null}
        </div>

        <Reveal className="section-wrap pb-12">
          <div className="min-w-0">
            <nav
              aria-label="On this page"
              className="-mx-4 mb-8 flex gap-2 overflow-x-auto border-y border-[#eee] bg-white px-4 py-2 sm:-mx-0 sm:rounded-xl sm:border sm:px-2"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${
                    activeId === section.id
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-text-soft hover:bg-brand-surface hover:text-brand-text'
                  }`}
                  onClick={() => setActiveId(section.id)}
                >
                  {section.label}
                </a>
              ))}
            </nav>

            <section id="overview" className="scroll-mt-32">
              <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                What {service.title} is
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-text-soft sm:text-base">
                {overview}
              </p>
              {service.whyImportant || service.whyItMatters ? (
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-text sm:text-base">
                  {service.whyImportant || service.whyItMatters}
                </p>
              ) : null}
              {whoNeeds.length > 0 ? (
                <div className="mt-6">
                  <h3 className="text-base font-semibold text-brand-text">Who may need this</h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {whoNeeds.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
              ) : null}
              {service.nextStep ? (
                <p className="mt-6 rounded-2xl border border-[#eee] bg-white p-4 text-sm leading-relaxed text-brand-text-soft">
                  <span className="font-semibold text-brand-text">Before you file. </span>
                  {service.nextStep}
                </p>
              ) : null}
            </section>

            {included.length > 0 ? (
              <section id="included" className="scroll-mt-32 mt-14">
                <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                  What this covers
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-text-soft sm:text-base">
                  You share the details once. We prepare the drafts and file where this service needs a filing.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {included.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
                {service.types?.length ? (
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {service.types.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                ) : null}
              </section>
            ) : null}

            {benefits.length > 0 ? (
              <section id="benefits" className="scroll-mt-32 mt-14">
                <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                  Why this can matter
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {benefits.map((item) => (
                    <article key={item} className="rounded-2xl border border-[#eee] bg-white p-5">
                      <h3 className="text-base font-semibold leading-snug text-brand-text">{item}</h3>
                    </article>
                  ))}
                </div>
                {service.ifYouDont ? (
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-text-soft">
                    {service.ifYouDont}
                  </p>
                ) : null}
              </section>
            ) : null}

            {facts || structureMatch ? (
              <section id="compare" className="scroll-mt-32 mt-14">
                <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                  {structureMatch ? `How ${structureMatch.label} compares` : 'At a glance'}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-text-soft sm:text-base">
                  {structureMatch
                    ? 'Liability, owners and yearly filings differ across the five common structures. The highlighted column is this one.'
                    : 'A short factual snapshot. Thresholds and department rules change, so confirm the current position before you file.'}
                </p>
                {facts ? (
                  <div className="mt-6">
                    <ServiceFactTable facts={facts} />
                  </div>
                ) : null}
                {structureMatch ? (
                  <div className="mt-6">
                    <StructureTable highlightSlug={structureMatch.slug} />
                    <Link
                      to="/compare"
                      className="mt-4 inline-block text-sm font-semibold text-brand-primary hover:underline"
                    >
                      Open the full comparison
                    </Link>
                  </div>
                ) : null}
              </section>
            ) : null}

            {documents.length > 0 ? (
              <section id="documents" className="scroll-mt-32 mt-14">
                <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                  Documents required for {service.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-text-soft sm:text-base">
                  Clear copies are enough to begin. We will tell you if a document needs to be shared again.
                </p>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                  {documents.map((item, index) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-[#eee] bg-white px-4 py-4 text-sm text-brand-text"
                    >
                      <span className="font-display text-sm font-semibold text-brand-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="mt-2 font-semibold">{item}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <section id="process" className="scroll-mt-32 mt-14">
              <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                How {service.title} is handled
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-brand-text-soft sm:text-base">
                You share the details once. We prepare the drafts, file where needed, and keep you updated.
              </p>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {process.map((step, index) => (
                  <li key={step} className="rounded-2xl border border-[#eee] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                      Step {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-brand-text sm:text-base">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="timeline" className="scroll-mt-32 mt-14">
              <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                How long this takes
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-text-soft sm:text-base">
                {service.pricingNote}
              </p>
              <ol className="mt-6 space-y-0">
                {process.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      {index < process.length - 1 ? (
                        <span className="w-px flex-1 bg-[#d7e4e6]" />
                      ) : null}
                    </div>
                    <p className="pb-5 pt-1 text-sm font-semibold text-brand-text">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            {faqs.length > 0 ? (
              <section id="faqs" className="scroll-mt-32 mt-14">
                <h2 className="font-display text-2xl font-semibold text-brand-text sm:text-3xl">
                  Questions about {service.title}
                </h2>
                <div className="mt-6 divide-y divide-[#eee] rounded-2xl border border-[#eee] bg-white">
                  {faqs.map((item, index) => {
                    const open = openFaq === index;
                    return (
                      <div key={item.q}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-brand-text sm:text-base"
                          aria-expanded={open}
                          onClick={() => setOpenFaq(open ? -1 : index)}
                        >
                          {item.q}
                          <span className="text-brand-text-soft" aria-hidden>
                            {open ? '−' : '+'}
                          </span>
                        </button>
                        {open ? (
                          <p className="px-4 pb-4 text-sm leading-relaxed text-brand-text-soft">{item.a}</p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <section className="mt-14 rounded-2xl bg-brand-primary px-5 py-8 text-white sm:px-8">
              <h2 className="font-display text-2xl font-semibold">Need help with {service.title}?</h2>
              <p className="mt-2 max-w-xl text-sm text-white/80">
                Call {brand.phone} or send an enquiry. We will confirm the next step before you file.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-primary">
                  Send an enquiry
                </a>
                <a href={brand.phoneHref} className="btn-ghost-light">
                  Call {brand.phone}
                </a>
              </div>
            </section>

            <section className="mt-14">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold text-brand-text">Related services</h2>
                {service.categoryId ? (
                  <Link to={categoryPath} className="text-sm font-semibold text-brand-primary hover:underline">
                    View all in {service.category}
                  </Link>
                ) : null}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/services/${item.slug}`}
                    className="rounded-2xl border border-[#eee] bg-white p-5 hover:border-brand-primary hover:shadow-soft"
                  >
                    <h3 className="font-semibold text-brand-text">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-brand-text-soft">{item.summary}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-brand-primary">
                      Know more
                    </span>
                  </Link>
                ))}
              </div>
              <Link to="/#services" className="mt-8 inline-block text-sm font-semibold text-brand-primary hover:underline">
                Browse {serviceCount}+ services
              </Link>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

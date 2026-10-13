import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RequirementFinder from './RequirementFinder';
import StructureTable from './StructureTable';
import {
  askStartbizExamples,
  customerProcess,
  gstBenefitsPreview,
  intentPathways,
  journeySteps,
  packages,
  serviceSolutionGroups,
  siteFaqs,
  solutionBusinessTypes,
  solutionGoals,
  solutionRecommendations,
  structureGuide,
  whyDifferent,
} from '../data/strategyContent';
import { industries } from '../data/industries';
import { knowledgeArticles } from '../data/knowledge';
import { brand, getWhatsAppUrl } from '../data/content';
import {
  IconBadge,
  IconChat,
  IconSearch,
  IconStep,
  pathwayIcons,
  IconBuilding,
} from './VisualIcons';

function serviceHref(slug) {
  return slug.startsWith('/') ? slug : `/services/${slug}`;
}

function ChoiceChip({ active, children, onClick, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-left ${
        active
          ? 'border-brand-primary bg-brand-primary text-white shadow-soft'
          : 'border-[#dbdbdb] bg-white text-brand-text hover:border-brand-accent hover:shadow-soft'
      }`}
    >
      <span className="block text-sm font-medium">{children}</span>
      {hint ? (
        <span
          className={`mt-0.5 block text-xs leading-snug ${
            active ? 'text-white/80' : 'text-brand-text-soft'
          }`}
        >
          {hint}
        </span>
      ) : null}
    </button>
  );
}

export function ProblemPathways() {
  return (
    <section id="problem" className="bg-white py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">What are you looking to do?</p>
        <h2 className="heading mt-2 max-w-2xl text-2xl sm:text-3xl lg:text-4xl">
          What Are You Looking to Do?
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          Get the right registrations, licences and business solutions — without
          the confusion. Choose what you want to achieve. We&apos;ll help you
          understand what you may need.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {intentPathways.map((path) => {
            const Icon = pathwayIcons[path.id] || IconBuilding;
            return (
              <article
                key={path.id}
                className={`group relative overflow-hidden rounded-xl border p-5 hover:shadow-soft sm:p-6 ${path.accent}`}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/50"
                  aria-hidden
                />
                <IconBadge className="mb-4">
                  <Icon />
                </IconBadge>
                <h3 className="relative font-display text-lg font-semibold text-brand-text sm:text-xl">
                  {path.title}
                </h3>
                {path.description && (
                  <p className="relative mt-2 text-sm text-brand-text-soft">
                    {path.description}
                  </p>
                )}
                <p className="relative mt-4 text-xs font-semibold uppercase tracking-wide text-brand-text-soft">
                  Popular solutions
                </p>
                <ul className="relative mt-2 flex flex-wrap gap-2">
                  {path.items.map((item) => (
                    <li key={`${path.id}-${item.label}`}>
                      <Link
                        to={serviceHref(item.slug)}
                        className="inline-flex rounded-md border border-white/80 bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-primary transition hover:border-brand-accent hover:text-brand-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={path.to}
                  className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition hover:text-brand-accent"
                >
                  {path.cta} <span aria-hidden>→</span>
                </Link>
              </article>
            );
          })}
        </div>
        <div className="group relative mt-8 overflow-hidden rounded-xl border border-[#dbdbdb] bg-brand-surface px-5 py-6 sm:px-7">
          <div
            className="pointer-events-none absolute -right-8 top-0 h-28 w-28 rounded-full bg-brand-accent/10"
            aria-hidden
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
            <IconBadge>
              <IconSearch />
            </IconBadge>
            <div>
              <h3 className="font-display text-lg font-semibold text-brand-text sm:text-xl">
                Not Sure What You Need?
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-brand-text-soft sm:text-base">
                Don&apos;t worry. Tell us about your business and we&apos;ll help
                you identify the relevant registrations and business solutions.
              </p>
              <Link to="/finder" className="btn-primary mt-5">
                Find My Business Requirements →
              </Link>
              <p className="mt-3 text-xs text-brand-text-soft sm:text-sm">
                Simple questions. Clear guidance. The right next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionFinderSection() {
  const [businessType, setBusinessType] = useState('');
  const [goal, setGoal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const resultsRef = useRef(null);

  const results = useMemo(() => {
    if (!goal) return [];
    return solutionRecommendations[goal] || [];
  }, [goal]);

  useEffect(() => {
    if (!submitted || results.length === 0) return;
    const id = window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [submitted, results.length, businessType, goal]);

  const onFind = (e) => {
    e.preventDefault();
    if (!businessType || !goal) return;
    setSubmitted(true);
  };

  return (
    <section id="solution-finder" className="bg-brand-surface py-12 sm:py-16 lg:py-20">
      <div className="section-wrap">
        <h2 className="heading max-w-3xl text-2xl sm:text-3xl lg:text-4xl">
          Not Sure What Registration You Need?
        </h2>
        <p className="mt-3 max-w-2xl font-display text-lg font-semibold leading-snug text-brand-text sm:text-xl lg:text-2xl">
          Don&apos;t worry. Tell us about your business.
        </p>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          Answer 2 simple questions and we&apos;ll suggest business
          registrations, licences and solutions that may be relevant to you.
          You&apos;ll get a starting point — not a complicated service list.
        </p>

        <form
          onSubmit={onFind}
          className="mt-8 rounded-xl border border-[#dbdbdb] bg-white p-5 shadow-soft sm:p-7"
        >
          <fieldset>
            <legend className="text-sm font-semibold text-brand-text sm:text-base">
              1. What type of business are you planning?
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {solutionBusinessTypes.map((type) => (
                <ChoiceChip
                  key={type.label}
                  active={businessType === type.label}
                  hint={type.hint}
                  onClick={() => {
                    setBusinessType(type.label);
                    setSubmitted(false);
                  }}
                >
                  {type.label}
                </ChoiceChip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-sm font-semibold text-brand-text sm:text-base">
              2. What do you want to do?
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {solutionGoals.map((item) => (
                <ChoiceChip
                  key={item}
                  active={goal === item}
                  onClick={() => {
                    setGoal(item);
                    setSubmitted(false);
                  }}
                >
                  {item}
                </ChoiceChip>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn-primary mt-8 w-full sm:w-auto"
            disabled={!businessType || !goal}
          >
            Find My Business Requirements
          </button>
          <p className="mt-3 text-xs text-brand-text-soft sm:text-sm">
            We&apos;ll show you the registrations and business solutions that may
            be relevant based on your answers.
          </p>
        </form>

        {submitted && results.length > 0 && (
          <div
            ref={resultsRef}
            tabIndex={-1}
            className="mt-6 scroll-mt-28 rounded-xl border border-brand-primary/20 bg-white p-5 outline-none sm:p-6"
          >
            <h3 className="font-semibold text-brand-text">
              Suggested starting points for a {businessType.toLowerCase()} looking
              to {goal.toLowerCase()}
            </h3>
            <p className="mt-2 text-sm text-brand-text-soft">
              Guidance only — these may apply based on your answers. Final
              requirements depend on your activity and location. Talk to Startbiz
              to confirm.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {results.map((item) => (
                <li key={item.label}>
                  <Link
                    to={serviceHref(item.slug)}
                    className="flex items-center justify-between rounded-lg border border-[#dbdbdb] px-4 py-3 text-sm font-semibold text-brand-primary transition hover:border-brand-accent"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link to="/finder" className="btn-primary">
                Get a fuller roadmap
              </Link>
              <a href="#contact" className="btn-outline">
                Get My Business Solution
              </a>
            </div>
            <p className="mt-4 text-sm text-brand-text-soft">
              Need confirmation? Talk to a Startbiz Business Expert.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function FinderSection() {
  return (
    <section id="finder" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="section-wrap">
        <p className="section-label">Business requirement finder</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Need a more detailed roadmap?
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          Answer a few questions. We will group GST, licences and registrations
          as essential, recommended, or depending on your activity.
        </p>
        <div className="mt-8">
          <RequirementFinder embedded />
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="bg-white py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">Business journey</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          From Idea to Business Growth — We&apos;re With You
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journeySteps.map((step, index) => (
            <li
              key={step.n}
              className="group relative overflow-hidden rounded-xl border border-[#dbdbdb] bg-brand-surface p-5 hover:border-brand-accent hover:shadow-soft"
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-accent/10 transition"
                aria-hidden
              />
              <IconStep n={step.n} />
              <h3 className="relative mt-3 font-semibold text-brand-text">
                {step.title}
              </h3>
              <p className="relative mt-2 text-sm text-brand-text-soft">
                {step.text}
              </p>
              {index < journeySteps.length - 1 && (
                <span className="relative mt-3 inline-block text-brand-accent lg:hidden">
                  ↓
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AskStartbizSection() {
  return (
    <section id="ask-startbiz" className="bg-brand-surface py-12 sm:py-16">
      <div className="section-wrap">
        <div className="flex items-start gap-3">
          <IconBadge>
            <IconChat />
          </IconBadge>
          <div>
            <p className="section-label">Ask Startbiz</p>
            <h2 className="heading mt-2 text-2xl sm:text-3xl lg:text-4xl">
              Have a Business Question?
            </h2>
          </div>
        </div>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          Ask Startbiz. Change your mindset from &quot;Which service should I
          buy?&quot; to &quot;Startbiz can tell me what I need.&quot;
        </p>
        <ul className="mt-8 space-y-3">
          {askStartbizExamples.map((example) => (
            <li key={example}>
              <a
                href={getWhatsAppUrl(example)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-[#dbdbdb] bg-white px-4 py-3 text-sm text-brand-text hover:border-brand-accent hover:shadow-soft sm:text-base"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-muted text-sm font-bold text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                  ?
                </span>
                <span className="flex-1">{example}</span>
                <span
                  className="mt-0.5 shrink-0 text-brand-primary opacity-0 transition group-hover:opacity-100"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={getWhatsAppUrl(brand.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Ask Startbiz →
          </a>
          <a href="#contact" className="btn-outline">
            Get My Business Solution
          </a>
        </div>
      </div>
    </section>
  );
}

export function BenefitsPreview() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="section-label">Benefits first</p>
          <h2 className="heading mt-2 text-2xl sm:text-3xl">
            Do you actually need GST registration?
          </h2>
          <p className="body-muted mt-3 text-sm sm:text-base">
            GST is a tax system, not a default badge. Understand whether it may
            apply, what it helps with, and what it commits you to — then decide.
          </p>
          <ul className="mt-6 space-y-2">
            {gstBenefitsPreview.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-brand-text">
                <span className="text-brand-green">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/finder?need=gst-registration" className="btn-primary">
              Check my GST requirement
            </Link>
            <Link to="/services/gst-registration" className="btn-outline">
              Learn GST benefits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StructureSection() {
  return (
    <section id="compare" className="bg-brand-surface py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">Choose a structure</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Which business structure may fit you?
        </h2>
        <div className="mt-8">
          <StructureTable />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {structureGuide.map((row) => (
            <Link
              key={row.ifYou}
              to={serviceHref(row.slug)}
              className="rounded-xl border border-[#dbdbdb] bg-white p-4 hover:border-brand-accent"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                If you are
              </p>
              <p className="mt-1 font-semibold text-brand-text">{row.ifYou}</p>
              <p className="mt-2 text-sm text-brand-text-soft">
                Consider: {row.consider}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/compare" className="btn-outline">
            Compare business structures
          </Link>
        </div>
      </div>
    </section>
  );
}

export function IndustrySection() {
  return (
    <section id="industries" className="bg-white py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">Industry solutions</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Typical needs by business type
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm">
          These are common starting points. Final requirements depend on your
          activity and location.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item) => (
            <Link
              key={item.slug}
              to={`/industries/${item.slug}`}
              className="rounded-xl border border-[#dbdbdb] bg-brand-surface p-5 transition hover:border-brand-accent hover:shadow-soft"
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 font-semibold text-brand-text">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-brand-text-soft">
                {item.summary}
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brand-primary">
                View typical path →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyDifferent() {
  return (
    <section className="bg-brand-surface py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">What Startbiz does differently</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          We do not simply sell registrations
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          We first understand your business, explain what may apply, and help you
          choose. Then we support documentation, filing and ongoing compliance.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {whyDifferent.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-[#dbdbdb] bg-white px-4 py-3 text-sm text-brand-text"
            >
              <span className="text-brand-green">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">How we work</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Tell us → we analyse → we recommend → we process → we support
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {customerProcess.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-[#dbdbdb] p-4">
              <span className="text-xs font-bold text-brand-accent">0{i + 1}</span>
              <h3 className="mt-2 font-semibold text-brand-text">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-text-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PackagesSection() {
  return (
    <section id="packages" className="bg-brand-surface py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">Situation-based packages</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Bundles that follow a real starting situation
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm">
          Final requirements depend on your business activities and circumstances.
          Packages are starting frameworks, not a legal determination.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {packages.map((pack) => (
            <article
              key={pack.slug}
              className="rounded-xl border border-[#dbdbdb] bg-white p-5"
            >
              <h3 className="font-display text-xl font-semibold text-brand-text">
                {pack.title}
              </h3>
              <p className="mt-1 text-sm text-brand-text-soft">{pack.forWho}</p>
              <ul className="mt-4 space-y-1.5">
                {pack.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-brand-text">
                    <span className="text-brand-green">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-5 inline-flex text-sm font-semibold text-brand-primary">
                Discuss this package →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function KnowledgePreview() {
  return (
    <section id="knowledge" className="bg-white py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">Knowledge centre</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Plain-language guides before you file
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeArticles.slice(0, 6).map((article) => (
            <Link
              key={article.slug}
              to={`/knowledge/${article.slug}`}
              className="rounded-xl border border-[#dbdbdb] bg-brand-surface p-5 hover:border-brand-accent"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                {article.readTime}
              </p>
              <h3 className="mt-2 font-semibold text-brand-text">{article.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-brand-text-soft">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
        <Link to="/knowledge" className="btn-outline mt-8">
          Open knowledge centre
        </Link>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="bg-brand-surface py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">FAQ</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Your Business Questions, Answered
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          Starting a business raises many questions. Find straightforward answers
          about registrations, licences, business structures and compliance.
        </p>
        <div className="mt-8 space-y-3">
          {siteFaqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-[#dbdbdb] bg-white px-5 py-4 transition open:border-brand-accent/40 open:shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-brand-text marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-muted text-sm font-bold text-brand-primary transition group-open:rotate-45 group-open:bg-brand-primary group-open:text-white"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-brand-text-soft">
                {item.a}
              </p>
              {item.to ? (
                <Link
                  to={item.to}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-accent"
                >
                  {item.linkLabel || 'Learn more'} <span aria-hidden>→</span>
                </Link>
              ) : null}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-primary py-12 text-white sm:py-16">
      <div
        className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-white/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-brand-accent/20"
        aria-hidden
      />
      <div className="section-wrap relative text-center text-white">
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Startbiz — From Idea to Business Growth
        </h2>
        <p className="mx-auto mt-2 text-lg font-medium text-white/95 sm:text-xl">
          We&apos;re With You.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white sm:text-base">
          Whether you&apos;re starting a new business, running an existing
          business or planning your next stage of growth, Startbiz helps you
          understand your requirements and find the right next step.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
          You don&apos;t need to know which registration or licence you need.
          Tell us about your business and we&apos;ll help you explore the
          relevant registrations, licences and business solutions for your
          situation.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/finder" className="btn-primary !text-white">
            Find My Business Requirements
          </Link>
          <a href="#contact" className="btn-ghost-light !text-white">
            Talk to a Business Expert
          </a>
        </div>
        <p className="mx-auto mt-4 max-w-md text-xs text-white/80">
          Answer a few simple questions and get a personalised business roadmap.
        </p>
      </div>
    </section>
  );
}

export { serviceSolutionGroups };

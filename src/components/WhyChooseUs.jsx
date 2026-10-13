import { Link } from 'react-router-dom';
import { brand, features, getWhatsAppUrl } from '../data/content';
import { IconBadge, featureIcons, IconSpark } from './VisualIcons';

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-12 sm:py-16 lg:py-20">
      <div className="section-wrap">
        <div className="max-w-2xl">
          <p className="section-label">Why Startbiz?</p>
          <h2 className="heading mt-2 text-2xl sm:text-3xl lg:text-4xl">
            Your Business. Your Situation. Your Right Next Step.
          </h2>
          <p className="body-muted mt-3 text-sm sm:text-base">
            Starting or running a business can involve registrations, licences,
            compliance, documentation and many decisions.
          </p>
          <p className="mt-3 text-sm font-semibold text-brand-text sm:text-base">
            You don&apos;t have to figure everything out yourself.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = featureIcons[feature.title] || IconSpark;
            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-xl border border-[#dbdbdb] bg-white p-5 hover:border-brand-accent hover:shadow-soft sm:p-6"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-accent/10"
                  aria-hidden
                />
                <IconBadge className="mb-4">
                  <Icon />
                </IconBadge>
                <h3 className="relative text-base font-semibold text-brand-text sm:text-lg">
                  {feature.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-brand-text-soft">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="group relative mt-8 overflow-hidden rounded-xl border border-[#dbdbdb] bg-brand-surface px-5 py-7 sm:mt-10 sm:px-8 sm:py-9">
          <div
            className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-brand-primary/5"
            aria-hidden
          />
          <h3 className="relative font-display text-xl font-semibold text-brand-text sm:text-2xl">
            Not Sure What You Need?
          </h3>
          <p className="relative mt-2 max-w-2xl text-sm text-brand-text-soft sm:text-base">
            That&apos;s exactly what Startbiz is here for. You don&apos;t need to
            know whether you need GST, Udyam, Shop Act, FSSAI, a company
            registration or another licence.
          </p>
          <p className="relative mt-2 max-w-2xl text-sm font-medium text-brand-text sm:text-base">
            Tell us about your business. We&apos;ll help you identify the
            relevant next steps.
          </p>
          <div className="relative mt-5 flex flex-col gap-3 sm:flex-row">
            <Link to="/finder" className="btn-primary">
              Find My Business Requirements →
            </Link>
            <a
              href={getWhatsAppUrl(brand.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              Talk to Startbiz
            </a>
          </div>
          <p className="relative mt-3 text-xs text-brand-text-soft sm:text-sm">
            Takes only a few minutes • Simple questions • Personalised roadmap
          </p>
        </div>
      </div>
    </section>
  );
}

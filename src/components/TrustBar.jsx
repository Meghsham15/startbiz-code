import { trustStats } from '../data/content';
import {
  IconBadge,
  IconUsers,
  IconMapPin,
  IconLayers,
  IconCompass,
} from './VisualIcons';

const trustIcons = [IconUsers, IconMapPin, IconLayers, IconCompass];

export default function TrustBar() {
  return (
    <section className="relative z-10 bg-white pb-4">
      <div className="section-wrap">
        <div className="overflow-hidden rounded-xl bg-white shadow-soft">
          <p className="border-b border-brand-muted px-4 py-3 text-center text-sm font-semibold text-brand-primary sm:text-base">
            Serving Businesses Across Maharashtra
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {trustStats.map((stat, index) => {
              const Icon = trustIcons[index] || IconCompass;
              return (
                <div
                  key={stat.label}
                  className={`group px-3 py-5 text-center transition hover:bg-brand-surface/80 sm:px-4 sm:py-6 ${
                    index === 0 || index === 2 ? 'border-r border-brand-muted' : ''
                  } ${
                    index < 2 ? 'border-b border-brand-muted sm:border-b-0' : ''
                  } ${index < 3 ? 'sm:border-r sm:border-brand-muted' : ''}`}
                >
                  <div className="mb-2 flex justify-center">
                    <IconBadge className="!h-10 !w-10">
                      <Icon />
                    </IconBadge>
                  </div>
                  <p className="font-display text-2xl font-semibold text-brand-primary transition group-hover:text-brand-accent sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-brand-text-soft sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

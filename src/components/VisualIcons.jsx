/** Shared professional doodle-style icons for solution cards and section accents. */

export function IconBadge({ children, className = '' }) {
  return (
    <div
      className={`relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-primary shadow-soft ring-1 ring-[#dbdbdb] group-hover:text-brand-accent group-hover:ring-brand-accent/40 ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
        aria-hidden
      >
        <circle cx="9" cy="10" r="1.2" fill="currentColor" />
        <circle cx="39" cy="12" r="1" fill="currentColor" />
        <circle cx="38" cy="36" r="1.1" fill="currentColor" />
        <path
          d="M7 34c3.5-2.5 6 1.5 9.5-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
      {children}
    </div>
  );
}

function Svg({ children, className = 'relative h-7 w-7' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      {children}
    </svg>
  );
}

export function IconBuilding() {
  return (
    <Svg>
      <path
        d="M12 28V14.5c0-.8.7-1.5 1.5-1.5H21l2 3h3.5c.8 0 1.5.7 1.5 1.5V28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 28v-6h8v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path
        d="M28.5 11.5c2.2.4 3.8 2 3.5 4.2-.2 1.5-1.3 2.5-2.5 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="30.5" cy="10" r="1.4" fill="currentColor" />
    </Svg>
  );
}

export function IconShield() {
  return (
    <Svg>
      <path
        d="M20 8.5 29 12v7.2c0 5.4-3.6 9.5-9 11.3-5.4-1.8-9-5.9-9-11.3V12l9-3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m16.5 19.5 2.6 2.6 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconRefresh() {
  return (
    <Svg>
      <path
        d="M13 16h14l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 24H13l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 16.2a8.5 8.5 0 0 1-1.8 11.3M13 23.8A8.5 8.5 0 0 1 14.8 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </Svg>
  );
}

export function IconClipboard() {
  return (
    <Svg>
      <rect x="11" y="9" width="18" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M15 15h10M15 19.5h10M15 24h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m24.5 26.5 1.6 1.6 3.2-3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconGrowth() {
  return (
    <Svg>
      <path d="M10 27.5h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="m12 23 5-5 4 3 7-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 13h4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="28.5" r="1.2" fill="currentColor" />
      <circle cx="26" cy="28.5" r="1.2" fill="currentColor" />
    </Svg>
  );
}

export function IconCompass() {
  return (
    <Svg>
      <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m20 12 2.8 7.2L20 28l-2.8-8.8L20 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    </Svg>
  );
}

export function IconLayers() {
  return (
    <Svg>
      <path
        d="m20 10 11 6-11 6-11-6 11-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9 20 11 6 11-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 25 11 6 11-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconSpark() {
  return (
    <Svg>
      <path
        d="M20 9v5M20 26v5M9 20h5M26 20h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m13 13 2.2 2.2M24.8 24.8 27 27M27 13l-2.2 2.2M15.2 24.8 13 27"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconMapPin() {
  return (
    <Svg>
      <path
        d="M20 31s-8-7.2-8-13a8 8 0 1 1 16 0c0 5.8-8 13-8 13Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="18" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    </Svg>
  );
}

export function IconHandshake() {
  return (
    <Svg>
      <path
        d="M10 20.5c2-2 4.2-2.2 6.2-.4l1.3 1.2 1.8-1.6c1.4-1.2 3.2-1.3 4.6-.2L28 22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.5 9.5 15c-1.2-1.2-1.2-3.1 0-4.3 1.1-1.1 2.8-1.2 4-.2L16 12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m28 17.5 2.5-2.5c1.2-1.2 1.2-3.1 0-4.3-1.1-1.1-2.8-1.2-4-.2L24 12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M16 24.5h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M18 28h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
  );
}

export function IconChat() {
  return (
    <Svg>
      <path
        d="M10 14.5c0-2 1.6-3.5 3.5-3.5h13c1.9 0 3.5 1.5 3.5 3.5v8c0 2-1.6 3.5-3.5 3.5H18l-5 4v-4h-.5c-1.9 0-3.5-1.5-3.5-3.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15 17h10M15 21h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconSearch() {
  return (
    <Svg>
      <circle cx="18" cy="18" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m23.5 23.5 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function IconUsers() {
  return (
    <Svg>
      <circle cx="15" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="26" cy="16" r="2.8" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.5 28c1.2-3.5 3.8-5.2 6.5-5.2S20.3 24.5 21.5 28"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M22 26.5c1-2.2 2.8-3.4 4.5-3.4 2 0 3.6 1.2 4.5 3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconGov() {
  return (
    <Svg>
      <path d="M10 16h20l-10-6-10 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 16v10M20 16v10M28 16v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 28h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function IconStep({ n }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white shadow-soft group-hover:bg-brand-accent">
      {n}
    </span>
  );
}

export const pathwayIcons = {
  start: IconBuilding,
  grow: IconGrowth,
  brand: IconShield,
  government: IconGov,
};

export const featureIcons = {
  'We Start With Your Business': IconSpark,
  'Get a Clear Business Roadmap': IconCompass,
  'Multiple Requirements. One Place.': IconLayers,
  'Solutions Based on Your Situation': IconUsers,
  'Transparent Before You Proceed': IconClipboard,
  'Support Beyond Registration': IconHandshake,
  'Maharashtra-Wide Support': IconMapPin,
};

export const differentiatorIcons = {
  'Start With Your Requirement': IconSearch,
  'Get a Clear Direction': IconCompass,
  'Multiple Business Solutions': IconLayers,
  'Support as Your Business Grows': IconGrowth,
};

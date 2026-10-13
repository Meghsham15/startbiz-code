import { brand, getWhatsAppUrl } from '../data/content';
import { asset } from '../utils/asset';

const SOLUTION_MESSAGE = 'I need a business solutions';

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.47 1.34 4.98L2 22l5.2-1.36A9.94 9.94 0 0 0 12.04 22c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.79 14.24c-.24.68-1.4 1.26-1.93 1.34-.49.07-1.12.1-1.81-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.29.58-.36.77-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.2-.15.32-.3.49-.14.17-.3.38-.43.51-.14.14-.29.3-.12.5.16.36.66 1.1 1.42 1.78.98.88 1.8 1.15 2.16 1.28.36.13.56.11.76-.07.2-.17.86-.99 1.09-1.33.23-.34.46-.28.77-.17.31.11 1.98.93 2.32 1.1.34.17.57.26.65.4.08.15.08.86-.16 1.54Z" />
    </svg>
  );
}

export default function ContactForm() {
  const whatsappUrl = getWhatsAppUrl(SOLUTION_MESSAGE);

  return (
    <section id="contact" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="section-wrap">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="section-label">Get in touch</p>
            <h2 className="heading mt-2 text-2xl sm:text-3xl lg:text-4xl">
              Get Your Business Solution
            </h2>
            <p className="body-muted mt-3 text-sm sm:text-base">
              Scan the WhatsApp QR or tap below to message Startbiz. Share what
              you need help with — GST, company registration, Shop Act, MSME,
              FSSAI, trademark and more across Maharashtra.
            </p>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              <a
                href={brand.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-[#dbdbdb] bg-brand-surface px-4 py-3 transition hover:border-brand-accent"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand-primary">
                  <IconPhone />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-soft">
                    Call
                  </p>
                  <p className="truncate font-semibold text-brand-text">
                    {brand.phone}
                  </p>
                </div>
              </a>
              <a
                href={brand.emailHref}
                className="flex items-center gap-3 rounded-xl border border-[#dbdbdb] bg-brand-surface px-4 py-3 transition hover:border-brand-accent"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand-primary">
                  <IconMail />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-soft">
                    Email
                  </p>
                  <p className="truncate font-semibold text-brand-text">
                    {brand.email}
                  </p>
                </div>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[#dbdbdb] bg-brand-surface px-4 py-3 transition hover:border-brand-accent"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand-primary">
                  <IconWhatsApp />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-soft">
                    WhatsApp
                  </p>
                  <p className="font-semibold text-brand-text">{brand.phone}</p>
                </div>
              </a>
            </div>

            <div className="mt-6 rounded-xl border border-[#dbdbdb] p-4 sm:mt-8 sm:max-w-md">
              <p className="text-sm font-semibold text-brand-text">
                Business hours
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-brand-text-soft">
                {brand.hours.map((item) => (
                  <li key={item.day} className="flex justify-between gap-3">
                    <span>{item.day}</span>
                    <span className="shrink-0 font-medium text-brand-text">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-[#dbdbdb] bg-brand-surface p-5 text-center shadow-soft sm:p-7 lg:p-8">
            <h3 className="heading text-xl text-brand-text sm:text-2xl">
              Chat on WhatsApp
            </h3>
            <p className="mt-2 text-sm text-brand-text-soft">
              Scan this QR code to message {brand.phone}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 rounded-xl border border-[#dbdbdb] bg-white p-3 transition hover:border-brand-accent"
            >
              <img
                src={asset('/images/whatsapp-qr.png')}
                alt={`WhatsApp QR code for ${brand.phone} — I need a business solutions`}
                width={256}
                height={256}
                className="h-52 w-52 object-contain sm:h-64 sm:w-64"
                loading="lazy"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm font-semibold text-brand-text">
              &ldquo;{SOLUTION_MESSAGE}&rdquo;
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5 w-full max-w-xs !text-white"
            >
              Open WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

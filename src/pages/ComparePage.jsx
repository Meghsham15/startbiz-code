import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import StructureTable from '../components/StructureTable';
import { brand } from '../data/content';
import { structureGuide } from '../data/strategyContent';

function hrefFor(slug) {
  return slug.startsWith('/') ? slug : `/services/${slug}`;
}

export default function ComparePage() {
  return (
    <div className="bg-brand-surface">
      <Seo
        title={`Compare Business Structures | ${brand.name}`}
        description="Compare proprietorship, LLP and private limited company on owners, liability, compliance and funding — then talk to Startbiz."
        path="/compare"
      />
      <section className="border-b border-[#eee] bg-white pt-[68px]">
        <div className="section-wrap py-10 sm:py-14">
          <nav className="mb-5 text-sm text-brand-text-soft">
            <Link to="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-text">Compare structures</span>
          </nav>
          <p className="section-label">Business structure</p>
          <h1 className="heading mt-2 max-w-3xl text-3xl sm:text-4xl">
            Which structure may be right for you?
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-brand-text-soft sm:text-base">
            Use this as a starting comparison. The better fit depends on owners,
            liability, compliance appetite and funding plans.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="section-wrap">
          <StructureTable />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {structureGuide.map((row) => (
              <Link
                key={row.ifYou}
                to={hrefFor(row.slug)}
                className="rounded-xl border border-[#dbdbdb] bg-white p-5 hover:border-brand-accent"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  If you are
                </p>
                <h2 className="mt-2 font-semibold text-brand-text">{row.ifYou}</h2>
                <p className="mt-2 text-sm text-brand-text-soft">
                  Consider: {row.consider}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

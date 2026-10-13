function Bar({ className = '' }) {
  return <span className={`img-skeleton block rounded-md ${className}`} />;
}

function Card() {
  return (
    <div className="rounded-xl border border-[#e6e6e6] bg-white p-5">
      <Bar className="h-10 w-10 rounded-lg" />
      <Bar className="mt-4 h-4 w-3/4" />
      <Bar className="mt-2 h-3 w-full" />
      <Bar className="mt-2 h-3 w-2/3" />
    </div>
  );
}

/** Text and image placeholders used on every route while that page is loading. */
export default function SiteSkeleton() {
  return (
    <div className="bg-white pb-16" role="status" aria-label="Loading page">
      <div className="section-wrap grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-14">
        <div>
          <Bar className="h-3 w-2/5" />
          <Bar className="mt-4 h-8 w-[88%]" />
          <Bar className="mt-3 h-8 w-3/5" />
          <Bar className="mt-6 h-3 w-full" />
          <Bar className="mt-2 h-3 w-11/12" />
          <Bar className="mt-2 h-3 w-4/5" />
          <Bar className="mt-6 h-11 w-40 rounded-lg" />
        </div>
        <div className="img-skeleton h-56 rounded-2xl sm:h-72 lg:h-80" />
      </div>
      <div className="section-wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

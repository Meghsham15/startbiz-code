import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { structureColumns, structureTableGroups } from '../data/structureTables';

export default function StructureTable({ highlightSlug }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e6e6e6] bg-white">
      <table className="min-w-[52rem] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-brand-primary text-white">
            <th className="sticky left-0 bg-brand-primary px-4 py-3 font-semibold">Attribute</th>
            {structureColumns.map((column) => (
              <th key={column.slug} className="px-4 py-3 font-semibold">
                <Link
                  to={`/services/${column.slug}`}
                  className={`hover:underline ${
                    highlightSlug === column.slug ? 'text-brand-accent' : 'text-white'
                  }`}
                >
                  {column.label}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {structureTableGroups.map((group) => (
            <Fragment key={group.title}>
              <tr className="bg-brand-muted">
                <th
                  colSpan={structureColumns.length + 1}
                  className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-brand-primary"
                >
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row, index) => (
                <tr key={row.label} className={index % 2 ? 'bg-brand-surface' : 'bg-white'}>
                  <th className="sticky left-0 bg-inherit px-4 py-3 font-semibold text-brand-text">
                    {row.label}
                  </th>
                  {row.cells.map((cell, cellIndex) => {
                    const slug = structureColumns[cellIndex].slug;
                    const highlighted = highlightSlug === slug;
                    return (
                      <td
                        key={slug}
                        className={`px-4 py-3 text-brand-text-soft ${
                          highlighted ? 'bg-[#e7f4f6] font-medium text-brand-text' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[#eee] px-4 py-3 text-xs leading-relaxed text-brand-text-soft">
        A starting comparison only. Thresholds, tax and FDI rules change. Confirm the current position before you file.
      </p>
    </div>
  );
}

export function ServiceFactTable({ facts }) {
  if (!facts) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e6e6e6] bg-white">
      <p className="bg-brand-primary px-4 py-3 font-display text-lg font-semibold text-white">
        {facts.title}
      </p>
      <table className="w-full text-left text-sm">
        <tbody>
          {facts.rows.map(([label, value], index) => (
            <tr key={label} className={index % 2 ? 'bg-brand-surface' : 'bg-white'}>
              <th className="w-[38%] px-4 py-3 font-semibold text-brand-text">{label}</th>
              <td className="px-4 py-3 text-brand-text-soft">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

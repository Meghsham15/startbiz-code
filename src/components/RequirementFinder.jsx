import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FINDER_DISCLAIMER,
  buildRoadmap,
  finderQuestions,
  needPrompts,
} from '../data/finder';
import { getWhatsAppUrl } from '../data/content';

const STORAGE_KEY = 'startbiz.finder.v2';
const empty = Object.fromEntries(finderQuestions.map((q) => [q.id, '']));

function loadCompletedFinder() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.done || !data.answers || typeof data.answers !== 'object') {
      return null;
    }
    const answers = { ...empty };
    finderQuestions.forEach((q) => {
      if (typeof data.answers[q.id] === 'string') {
        answers[q.id] = data.answers[q.id];
      }
    });
    const complete = finderQuestions.every((q) => answers[q.id]);
    return complete ? { answers, done: true } : null;
  } catch {
    return null;
  }
}

function saveCompletedFinder(answers) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ done: true, answers })
    );
  } catch {
    /* private mode / quota */
  }
}

function clearSavedFinder() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export default function RequirementFinder({ embedded = false }) {
  const [params] = useSearchParams();
  const need = params.get('need');
  const prompt = need ? needPrompts[need] : null;

  const [saved] = useState(loadCompletedFinder);
  const [step, setStep] = useState(saved?.done ? finderQuestions.length : 0);
  const [answers, setAnswers] = useState(saved?.answers ?? empty);
  const [done, setDone] = useState(() => Boolean(saved?.done));

  useEffect(() => {
    if (!done) return;
    saveCompletedFinder(answers);
  }, [answers, done]);

  const question = finderQuestions[step];
  const progress = done ? 100 : Math.round((step / finderQuestions.length) * 100);

  const roadmap = useMemo(
    () => (done ? buildRoadmap(answers) : null),
    [answers, done]
  );

  const select = (optionId) => {
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    if (step + 1 >= finderQuestions.length) {
      saveCompletedFinder(next);
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    clearSavedFinder();
    setAnswers(empty);
    setStep(0);
    setDone(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const printChecklist = () => window.print();

  return (
    <div className={embedded ? '' : 'rounded-2xl border border-[#dbdbdb] bg-white p-5 shadow-soft sm:p-8'}>
      {prompt && (
        <div className="mb-5 rounded-xl border border-brand-accent/30 bg-brand-muted/60 p-4">
          <p className="text-sm font-semibold text-brand-primary">{prompt.question}</p>
          <p className="mt-1 text-sm text-brand-text-soft">{prompt.hint}</p>
        </div>
      )}

      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-brand-muted">
        <div
          className="h-full rounded-full bg-brand-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!done ? (
        <>
          <p className="section-label">
            Question {step + 1} of {finderQuestions.length}
          </p>
          <h2 className="heading mt-2 text-xl sm:text-2xl">{question.title}</h2>
          {question.help && (
            <p className="mt-2 text-sm text-brand-text-soft">{question.help}</p>
          )}
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {question.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => select(option.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  answers[question.id] === option.id
                    ? 'border-brand-accent bg-brand-muted text-brand-primary'
                    : 'border-[#dbdbdb] bg-white text-brand-text hover:border-brand-accent'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 text-sm font-semibold text-brand-primary"
            >
              ← Previous
            </button>
          )}
        </>
      ) : (
        <Results roadmap={roadmap} onReset={reset} onPrint={printChecklist} />
      )}
    </div>
  );
}

function ItemList({ title, items, tone }) {
  if (!items?.length) return null;
  const color =
    tone === 'essential'
      ? 'border-brand-green/30 bg-[#f3fbf6]'
      : tone === 'recommended'
        ? 'border-brand-accent/30 bg-[#fff8f1]'
        : 'border-[#dbdbdb] bg-white';
  const mark =
    tone === 'essential'
      ? 'bg-brand-green text-white'
      : tone === 'recommended'
        ? 'bg-brand-accent text-white'
        : 'bg-brand-primary/15 text-brand-primary';
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-brand-primary">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.slug} className={`rounded-xl border p-4 ${color}`}>
            <div className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${mark}`}
                aria-hidden
              >
                ✓
              </span>
              <div className="min-w-0">
                <Link
                  to={`/services/${item.slug}`}
                  className="font-semibold text-brand-text hover:text-brand-primary"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-brand-text-soft">{item.reason}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Results({ roadmap, onReset, onPrint }) {
  const wa = getWhatsAppUrl(
    `Hi Startbiz, please verify my registration roadmap. Suggested structure: ${roadmap.structure.title}.`
  );

  return (
    <div className="print:block">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="section-label">Your roadmap</p>
          <h2 className="heading mt-2 text-2xl sm:text-3xl">
            Business registration roadmap
          </h2>
          <p className="mt-2 text-sm text-brand-text-soft">
            Based on the details you shared.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="btn-outline shrink-0 print:hidden"
        >
          Start over
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-brand-primary/20 bg-brand-muted p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Suggested structure
        </p>
        <Link
          to={`/services/${roadmap.structure.slug}`}
          className="mt-1 block font-display text-xl font-semibold text-brand-text hover:text-brand-primary"
        >
          {roadmap.structure.title}
        </Link>
        <p className="mt-2 text-sm text-brand-text-soft">{roadmap.structure.reason}</p>
        {roadmap.structure.alternatives?.length > 0 && (
          <p className="mt-3 text-sm text-brand-text-soft">
            Also compare:{' '}
            {roadmap.structure.alternatives.map((alt, i) => (
              <span key={alt.slug}>
                {i > 0 ? ', ' : ''}
                <Link to={`/services/${alt.slug}`} className="font-semibold text-brand-primary">
                  {alt.title}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-3">
        <ItemList title="Essential" items={roadmap.essential} tone="essential" />
        <ItemList title="Recommended" items={roadmap.recommended} tone="recommended" />
        <ItemList title="Depending on your business" items={roadmap.depending} tone="depending" />
      </div>

      <div className="mt-8">
        <h3 className="heading text-xl">Personalised checklist</h3>
        <ul className="mt-4 space-y-2">
          {roadmap.checklist.map((row) => (
            <li
              key={row.id}
              className="flex items-start gap-3 rounded-xl border border-[#dbdbdb] bg-white px-4 py-3 text-sm"
            >
              <span className="mt-0.5 text-brand-accent">☐</span>
              {row.slug ? (
                <Link to={`/services/${row.slug}`} className="hover:text-brand-primary">
                  {row.label}
                </Link>
              ) : (
                <span>{row.label}</span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-brand-text-soft">
          {FINDER_DISCLAIMER}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap print:hidden">
        <a href={wa} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">
          Get free consultation
        </a>
        <button type="button" onClick={onPrint} className="btn-outline w-full sm:w-auto">
          Print checklist
        </button>
        <button type="button" onClick={onReset} className="btn-outline w-full sm:w-auto">
          Start over
        </button>
      </div>
    </div>
  );
}

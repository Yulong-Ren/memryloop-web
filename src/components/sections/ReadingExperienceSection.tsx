import { Section } from '../ui';
import { LibraryMockup } from '../LibraryMockup';

export function ReadingExperienceSection() {
  return (
    <Section id="reading-experience" className="bg-slate-50">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Designed for Learning, Not Just Summaries
          </h2>
          <p className="mt-5 text-lg text-slate-500 leading-relaxed">
            Every AI note is automatically organized into your personal library.
          </p>
          <p className="mt-3 text-lg text-slate-500 leading-relaxed">
            Review, revisit and reinforce what you&apos;ve learned anytime.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              'Structured reading with anchor navigation',
              'Every video becomes a lasting knowledge asset',
              'Revisit notes weeks later — still organized',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-600">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <LibraryMockup compact />
      </div>
    </Section>
  );
}

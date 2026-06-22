import { P, SHADOW_SM, SITE_MAX, SITE_PX } from '../../design/tokens';
import { BookOpenIcon, LanguagesIcon, SparklesIcon } from '../icons';
import { SectionLabel } from '../ui';

const CARDS = [
  {
    icon: <SparklesIcon size={20} style={{ color: P }} />,
    title: 'AI Notes',
    desc: 'Generate structured learning notes from YouTube videos instantly. Summaries, key points, and quiz questions — all in one click.',
  },
  {
    icon: <LanguagesIcon size={20} style={{ color: P }} />,
    title: 'Bilingual Learning',
    desc: 'Read with dual subtitles and keyword highlighting. Build vocabulary naturally while following along with any video.',
  },
  {
    icon: <BookOpenIcon size={20} style={{ color: P }} />,
    title: 'Memory Library',
    desc: 'Every note is automatically saved for future review. Search, filter, and revisit your knowledge exactly when you need it.',
  },
];

export function WhySection() {
  return (
    <section id="features" className={`${SITE_MAX} mx-auto ${SITE_PX} scroll-mt-24 py-28`}>
      <div className="mb-16 text-center">
        <SectionLabel>Why MemryLoop</SectionLabel>
        <h2 className="text-[44px] font-bold leading-[55px] tracking-[-1.1px] text-[#0a0a0a]">
          Why MemryLoop
        </h2>
        <p className="mt-4 text-[18px] leading-[27px] text-[#6e6e73]">
          Built for learners, language enthusiasts, and curious minds.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 pt-0 md:justify-start">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="flex h-[288px] w-full max-w-[240px] flex-col rounded-2xl border border-[rgba(0,0,0,0.07)] p-[29px] transition-all duration-200 hover:border-[rgba(91,77,255,0.2)] sm:w-[240px]"
            style={{ background: '#fff', boxShadow: SHADOW_SM }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px]"
              style={{ background: '#f0efff' }}
            >
              {card.icon}
            </div>
            <h3 className="pt-5 text-[17px] font-bold leading-[25.5px] text-[#0a0a0a]">{card.title}</h3>
            <p className="pt-2 text-[14px] leading-[22.75px] text-[#6e6e73]">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

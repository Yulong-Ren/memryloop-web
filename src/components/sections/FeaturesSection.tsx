import { P, SITE_MAX, SITE_PX } from '../../design/tokens';
import { ChevronRightIcon, ZapIcon } from '../icons';
import {
  FeatureMockupExtension,
  FeatureMockupLibrary,
  FeatureMockupNotes,
} from '../mockups/HeroMockups';
import { SectionLabel, Tag } from '../ui';

function FeatureRow({
  reverse,
  mockup,
  headline,
  desc,
  badge,
}: {
  reverse?: boolean;
  mockup: React.ReactNode;
  headline: string;
  desc: string;
  badge: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-12 py-20 lg:flex-row lg:items-center lg:gap-20 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div className="w-full flex-1">{mockup}</div>
      <div className="w-full max-w-[420px] flex-1">
        <Tag>
          <ZapIcon size={12} />
          {badge}
        </Tag>
        <h3
          className="mb-4 mt-5 font-bold leading-tight tracking-tight text-[#0a0a0a]"
          style={{ fontSize: 36 }}
        >
          {headline}
        </h3>
        <p className="mb-6 text-[16px] leading-relaxed text-[#6e6e73]">{desc}</p>
        <a
          href="#install"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold no-underline transition-colors"
          style={{ color: P }}
        >
          Learn more <ChevronRightIcon size={16} />
        </a>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className={`${SITE_MAX} mx-auto ${SITE_PX} py-10`}>
      <div className="mb-6 text-center">
        <SectionLabel>Feature Showcase</SectionLabel>
        <h2 className="text-[44px] font-bold tracking-tight text-[#0a0a0a]">Designed for learning</h2>
      </div>

      <div className="divide-y divide-[rgba(0,0,0,0.06)]">
        <FeatureRow
          mockup={<FeatureMockupExtension />}
          headline="Generate AI Notes in one click"
          desc="Turn any YouTube video into organized summaries, key takeaways, and study questions — without leaving the page. Works on any video, any length."
          badge="AI Notes"
        />
        <FeatureRow
          reverse
          mockup={<FeatureMockupNotes />}
          headline="Read with bilingual subtitles"
          desc="Improve vocabulary naturally with keyword highlighting and synchronized translations. Follow any video in your target language with full context."
          badge="Bilingual Learning"
        />
        <FeatureRow
          mockup={<FeatureMockupLibrary />}
          headline="Build your second brain"
          desc="Automatically organize every note into your personal knowledge archive. Search, tag, and revisit your learning — exactly when you need it."
          badge="Memory Library"
        />
      </div>
    </section>
  );
}

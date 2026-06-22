import { P, SHADOW_SM, SITE_MAX, SITE_PX } from '../../design/tokens';
import { ArrowRightIcon, CheckIcon, ClockIcon } from '../icons';
import { SectionLabel } from '../ui';

const PHASES = [
  {
    label: 'NOW',
    badge: { text: 'Done', bg: '#dcfce7', color: '#15803d' },
    dot: P,
    icon: <CheckIcon size={16} className="text-white" />,
    items: ['AI Notes', 'Library', 'Translation', 'Dual subtitles'],
  },
  {
    label: 'COMING SOON',
    badge: { text: 'In Progress', bg: '#fef9c3', color: '#854d0e' },
    dot: '#fbbf24',
    icon: <ClockIcon size={16} className="text-white" />,
    items: ['Vocabulary review', 'Spaced repetition', 'Smart memory system', 'AI chat with notes'],
  },
  {
    label: 'FUTURE',
    badge: { text: 'Planned', bg: '#f0efff', color: P },
    dot: '#e5e7eb',
    icon: <ArrowRightIcon size={16} className="text-[#6e6e73]" />,
    items: ['Mobile app', 'Podcast learning', 'Multi-platform support', 'Personal knowledge graph'],
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className={`${SITE_MAX} mx-auto ${SITE_PX} scroll-mt-24 py-28`}>
      <div className="mb-20 text-center">
        <SectionLabel>Roadmap</SectionLabel>
        <h2 className="text-[44px] font-bold tracking-tight text-[#0a0a0a]">Roadmap</h2>
      </div>

      <div className="relative mx-auto max-w-[640px]">
        <div
          className="absolute bottom-0 left-[19px] top-0 w-px"
          style={{ background: 'rgba(0,0,0,0.08)' }}
        />

        <div className="space-y-12">
          {PHASES.map((phase) => (
            <div key={phase.label} className="flex gap-8">
              <div className="relative mt-1 shrink-0">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white"
                  style={{ background: phase.dot, boxShadow: SHADOW_SM }}
                >
                  {phase.icon}
                </div>
              </div>

              <div className="flex-1 pb-2">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[13px] font-bold tracking-wider text-[#0a0a0a]">{phase.label}</span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: phase.badge.bg, color: phase.badge.color }}
                  >
                    {phase.badge.text}
                  </span>
                </div>
                <div
                  className="rounded-2xl border border-[rgba(0,0,0,0.07)] p-5"
                  style={{ background: '#fff', boxShadow: SHADOW_SM }}
                >
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <div
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            background:
                              phase.label === 'NOW'
                                ? P
                                : phase.label === 'COMING SOON'
                                  ? '#fbbf24'
                                  : '#d1d5db',
                          }}
                        />
                        <span className="text-[14px] text-[#3d3d3d]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

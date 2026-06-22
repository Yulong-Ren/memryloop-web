import { P, SHADOW_LG, SHADOW_MD } from '../../design/tokens';
import { CheckIcon, LibraryIcon, PlayIcon, SparklesIcon, StarIcon } from '../icons';

export function ExtensionPopup() {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-white"
      style={{ width: 280, boxShadow: SHADOW_LG, border: '1px solid rgba(0,0,0,0.07)' }}
    >
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-[5px]" style={{ background: P }}>
            <SparklesIcon size={12} className="text-white" />
          </div>
          <span className="text-[12px] font-semibold text-[#0a0a0a]">MemryLoop</span>
        </div>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: '#f0efff', color: P }}>
          Active
        </span>
      </div>

      <div className="px-4 py-3">
        <div className="mb-3 flex gap-3">
          <div className="relative shrink-0 overflow-hidden rounded-lg" style={{ width: 72, height: 44 }}>
            <div
              className="h-full w-full bg-gradient-to-br from-[#4338ca] via-[#5B4DFF] to-[#818cf8]"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <PlayIcon size={12} className="text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-[#0a0a0a]">
              The Science of Learning Faster
            </p>
            <p className="mt-0.5 text-[10px] text-[#6e6e73]">24:18 · Andrej Karpathy</p>
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-xl py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: P }}
        >
          <span className="flex items-center justify-center gap-1.5">
            <SparklesIcon size={14} className="text-white" />
            Generate AI Notes
          </span>
        </button>

        <div className="mt-3 space-y-1.5">
          {['Bilingual subtitles', 'Save to library', 'Quiz me'].map((feature) => (
            <label key={feature} className="flex cursor-pointer items-center gap-2">
              <div className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px]" style={{ background: P }}>
                <CheckIcon size={10} className="text-white" />
              </div>
              <span className="text-[11px] text-[#3d3d3d]">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotesWindow() {
  const subtitles = [
    { en: 'The human brain consolidates memories during sleep,', zh: '人脑在睡眠期间巩固记忆，' },
    { en: 'which is why reviewing material before bed helps retention.', zh: '这就是为什么睡前复习有助于记忆保留。' },
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl bg-white"
      style={{ width: 400, boxShadow: SHADOW_LG, border: '1px solid rgba(0,0,0,0.07)' }}
    >
      <div className="flex items-center gap-2 border-b border-[rgba(0,0,0,0.06)] px-5 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="mx-auto text-[11px] text-[#6e6e73]">AI Learning Notes</span>
      </div>

      <div className="px-5 py-4">
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-1.5">
            <SparklesIcon size={12} style={{ color: P }} />
            <span className="text-[11px] font-semibold" style={{ color: P }}>
              AI Summary
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#3d3d3d]">
            This video explores evidence-based learning techniques. Key insight: spaced repetition
            outperforms cramming by 3–5× for long-term retention.
          </p>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-[11px] font-semibold text-[#0a0a0a]">Key Points</p>
          <div className="space-y-1.5">
            {[
              'Active recall beats passive re-reading',
              'Sleep is critical for memory consolidation',
              'Interleaving topics boosts transfer learning',
            ].map((point, index) => (
              <div key={point} className="flex items-start gap-2">
                <span className="mt-px text-[10px] font-bold" style={{ color: P }}>
                  {index + 1}
                </span>
                <span className="text-[11px] text-[#3d3d3d]">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 rounded-xl p-3" style={{ background: '#f5f5f7' }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6e6e73]">
            Bilingual Subtitles
          </p>
          {subtitles.map((line) => (
            <div key={line.en}>
              <p className="text-[11px] leading-relaxed text-[#0a0a0a]">{line.en}</p>
              <p className="text-[11px] leading-relaxed text-[#6e6e73]">{line.zh}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LibraryWindow() {
  const items = [
    { title: 'The Science of Learning Faster', date: 'Jun 21', tag: 'Science' },
    { title: 'Building a Second Brain', date: 'Jun 19', tag: 'Productivity' },
    { title: 'Japanese Pitch Accent Guide', date: 'Jun 17', tag: 'Language' },
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl bg-white"
      style={{ width: 300, boxShadow: SHADOW_LG, border: '1px solid rgba(0,0,0,0.07)' }}
    >
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] px-4 py-3">
        <div className="flex items-center gap-2">
          <LibraryIcon size={14} style={{ color: P }} />
          <span className="text-[12px] font-semibold text-[#0a0a0a]">My Library</span>
        </div>
        <span className="text-[10px] text-[#6e6e73]">24 notes</span>
      </div>
      <div className="divide-y divide-[rgba(0,0,0,0.05)]">
        {items.map((item) => (
          <div key={item.title} className="cursor-pointer px-4 py-3 transition-colors hover:bg-[#f5f5f7]">
            <div className="mb-1 flex items-start justify-between gap-2">
              <p className="text-[11px] font-semibold leading-snug text-[#0a0a0a]">{item.title}</p>
              <span className="shrink-0 text-[10px] text-[#6e6e73]">{item.date}</span>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: '#f0efff', color: P }}
            >
              {item.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(0,0,0,0.06)] px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: P }}>
          <StarIcon size={12} />
          <span className="font-semibold">Upgrade for unlimited</span>
        </div>
      </div>
    </div>
  );
}

export function FeatureMockupExtension() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.07)]"
      style={{ background: '#f5f5f7', padding: 32, boxShadow: SHADOW_MD }}
    >
      <div className="flex justify-center">
        <div style={{ transform: 'scale(1.1)', transformOrigin: 'top center' }}>
          <ExtensionPopup />
        </div>
      </div>
    </div>
  );
}

export function FeatureMockupNotes() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.07)]"
      style={{ background: '#f5f5f7', padding: 32, boxShadow: SHADOW_MD }}
    >
      <div className="flex justify-center">
        <div style={{ transform: 'scale(1.05)', transformOrigin: 'top center' }}>
          <NotesWindow />
        </div>
      </div>
    </div>
  );
}

export function FeatureMockupLibrary() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.07)]"
      style={{ background: '#f5f5f7', padding: 32, boxShadow: SHADOW_MD }}
    >
      <div className="flex justify-center">
        <div style={{ transform: 'scale(1.1)', transformOrigin: 'top center' }}>
          <LibraryWindow />
        </div>
      </div>
    </div>
  );
}

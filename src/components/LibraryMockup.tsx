const NOTES = [
  {
    title: 'How Neural Networks Learn',
    channel: '3Blue1Brown',
    active: true,
  },
  {
    title: 'The Feynman Technique Explained',
    channel: 'Ali Abdaal',
    active: false,
  },
  {
    title: 'Intro to Large Language Models',
    channel: 'Andrej Karpathy',
    active: false,
  },
];

const TABS = ['Overview', 'Keywords', 'Knowledge', 'Recommendations', 'Quiz'];

interface LibraryMockupProps {
  className?: string;
  compact?: boolean;
}

export function LibraryMockup({ className = '', compact = false }: LibraryMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_-12px_rgba(15,23,42,0.18)] ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs text-slate-500">MemryLoop Library</span>
      </div>

      <div className={`flex ${compact ? 'min-h-[320px]' : 'min-h-[420px] md:min-h-[480px]'}`}>
        {/* Sidebar */}
        <aside className="hidden w-[140px] shrink-0 border-r border-slate-200 bg-white sm:block md:w-[180px]">
          <div className="border-b border-slate-200 p-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">
                M
              </span>
              <span className="text-[11px] font-semibold text-slate-900">MemryLoop</span>
            </div>
            <div className="h-7 rounded-md border border-slate-200 bg-slate-50 px-2 text-[10px] leading-7 text-slate-400">
              Search notes...
            </div>
          </div>
          <div className="p-2 space-y-1">
            {NOTES.map((note) => (
              <div
                key={note.title}
                className={`rounded-lg px-2 py-2 ${
                  note.active ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'
                }`}
              >
                <p
                  className={`text-[10px] font-medium leading-snug line-clamp-2 ${
                    note.active ? 'text-primary' : 'text-slate-900'
                  }`}
                >
                  {note.title}
                </p>
                <p className="mt-0.5 text-[9px] text-slate-500">{note.channel}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Reading area */}
        <div className="flex-1 min-w-0 bg-slate-50/50">
          <nav className="flex border-b border-slate-200 bg-white/95 overflow-x-auto">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={`whitespace-nowrap px-3 py-2.5 text-[10px] md:text-[11px] border-b-2 ${
                  i === 0
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-slate-500'
                }`}
              >
                {tab}
              </span>
            ))}
          </nav>

          <div className="p-4 md:p-6 space-y-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-1">
                AI Summary
              </p>
              <h3 className="text-sm md:text-base font-semibold text-slate-900 leading-snug">
                How Neural Networks Learn
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed">
                This video explains how neural networks adjust weights through backpropagation and
                gradient descent. The core idea: minimize a cost function by nudging each weight in
                the direction that reduces error — layer by layer, from output back to input.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['Backpropagation', 'Gradient Descent', 'Cost Function', 'Weights'].map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-primary"
                >
                  {kw}
                </span>
              ))}
            </div>

            {!compact && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[10px] font-medium text-slate-900 mb-2">Knowledge Point</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Backpropagation computes how much each weight contributed to the final error,
                  enabling efficient learning in deep networks.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

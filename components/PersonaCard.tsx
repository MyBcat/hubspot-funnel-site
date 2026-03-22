import type { Persona } from "@/lib/data";

function PersonaIcon({ type }: { type: string }) {
  const cls = "w-8 h-8";
  switch (type) {
    case "rocket":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699-2.245a2.25 2.25 0 10-3.182-3.182" />
        </svg>
      );
    case "chart":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
        </svg>
      );
    case "heart":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      );
    case "users":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      );
    case "cpu":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>
      );
    case "door":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
      );
    default:
      return null;
  }
}

const personaColors: Record<string, string> = {
  "cold-start-dreamer": "#F97316",
  "growth-builder": "#3B82F6",
  "overwhelmed-clinician": "#EF4444",
  "community-caregiver": "#10B981",
  "tech-differentiator": "#8B5CF6",
  "exit-strategist": "#F59E0B",
};

export default function PersonaCard({
  persona,
  expanded = false,
}: {
  persona: Persona;
  expanded?: boolean;
}) {
  const color = personaColors[persona.id] || "#6B7280";

  return (
    <div
      className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:bg-gray-800/30 transition-all duration-300"
      style={{ borderTopWidth: "3px", borderTopColor: color }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color }}
        >
          <PersonaIcon type={persona.icon} />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">{persona.name}</h3>
          <p className="text-gray-400 text-sm">{persona.who}</p>
        </div>
      </div>

      {/* Revenue & Speed */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Revenue</div>
          <div className="text-sm font-semibold text-emerald-400">
            {persona.revenuePotential}
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Decision Speed</div>
          <div className="text-sm font-semibold text-gray-200">
            {persona.decisionSpeed}
          </div>
        </div>
      </div>

      {/* Care About */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          They care about
        </div>
        <p className="text-gray-300 text-sm">{persona.careAbout}</p>
      </div>

      {/* Lead With */}
      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: `${color}10`, borderLeft: `3px solid ${color}` }}>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Lead with
        </div>
        <p className="text-gray-200 text-sm italic">&ldquo;{persona.leadWith}&rdquo;</p>
      </div>

      {/* Messaging Hook */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Opening hook
        </div>
        <p className="text-gray-300 text-sm">&ldquo;{persona.openingHook}&rdquo;</p>
      </div>

      {/* Objection handler */}
      <div className="mb-4 bg-gray-800/50 rounded-lg p-3">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Objection handler
        </div>
        <p className="text-gray-200 text-sm">{persona.objectionHandler}</p>
      </div>

      {/* Sequence */}
      {expanded && persona.sequence.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Outreach Sequence
          </div>
          <div className="space-y-2">
            {persona.sequence.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {step.day}
                </div>
                <p className="text-gray-400 text-sm">{step.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

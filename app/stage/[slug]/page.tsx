import { notFound } from "next/navigation";
import Link from "next/link";
import { funnelStages } from "@/lib/data";
import MetricCard from "@/components/MetricCard";
import ActivityFlow from "@/components/ActivityFlow";

export function generateStaticParams() {
  return funnelStages.map((stage) => ({
    slug: stage.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // For static generation, we look up synchronously from static data
  // The params are resolved at build time for generateStaticParams routes
  return {
    title: "Stage Details — MyBCAT HubSpot Cleaner",
  };
}

export default async function StagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = funnelStages.find((s) => s.slug === slug);

  if (!stage) {
    notFound();
  }

  const prevStage = funnelStages.find((s) => s.id === stage.id - 1);
  const nextStage = funnelStages.find((s) => s.id === stage.id + 1);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          Funnel
        </Link>
        <span>/</span>
        <span style={{ color: stage.color }}>{stage.name}</span>
      </div>

      {/* Stage Header */}
      <div
        className="rounded-2xl p-6 sm:p-8 animate-fade-in"
        style={{
          background: `linear-gradient(135deg, ${stage.color}15 0%, ${stage.color}05 100%)`,
          borderLeft: `4px solid ${stage.color}`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: stage.color }}
              >
                {stage.id}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {stage.name}
                </h1>
                <p className="text-gray-400 text-sm">{stage.tagline}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="text-center bg-gray-900/50 rounded-lg px-4 py-2">
              <div className="text-lg font-bold" style={{ color: stage.color }}>
                {stage.contactCount}
              </div>
              <div className="text-xs text-gray-500">Contacts</div>
            </div>
            <div className="text-center bg-gray-900/50 rounded-lg px-4 py-2">
              <div className="text-sm font-semibold text-gray-200">
                {stage.owner}
              </div>
              <div className="text-xs text-gray-500">Owner</div>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-4 leading-relaxed max-w-3xl">
          {stage.description}
        </p>

        {/* Key metrics inline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-gray-900/30 rounded-lg p-3">
            <div className="text-xs text-gray-500">Primary</div>
            <div className="text-sm font-medium text-gray-200">{stage.primaryActivity}</div>
          </div>
          <div className="bg-gray-900/30 rounded-lg p-3">
            <div className="text-xs text-gray-500">Cadence</div>
            <div className="text-sm font-medium text-gray-200">{stage.cadence}</div>
          </div>
          <div className="bg-gray-900/30 rounded-lg p-3">
            <div className="text-xs text-gray-500">Success Metric</div>
            <div className="text-sm font-medium text-gray-200">{stage.successMetric}</div>
          </div>
          <div className="bg-gray-900/30 rounded-lg p-3">
            <div className="text-xs text-gray-500">Min Touches</div>
            <div className="text-sm font-medium text-gray-200">{stage.minTouches}</div>
          </div>
        </div>
      </div>

      {/* Entry Criteria */}
      <section className="animate-fade-in-delay-1">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: stage.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Entry Criteria
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {stage.entryConditions.map((condition, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/50 p-4"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: `${stage.color}40` }}
              >
                {i + 1}
              </div>
              <code className="text-sm text-gray-300 font-mono">{condition}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Flow */}
      <section className="animate-fade-in-delay-2">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: stage.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          Activity Flow
        </h2>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <ActivityFlow activities={stage.activities} color={stage.color} />
        </div>
      </section>

      {/* Exit Criteria */}
      <section className="animate-fade-in-delay-3">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: stage.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
          Exit Criteria
        </h2>
        <div className="space-y-4">
          {stage.exitCriteria.map((exit, i) => {
            const targetStage = funnelStages.find(
              (s) => s.name === exit.target || s.name.startsWith(exit.target.split(" ")[0])
            );
            const targetColor = targetStage?.color || "#6B7280";
            return (
              <div
                key={i}
                className="rounded-xl border p-5"
                style={{
                  borderColor: `${targetColor}30`,
                  backgroundColor: `${targetColor}05`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5" style={{ color: targetColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="font-bold text-sm" style={{ color: targetColor }}>
                    Transition to {exit.target}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {exit.conditions.map((cond, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: targetColor }}
                      />
                      {cond}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stall Handling */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Stall Handling Alerts
        </h2>
        <div className="space-y-3">
          {stage.stallHandling.map((stall, i) => (
            <div
              key={i}
              className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="font-semibold text-amber-400 text-sm">
                  {stall.threshold}
                </span>
                {stall.priority && (
                  <span className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-400 shrink-0">
                    {stall.priority}
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm">{stall.action}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KPIs */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: stage.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          Key Performance Indicators
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stage.kpis.map((kpi, i) => (
            <MetricCard key={i} kpi={kpi} color={stage.color} />
          ))}
        </div>
      </section>

      {/* Non-Behaviors */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          What NOT To Do
        </h2>
        <div className="space-y-2">
          {stage.nonBehaviors.map((nb, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-red-500/10 bg-red-500/5 p-4"
            >
              <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-300 text-sm">{nb}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HC Fields for this stage */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: stage.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          HC Fields at This Stage
        </h2>
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900/80">
                  <th className="text-left p-3 text-gray-400 font-medium">Field</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Values</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Position</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Required Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {stage.hcFields.map((hf, i) => (
                  <tr key={i} className="hover:bg-gray-900/50">
                    <td className="p-3">
                      <code className="text-xs font-mono" style={{ color: stage.color }}>
                        {hf.field}
                      </code>
                    </td>
                    <td className="p-3 text-gray-300 text-xs">{hf.values}</td>
                    <td className="p-3 text-gray-400 text-xs">{hf.funnelPosition}</td>
                    <td className="p-3 text-gray-300 text-xs">{hf.requiredActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Navigation between stages */}
      <section className="flex justify-between items-center pt-4 pb-8 border-t border-gray-800">
        {prevStage ? (
          <Link
            href={`/stage/${prevStage.slug}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: prevStage.color }}
            />
            {prevStage.name}
          </Link>
        ) : (
          <div />
        )}
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Back to overview
        </Link>
        {nextStage ? (
          <Link
            href={`/stage/${nextStage.slug}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            {nextStage.name}
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: nextStage.color }}
            />
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </section>
    </div>
  );
}

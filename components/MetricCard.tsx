import type { KPI } from "@/lib/data";

export default function MetricCard({
  kpi,
  color,
}: {
  kpi: KPI;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:bg-gray-800/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-200 text-sm leading-snug">
          {kpi.metric}
        </h4>
        <div
          className="w-2 h-2 rounded-full shrink-0 mt-1.5"
          style={{ backgroundColor: color }}
        />
      </div>
      <div
        className="text-2xl font-bold mb-2"
        style={{ color }}
      >
        {kpi.target}
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{kpi.measurement}</p>
    </div>
  );
}

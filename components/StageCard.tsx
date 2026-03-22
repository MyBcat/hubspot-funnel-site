import Link from "next/link";
import type { FunnelStage } from "@/lib/data";

export default function StageCard({ stage }: { stage: FunnelStage }) {
  return (
    <Link
      href={`/stage/${stage.slug}`}
      className="group block rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:bg-gray-800/50 transition-all duration-300 hover:border-gray-600 hover:shadow-lg"
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: stage.color,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: stage.color }}
          >
            {stage.id}
          </div>
          <h3 className="font-bold text-white text-lg group-hover:text-gray-100">
            {stage.name}
          </h3>
        </div>
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{
            backgroundColor: `${stage.color}20`,
            color: stage.color,
          }}
        >
          {stage.contactCount}
        </span>
      </div>

      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{stage.tagline}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
          {stage.owner}
        </span>
        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
          {stage.cadence}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Primary: {stage.primaryActivity}</span>
        <svg
          className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

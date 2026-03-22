import { priorityLevels } from "@/lib/data";

export default function PriorityLadder() {
  return (
    <div className="space-y-3 w-full max-w-3xl mx-auto">
      {priorityLevels.map((level, i) => {
        const widthPercent = 100 - i * 10;
        return (
          <div
            key={level.id}
            className="relative group"
            style={{ width: `${widthPercent}%` }}
          >
            <div
              className="rounded-xl border p-5 transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: `${level.color}40`,
                backgroundColor: `${level.color}08`,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="text-sm font-bold px-3 py-1.5 rounded-lg text-white"
                    style={{ backgroundColor: level.color }}
                  >
                    {level.id}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">
                      {level.label}
                    </div>
                    <div className="text-gray-400 text-xs">{level.action}</div>
                  </div>
                </div>
                <div
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${level.color}20`,
                    color: level.color,
                  }}
                >
                  SLA: {level.sla}
                </div>
              </div>
              <p className="text-gray-400 text-sm">{level.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {level.temperatures.map((temp) => (
                  <span
                    key={temp}
                    className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400"
                  >
                    {temp}
                  </span>
                ))}
              </div>
            </div>
            {/* Arrow connector */}
            {i < priorityLevels.length - 1 && (
              <div className="flex justify-center py-1">
                <svg width="12" height="16" viewBox="0 0 12 16" className="text-gray-700">
                  <path d="M6 0v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

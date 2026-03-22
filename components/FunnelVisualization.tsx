"use client";

import Link from "next/link";
import { funnelStages } from "@/lib/data";

export default function FunnelVisualization() {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="relative flex flex-col items-center gap-0">
        {funnelStages.map((stage, i) => {
          // Calculate widths: widest at top, narrowest at bottom for first 5
          // Then widen again for Customer/Advocate (bowtie shape)
          const totalStages = funnelStages.length;
          let widthPercent: number;
          if (i <= 4) {
            widthPercent = 100 - i * 12;
          } else if (i === 5) {
            widthPercent = 52;
          } else if (i === 6) {
            widthPercent = 46;
          } else {
            widthPercent = 40;
          }

          return (
            <Link
              key={stage.slug}
              href={`/stage/${stage.slug}`}
              className="group relative block w-full"
              style={{ maxWidth: `${widthPercent}%` }}
            >
              <div
                className="relative py-4 px-6 text-center transition-all duration-300 group-hover:scale-105 group-hover:z-10"
                style={{
                  backgroundColor: stage.color,
                  clipPath:
                    i === totalStages - 1
                      ? "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)"
                      : "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
                  opacity: 0.9,
                }}
              >
                <div className="flex items-center justify-center gap-3 text-white">
                  <span className="text-xs font-bold opacity-70 bg-black/20 rounded-full w-6 h-6 flex items-center justify-center">
                    {stage.id}
                  </span>
                  <span className="font-bold text-sm sm:text-base">{stage.name}</span>
                  <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
                    {stage.contactCount}
                  </span>
                </div>
              </div>
              {/* Connector arrow */}
              {i < totalStages - 1 && (
                <div className="flex justify-center -my-1 relative z-0">
                  <svg width="20" height="12" viewBox="0 0 20 12" className="text-gray-600">
                    <path d="M10 12 L0 0 L20 0 Z" fill="currentColor" opacity="0.3" />
                  </svg>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Revenue arrow at bottom */}
      <div className="flex flex-col items-center mt-6 animate-pulse">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
          <path d="M12 2v20m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-emerald-400 font-bold text-sm mt-1">$$$ REVENUE $$$</span>
      </div>
    </div>
  );
}

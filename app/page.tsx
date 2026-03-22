import FunnelVisualization from "@/components/FunnelVisualization";
import StageCard from "@/components/StageCard";
import { funnelStages, quickStats, priorityLevels, temperatureLevels } from "@/lib/data";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero */}
      <section className="animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Sales Execution Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            HubSpot Cleaner
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
              Sales Funnel System
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            8-stage classification engine processing 13,000+ contacts. Every HC field answers one question:
            &ldquo;What activity should I do next to move this contact one stage closer to Customer?&rdquo;
          </p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="animate-fade-in-delay-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 text-center hover:bg-gray-800/30 transition-colors"
            >
              <div
                className="text-xl sm:text-2xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Funnel Visualization */}
      <section className="animate-fade-in-delay-2">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-white">The Revenue Funnel</h2>
          <p className="text-gray-500 text-sm">Click any stage to explore details</p>
        </div>
        <FunnelVisualization />
      </section>

      {/* How It Works */}
      <section className="animate-fade-in-delay-3">
        <h2 className="text-xl font-bold text-white mb-6 text-center">How the System Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "1",
              title: "Classify",
              desc: "Rules engine + LLM reads every email, note, call log, and meeting to classify each contact",
              color: "#3B82F6",
            },
            {
              step: "2",
              title: "Prioritize",
              desc: "Contacts are scored P1-P6 based on engagement temperature, intent, role, and funnel stage",
              color: "#10B981",
            },
            {
              step: "3",
              title: "Route",
              desc: "Each contact routes to the correct stage handler with persona-matched messaging and activities",
              color: "#F59E0B",
            },
            {
              step: "4",
              title: "Execute",
              desc: "Daily work queues drive agents to the highest-impact activities: discovery calls, proposals, closes",
              color: "#8B5CF6",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:bg-gray-800/30 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3"
                style={{ backgroundColor: item.color }}
              >
                {item.step}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue Engine */}
      <section className="animate-fade-in-delay-4">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4 text-center">The Revenue Engine</h2>
          <p className="text-gray-400 text-sm text-center mb-6 max-w-xl mx-auto">
            Activities drive stage transitions drive revenue. Discovery calls are the #1 leading indicator.
          </p>
          <div className="flex flex-col items-center gap-2 text-sm">
            {[
              { label: "Marketing emails / ads / content", color: "#6B7280" },
              { label: "Unaware --> Aware (awareness rate)", color: "#6B7280" },
              { label: "Personalized outreach", color: "#3B82F6" },
              { label: "Aware --> Interested (engagement rate)", color: "#3B82F6" },
              { label: "DISCOVERY CALLS  <-- THE REVENUE LEVER", color: "#10B981", bold: true },
              { label: "Interested --> Evaluating (call rate)", color: "#10B981" },
              { label: "Proposals + objection handling", color: "#F59E0B" },
              { label: "Evaluating --> Ready to Buy (acceptance rate)", color: "#F59E0B" },
              { label: "Contract + onboarding", color: "#F97316" },
              { label: "Ready to Buy --> Customer (close rate)", color: "#F97316" },
              { label: "Retention + expansion", color: "#059669" },
              { label: "Customer --> Advocate (NRR + referral rate)", color: "#059669" },
              { label: "$$$ REVENUE $$$", color: "#10B981", bold: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 w-full max-w-lg">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span
                  className={`${item.bold ? "font-bold" : ""}`}
                  style={{ color: item.color }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Queue Preview */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 text-center">Daily Priority Queue</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {priorityLevels.slice(0, 3).map((level) => (
            <div
              key={level.id}
              className="rounded-xl border p-5"
              style={{
                borderColor: `${level.color}40`,
                backgroundColor: `${level.color}08`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-1 rounded text-white"
                  style={{ backgroundColor: level.color }}
                >
                  {level.id}
                </span>
                <span className="font-semibold text-white text-sm">{level.label}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{level.action}</p>
              <p className="text-xs" style={{ color: level.color }}>
                SLA: {level.sla}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Temperature Reference */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 text-center">Engagement Temperature</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {temperatureLevels.map((temp) => (
            <div
              key={temp.name}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 w-full sm:w-44"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: temp.color }}
                />
                <span className="font-bold text-white text-sm">{temp.name}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">{temp.range}</div>
              <div className="text-xs text-gray-400">{temp.approach}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stage Cards Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 text-center">All Funnel Stages</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {funnelStages.map((stage) => (
            <StageCard key={stage.slug} stage={stage} />
          ))}
        </div>
      </section>

      {/* Core Principle */}
      <section className="pb-12">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-emerald-400 mb-3">The One Rule</h2>
          <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto mb-2">
            Discovery calls are the #1 leading indicator of revenue.
          </p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            More discovery calls &rarr; More proposals &rarr; More contracts &rarr; More revenue.
            The entire classification system exists to tell you <strong className="text-gray-300">who to call next</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import PriorityLadder from "@/components/PriorityLadder";
import { priorityLevels, temperatureLevels } from "@/lib/data";

export const metadata = {
  title: "Priority Queue — MyBCAT HubSpot Cleaner",
  description: "P1-P6 priority ladder with SLAs, temperature cross-reference, and daily workflow",
};

export default function PriorityPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Funnel
          </Link>
          <span>/</span>
          <span className="text-amber-400">Priority Queue</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Daily Priority Queue
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm">
          Work contacts in strict priority order. P1 contacts are worked first, always.
          The <code className="text-amber-400 bg-amber-500/10 px-1 rounded">hc_work_priority</code> field
          determines urgency. Temperature and intent determine approach.
        </p>
      </div>

      {/* Priority Ladder */}
      <section className="animate-fade-in-delay-1">
        <h2 className="text-lg font-bold text-white mb-6">Priority Ladder</h2>
        <PriorityLadder />
      </section>

      {/* Temperature Cross-Reference */}
      <section className="animate-fade-in-delay-2">
        <h2 className="text-lg font-bold text-white mb-4">Temperature Guide</h2>
        <p className="text-gray-500 text-sm mb-4">
          Check <code className="text-blue-400 bg-blue-500/10 px-1 rounded">hc_engagement_temperature</code> before
          every outreach to calibrate your approach.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {temperatureLevels.map((temp) => (
            <div
              key={temp.name}
              className="rounded-xl border p-5 transition-colors hover:bg-gray-800/30"
              style={{
                borderColor: `${temp.color}30`,
                backgroundColor: `${temp.color}05`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: temp.color }}
                />
                <span className="font-bold text-white">{temp.name}</span>
              </div>
              <div
                className="text-xs font-semibold mb-2 px-2 py-0.5 rounded inline-block"
                style={{
                  backgroundColor: `${temp.color}15`,
                  color: temp.color,
                }}
              >
                {temp.range}
              </div>
              <p className="text-gray-400 text-sm">{temp.approach}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Priority-Temperature Matrix */}
      <section className="animate-fade-in-delay-3">
        <h2 className="text-lg font-bold text-white mb-4">Priority x Temperature Matrix</h2>
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900/80">
                  <th className="text-left p-3 text-gray-400 font-medium">Priority</th>
                  {temperatureLevels.map((t) => (
                    <th key={t.name} className="text-center p-3 font-medium" style={{ color: t.color }}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[
                  {
                    priority: "P1",
                    color: "#EF4444",
                    cells: [
                      { text: "CALL NOW", bg: "#EF4444" },
                      { text: "Call today", bg: "#F97316" },
                      { text: "Rare combo", bg: "#6B7280" },
                      { text: "Rare combo", bg: "#6B7280" },
                      { text: "Invalid", bg: "#374151" },
                    ],
                  },
                  {
                    priority: "P2",
                    color: "#F97316",
                    cells: [
                      { text: "Call today", bg: "#F97316" },
                      { text: "Call today", bg: "#F97316" },
                      { text: "Email/call", bg: "#F59E0B" },
                      { text: "Dropped lead?", bg: "#F59E0B" },
                      { text: "Invalid", bg: "#374151" },
                    ],
                  },
                  {
                    priority: "P3",
                    color: "#F59E0B",
                    cells: [
                      { text: "This week", bg: "#F59E0B" },
                      { text: "This week", bg: "#F59E0B" },
                      { text: "This week", bg: "#3B82F6" },
                      { text: "Re-engage", bg: "#6B7280" },
                      { text: "Invalid", bg: "#374151" },
                    ],
                  },
                  {
                    priority: "P4",
                    color: "#3B82F6",
                    cells: [
                      { text: "Unusual", bg: "#6B7280" },
                      { text: "Monthly touch", bg: "#3B82F6" },
                      { text: "Monthly nurture", bg: "#3B82F6" },
                      { text: "Quarterly", bg: "#6B7280" },
                      { text: "Invalid", bg: "#374151" },
                    ],
                  },
                  {
                    priority: "P5",
                    color: "#6B7280",
                    cells: [
                      { text: "Unusual", bg: "#6B7280" },
                      { text: "Unusual", bg: "#6B7280" },
                      { text: "Quarterly", bg: "#6B7280" },
                      { text: "Quarterly", bg: "#6B7280" },
                      { text: "Invalid", bg: "#374151" },
                    ],
                  },
                  {
                    priority: "P6",
                    color: "#374151",
                    cells: [
                      { text: "N/A", bg: "#374151" },
                      { text: "N/A", bg: "#374151" },
                      { text: "N/A", bg: "#374151" },
                      { text: "N/A", bg: "#374151" },
                      { text: "No contact", bg: "#374151" },
                    ],
                  },
                ].map((row) => (
                  <tr key={row.priority} className="hover:bg-gray-900/50">
                    <td className="p-3">
                      <span
                        className="text-xs font-bold px-2 py-1 rounded text-white"
                        style={{ backgroundColor: row.color }}
                      >
                        {row.priority}
                      </span>
                    </td>
                    {row.cells.map((cell, j) => (
                      <td key={j} className="p-2 text-center">
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${cell.bg}20`,
                            color: cell.bg === "#374151" ? "#6B7280" : cell.bg,
                          }}
                        >
                          {cell.text}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Queue Ordering Logic */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Queue Ordering Logic</h2>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <p className="text-gray-400 text-sm mb-4">
            When multiple contacts share the same priority level, the system orders by:
          </p>
          <div className="space-y-3">
            {[
              {
                num: "1",
                rule: "Active Buyer intent first",
                desc: "Contacts with hc_llm_engagement_intent = Active Buyer are worked before Exploring or Passive",
                color: "#EF4444",
              },
              {
                num: "2",
                rule: "Decision Maker role first",
                desc: "Contacts with hc_llm_real_role = Decision Maker are worked before Champions or Gatekeepers",
                color: "#F97316",
              },
              {
                num: "3",
                rule: "Higher confidence score first",
                desc: "Contacts with hc_llm_confidence >= 0.8 are worked before lower confidence contacts",
                color: "#F59E0B",
              },
              {
                num: "4",
                rule: "Hotter temperature first",
                desc: "Hot contacts before Warm, Warm before Cool within the same priority band",
                color: "#3B82F6",
              },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {item.num}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{item.rule}</div>
                  <div className="text-gray-400 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Override Rules */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Priority Overrides</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="font-bold text-red-400 text-sm">Stall Flag</span>
            </div>
            <p className="text-gray-400 text-xs">
              When <code className="text-red-400">hc_stall_flag = true</code>, the contact
              escalates above other contacts at the same priority level.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              </svg>
              <span className="font-bold text-amber-400 text-sm">Dropped Lead</span>
            </div>
            <p className="text-gray-400 text-xs">
              When <code className="text-amber-400">hc_dropped_lead_flag = true</code>, the contact
              is treated as P2-Today regardless of computed priority. Someone was interested and we let them slip.
            </p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <span className="font-bold text-blue-400 text-sm">Merge Candidate</span>
            </div>
            <p className="text-gray-400 text-xs">
              When <code className="text-blue-400">hc_merge_candidate</code> is set, the contact
              is flagged for merge resolution before any outreach begins.
            </p>
          </div>
        </div>
      </section>

      {/* Daily Workflow */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Daily Workflow</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Morning */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              Morning Queue
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  text: "Filter P1-Immediate contacts. Work ALL of them first.",
                  color: "#EF4444",
                },
                {
                  step: "2",
                  text: "Filter P2-Today contacts. Work ALL of them.",
                  color: "#F97316",
                },
                {
                  step: "3",
                  text: "Filter P3-ThisWeek contacts. Work as many as time allows.",
                  color: "#F59E0B",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </div>
                  <p className="text-gray-300 text-sm pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Before Each Call */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Before Each Call
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  text: "Read hc_llm_reasoning (why they're classified this way)",
                  field: "hc_llm_reasoning",
                },
                {
                  step: "2",
                  text: "Check hc_llm_engagement_intent (their mindset)",
                  field: "hc_llm_engagement_intent",
                },
                {
                  step: "3",
                  text: "Check hc_llm_real_role (who you're talking to)",
                  field: "hc_llm_real_role",
                },
                {
                  step: "4",
                  text: "Check optometrist_persona (how to message them)",
                  field: "optometrist_persona",
                },
                {
                  step: "5",
                  text: "Check stall/dropped flags (any urgency?)",
                  field: "hc_stall_flag",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-blue-600 shrink-0">
                    {item.step}
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-300 text-sm">{item.text}</p>
                    <code className="text-blue-400 text-xs">{item.field}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Model */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Example Daily Capacity</h2>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <p className="text-gray-400 text-sm mb-4">
            Assuming 30 activities per agent per day:
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {[
              { label: "P1", count: "5", color: "#EF4444" },
              { label: "P2", count: "12", color: "#F97316" },
              { label: "P3", count: "13", color: "#F59E0B" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="text-lg font-bold px-3 py-1 rounded text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.label}
                </div>
                <div className="text-2xl font-bold text-white">{item.count}</div>
                <div className="text-gray-500 text-sm">contacts</div>
                {item.label !== "P3" && (
                  <span className="text-gray-600 text-lg">+</span>
                )}
              </div>
            ))}
            <div className="text-gray-500 text-lg">=</div>
            <div className="text-2xl font-bold text-emerald-400">30 / day</div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            P4 and P5 contacts are batched into weekly/monthly cadence queues.
            P6 contacts are never worked.
          </p>
        </div>
      </section>

      {/* Quick Reference Card */}
      <section className="pb-12">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <h3 className="text-lg font-bold text-amber-400 mb-4 text-center">Quick Reference Card</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-bold text-white mb-2">Priority</h4>
              <div className="space-y-1 font-mono text-xs">
                <div><span className="text-red-400">P1</span> = Call NOW</div>
                <div><span className="text-orange-400">P2</span> = Call TODAY</div>
                <div><span className="text-amber-400">P3</span> = Call THIS WEEK</div>
                <div><span className="text-blue-400">P4</span> = Monthly touch</div>
                <div><span className="text-gray-400">P5</span> = Quarterly check</div>
                <div><span className="text-gray-600">P6</span> = Don&apos;t contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Temperature</h4>
              <div className="space-y-1 font-mono text-xs">
                <div><span className="text-red-400">Hot</span> = Active this week</div>
                <div><span className="text-orange-400">Warm</span> = Active this month</div>
                <div><span className="text-blue-400">Cool</span> = Fading</div>
                <div><span className="text-gray-400">Cold</span> = Gone quiet</div>
                <div><span className="text-gray-600">Dead</span> = Don&apos;t contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Intent</h4>
              <div className="space-y-1 font-mono text-xs">
                <div><span className="text-emerald-400">Active Buyer</span> = Close them</div>
                <div><span className="text-blue-400">Exploring</span> = Educate them</div>
                <div><span className="text-gray-400">Passive</span> = Try new angle</div>
                <div><span className="text-red-400">Negative</span> = Leave alone</div>
                <div><span className="text-gray-500">No Signal</span> = Discover needs</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

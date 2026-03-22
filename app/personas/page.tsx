import Link from "next/link";
import PersonaCard from "@/components/PersonaCard";
import { personas } from "@/lib/data";

export const metadata = {
  title: "Personas — MyBCAT HubSpot Cleaner",
  description: "6 optometrist personas with messaging hooks and funnel-specific outreach sequences",
};

export default function PersonasPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Funnel
          </Link>
          <span>/</span>
          <span className="text-purple-400">Personas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Optometrist Personas
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm">
          The <code className="text-purple-400 bg-purple-500/10 px-1 rounded">optometrist_persona</code> field tells you their psychographic profile.
          Each persona has tailored messaging, objection handling, and a complete outreach sequence.
          Generic outreach converts at 1/10th the rate of persona-matched outreach.
        </p>
      </div>

      {/* Quick Reference */}
      <div className="animate-fade-in-delay-1 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Quick Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-2 text-gray-400 font-medium">Persona</th>
                <th className="text-left p-2 text-gray-400 font-medium">Who</th>
                <th className="text-left p-2 text-gray-400 font-medium">Revenue</th>
                <th className="text-left p-2 text-gray-400 font-medium">Speed</th>
                <th className="text-left p-2 text-gray-400 font-medium">Opening Hook</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {personas.map((p) => (
                <tr key={p.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-2 font-semibold text-white text-xs">{p.name}</td>
                  <td className="p-2 text-gray-400 text-xs">{p.who}</td>
                  <td className="p-2 text-emerald-400 text-xs">{p.revenuePotential}</td>
                  <td className="p-2 text-gray-300 text-xs">{p.decisionSpeed}</td>
                  <td className="p-2 text-gray-400 text-xs italic max-w-xs truncate">
                    &ldquo;{p.openingHook}&rdquo;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Persona by Funnel Stage */}
      <div className="animate-fade-in-delay-2 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Persona Messaging by Funnel Stage
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-2 text-gray-400 font-medium">Persona</th>
                <th className="text-left p-2 font-medium" style={{ color: "#3B82F6" }}>
                  Aware (nurture)
                </th>
                <th className="text-left p-2 font-medium" style={{ color: "#10B981" }}>
                  Interested (book call)
                </th>
                <th className="text-left p-2 font-medium" style={{ color: "#F59E0B" }}>
                  Evaluating (objection)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                {
                  name: "Cold-Start Dreamer",
                  aware: "How [practice] handled calls from day one",
                  interested: "15 min to show how new practices launch",
                  evaluating: "No upfront cost, pay as you grow",
                },
                {
                  name: "Growth Builder",
                  aware: "How [practice] scaled to 3 locations",
                  interested: "Quick look at how we standardize across locations",
                  evaluating: "ROI across all locations",
                },
                {
                  name: "Overwhelmed Clinician",
                  aware: "10 hours/week you could get back",
                  interested: "15 min to show 10 extra hours/week",
                  evaluating: "You'll get 10 hours/week back",
                },
                {
                  name: "Community Caregiver",
                  aware: "We treat your patients like family",
                  interested: "How [similar practice] handles it",
                  evaluating: "Your patients will feel taken care of",
                },
                {
                  name: "Tech Differentiator",
                  aware: "EHR integration + AI-powered routing",
                  interested: "Demo of our tech stack -- 15 min",
                  evaluating: "Full EHR integration, real-time analytics",
                },
                {
                  name: "Exit Strategist",
                  aware: "Increase practice value before selling",
                  interested: "How this impacts practice valuation",
                  evaluating: "Increases practice valuation",
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-800/30">
                  <td className="p-2 font-semibold text-white text-xs">{row.name}</td>
                  <td className="p-2 text-gray-400 text-xs italic">{row.aware}</td>
                  <td className="p-2 text-gray-400 text-xs italic">{row.interested}</td>
                  <td className="p-2 text-gray-400 text-xs italic">{row.evaluating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Persona Cards */}
      <div className="animate-fade-in-delay-3">
        <h2 className="text-lg font-bold text-white mb-6">Detailed Persona Profiles</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} expanded />
          ))}
        </div>
      </div>

      {/* Usage Note */}
      <section className="pb-12">
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6 text-center">
          <h3 className="text-lg font-bold text-purple-400 mb-2">How to Use Personas</h3>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Before every outreach, check the <code className="text-purple-400 bg-purple-500/10 px-1 rounded">optometrist_persona</code> field.
            Match your opening hook, CTA, and objection handling to their psychographic profile.
            Never skip the persona angle — it is the single biggest factor in conversion rate.
          </p>
        </div>
      </section>
    </div>
  );
}

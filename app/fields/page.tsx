import Link from "next/link";
import { hcFieldMappings, funnelStages } from "@/lib/data";

export const metadata = {
  title: "HC Fields — MyBCAT HubSpot Cleaner",
  description: "Visual mapping of every hc_* field to funnel stages and activities",
};

// Group fields by category
const fieldCategories = [
  {
    name: "Funnel Stage Fields",
    description: "Primary stage classification — determines which handler processes the contact",
    fields: hcFieldMappings.filter((f) => f.field.startsWith("hc_funnel_stage")),
  },
  {
    name: "Record Type Fields",
    description: "Contact classification — determines if the contact is a sales target",
    fields: hcFieldMappings.filter((f) => f.field.startsWith("hc_record_type")),
  },
  {
    name: "Alert Flags",
    description: "Urgency signals — override normal priority and require immediate action",
    fields: hcFieldMappings.filter(
      (f) =>
        f.field.includes("stall_flag") ||
        f.field.includes("dropped_lead") ||
        f.field.includes("merge_candidate")
    ),
  },
  {
    name: "Target Market",
    description: "Market qualification — determines if outreach is appropriate",
    fields: hcFieldMappings.filter((f) => f.field.includes("target_market")),
  },
  {
    name: "Role Classification",
    description: "Contact role — determines messaging approach and who to address",
    fields: hcFieldMappings.filter((f) => f.field.includes("real_role")),
  },
  {
    name: "Confidence Scores",
    description: "Classification confidence — determines how much to trust the data",
    fields: hcFieldMappings.filter((f) => f.field.includes("confidence")),
  },
];

export default function FieldsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Funnel
          </Link>
          <span>/</span>
          <span className="text-blue-400">HC Fields</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          HC Field Mapping
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm">
          Every <code className="text-blue-400 bg-blue-500/10 px-1 rounded">hc_*</code> field maps to a funnel position and a required activity.
          The classification engine sets these fields; sales agents read them to know what to do next.
        </p>
      </div>

      {/* Quick Legend */}
      <div className="animate-fade-in-delay-1 flex flex-wrap gap-3">
        {funnelStages.map((stage) => (
          <div
            key={stage.slug}
            className="flex items-center gap-1.5 text-xs"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <span className="text-gray-400">{stage.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="w-3 h-3 rounded-full bg-gray-600" />
          <span className="text-gray-400">Not in funnel</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <div className="w-3 h-3 rounded-full bg-red-600" />
          <span className="text-gray-400">Alert / Action required</span>
        </div>
      </div>

      {/* Field Categories */}
      {fieldCategories.map((category, ci) => (
        <section key={ci} className={ci < 4 ? `animate-fade-in-delay-${ci + 1}` : ""}>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">{category.name}</h2>
            <p className="text-gray-500 text-sm">{category.description}</p>
          </div>
          <div className="rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900/80">
                    <th className="text-left p-3 text-gray-400 font-medium w-1/4">Field</th>
                    <th className="text-left p-3 text-gray-400 font-medium w-1/6">Values</th>
                    <th className="text-left p-3 text-gray-400 font-medium w-1/6">Funnel Position</th>
                    <th className="text-left p-3 text-gray-400 font-medium w-5/12">Required Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {category.fields.map((field, i) => (
                    <tr key={i} className="hover:bg-gray-900/50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: field.color }}
                          />
                          <code className="text-xs font-mono font-semibold" style={{ color: field.color }}>
                            {field.field}
                          </code>
                        </div>
                      </td>
                      <td className="p-3 text-gray-400 text-xs">{field.values}</td>
                      <td className="p-3">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: `${field.color}15`,
                            color: field.color,
                          }}
                        >
                          {field.funnelPosition}
                        </span>
                      </td>
                      <td className="p-3 text-gray-300 text-xs">{field.requiredActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Full Flat Table */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Complete Field Reference</h2>
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900/80">
                  <th className="text-left p-3 text-gray-400 font-medium">#</th>
                  <th className="text-left p-3 text-gray-400 font-medium">HC Field</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Values</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Funnel Position</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Required Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {hcFieldMappings.map((field, i) => (
                  <tr key={i} className="hover:bg-gray-900/50 transition-colors">
                    <td className="p-3 text-gray-600 text-xs">{i + 1}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: field.color }}
                        />
                        <code className="text-xs font-mono font-semibold" style={{ color: field.color }}>
                          {field.field}
                        </code>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400 text-xs">{field.values}</td>
                    <td className="p-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${field.color}15`,
                          color: field.color,
                        }}
                      >
                        {field.funnelPosition}
                      </span>
                    </td>
                    <td className="p-3 text-gray-300 text-xs max-w-xs">{field.requiredActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Priority Fields */}
      <section className="pb-12">
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-3">Priority Fields — Start Here</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                field: "hc_work_priority",
                desc: "How urgently to work this contact (P1-P6)",
              },
              {
                field: "hc_funnel_stage",
                desc: "Where they are in the buying journey (Unaware through Customer)",
              },
              {
                field: "hc_engagement_temperature",
                desc: "How recently they engaged (Hot through Dead)",
              },
              {
                field: "hc_record_type",
                desc: "What kind of record (Prospect, Customer, Vendor, etc.)",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/50 rounded-lg p-4">
                <code className="text-blue-400 text-sm font-mono font-semibold">
                  {item.field}
                </code>
                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-300 mb-2">LLM Enrichment Fields (deeper context)</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { field: "hc_llm_target_market", desc: "In our target market? yes/no/uncertain" },
                { field: "hc_llm_real_role", desc: "Decision Maker, Champion, Gatekeeper, etc." },
                { field: "hc_llm_engagement_intent", desc: "Active Buyer, Exploring, Passive, Negative" },
                { field: "hc_llm_reasoning", desc: "Plain English explanation of classification" },
                { field: "hc_llm_confidence", desc: "0.0 to 1.0 confidence score" },
                { field: "optometrist_persona", desc: "Psychographic profile for messaging" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/30 rounded-lg p-3">
                  <code className="text-purple-400 text-xs font-mono">{item.field}</code>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-300 mb-2">Supporting Fields</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { field: "hc_contact_role", desc: "Decision Maker / Champion / Influencer / etc." },
                { field: "hc_record_health", desc: "Complete / Partial / Minimal / Invalid" },
                { field: "hc_stall_flag", desc: "True = stuck too long in stage" },
                { field: "hc_dropped_lead_flag", desc: "True = was hot, went cold without follow-up" },
                { field: "hc_backward_movement_flag", desc: "True = stage went backward" },
                { field: "hc_merge_candidate", desc: "ID of potential duplicate record" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/30 rounded-lg p-3">
                  <code className="text-amber-400 text-xs font-mono">{item.field}</code>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

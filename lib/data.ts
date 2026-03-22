// ============================================================================
// lib/data.ts — All funnel stage data, persona data, HC field mappings
// Extracted from specs at /mnt/d_drive/repos/hubspot_cleaner/specs/
// ============================================================================

export interface FunnelStage {
  id: number;
  slug: string;
  name: string;
  color: string;
  colorRgb: string;
  tagline: string;
  contactCount: string;
  description: string;
  owner: string;
  primaryActivity: string;
  cadence: string;
  successMetric: string;
  entryConditions: string[];
  activities: Activity[];
  exitCriteria: ExitCriterion[];
  stallHandling: StallRule[];
  kpis: KPI[];
  nonBehaviors: string[];
  hcFields: HcFieldMapping[];
  minTouches: string;
}

export interface Activity {
  step: string;
  description: string;
  channel?: string;
}

export interface ExitCriterion {
  target: string;
  conditions: string[];
}

export interface StallRule {
  threshold: string;
  action: string;
  priority?: string;
}

export interface KPI {
  metric: string;
  target: string;
  measurement: string;
}

export interface HcFieldMapping {
  field: string;
  values: string;
  funnelPosition: string;
  requiredActivity: string;
}

export interface Persona {
  id: string;
  name: string;
  icon: string;
  who: string;
  careAbout: string;
  leadWith: string;
  revenuePotential: string;
  decisionSpeed: string;
  sequence: PersonaSequenceStep[];
  objectionHandler: string;
  openingHook: string;
  cta: string;
}

export interface PersonaSequenceStep {
  day: string;
  action: string;
}

export interface PriorityLevel {
  id: string;
  label: string;
  color: string;
  action: string;
  sla: string;
  description: string;
  temperatures: string[];
}

// ============================================================================
// FUNNEL STAGES
// ============================================================================

export const funnelStages: FunnelStage[] = [
  {
    id: 1,
    slug: "unaware",
    name: "Unaware",
    color: "#6B7280",
    colorRgb: "107, 114, 128",
    tagline: "They don't know MyBCAT exists.",
    contactCount: "~12,000",
    description:
      "Imported lists, cold prospects, and ghost records with no engagement. The widest part of the funnel with the lowest touch cadence.",
    owner: "Marketing",
    primaryActivity: "Add to nurture list",
    cadence: "Quarterly email",
    successMetric: "Opens/clicks",
    minTouches: "1 email/quarter = 4 touches/year",
    entryConditions: [
      "hc_funnel_stage = Unaware",
      'hc_llm_target_market = "yes" or "uncertain"',
      "hc_record_type NOT Vendor, Employee, Internal",
      "hc_engagement_temperature NOT Dead",
    ],
    activities: [
      {
        step: "Quarterly Email",
        description:
          "1 educational email per quarter (blog post, podcast episode, or industry insight)",
        channel: "Email",
      },
      {
        step: "LinkedIn Ads",
        description:
          "1 LinkedIn ad impression per month (if email available for matching)",
        channel: "LinkedIn",
      },
      {
        step: "Physical Postcard",
        description:
          "1 physical postcard per year for phone complaint leads with verified practice address",
        channel: "Mail",
      },
      {
        step: "Phone Complaint Upgrade",
        description:
          "Personalized postcard within 7 days, follow-up email at day 14, follow-up call at day 30",
        channel: "Multi-channel",
      },
    ],
    exitCriteria: [
      {
        target: "Aware",
        conditions: [
          "Opens an email",
          "Visits mybcat.com (page view)",
          "Accepts LinkedIn connection",
          "Scans QR code on postcard",
          "Identified via RB2B (website visitor identification)",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "12+ months with zero engagement",
        action:
          'Downgrade to P6-Archive — "no response after 4 quarterly touches"',
      },
      {
        threshold: "Email bounces",
        action:
          "Mark temperature as Dead, stop email cadence, continue physical mail if address available",
      },
    ],
    kpis: [
      {
        metric: "Unaware to Aware conversion rate",
        target: "2-5% per quarter",
        measurement: "Count of contacts that generate first engagement signal",
      },
      {
        metric: "Email open rate",
        target: "15-25%",
        measurement: "HubSpot email analytics",
      },
      {
        metric: "Postcard response rate",
        target: "1-3%",
        measurement: "QR code scans or subsequent web visits",
      },
      {
        metric: "Unsubscribe rate",
        target: "< 1% per send",
        measurement: "HubSpot email analytics",
      },
    ],
    nonBehaviors: [
      "Must not call Unaware contacts — cold calling 12,000 people is not scalable",
      "Must not send sales-focused emails — Unaware contacts need education, not pitches",
      "Must not send more than 1 email per quarter — over-emailing increases unsubscribes",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Unaware",
        funnelPosition: "Top of funnel",
        requiredActivity: "Add to nurture list, quarterly email, LinkedIn ads",
      },
      {
        field: "hc_work_priority",
        values: "P5-Quarterly or P6-Archive",
        funnelPosition: "Low priority",
        requiredActivity: "Batch into quarterly cadence",
      },
      {
        field: "hc_engagement_temp",
        values: "Cold or Dead",
        funnelPosition: "No engagement",
        requiredActivity: "Educational content only",
      },
      {
        field: "hc_llm_intent",
        values: "No Signal",
        funnelPosition: "Unknown intent",
        requiredActivity: "Awareness content",
      },
    ],
  },
  {
    id: 2,
    slug: "aware",
    name: "Aware",
    color: "#3B82F6",
    colorRgb: "59, 130, 246",
    tagline: "They know we exist but haven't shown intent.",
    contactCount: "~478",
    description:
      "Newsletter subscribers, conference badge scans, one-time website visitors, cold outreach recipients who opened but didn't reply.",
    owner: "Marketing + SDR",
    primaryActivity: "Content nurture",
    cadence: "Monthly email + quarterly LinkedIn",
    successMetric: "Reply/form fill",
    minTouches: "1 email/month + 1 LinkedIn/quarter = 16 touches/year",
    entryConditions: [
      "hc_funnel_stage = Aware",
      'hc_llm_target_market = "yes" or "uncertain"',
      "hc_record_type = Prospect",
      "hc_engagement_temperature != Dead",
    ],
    activities: [
      {
        step: "Monthly Nurture Email",
        description:
          "1 value email per month (case study, blog post, podcast episode)",
        channel: "Email",
      },
      {
        step: "LinkedIn Outreach",
        description: "1 personalized LinkedIn message per quarter",
        channel: "LinkedIn",
      },
      {
        step: "Webinar Invitation",
        description: "1 webinar/CE event invitation per quarter (when available)",
        channel: "Email",
      },
      {
        step: "Retargeting Ads",
        description: "Retargeting ads for contacts who visited mybcat.com",
        channel: "Ads",
      },
    ],
    exitCriteria: [
      {
        target: "Interested",
        conditions: [
          "Replies to any email",
          "Submits a form on mybcat.com",
          "Clicks through to pricing or services page",
          "Downloads a lead magnet (case study PDF, ROI calculator)",
          "Engages on LinkedIn (reply to DM, comment on post)",
          "Books a meeting via calendar link",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "90+ days with no progression",
        action:
          "Try different channel (email to LinkedIn/postcard), change content angle",
      },
      {
        threshold: "180+ days with no progression",
        action:
          "Reduce cadence to quarterly (effectively back to Unaware treatment)",
      },
    ],
    kpis: [
      {
        metric: "Aware to Interested conversion rate",
        target: "5-10% per quarter",
        measurement: "Count that show first intent signal",
      },
      {
        metric: "Email response rate",
        target: "2-5%",
        measurement: "Replies / emails sent",
      },
      {
        metric: "LinkedIn acceptance rate",
        target: "20-30%",
        measurement: "Connections accepted / requests sent",
      },
      {
        metric: "Content engagement rate",
        target: "10-20%",
        measurement: "Clicks / emails opened",
      },
      {
        metric: "Stall rate",
        target: "< 50% at 90 days",
        measurement: "% of Aware contacts with no activity in 90 days",
      },
    ],
    nonBehaviors: [
      "Must not book discovery calls — they haven't shown intent yet",
      "Must not send more than 1 email per month — nurture is about staying top-of-mind",
      "Must not send identical content twice — repetition signals carelessness",
      "Must not use aggressive sales language — education, not pressure",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Aware",
        funnelPosition: "Early funnel",
        requiredActivity: "Monthly nurture content, LinkedIn, retargeting",
      },
      {
        field: "hc_work_priority",
        values: "P4-Monthly or P5-Quarterly",
        funnelPosition: "Low-medium priority",
        requiredActivity: "Monthly or quarterly cadence",
      },
      {
        field: "hc_engagement_temp",
        values: "Cool or Cold",
        funnelPosition: "Low engagement",
        requiredActivity: "Value content, not sales",
      },
      {
        field: "hc_llm_intent",
        values: "No Signal or Passive",
        funnelPosition: "No buying signal",
        requiredActivity: "Nurture with case studies, podcasts",
      },
    ],
  },
  {
    id: 3,
    slug: "interested",
    name: "Interested",
    color: "#10B981",
    colorRgb: "16, 185, 129",
    tagline: "They raised their hand. First real buying signal.",
    contactCount: "~261",
    description:
      "Replied to outreach, submitted a form, visited pricing page, engaged on LinkedIn with questions, phone complaint leads with verified issues. This is the #1 revenue lever.",
    owner: "SDR",
    primaryActivity: "Book discovery call",
    cadence: "Respond same day, follow up every 2-3 days",
    successMetric: "Discovery calls booked",
    minTouches: "Respond + 5 follow-ups = 6 touches per cycle",
    entryConditions: [
      "hc_funnel_stage = Interested",
      'hc_llm_target_market = "yes" or "uncertain"',
      "hc_record_type = Prospect",
    ],
    activities: [
      {
        step: "Touch 1 — Day 0 (within 2 hours)",
        description:
          "Respond to their specific action: reply to email, call after form submission, or reference pricing page visit",
        channel: "Email/Phone",
      },
      {
        step: "Touch 2 — Day 2",
        description:
          "Call with voicemail referencing original action; if no phone, LinkedIn or second email with case study",
        channel: "Phone/LinkedIn",
      },
      {
        step: "Touch 3 — Day 5",
        description:
          "Email with persona-matched case study via different channel than previous",
        channel: "Email",
      },
      {
        step: "Touch 4 — Day 8",
        description:
          'Final direct outreach: "I don\'t want to be a bother" + 1-click booking link',
        channel: "Email",
      },
      {
        step: "Touch 5 — Day 14",
        description:
          "Soft nurture with useful content link, move cadence to monthly",
        channel: "Email",
      },
    ],
    exitCriteria: [
      {
        target: "Evaluating",
        conditions: [
          "Discovery call completed",
          "Deal created in HubSpot pipeline",
          "Contact requests proposal or pricing",
          "Contact agrees to call analysis",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "30+ days without discovery call",
        action:
          "Try completely different channel; if Decision Maker try phone; if Champion ask if owner interested",
        priority: "P2-Today",
      },
      {
        threshold: "60+ days without progression",
        action: "Reduce to monthly nurture (effectively Aware treatment)",
      },
      {
        threshold: "hc_dropped_lead_flag = true",
        action:
          'Escalate to P2-Today immediately — "I apologize for the delay"',
        priority: "P2-Today",
      },
    ],
    kpis: [
      {
        metric: "Discovery calls booked per week",
        target: "10+",
        measurement:
          "PRIMARY KPI — #1 leading indicator of revenue",
      },
      {
        metric: "Response time (first touch)",
        target: "< 2 hours for Hot",
        measurement: "Time from engagement signal to first outreach",
      },
      {
        metric: "Interested to Evaluating conversion",
        target: "15-25%",
        measurement: "Count that book discovery calls / total Interested",
      },
      {
        metric: "Touch-to-call ratio",
        target: "3:1",
        measurement: "Average touches before call is booked",
      },
      {
        metric: "Days in Interested",
        target: "< 14 average",
        measurement: "Time from entry to discovery call",
      },
      {
        metric: "Stall rate at 30 days",
        target: "< 30%",
        measurement: "% that haven't progressed in 30 days",
      },
    ],
    nonBehaviors: [
      "Must not send more than 5 direct outreach touches in 14 days",
      "Must not book discovery calls with Gatekeepers — wrong person wastes time",
      "Must not skip the persona angle — generic outreach converts 10x less",
      "Must not delay response to Hot contacts — 5 min response is 21x more effective than 30 min",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Interested",
        funnelPosition: "Mid funnel",
        requiredActivity: "Book discovery call within 48 hours",
      },
      {
        field: "hc_work_priority",
        values: "P1-Immediate (Hot) or P2-Today (Warm)",
        funnelPosition: "High priority",
        requiredActivity: "Respond same day",
      },
      {
        field: "hc_engagement_temp",
        values: "Hot or Warm",
        funnelPosition: "Active engagement",
        requiredActivity: "Fast response, persona-matched outreach",
      },
      {
        field: "hc_llm_intent",
        values: "Exploring or Active Buyer",
        funnelPosition: "Buying signal detected",
        requiredActivity: "Discovery call focus",
      },
    ],
  },
  {
    id: 4,
    slug: "evaluating",
    name: "Evaluating",
    color: "#F59E0B",
    colorRgb: "245, 158, 11",
    tagline: "Active sales conversation. Deal in pipeline.",
    contactCount: "~498",
    description:
      "Completed discovery call, has active deal, reviewing proposal/pricing, comparing MyBCAT vs alternatives.",
    owner: "AE (Account Exec)",
    primaryActivity: "Present proposal, handle objections",
    cadence: "Follow up every 2-3 days",
    successMetric: "Proposals sent",
    minTouches: "Follow up every 2-3 days = 7-10 touches per cycle",
    entryConditions: [
      "hc_funnel_stage = Evaluating",
      "Active deal in HubSpot pipeline (not Closed Won/Lost)",
      "Discovery call completed",
    ],
    activities: [
      {
        step: "Post-Discovery (Day 0-2)",
        description:
          "Thank-you email summarizing discussion, include practice data, attach persona-matched case study",
        channel: "Email",
      },
      {
        step: "Proposal Phase (Day 3-7)",
        description:
          "Custom proposal with pricing based on practice size, ROI projection, persona-specific value framing",
        channel: "Email",
      },
      {
        step: "Objection Handling (Day 7-14)",
        description:
          "Address cost, switching, quality, timing concerns. Offer pilot for hesitant prospects.",
        channel: "Phone/Email",
      },
      {
        step: "Reference Close (Day 14+)",
        description:
          "Connect with existing client matched by persona and geography. Provide internal sell kit for Champions.",
        channel: "Phone",
      },
    ],
    exitCriteria: [
      {
        target: "Ready to Buy",
        conditions: [
          'Says "yes" or "let\'s do it"',
          "Requests contract/agreement",
          "Asks about onboarding timeline",
          "Deal moves to Contract Sent stage",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "14+ days in Evaluating",
        action:
          'Call and ask "What\'s holding you back?". Offer 30-day pilot.',
        priority: "P2-Today",
      },
      {
        threshold: "30+ days in Evaluating",
        action:
          "Escalate to sales manager. Consider founder outreach. Last resort: defer to future.",
      },
    ],
    kpis: [
      {
        metric: "Evaluating to Ready to Buy conversion",
        target: "30%",
        measurement: "Deals that reach contract stage / deals in Evaluating",
      },
      {
        metric: "Average days in Evaluating",
        target: "< 21 days",
        measurement: "Time from discovery call to verbal yes",
      },
      {
        metric: "Proposals sent per week",
        target: "5+",
        measurement: "Custom proposals generated",
      },
      {
        metric: "Stall resolution rate",
        target: "50%+",
        measurement: "Stalled deals that re-engage / total stalled",
      },
      {
        metric: "Objection-to-close rate",
        target: "40%+",
        measurement:
          "Contacts who raise objections and still close",
      },
    ],
    nonBehaviors: [
      "Must not modify deal stages or pipeline assignments — actively managed by sales",
      "Must not send proposals without a completed discovery call — signals desperation",
      "Must not discount without sales manager approval — erodes margins",
      "Must not follow up more than every 2-3 days — feels pushy during evaluation",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Evaluating",
        funnelPosition: "Active pipeline",
        requiredActivity:
          "Present proposal, handle objections, follow up 2-3 days",
      },
      {
        field: "hc_work_priority",
        values: "P1-Immediate or P2-Today",
        funnelPosition: "High priority",
        requiredActivity: "Active deal management",
      },
      {
        field: "hc_engagement_temp",
        values: "Hot or Warm",
        funnelPosition: "Active engagement",
        requiredActivity: "Proposal + objection handling",
      },
      {
        field: "hc_llm_intent",
        values: "Active Buyer or Exploring",
        funnelPosition: "Buying signal confirmed",
        requiredActivity: "Close-focused activities",
      },
    ],
  },
  {
    id: 5,
    slug: "ready-to-buy",
    name: "Ready to Buy",
    color: "#F97316",
    colorRgb: "249, 115, 22",
    tagline: "They said yes. Close the deal.",
    contactCount: "~7",
    description:
      "Verbal yes, contract/agreement sent, deposit discussion, onboarding scheduling. Every hour matters.",
    owner: "AE",
    primaryActivity: "Send contract, remove friction, close",
    cadence: "Same day response, daily follow-up",
    successMetric: "Contracts signed",
    minTouches: "Daily until signed = 3-7 touches",
    entryConditions: [
      "hc_funnel_stage = Ready to Buy",
      "Verbal agreement or deal at Contract Sent / Onboarding stage",
      "hc_work_priority = P1-Immediate (always)",
    ],
    activities: [
      {
        step: "Day 0 — Same Day",
        description:
          "Send contract within 2 hours. Pre-fill everything. Clear next steps. Confirm onboarding date.",
        channel: "Email",
      },
      {
        step: "Day 1 — If Unsigned",
        description:
          "Call: confirm receipt, answer questions. Email if voicemail.",
        channel: "Phone/Email",
      },
      {
        step: "Day 2 — Still Unsigned",
        description:
          "Call + email: hold onboarding slot, introduce onboarding team member by name.",
        channel: "Phone/Email",
      },
      {
        step: "Day 3-5 — Daily Touchpoint",
        description:
          'Alternate call and email. Directly ask: "What\'s holding you back?" Offer flexibility.',
        channel: "Phone/Email",
      },
      {
        step: "Day 7+ — STALL EMERGENCY",
        description:
          "Escalate to founder/CEO for personal call. Ask about agreement changes.",
        channel: "Phone (CEO)",
      },
    ],
    exitCriteria: [
      {
        target: "Customer",
        conditions: [
          "Contract signed",
          "First payment received",
          "Onboarding date confirmed",
          "Deal = Closed Won",
        ],
      },
      {
        target: "Churned",
        conditions: [
          "Explicitly withdraws",
          "Goes with competitor",
          "Changes mind",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "7+ days unsigned",
        action:
          "P1-EMERGENCY. Founder/CEO personal call. Remove all friction.",
        priority: "P1-EMERGENCY",
      },
    ],
    kpis: [
      {
        metric: "Close rate",
        target: "60%+",
        measurement: "Signed / entered Ready to Buy",
      },
      {
        metric: "Days to close",
        target: "< 7",
        measurement: "Time from verbal yes to signed contract",
      },
      {
        metric: "Contract same-day send rate",
        target: "95%+",
        measurement: "Contracts sent within 24 hours of verbal yes",
      },
      {
        metric: "Stall rate at 7 days",
        target: "< 20%",
        measurement: "Unsigned contracts after 7 days",
      },
    ],
    nonBehaviors: [
      "Must not delay contract sending — every hour of delay increases buyer's remorse risk",
      "Must not send complex legal documents — complexity creates deal-killing friction",
      "Must not stop following up before day 14 — some contacts need time",
      "Must not discount without approval even under pressure to close",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Ready to Buy",
        funnelPosition: "Bottom of funnel",
        requiredActivity:
          "Send contract, remove friction, close within 7 days",
      },
      {
        field: "hc_work_priority",
        values: "P1-Immediate (ALWAYS)",
        funnelPosition: "Highest priority",
        requiredActivity: "1-hour SLA",
      },
      {
        field: "hc_engagement_temp",
        values: "Hot",
        funnelPosition: "Active",
        requiredActivity: "Daily follow-up until signed",
      },
      {
        field: "hc_llm_intent",
        values: "Active Buyer",
        funnelPosition: "Confirmed buyer",
        requiredActivity: "Close immediately",
      },
    ],
  },
  {
    id: 6,
    slug: "customer",
    name: "Customer",
    color: "#059669",
    colorRgb: "5, 150, 105",
    tagline: "Active paying client.",
    contactCount: "~115",
    description:
      "Active paying clients. Goal: maximize lifetime value, prevent churn, and turn every customer into an advocate who generates referrals.",
    owner: "CSM (Customer Success)",
    primaryActivity: "Onboard, QBR, upsell",
    cadence: "Weekly (onboarding) then Monthly (ongoing)",
    successMetric: "NRR, referrals",
    minTouches: "Monthly check-in + quarterly QBR = 16 touches/year",
    entryConditions: [
      "hc_funnel_stage = Customer",
      "hc_record_type = Customer",
      "Deal status = Closed Won",
    ],
    activities: [
      {
        step: "Week 1 — Onboarding Kickoff",
        description:
          "Welcome email, kickoff call, technical setup (call routing, EHR integration), test calls",
        channel: "Phone/Email",
      },
      {
        step: "Week 2 — Go-Live",
        description:
          "Start handling calls, daily check-ins, fix issues within 24 hours",
        channel: "Phone",
      },
      {
        step: "Week 3-4 — Stabilize",
        description:
          "Every-other-day check-in, first performance report, address concerns before they become complaints",
        channel: "Phone/Email",
      },
      {
        step: "Monthly — Ongoing Management",
        description:
          "Monthly check-in call (not email), monthly performance report, review calls handled and satisfaction",
        channel: "Phone",
      },
      {
        step: "Quarterly — QBR",
        description:
          "Quarterly Business Review with data: calls handled, satisfaction, time saved, cost comparison. Ask for referrals.",
        channel: "Video Call",
      },
    ],
    exitCriteria: [
      {
        target: "Advocate",
        conditions: [
          "Provides a referral",
          "Agrees to testimonial or case study",
          "Renews or expands contract",
          "Publicly recommends MyBCAT",
        ],
      },
      {
        target: "Churned",
        conditions: [
          "Cancels contract",
          "Stops paying",
          "Practice closes, sells, or retires",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "60+ days no response to check-in",
        action: 'Call: "We haven\'t connected in a while — is everything going well?"',
        priority: "P3-ThisWeek",
      },
      {
        threshold: "Complaint logged",
        action: "Call within 24 hours, fix issue, follow up in 48 hours",
        priority: "P2-Today",
      },
      {
        threshold: "Call volume drops 30%+",
        action:
          'Proactive call: "We noticed your call volume is down — is everything okay?"',
        priority: "P3-ThisWeek",
      },
    ],
    kpis: [
      {
        metric: "Net Revenue Retention",
        target: "> 100%",
        measurement:
          "Revenue including upsells / Revenue at start of period",
      },
      {
        metric: "Quarterly churn rate",
        target: "< 5%",
        measurement: "Customers lost / total customers per quarter",
      },
      {
        metric: "Monthly check-in completion rate",
        target: "95%+",
        measurement: "Check-ins completed / check-ins due",
      },
      {
        metric: "Referrals per customer per year",
        target: "1+",
        measurement: "Referral count / customer count",
      },
      {
        metric: "Upsell rate",
        target: "20% per year",
        measurement: "Customers who add services / total customers",
      },
      {
        metric: "Time to first value",
        target: "< 14 days",
        measurement: "Contract signed to first calls handled",
      },
    ],
    nonBehaviors: [
      "Must not treat customers like prospects — the relationship is different",
      "Must not skip monthly check-ins — silence breeds churn",
      "Must not ignore complaints — unresolved complaints are the #1 churn predictor",
      "Must not push upsell before 90 days — customer needs to trust the service first",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Customer",
        funnelPosition: "Post-sale",
        requiredActivity: "Onboard, QBR monthly, upsell, ask for referrals",
      },
      {
        field: "hc_work_priority",
        values: "P3-ThisWeek (onboarding) or P4-Monthly",
        funnelPosition: "Medium priority",
        requiredActivity: "Retention-focused cadence",
      },
      {
        field: "hc_record_type",
        values: "Customer",
        funnelPosition: "Active client",
        requiredActivity: "Account management",
      },
      {
        field: "hc_llm_intent",
        values: "Active Buyer (upsell) or Passive (stable)",
        funnelPosition: "Post-sale signal",
        requiredActivity: "Upsell if active, retain if passive",
      },
    ],
  },
  {
    id: 7,
    slug: "advocate",
    name: "Advocate",
    color: "#8B5CF6",
    colorRgb: "139, 92, 246",
    tagline: "They actively promote us.",
    contactCount: "~34",
    description:
      "Highest-value relationships. Each Advocate generates new revenue through their network at zero acquisition cost. VIP treatment sustains advocacy.",
    owner: "CSM + Marketing",
    primaryActivity: "Co-market, referral program",
    cadence: "Quarterly",
    successMetric: "Referrals generated",
    minTouches: "Quarterly touch + VIP access",
    entryConditions: [
      "hc_funnel_stage = Advocate",
      "Customer who has provided at least one referral",
      "Customer who has agreed to a testimonial or case study",
      "Customer who has publicly recommended MyBCAT",
    ],
    activities: [
      {
        step: "VIP Treatment",
        description:
          "P1-Immediate resolution for any issue. First to know about new features. Priority support.",
        channel: "All",
      },
      {
        step: "Referral Program",
        description:
          "Track referrals, thank within 24 hours, provide status updates, deliver referral rewards",
        channel: "Email/Phone",
      },
      {
        step: "Co-Marketing",
        description:
          "Case study interviews, podcast guest spots, joint marketing materials",
        channel: "Video/Content",
      },
      {
        step: "Advisory Board",
        description:
          "Quarterly virtual meeting with founder, input on features, early access, recognition",
        channel: "Video Call",
      },
    ],
    exitCriteria: [
      {
        target: "Customer (revert)",
        conditions: [
          "No referral, co-marketing, or promotion in 12+ months",
        ],
      },
      {
        target: "Churned",
        conditions: [
          "Cancels service (critical loss — high priority win-back)",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "90+ days since last referral",
        action:
          '"We loved the introduction to [last referral]. Do you know anyone else who could benefit?"',
      },
      {
        threshold: "12+ months no advocacy activity",
        action: "Revert to Customer stage with standard management cadence",
      },
    ],
    kpis: [
      {
        metric: "Referrals per Advocate per year",
        target: "2+",
        measurement: "Referrals generated / Advocate count",
      },
      {
        metric: "Revenue from referral network",
        target: "15%+ of new revenue",
        measurement: "Referral-sourced deals / total new deals",
      },
      {
        metric: "Case studies published per quarter",
        target: "1+",
        measurement: "Published case studies",
      },
      {
        metric: "Advocate retention",
        target: "95%+",
        measurement: "Advocates who remain customers",
      },
    ],
    nonBehaviors: [
      "Must not overuse Advocates for references — max 2 reference calls per quarter per Advocate",
      "Must not publish case studies without approval — unauthorized use damages trust",
      "Must not treat Advocates as a sales channel — the relationship is reciprocal, not extractive",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Advocate",
        funnelPosition: "Expansion",
        requiredActivity: "VIP treatment, co-marketing, referral rewards",
      },
      {
        field: "hc_record_type",
        values: "Customer",
        funnelPosition: "Active VIP client",
        requiredActivity: "Priority everything",
      },
    ],
  },
  {
    id: 8,
    slug: "churned",
    name: "Churned",
    color: "#EF4444",
    colorRgb: "239, 68, 68",
    tagline: "Lost them. But not necessarily forever.",
    contactCount: "~415",
    description:
      "Three sub-populations: former customers (win-back), lost potentials (re-engagement), and explicitly declined (do-not-contact). Former customers are the fastest path to new revenue.",
    owner: "SDR + AE",
    primaryActivity: "Win-back if engaged",
    cadence: "Quarterly (cold) or weekly (re-engaged)",
    successMetric: "Reactivation rate",
    minTouches: "Quarterly if cold, weekly if warm = 4-12 touches/year",
    entryConditions: [
      "hc_funnel_stage = Churned",
      "Former Customer: hc_record_type = Customer + churned",
      "Lost Potential: hc_record_type = Prospect + closed-lost deal",
      "Explicitly Declined: hc_llm_engagement_intent = Negative",
      "Terminal: hc_llm_reasoning contains retired/sold/closed",
    ],
    activities: [
      {
        step: "Former Customer — Hot/Warm",
        description:
          'Call within 24 hours. "We\'ve improved since you left. I\'d love to share what\'s changed."',
        channel: "Phone",
      },
      {
        step: "Former Customer — Cool",
        description:
          "Monthly email with improvements made since they left and new client success story",
        channel: "Email",
      },
      {
        step: "Former Customer — Cold",
        description:
          'Quarterly "we miss you" email with biggest improvement and low-commitment CTA',
        channel: "Email",
      },
      {
        step: "Lost Potential — Hot/Warm",
        description:
          '"I know the timing wasn\'t right before. Has anything changed?"',
        channel: "Phone/Email",
      },
      {
        step: "Lost Potential — Cool/Cold",
        description:
          "Monthly/quarterly nurture with different angle than original outreach",
        channel: "Email",
      },
      {
        step: "Explicitly Declined",
        description:
          "DO NOT CONTACT. P6-Archive. Remove from all sequences. Only exception: they re-initiate.",
        channel: "None",
      },
      {
        step: "Terminal",
        description: "P6-Archive permanently. No outreach ever. If sold, create new contact for new owner.",
        channel: "None",
      },
    ],
    exitCriteria: [
      {
        target: "Interested (re-entry)",
        conditions: [
          "Former Customer shows new engagement signal",
          "Lost Potential re-engages (email reply, form fill, website visit)",
          "Explicitly Declined re-initiates contact",
        ],
      },
    ],
    stallHandling: [
      {
        threshold: "Former Customer engaged but no win-back in 30 days",
        action: "Escalate to AE for personal call",
        priority: "P2-Today",
      },
      {
        threshold: "Lost Potential no response after 3 quarterly touches",
        action: "Reduce to annual check-in",
      },
    ],
    kpis: [
      {
        metric: "Win-back rate (Former Customers)",
        target: "10% of engaged",
        measurement: "Reactivated / engaged Former Customers",
      },
      {
        metric: "Re-engagement rate (Lost Potentials)",
        target: "5% per quarter",
        measurement: "New conversations / engaged Lost Potentials",
      },
      {
        metric: "Win-back revenue",
        target: "10% of new revenue",
        measurement: "Revenue from reactivated customers",
      },
      {
        metric: "Time to win-back",
        target: "< 30 days",
        measurement: "Re-engagement signal to signed contract",
      },
      {
        metric: "Do-not-contact compliance",
        target: "100%",
        measurement: "Zero outreach to Negative intent contacts",
      },
    ],
    nonBehaviors: [
      "Must not contact Explicitly Declined contacts — they asked to be left alone",
      'Must not reference previous failure negatively — "I know you left us" doesn\'t win people back',
      "Must not treat all Churned contacts identically — each sub-category requires different handling",
      "Must not remove Churned contacts from the system — circumstances change and win-back is cheapest revenue",
    ],
    hcFields: [
      {
        field: "hc_funnel_stage",
        values: "Churned",
        funnelPosition: "Win-back pool / Lost deal pool / Dead zone",
        requiredActivity:
          "If engaged call this week. If cold quarterly. If negative DO NOT CONTACT.",
      },
      {
        field: "hc_record_type",
        values: "Customer (former) or Prospect (lost deal)",
        funnelPosition: "Context for approach",
        requiredActivity: "Tailor based on history",
      },
      {
        field: "hc_work_priority",
        values: "P2-Today (if engaged) or P5-Quarterly",
        funnelPosition: "Variable priority",
        requiredActivity: "Match urgency to engagement level",
      },
    ],
  },
];

// ============================================================================
// PERSONAS
// ============================================================================

export const personas: Persona[] = [
  {
    id: "cold-start-dreamer",
    name: "Cold-Start Dreamer",
    icon: "rocket",
    who: "New practice, 1 location, < 3 years old",
    careAbout: "Survival, growth, getting patients",
    leadWith:
      "We help new practices handle calls professionally from day one without hiring staff",
    revenuePotential: "$800-1,200/month (single location)",
    decisionSpeed: "Fast (sole decision maker, desperate for help)",
    openingHook:
      "Starting a practice is hard enough without worrying about phones",
    cta: "15 min to show how new practices launch with us",
    objectionHandler: "No upfront cost, pay as you grow",
    sequence: [
      {
        day: "Day 1",
        action:
          "Email: How [client] handled calls from day one without hiring",
      },
      { day: "Day 3", action: "LinkedIn connect + message" },
      {
        day: "Day 7",
        action:
          "Call: reference practice opening, offer free call analysis",
      },
      {
        day: "Day 14",
        action: "Email: case study of similar new practice",
      },
      {
        day: "Day 21",
        action: 'Final touch: "When you\'re ready, we\'re here"',
      },
    ],
  },
  {
    id: "growth-builder",
    name: "Growth Builder",
    icon: "chart",
    who: "Multi-location or scaling up",
    careAbout: "Efficiency, consistency across locations, scaling ops",
    leadWith:
      "Our clients with 2+ locations save X hours/week on back-office coordination",
    revenuePotential: "$2,000-5,000/month (multiple locations)",
    decisionSpeed: "Medium (may need to consult partners)",
    openingHook: "Managing calls across multiple locations?",
    cta: "Quick look at how we standardize across locations",
    objectionHandler: "ROI across all locations",
    sequence: [
      {
        day: "Day 1",
        action:
          "Email: Managing calls across [N] locations? Here's how [client] standardized",
      },
      {
        day: "Day 3",
        action: "Send ROI calculator with multi-location savings",
      },
      {
        day: "Day 7",
        action: "Call: ask about biggest operational challenge",
      },
      {
        day: "Day 10",
        action:
          "Email: multi-location case study with specific numbers",
      },
      {
        day: "Day 14",
        action: "Follow-up call: offer pilot at one location",
      },
      {
        day: "Day 21",
        action: 'Email: "Ready to scale? Let\'s do a 30-day pilot"',
      },
    ],
  },
  {
    id: "overwhelmed-clinician",
    name: "Overwhelmed Clinician",
    icon: "heart",
    who: "Solo OD drowning in admin",
    careAbout: "Time relief, reducing admin burden",
    leadWith:
      "You became a doctor to see patients, not answer phones. We handle the rest.",
    revenuePotential: "$800-1,500/month",
    decisionSpeed: "Fast once they see relief (emotional buyer)",
    openingHook:
      "You went to optometry school to see patients, not answer phones",
    cta: "15 min to show you what 10 extra hours/week looks like",
    objectionHandler: "You'll get 10 hours/week back",
    sequence: [
      {
        day: "Day 1",
        action:
          'Email: "You didn\'t go to optometry school to answer phones"',
      },
      {
        day: "Day 3",
        action: "Send blog post about reducing admin time",
      },
      {
        day: "Day 7",
        action: "Call: empathize with workload, offer free call audit",
      },
      {
        day: "Day 10",
        action:
          "Email: testimonial from solo OD who got 10 hours/week back",
      },
      {
        day: "Day 14",
        action:
          'Call: "What if you never answered another scheduling call?"',
      },
    ],
  },
  {
    id: "community-caregiver",
    name: "Community Caregiver",
    icon: "users",
    who: "Small town, long tenure, loyal patients",
    careAbout: "Personal touch, patient relationships, trust",
    leadWith:
      "We treat your patients like family — same way you do.",
    revenuePotential: "$600-1,000/month",
    decisionSpeed: "Slow (values relationships, needs trust)",
    openingHook: "Your patients deserve someone who picks up every time",
    cta: "Quick call to show how [similar practice] handles it",
    objectionHandler: "Your patients will feel taken care of",
    sequence: [
      {
        day: "Day 1",
        action: "Email: personalize to their town/community",
      },
      {
        day: "Day 7",
        action:
          "Podcast episode featuring similar small-town practice",
      },
      {
        day: "Day 14",
        action:
          'Call: lead with "your patients deserve the best experience"',
      },
      {
        day: "Day 21",
        action: 'Email: "Our agents learn your patients\' names"',
      },
      { day: "Day 30", action: "Handwritten postcard (physical mail)" },
      {
        day: "Day 45",
        action: "Follow-up call: offer to visit their practice",
      },
    ],
  },
  {
    id: "tech-differentiator",
    name: "Tech Differentiator",
    icon: "cpu",
    who: "Invests in advanced technology",
    careAbout: "Innovation, efficiency, modern solutions",
    leadWith:
      "Our AI-powered call routing and EHR integration fits your tech-forward practice",
    revenuePotential: "$1,500-3,000/month",
    decisionSpeed: "Medium (evaluates carefully, wants data)",
    openingHook: "Full EHR integration with AI-powered routing",
    cta: "Demo of our tech stack -- 15 min",
    objectionHandler: "Full EHR integration, real-time analytics",
    sequence: [
      {
        day: "Day 1",
        action:
          "Email: lead with technology integration (EHR, AI routing)",
      },
      {
        day: "Day 3",
        action: "Send technical spec sheet / integration docs",
      },
      {
        day: "Day 7",
        action: "Call: talk about API, reporting, analytics",
      },
      { day: "Day 10", action: "Email: demo video of the platform" },
      { day: "Day 14", action: "Live demo call (screenshare)" },
      {
        day: "Day 21",
        action: "Trial / pilot with their EHR system",
      },
    ],
  },
  {
    id: "exit-strategist",
    name: "Exit Strategist",
    icon: "door",
    who: "Thinking about retirement or selling",
    careAbout: "Practice value, succession, reducing headaches",
    leadWith:
      "A streamlined back-office increases your practice valuation. Let us show you how.",
    revenuePotential: "$800-1,500/month (+ practice valuation increase)",
    decisionSpeed: "Slow (big life decision, emotional)",
    openingHook:
      "A streamlined back-office increases your practice value",
    cta: "Quick chat about how this impacts practice valuation",
    objectionHandler: "Increases practice valuation",
    sequence: [
      {
        day: "Day 1",
        action:
          'Email: "A streamlined back-office increases your practice value"',
      },
      {
        day: "Day 7",
        action: 'Send guide: "Preparing Your Practice for Sale"',
      },
      {
        day: "Day 14",
        action:
          'Call: "Have you thought about what happens to your patients\' experience during transition?"',
      },
      {
        day: "Day 21",
        action:
          "Email: case study of practice that sold for more after outsourcing",
      },
      {
        day: "Day 30",
        action:
          "Offer to speak with their succession advisor/broker",
      },
    ],
  },
];

// ============================================================================
// PRIORITY LEVELS
// ============================================================================

export const priorityLevels: PriorityLevel[] = [
  {
    id: "P1",
    label: "P1-Immediate",
    color: "#EF4444",
    action: "Drop everything. Call now.",
    sla: "Within the hour",
    description:
      "Hot contacts, Ready to Buy, stall emergencies. These are the contacts closest to revenue.",
    temperatures: ["Hot"],
  },
  {
    id: "P2",
    label: "P2-Today",
    color: "#F97316",
    action: "Work today. Don't let it roll to tomorrow.",
    sla: "Same day",
    description:
      "Warm contacts, dropped leads, re-engaged churned contacts. Revenue opportunity that decays with delay.",
    temperatures: ["Hot", "Warm"],
  },
  {
    id: "P3",
    label: "P3-ThisWeek",
    color: "#F59E0B",
    action: "Get to them this week.",
    sla: "Within 3 business days",
    description:
      "Active pipeline contacts, onboarding customers, interested prospects with cool temperature.",
    temperatures: ["Warm", "Cool"],
  },
  {
    id: "P4",
    label: "P4-Monthly",
    color: "#3B82F6",
    action: "Touch base this month.",
    sla: "Within 30 days",
    description:
      "Aware contacts getting nurtured, stable customers for monthly check-in, cool churned for periodic outreach.",
    temperatures: ["Cool", "Cold"],
  },
  {
    id: "P5",
    label: "P5-Quarterly",
    color: "#6B7280",
    action: "Check in quarterly. Cold nurture.",
    sla: "Within 90 days",
    description:
      "Unaware contacts for quarterly content, cold churned contacts, low-engagement prospects.",
    temperatures: ["Cold"],
  },
  {
    id: "P6",
    label: "P6-Archive",
    color: "#374151",
    action: "Do not contact.",
    sla: "None",
    description:
      "Vendors, employees, dead contacts, explicitly declined, not in target market. No outreach.",
    temperatures: ["Dead"],
  },
];

// ============================================================================
// HC FIELD MAPPINGS (complete)
// ============================================================================

export interface HcField {
  field: string;
  values: string;
  funnelPosition: string;
  requiredActivity: string;
  color: string;
}

export const hcFieldMappings: HcField[] = [
  {
    field: "hc_funnel_stage = Unaware",
    values: "+ Cold/Dead temp",
    funnelPosition: "Top of funnel",
    requiredActivity:
      "Add to nurture list, quarterly email, LinkedIn ads",
    color: "#6B7280",
  },
  {
    field: "hc_funnel_stage = Aware",
    values: "+ Cool/Cold temp",
    funnelPosition: "Early funnel",
    requiredActivity:
      "Monthly nurture content, LinkedIn, retargeting",
    color: "#3B82F6",
  },
  {
    field: "hc_funnel_stage = Interested",
    values: "+ Hot/Warm temp",
    funnelPosition: "Mid funnel",
    requiredActivity: "Book discovery call within 48 hours",
    color: "#10B981",
  },
  {
    field: "hc_funnel_stage = Evaluating",
    values: "+ Active deal",
    funnelPosition: "Active pipeline",
    requiredActivity:
      "Present proposal, handle objections, follow up 2-3 days",
    color: "#F59E0B",
  },
  {
    field: "hc_funnel_stage = Ready to Buy",
    values: "+ Hot temp",
    funnelPosition: "Bottom of funnel",
    requiredActivity:
      "Send contract, remove friction, close within 7 days",
    color: "#F97316",
  },
  {
    field: "hc_funnel_stage = Customer",
    values: "Active deal closed-won",
    funnelPosition: "Post-sale",
    requiredActivity:
      "Onboard, QBR monthly, upsell, ask for referrals",
    color: "#059669",
  },
  {
    field: "hc_funnel_stage = Advocate",
    values: "Gives referrals",
    funnelPosition: "Expansion",
    requiredActivity: "VIP treatment, co-marketing, referral rewards",
    color: "#8B5CF6",
  },
  {
    field: "hc_funnel_stage = Churned",
    values: "+ Customer type",
    funnelPosition: "Win-back pool",
    requiredActivity:
      "If engaged call this week. If cold quarterly touch.",
    color: "#EF4444",
  },
  {
    field: "hc_funnel_stage = Churned",
    values: "+ Prospect type",
    funnelPosition: "Lost deal pool",
    requiredActivity:
      "If re-engaged new approach. If cold quarterly.",
    color: "#EF4444",
  },
  {
    field: "hc_funnel_stage = Churned",
    values: "+ Negative intent",
    funnelPosition: "Dead zone",
    requiredActivity: "DO NOT CONTACT",
    color: "#EF4444",
  },
  {
    field: "hc_record_type = Vendor",
    values: "Any stage",
    funnelPosition: "Not in funnel",
    requiredActivity: "Do not sell to. They sell to us.",
    color: "#374151",
  },
  {
    field: "hc_record_type = Employee",
    values: "Any stage",
    funnelPosition: "Not in funnel",
    requiredActivity: "MyBCAT staff. Not a prospect.",
    color: "#374151",
  },
  {
    field: "hc_record_type = Internal",
    values: "Any stage",
    funnelPosition: "Not in funnel",
    requiredActivity: "@mybcat.com / @classicvisioncare.com. Not a prospect.",
    color: "#374151",
  },
  {
    field: "hc_record_type = Partner",
    values: "Any stage",
    funnelPosition: "Parallel track",
    requiredActivity: "Monthly check-in. Cross-referrals. Don't pitch.",
    color: "#6366F1",
  },
  {
    field: "hc_record_type = Unknown",
    values: "Any stage",
    funnelPosition: "Needs research",
    requiredActivity:
      "Check hc_llm_reasoning. May be personal contact.",
    color: "#9CA3AF",
  },
  {
    field: "hc_stall_flag = true",
    values: "Any stage",
    funnelPosition: "Stuck",
    requiredActivity:
      "Escalate. Change approach. Try different channel.",
    color: "#DC2626",
  },
  {
    field: "hc_dropped_lead_flag = true",
    values: "Was Hot, now Cold",
    funnelPosition: "Fell through crack",
    requiredActivity:
      "P2-Today. Apologize for delay. Re-engage immediately.",
    color: "#DC2626",
  },
  {
    field: "hc_merge_candidate (set)",
    values: "Any stage",
    funnelPosition: "Duplicate",
    requiredActivity: "Merge records before working. Keep all data.",
    color: "#F59E0B",
  },
  {
    field: "hc_llm_target_market = no",
    values: "Any stage",
    funnelPosition: "Remove from funnel",
    requiredActivity: "Archive. Not our market. Don't waste time.",
    color: "#374151",
  },
  {
    field: "hc_llm_target_market = uncertain",
    values: "Any stage",
    funnelPosition: "Needs qualification",
    requiredActivity:
      "Discovery needed. Ask qualifying questions first.",
    color: "#F59E0B",
  },
  {
    field: "hc_llm_real_role = Decision Maker",
    values: "Interested+",
    funnelPosition: "Direct path",
    requiredActivity: "Pitch directly. Talk ROI, pricing, timeline.",
    color: "#10B981",
  },
  {
    field: "hc_llm_real_role = Champion",
    values: "Interested+",
    funnelPosition: "Indirect path",
    requiredActivity:
      "Arm with materials. Help them sell internally.",
    color: "#3B82F6",
  },
  {
    field: "hc_llm_real_role = Gatekeeper",
    values: "Interested+",
    funnelPosition: "Access blocked",
    requiredActivity:
      "Be respectful. Ask to schedule with doctor/owner.",
    color: "#F59E0B",
  },
  {
    field: "hc_llm_real_role = Influencer",
    values: "Interested+",
    funnelPosition: "Relationship build",
    requiredActivity:
      "Build rapport. Ask for intro to decision maker.",
    color: "#8B5CF6",
  },
  {
    field: "hc_llm_real_role = Not Applicable",
    values: "Any stage",
    funnelPosition: "Not a sales contact",
    requiredActivity: "Skip. Vendor, employee, or personal contact.",
    color: "#374151",
  },
  {
    field: "hc_llm_confidence >= 0.8",
    values: "Any field",
    funnelPosition: "High confidence",
    requiredActivity: "Trust the classification. Act on it.",
    color: "#10B981",
  },
  {
    field: "hc_llm_confidence 0.6-0.8",
    values: "Any field",
    funnelPosition: "Moderate confidence",
    requiredActivity:
      "Use as starting point. Verify during conversation.",
    color: "#F59E0B",
  },
  {
    field: "hc_llm_confidence < 0.6",
    values: "Any field",
    funnelPosition: "Low confidence",
    requiredActivity:
      "Don't rely on it. Discover through conversation.",
    color: "#EF4444",
  },
];

// ============================================================================
// TEMPERATURE LEVELS
// ============================================================================

export interface TemperatureLevel {
  name: string;
  range: string;
  color: string;
  approach: string;
}

export const temperatureLevels: TemperatureLevel[] = [
  {
    name: "Hot",
    range: "0-14 days",
    color: "#EF4444",
    approach: 'Move fast. Reference their recent action. "I noticed you..."',
  },
  {
    name: "Warm",
    range: "15-60 days",
    color: "#F97316",
    approach: 'Timely follow-up. "Following up on our conversation..."',
  },
  {
    name: "Cool",
    range: "61-180 days",
    color: "#3B82F6",
    approach:
      "Re-engage with value. Send case study or podcast episode.",
  },
  {
    name: "Cold",
    range: "180+ days",
    color: "#6B7280",
    approach:
      '"It\'s been a while..." or new value proposition.',
  },
  {
    name: "Dead",
    range: "Bounced/opted out",
    color: "#1F2937",
    approach: "DO NOT CONTACT. Check quarterly for resurrection.",
  },
];

// ============================================================================
// QUICK STATS
// ============================================================================

export const quickStats = [
  { label: "Total Contacts", value: "13,000+", color: "#6B7280" },
  { label: "Active Pipeline", value: "766", color: "#F59E0B" },
  { label: "Active Customers", value: "~115", color: "#059669" },
  { label: "Advocates", value: "~34", color: "#8B5CF6" },
  { label: "Revenue Target", value: "$1.3M ARR", color: "#10B981" },
  { label: "HC Fields", value: "15+", color: "#3B82F6" },
];

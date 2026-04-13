import type { PortfolioDbRow } from "./portfolio-public";

/**
 * Same twelve demo builds as `prisma/seed.ts` (three per category).
 * Used when the DB has no portfolio rows yet so the public site still looks complete.
 */
export const DEMO_PORTFOLIO_ROWS: PortfolioDbRow[] = [
  {
    id: "demo-high-ticket-coaching-funnel",
    title: "High-Ticket Coaching Funnel",
    slug: "high-ticket-coaching-funnel",
    category: "FUNNELS",
    shortDescription:
      "Multi-step GHL funnel with calendar booking, VSL, and automated nurture for a coaching brand.",
    description:
      "## Overview\n\nA full **GoHighLevel** acquisition funnel with qualification, payment, and onboarding automations.\n\n### Highlights\n- Application → score → booking\n- Deposit + agreement flow\n- SMS + email nurture with behavioral branches",
    thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Lead Gen", "Sales Funnel", "GHL"]),
    tools: JSON.stringify(["GoHighLevel", "Stripe", "Zapier", "Calendly"]),
    problem:
      "Leads were booking unqualified calls; the team spent hours on manual follow-up and no-shows hurt pipeline.",
    solution:
      "Built a staged funnel with application form scoring, SMS/email sequences, deposit checkout, and reminder workflows inside GHL.",
    results:
      "**42%** more qualified calls booked · **28%** reduction in no-shows in the first 60 days.",
  },
  {
    id: "demo-med-spa-vsl-offer-ladder",
    title: "Med-Spa VSL + Offer Ladder",
    slug: "med-spa-vsl-offer-ladder",
    category: "FUNNELS",
    shortDescription:
      "VSL funnel with treatment quiz, deposit for consult, and post-booking prep sequences for a multi-location med-spa.",
    description:
      "## Funnel\n\n**Trust-first** creative: before/after policy compliant, provider bios, and a quiz that routes to the right treatment track.\n\nCheckout + reminders live in GHL with Stripe for deposits.",
    thumbnailUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Med Spa", "VSL", "Local"]),
    tools: JSON.stringify(["GoHighLevel", "Stripe", "Twilio", "Meta CAPI"]),
    problem:
      "High CPL with weak show rates; staff chased confirmations manually and no-shows ate margin.",
    solution:
      "Quiz → VSL → calendar with prepayment, SMS day-before/day-of flows, and a ‘running late’ branch to protect table time.",
    results: "**+19%** show rate · **−35%** no-shows · consult-to-package attach **up double digits** in 90 days.",
  },
  {
    id: "demo-real-estate-buyer-seller-funnel",
    title: "Real Estate Buyer + Seller Capture",
    slug: "real-estate-buyer-seller-funnel",
    category: "FUNNELS",
    shortDescription:
      "Neighborhood landing pages, listing alerts, and long-term nurture for a top-producing real estate team.",
    description:
      "## System\n\n**Buyer** and **seller** tracks with MLS-adjacent nurture (compliance-aware), open-house RSVP, and speed-to-lead routing to the right agent.",
    thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Real Estate", "Lead Gen", "Nurture"]),
    tools: JSON.stringify(["GoHighLevel", "Zapier", "Follow Up Boss", "Google LSA"]),
    problem:
      "Portals dumped cold leads; agents fought over duplicates and follow-up was inconsistent.",
    solution:
      "Geo pages, listing alerts, round-robin with territory rules, and 52-week nurture with market snapshot emails from GHL.",
    results: "**2.4×** speed-to-first-touch · repeat/referral nurture **re-activated** thousands of cold contacts.",
  },
  {
    id: "demo-saas-marketing-site-demo",
    title: "SaaS Marketing Site + Demo Flow",
    slug: "saas-marketing-site-demo",
    category: "WEBSITES",
    shortDescription:
      "Premium marketing site with integrated demo request and CRM handoff for a B2B SaaS.",
    description:
      "## Build\n\nResponsive marketing experience with **motion-led** sections, crisp pricing, and a demo path that syncs straight into GHL pipelines.",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    galleryUrls: JSON.stringify(["https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80"]),
    tags: JSON.stringify(["SaaS", "Website", "Brand"]),
    tools: JSON.stringify(["Next.js", "GoHighLevel", "Google Tag Manager"]),
    problem:
      "The legacy site looked dated and demo requests leaked into spreadsheets with slow follow-up.",
    solution:
      "Shipped a modern site with clear ICP messaging, embedded GHL forms, instant Slack alerts, and pipeline stages for SDRs.",
    results: "Demo requests **up 3.1×** with same ad spend; median first response under **4 minutes**.",
  },
  {
    id: "demo-fitness-studio-waitlist-site",
    title: "Fitness Studio — Brand Site + Waitlist",
    slug: "fitness-studio-waitlist-site",
    category: "WEBSITES",
    shortDescription:
      "Bold brand site with class timetable, coach roster, and GHL waitlist for a premium HIIT studio opening.",
    description:
      "## Experience\n\n**High-energy** typography, timetable sync, and a waitlist that feeds straight into SMS campaigns for founding members.",
    thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Fitness", "Website", "Launch"]),
    tools: JSON.stringify(["Next.js", "GoHighLevel", "Mindbody API"]),
    problem:
      "Pre-launch buzz lived only on Instagram; no single place to capture intent or segment by goal (fat loss vs strength).",
    solution:
      "Launch site + waitlist tags + automated SMS/email drips segmented by interest and neighborhood.",
    results: "**480+** waitlist signups pre-open · **62%** opened launch week SMS within 10 minutes.",
  },
  {
    id: "demo-dental-group-local-hub",
    title: "Dental Group — Local Trust Hub",
    slug: "dental-group-local-hub",
    category: "WEBSITES",
    shortDescription:
      "Multi-location dental hub with provider trust blocks, insurance FAQs, and one-click booking into GHL calendars.",
    description:
      "## Site\n\n**E-E-A-T** forward: doctor video intros, review syndication, and per-location schema for local SEO.",
    thumbnailUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1606811971618-448792de4d87?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Healthcare", "Local SEO", "Multi-location"]),
    tools: JSON.stringify(["GoHighLevel", "WordPress", "GA4"]),
    problem:
      "Paid search worked but the site didn’t convert; phones rang but tracking was a mess.",
    solution:
      "Unified design system, location pages, GHL calendars per provider, and offline conversion import for ad optimization.",
    results: "**+18%** booking conversion on paid landing pages · call attribution **clean** in reporting.",
  },
  {
    id: "demo-lead-router-slack-ops",
    title: "Lead Router & Slack Ops Automation",
    slug: "lead-router-slack-ops",
    category: "AUTOMATIONS",
    shortDescription:
      "Real-time lead routing, dedupe, and Slack triage between GHL, Sheets, and custom webhooks.",
    description:
      "## Stack\n\nEvent-driven automations with **retry logic**, idempotent webhooks, and observability for a distributed sales pod.",
    thumbnailUrl: "https://images.unsplash.com/photo-1518186288849-fb504403d9d2?w=800&q=80",
    galleryUrls: JSON.stringify(["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"]),
    tags: JSON.stringify(["Automation", "Integrations", "Ops"]),
    tools: JSON.stringify(["GoHighLevel", "Zapier", "Make", "Slack API"]),
    problem:
      "Duplicate leads across ad platforms caused rep collisions and angry prospects.",
    solution:
      "Implemented dedupe keys, round-robin assignment in GHL, Slack action buttons for claim/release, and nightly reconciliation.",
    results: "**Zero** duplicate assignments after rollout; average claim time **−61%**.",
  },
  {
    id: "demo-webinar-replay-expiring-offer",
    title: "Webinar Replay + Expiring Offer",
    slug: "webinar-replay-expiring-offer",
    category: "AUTOMATIONS",
    shortDescription:
      "Evergreen webinar with replay timers, coupon windows, and cart-abandon rescue for a course creator.",
    description:
      "## Automation\n\n**Urgency without sleaze**: true deadline logic from GHL custom values + server-side webhook checks for coupon validity.",
    thumbnailUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Webinar", "Evergreen", "Course"]),
    tools: JSON.stringify(["GoHighLevel", "Zapier", "Stripe", "Vimeo"]),
    problem:
      "Live webinars didn’t scale; fake countdowns hurt trust; abandon carts were never recovered.",
    solution:
      "Replay funnel with honest expiring windows, tag-based access, and 48h rescue sequence tied to checkout events.",
    results: "**+27%** replay-to-purchase vs old VOD page · cart recovery **6-figure** incremental in one quarter.",
  },
  {
    id: "demo-stripe-ghl-subscription-sync",
    title: "Stripe ↔ GHL Subscription Sync",
    slug: "stripe-ghl-subscription-sync",
    category: "AUTOMATIONS",
    shortDescription:
      "Bi-directional membership state: Stripe subscriptions drive GHL tags, communities, and dunning SMS.",
    description:
      "## Integration\n\n**Webhook-first** design with signature verification, retry queues, and audit logs for finance peace of mind.",
    thumbnailUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Stripe", "Membership", "Dunning"]),
    tools: JSON.stringify(["Stripe", "GoHighLevel", "AWS Lambda", "Slack"]),
    problem:
      "Members paid in Stripe but GHL tags drifted; churned users still got community access.",
    solution:
      "Normalized subscription webhooks into GHL custom fields, hard-gated communities by live Stripe status, and dunning with win-back branch.",
    results: "**100%** access parity audits passing · failed payment recovery **+31%**.",
  },
  {
    id: "demo-agency-crm-pipeline",
    title: "Agency CRM & Pipeline Overhaul",
    slug: "agency-crm-pipeline",
    category: "CRM_SYSTEMS",
    shortDescription:
      "Custom pipelines, tags, and reporting dashboards for a multi-location agency using GHL.",
    description:
      "## CRM\n\nOpportunity stages aligned to **SOPs**, with automation at each gate and leadership reporting.",
    thumbnailUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    galleryUrls: JSON.stringify(["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"]),
    tags: JSON.stringify(["CRM", "GHL", "Reporting"]),
    tools: JSON.stringify(["GoHighLevel", "Looker Studio", "Zapier"]),
    problem:
      "Pipelines did not reflect real delivery steps; forecasting was guesswork.",
    solution:
      "Rebuilt objects, custom fields, automations per stage, and weekly snapshot reports for leadership.",
    results: "Forecast accuracy improved materially; delivery handoffs became **fully visible** in GHL.",
  },
  {
    id: "demo-gym-franchise-lead-routing-crm",
    title: "Gym Franchise — Lead Routing & Scorecards",
    slug: "gym-franchise-lead-routing-crm",
    category: "CRM_SYSTEMS",
    shortDescription:
      "Territory-based routing, franchise scorecards, and leadership rollups across 30+ GHL sub-accounts.",
    description:
      "## CRM architecture\n\n**Parent/child** patterns: standardized pipelines, mandatory fields, and nightly rollup to a leadership dashboard.",
    thumbnailUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Franchise", "Routing", "Reporting"]),
    tools: JSON.stringify(["GoHighLevel", "Looker Studio", "BigQuery", "Zapier"]),
    problem:
      "Each franchise ran a different pipeline; HQ had no idea which locations were leaking leads.",
    solution:
      "Standard objects + mandatory dispositions, geo routing rules, and automated scorecards with red/yellow thresholds.",
    results: "**HQ visibility** in 48h after rollout · top quartile locations **+14%** lead-to-trial in 60 days.",
  },
  {
    id: "demo-solar-installer-survey-pto-crm",
    title: "Solar Installer — Survey-to-PTO CRM",
    slug: "solar-installer-survey-pto-crm",
    category: "CRM_SYSTEMS",
    shortDescription:
      "Job stages from site survey to permission-to-operate, with referral nurture, warranty NPS, and review asks in GHL.",
    description:
      "## Install CRM\n\n**Field-first** objects: design approved, permit submitted, install scheduled, inspection passed—each gate triggers crew SMS and customer comms from a single source of truth.",
    thumbnailUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a40b?w=800&q=80",
    galleryUrls: JSON.stringify([
      "https://images.unsplash.com/photo-1497440003254-e0a224bdb946?w=1200&q=80",
    ]),
    tags: JSON.stringify(["Solar", "Field Ops", "CRM"]),
    tools: JSON.stringify(["GoHighLevel", "Zapier", "Google Sheets"]),
    problem:
      "Install coordinators lived in texts; referral partners were never nurtured and Google reviews stalled after busy season.",
    solution:
      "Standardized opportunity stages, automated milestone emails/SMS, partner drip from closed-won tags, and NPS→review requests tied to PTO completion.",
    results: "**Referral introductions +26%** post-install · review velocity **2×** vs prior year with the same crew count.",
  },
];

export function getDemoPortfolioRowBySlug(slug: string): PortfolioDbRow | undefined {
  return DEMO_PORTFOLIO_ROWS.find((r) => r.slug === slug);
}

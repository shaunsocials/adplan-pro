import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --surface2: #1c1c26;
    --border: #2a2a3a;
    --accent: #ff5c35;
    --accent2: #ff8c35;
    --blue: #4f8ef7;
    --text: #f0f0f5;
    --muted: #7070a0;
    --success: #2ecc71;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app {
    min-height: 100vh;
    background: var(--bg);
    position: relative;
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px;
    border-bottom: 1px solid var(--border);
    background: rgba(10,10,15,0.9);
    backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 100;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 20px;
    display: flex; align-items: center; gap: 8px;
  }
  .nav-logo span { color: var(--accent); }
  .nav-pill {
    background: var(--accent);
    color: white; font-size: 11px; font-weight: 600;
    padding: 3px 8px; border-radius: 20px; letter-spacing: 0.05em;
  }
  .nav-tabs { display: flex; gap: 4px; }
  .nav-tab {
    background: none; border: none; cursor: pointer;
    color: var(--muted); font-family: 'DM Sans', sans-serif;
    font-size: 14px; padding: 8px 16px; border-radius: 8px;
    transition: all 0.2s;
  }
  .nav-tab:hover { color: var(--text); background: var(--surface); }
  .nav-tab.active { color: var(--text); background: var(--surface2); }

  /* HERO */
  .hero {
    padding: 80px 40px 60px;
    max-width: 860px; margin: 0 auto;
    text-align: center;
  }
  .hero-eyebrow {
    display: inline-block;
    font-size: 12px; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--accent);
    border: 1px solid rgba(255,92,53,0.3);
    padding: 6px 14px; border-radius: 20px;
    margin-bottom: 28px;
  }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800; line-height: 1.05;
    margin-bottom: 20px;
  }
  .hero h1 em { font-style: normal; color: var(--accent); }
  .hero p {
    font-size: 18px; color: var(--muted); line-height: 1.7;
    max-width: 560px; margin: 0 auto 40px;
  }
  .hero-price {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 12px 20px;
    font-size: 14px; color: var(--muted);
  }
  .hero-price strong { color: var(--text); font-size: 16px; }
  .price-badge {
    background: rgba(255,92,53,0.15);
    color: var(--accent); font-size: 11px; font-weight: 700;
    padding: 3px 8px; border-radius: 6px; letter-spacing: 0.05em;
  }

  /* WIZARD */
  .wizard-wrap { max-width: 720px; margin: 0 auto; padding: 0 40px 80px; }

  .step-indicator {
    display: flex; align-items: center; gap: 0;
    margin-bottom: 48px;
  }
  .step-dot {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; font-family: 'Syne', sans-serif;
    border: 2px solid var(--border);
    color: var(--muted); background: var(--surface);
    transition: all 0.3s; flex-shrink: 0;
  }
  .step-dot.done { background: var(--accent); border-color: var(--accent); color: white; }
  .step-dot.active { border-color: var(--accent); color: var(--accent); background: rgba(255,92,53,0.1); }
  .step-line { flex: 1; height: 2px; background: var(--border); transition: all 0.3s; }
  .step-line.done { background: var(--accent); }

  .step-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px;
    animation: slideUp 0.4s ease;
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .step-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
  }
  .step-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 700;
    margin-bottom: 8px; line-height: 1.2;
  }
  .step-desc { color: var(--muted); font-size: 15px; margin-bottom: 32px; line-height: 1.6; }

  /* FIELDS */
  .field-group { display: grid; gap: 16px; margin-bottom: 32px; }
  .field-group.cols2 { grid-template-columns: 1fr 1fr; }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label { font-size: 13px; font-weight: 500; color: var(--muted); }
  .field input, .field select, .field textarea {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 16px;
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px;
    transition: border-color 0.2s;
    width: 100%;
  }
  .field input:focus, .field select:focus, .field textarea:focus {
    outline: none; border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(255,92,53,0.1);
  }
  .field textarea { resize: vertical; min-height: 90px; }
  .field select option { background: #1c1c26; }

  /* OPTION CARDS */
  .option-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 32px; }
  .option-grid.cols3 { grid-template-columns: repeat(3, 1fr); }
  .option-card {
    background: var(--bg); border: 2px solid var(--border);
    border-radius: 12px; padding: 16px;
    cursor: pointer; transition: all 0.2s; text-align: left;
  }
  .option-card:hover { border-color: rgba(255,92,53,0.4); background: rgba(255,92,53,0.04); }
  .option-card.selected { border-color: var(--accent); background: rgba(255,92,53,0.08); }
  .option-card-icon { font-size: 24px; margin-bottom: 8px; }
  .option-card-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
  .option-card-desc { font-size: 12px; color: var(--muted); line-height: 1.4; }

  /* BUTTONS */
  .btn-row { display: flex; gap: 12px; align-items: center; }
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 10px; font-size: 15px;
    font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; border: none; transition: all 0.2s;
  }
  .btn-primary {
    background: var(--accent); color: white;
  }
  .btn-primary:hover { background: #ff7050; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,92,53,0.3); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-ghost {
    background: transparent; color: var(--muted);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { color: var(--text); border-color: var(--muted); }
  .btn-big {
    padding: 18px 40px; font-size: 17px; border-radius: 14px;
    width: 100%; justify-content: center;
  }

  /* LOADING */
  .loading-screen {
    padding: 80px 40px; text-align: center;
    max-width: 600px; margin: 0 auto;
  }
  .loader-ring {
    width: 64px; height: 64px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 32px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title {
    font-family: 'Syne', sans-serif;
    font-size: 24px; font-weight: 700; margin-bottom: 12px;
  }
  .loading-steps { display: flex; flex-direction: column; gap: 10px; margin-top: 32px; }
  .loading-step {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 20px; background: var(--surface);
    border-radius: 10px; font-size: 14px; color: var(--muted);
    animation: fadeIn 0.4s ease both;
  }
  .loading-step.done { color: var(--text); }
  .loading-step.done .ls-icon { color: var(--success); }
  .ls-icon { font-size: 16px; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* RESULTS */
  .results-wrap { max-width: 860px; margin: 0 auto; padding: 0 40px 100px; }
  .results-header { margin-bottom: 40px; }
  .results-tag {
    display: inline-block; background: rgba(46,204,113,0.15);
    color: var(--success); font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 6px; margin-bottom: 16px;
  }
  .results-title {
    font-family: 'Syne', sans-serif;
    font-size: 32px; font-weight: 800; margin-bottom: 8px;
  }
  .results-sub { color: var(--muted); font-size: 16px; }

  .results-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; align-items: start; }

  .section-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px; margin-bottom: 20px;
  }
  .section-card:last-child { margin-bottom: 0; }
  .section-header {
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .section-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(255,92,53,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .section-title {
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700;
  }
  .section-content { font-size: 14px; line-height: 1.8; color: var(--muted); }
  .section-content strong { color: var(--text); }

  .kv-list { display: flex; flex-direction: column; gap: 10px; }
  .kv-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 10px 0; border-bottom: 1px solid var(--border);
    font-size: 14px; gap: 16px;
  }
  .kv-row:last-child { border-bottom: none; }
  .kv-key { color: var(--muted); flex-shrink: 0; }
  .kv-val { color: var(--text); text-align: right; font-weight: 500; }

  .ad-examples { display: flex; flex-direction: column; gap: 12px; }
  .ad-card {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px;
  }
  .ad-card-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
  }
  .ad-card-text { font-size: 14px; line-height: 1.7; color: var(--text); }
  .ad-card-cta {
    display: inline-block; margin-top: 10px;
    background: var(--blue); color: white;
    font-size: 12px; font-weight: 700;
    padding: 5px 12px; border-radius: 6px;
  }

  .warning-box {
    background: rgba(255,92,53,0.08); border: 1px solid rgba(255,92,53,0.2);
    border-radius: 12px; padding: 16px; margin-bottom: 20px;
    font-size: 13px; color: var(--muted); line-height: 1.6;
  }
  .warning-box strong { color: var(--accent); }

  .sidebar-sticky { position: sticky; top: 90px; }
  .summary-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px; margin-bottom: 20px;
  }
  .summary-title {
    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
    margin-bottom: 16px; color: var(--muted); text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .checklist { display: flex; flex-direction: column; gap: 8px; }
  .check-item {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 13px; color: var(--muted); line-height: 1.5;
  }
  .check-item::before { content: '○'; color: var(--border); flex-shrink: 0; margin-top: 1px; }
  .check-item.done { color: var(--text); }
  .check-item.done::before { content: '✓'; color: var(--success); }

  .badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .badge {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 6px; padding: 4px 10px;
    font-size: 12px; color: var(--muted);
  }
  .badge.accent { background: rgba(255,92,53,0.1); border-color: rgba(255,92,53,0.2); color: var(--accent); }

  /* SETUP PAGE */
  .setup-page { max-width: 760px; margin: 0 auto; padding: 60px 40px; }
  .setup-steps { display: flex; flex-direction: column; gap: 2px; }
  .setup-step {
    display: flex; gap: 24px;
    padding: 28px 0;
    border-bottom: 1px solid var(--border);
    animation: slideUp 0.4s ease both;
  }
  .setup-step:last-child { border-bottom: none; }
  .ss-num {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--accent); color: white;
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ss-body { flex: 1; }
  .ss-title {
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700;
    margin-bottom: 8px;
  }
  .ss-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }
  .ss-tip {
    margin-top: 12px; padding: 12px 16px;
    background: rgba(79,142,247,0.08); border: 1px solid rgba(79,142,247,0.15);
    border-radius: 8px; font-size: 13px; color: #9ab8f7;
    line-height: 1.5;
  }
  .ss-tip::before { content: '💡 '; }

  /* UTIL */
  .divider { height: 1px; background: var(--border); margin: 32px 0; }
  .text-muted { color: var(--muted); }
  .text-accent { color: var(--accent); }
  .mt-8 { margin-top: 8px; }
  .mt-16 { margin-top: 16px; }
  .prose { font-size: 15px; line-height: 1.8; color: var(--muted); }
  .prose strong { color: var(--text); }
  .prose ul { padding-left: 20px; margin-top: 8px; }
  .prose li { margin-bottom: 6px; }

  @media (max-width: 680px) {
    .nav { padding: 16px 20px; }
    .hero, .wizard-wrap, .results-wrap, .setup-page { padding-left: 20px; padding-right: 20px; }
    .results-grid { grid-template-columns: 1fr; }
    .field-group.cols2 { grid-template-columns: 1fr; }
    .option-grid { grid-template-columns: 1fr; }
    .option-grid.cols3 { grid-template-columns: repeat(2, 1fr); }
    .sidebar-sticky { position: static; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const OFFER_TYPES = [
  { id: "dtc_product", icon: "📦", title: "Physical Product", desc: "E-commerce / DTC sale, ships to customer" },
  { id: "digital_product", icon: "💻", title: "Digital Product", desc: "Online course, ebook, software, SaaS" },
  { id: "lead_gen_local", icon: "📍", title: "Local Service", desc: "Book calls/appointments for a local business" },
  { id: "lead_gen_online", icon: "🌐", title: "Online Service / Coaching", desc: "Consultants, agencies, coaches — no geo limit" },
  { id: "event", icon: "🎟️", title: "Event / Webinar", desc: "Registration for a live or virtual event" },
  { id: "app", icon: "📱", title: "App Install", desc: "Drive downloads for a mobile app" },
];

const FUNNEL_STAGES = [
  { id: "cold", icon: "❄️", title: "Cold — No awareness", desc: "Audience has never heard of you" },
  { id: "warm", icon: "🔥", title: "Warm — Some awareness", desc: "Retargeting, email list, past visitors" },
  { id: "hot", icon: "⚡", title: "Hot — Ready to buy", desc: "Cart abandoners, direct intent signals" },
];

const SETUP_STEPS = [
  {
    num: 1, title: "Create a Facebook (Meta) Account",
    desc: "Go to facebook.com and sign up, or log in to an existing personal account. Meta Ads requires a personal Facebook profile as the owner — you cannot run ads as just a business.",
    tip: "Use a real name and real email. Fake accounts get banned before you spend a dollar."
  },
  {
    num: 2, title: "Create a Facebook Business Page",
    desc: "Go to facebook.com/pages/create. Choose 'Business or brand', fill in your business name, category, and add a profile photo and cover image. This is your public-facing brand presence on the platform.",
    tip: "Even if you hate Facebook, your page needs to look real. Add a bio, a profile photo, and at least one post before running ads."
  },
  {
    num: 3, title: "Set Up Meta Business Suite",
    desc: "Go to business.facebook.com and create a Business account. This is your central dashboard — you'll manage your pages, ad accounts, pixels, and assets from here. Attach your Facebook Page.",
    tip: "Do NOT skip this step and go straight to the Ads Manager. Business Suite is the proper layer above it."
  },
  {
    num: 4, title: "Create Your Ad Account",
    desc: "Inside Business Suite, go to Business Settings → Accounts → Ad Accounts → Add → Create New Ad Account. Name it, set your currency and time zone (you cannot change these later), and assign yourself admin access.",
    tip: "Set your currency and timezone to what you actually use. A mismatch causes reporting headaches forever."
  },
  {
    num: 5, title: "Add a Payment Method",
    desc: "Go to Billing & Payments inside your Ad Account settings. Add a credit or debit card. Meta charges your card periodically as you spend — either when you hit your billing threshold or monthly, whichever comes first.",
    tip: "Use a card with no international transaction fees if you can. Meta's billing entity is sometimes in Ireland and can trigger foreign transaction charges."
  },
  {
    num: 6, title: "Install the Meta Pixel on Your Website",
    desc: "In Events Manager (inside Business Suite), create a Pixel, then install it on your website. If you use Shopify, WordPress, or Webflow there are one-click integrations. Otherwise paste the base code into your site's <head> tag.",
    tip: "Without the Pixel, you're flying blind. Meta cannot optimize for conversions if it can't see who converts. Install it before you spend a cent."
  },
  {
    num: 7, title: "Verify Your Domain",
    desc: "Go to Business Settings → Brand Safety → Domains. Add your domain and verify it via DNS record or HTML tag. This step became required after iOS 14 and unlocks conversion event tracking.",
    tip: "This takes 10 minutes and you'll kick yourself if you skip it. Unverified domains get throttled conversion data."
  },
  {
    num: 8, title: "Configure Your Pixel Events",
    desc: "Back in Events Manager, set up the key events you want Meta to track: PageView, ViewContent, AddToCart, Purchase (for e-com) or Lead, CompleteRegistration (for lead gen). Use the Event Setup Tool for no-code setup or fire them manually via code.",
    tip: "You can only optimize for events that have fired at least 50 times in the last 7 days. 'Purchase' is a tough cold-start — if you're new, optimize for a higher-funnel event like AddToCart while you build data."
  },
  {
    num: 9, title: "Set Yourself Up in Ads Manager",
    desc: "Go to adsmanager.facebook.com. Confirm your ad account is showing in the top left. Familiarise yourself with the three-layer structure: Campaign → Ad Set → Ad. You'll be spending most of your time at Ad Set (targeting, budget) and Ad (creative) level.",
    tip: "You're now ready to build. Use the campaign plan from this tool and build it exactly as specified — don't freelance the settings until you have data."
  },
];

// ─── CAMPAIGN PROMPT ──────────────────────────────────────────────────────────
function buildPrompt(data) {
  return `You are a senior Meta Ads strategist with 10+ years experience managing campaigns across DTC, lead gen, SaaS, and local businesses. You give specific, opinionated, tactical advice — not generic tips. You know the platform deeply: algorithm behaviour, auction dynamics, creative best practices, and common beginner traps.

A user wants to build a Meta advertising campaign. Here are their inputs:

OFFER TYPE: ${data.offerType}
BUSINESS/PRODUCT NAME: ${data.businessName}
WHAT THEY SELL / THE OFFER: ${data.offerDesc}
MONTHLY AD BUDGET: $${data.budget}
PRICE POINT OF OFFER: $${data.pricePoint}
TARGET LOCATION: ${data.location || "Not specified / National"}
TARGET AUDIENCE (who buys this): ${data.targetAudience}
FUNNEL STAGE: ${data.funnelStage}
ANY EXISTING ASSETS (email list, website traffic, prior ads): ${data.existingAssets || "None"}
MAIN GOAL: ${data.goal || "Drive sales / leads"}

Generate a comprehensive, highly specific campaign plan. Be opinionated — tell them exactly what to do, not just options. Format your response as JSON with this exact structure:

{
  "campaignStrategy": {
    "objective": "The exact Meta campaign objective to select and WHY",
    "budgetStrategy": "How to split and pace the budget — daily vs lifetime, how much to test vs scale",
    "bidStrategy": "Exact bid strategy to use and why for this budget/offer",
    "warmupAdvice": "What to do in week 1 vs week 2-4 given they're starting fresh"
  },
  "targeting": {
    "audienceApproach": "Broad vs interest-based vs lookalike — what to use and why for THIS specific budget",
    "primaryAudience": "Exact targeting recommendation — ages, demographics, interests if applicable",
    "broadWarning": "Whether to use Advantage+ Audience or manual targeting and why",
    "geographicSettings": "Specific geo targeting advice",
    "audienceSizeAdvice": "What audience size range to aim for and why"
  },
  "adCreative": {
    "topFormat": "The single best ad format for this offer right now and why",
    "secondaryFormat": "Second best format to test",
    "hookStrategy": "Exact advice on what the first 3 seconds / first line should do for this offer type",
    "creativeCount": "How many creatives to launch with and why",
    "videoVsStatic": "Specific recommendation for their situation"
  },
  "copyFramework": {
    "primaryAngle": "The main psychological angle / pain point to lead with",
    "headline": "Example headline they could use (specific to their offer)",
    "primaryText": "Example primary text / ad copy (3-4 sentences, specific to their offer)",
    "cta": "Exact CTA button to use and why"
  },
  "landingPage": {
    "pageType": "What type of landing page / destination to send traffic to",
    "mustHaves": "3-4 critical elements their landing page needs for this offer type",
    "mobileWarning": "Mobile-specific advice"
  },
  "pixelAndTracking": {
    "keyEvent": "The single conversion event to optimize for given their budget and offer",
    "whyThisEvent": "Why this event specifically — explain the 50-events-per-week rule if relevant",
    "utmAdvice": "UTM parameter setup"
  },
  "expectations": {
    "realisticCPL": "Realistic cost per lead OR cost per purchase for their offer/budget",
    "learningPhase": "How long and how many results before they have real data",
    "whenToKill": "Specific signal to kill an ad set that isn't working",
    "whenToScale": "Specific signal they've found a winner"
  },
  "commonMistakes": ["3-4 specific mistakes people make with this exact offer type / budget range — be specific, not generic"],
  "week1Checklist": ["6-8 specific action items to complete before or on launch day"],
  "visualBrief": {
    "concept": "Describe a specific visual/video concept for their top ad",
    "style": "Visual style direction",
    "textOverlay": "What text overlay if any",
    "thumbnailAdvice": "For video: thumbnail advice"
  }
}

Be extremely specific to their offer, budget, and situation. Do not give generic advice. If their budget is under $1,000/month, adjust your advice accordingly — don't recommend strategies that require $5k/month to work. Respond ONLY with the JSON object, no markdown, no preamble.`;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function MetaAdsMVP() {
  const [page, setPage] = useState("home"); // home | setup | wizard | loading | results
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    offerType: "", businessName: "", offerDesc: "", budget: "",
    pricePoint: "", location: "", targetAudience: "",
    funnelStage: "", existingAssets: "", goal: "",
  });
  const [result, setResult] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = [
    "Analysing your offer type and budget...",
    "Building campaign structure...",
    "Generating targeting recommendations...",
    "Writing ad copy examples...",
    "Finalising your creative brief...",
    "Campaign plan ready ✓",
  ];

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const STEPS = [
    { label: "Step 1 of 4", title: "Tell us about your offer", desc: "This shapes everything — campaign type, targeting, creative." },
    { label: "Step 2 of 4", title: "Budget & pricing", desc: "Be honest — we'll build a realistic plan for what you have." },
    { label: "Step 3 of 4", title: "Your audience", desc: "Who actually buys this, and where are they?" },
    { label: "Step 4 of 4", title: "Context & goals", desc: "Last few details to make your plan specific." },
  ];

  const canNext = [
    form.offerType && form.businessName && form.offerDesc,
    form.budget && form.pricePoint,
    form.targetAudience && form.funnelStage,
    true,
  ][step];

  async function generate() {
    setPage("loading");
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(s => Math.min(s + 1, loadingSteps.length - 1));
    }, 900);

    try {
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: buildPrompt(form) }],
        }),
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      clearInterval(interval);
      setLoadingStep(loadingSteps.length - 1);
      setTimeout(() => { setResult(parsed); setPage("results"); }, 800);
    } catch (e) {
      clearInterval(interval);
      setResult({ error: true });
      setPage("results");
    }
  }

  // ── STYLES ──
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // ── HOME PAGE ──
  if (page === "home") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo">⚡ AdPlan<span>Pro</span> <span className="nav-pill">BETA</span></div>
        <div className="nav-tabs">
          <button className="nav-tab active">Build Campaign</button>
          <button className="nav-tab" onClick={() => setPage("setup")}>Account Setup</button>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-eyebrow">Meta Ads · Built by Experts</div>
        <h1>Run ads like you've been doing it <em>for years.</em></h1>
        <p>Answer 10 questions. Get a full, expert-level Meta campaign plan — targeting, budget, creative, copy, and more.</p>
        <div className="hero-price">
          <strong>$5 per campaign plan</strong>
          <span className="price-badge">EARLY ACCESS PRICE</span>
          <span>· cancel anytime</span>
        </div>
        <div style={{ marginTop: 40 }}>
          <button className="btn btn-primary btn-big" style={{ maxWidth: 360, margin: "0 auto" }} onClick={() => setPage("wizard")}>
            Build My Campaign Plan →
          </button>
          <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--muted)" }}>
            Never run ads before? <button onClick={() => setPage("setup")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Set up your account first →</button>
          </p>
        </div>
      </div>

      {/* FEATURE STRIP */}
      <div style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "🎯", t: "Targeting Strategy", d: "Broad vs interest-based, Advantage+ guidance, audience sizing — explained for your budget." },
            { icon: "✍️", t: "Copy & Creative Brief", d: "Hooks, primary text, CTAs, and a visual concept brief — ready to hand to a designer." },
            { icon: "📊", t: "Realistic Expectations", d: "What CPL / ROAS to expect, when to kill an ad, when to scale — no fluff." },
          ].map(f => (
            <div key={f.t} className="section-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.t}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── SETUP PAGE ──
  if (page === "setup") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo">⚡ AdPlan<span>Pro</span> <span className="nav-pill">BETA</span></div>
        <div className="nav-tabs">
          <button className="nav-tab" onClick={() => setPage("home")}>Build Campaign</button>
          <button className="nav-tab active">Account Setup</button>
        </div>
      </nav>
      <div className="setup-page">
        <div style={{ marginBottom: 48 }}>
          <div className="hero-eyebrow">Before You Run Ads</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Set Up Your Meta Ad Account</h2>
          <p className="prose">Complete every step below before building your first campaign. Skipping steps — especially Pixel and domain verification — will cost you real money in wasted ad spend.</p>
        </div>
        <div className="setup-steps">
          {SETUP_STEPS.map((s, i) => (
            <div key={s.num} className="setup-step" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="ss-num">{s.num}</div>
              <div className="ss-body">
                <div className="ss-title">{s.title}</div>
                <div className="ss-desc">{s.desc}</div>
                <div className="ss-tip">{s.tip}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <button className="btn btn-primary btn-big" style={{ maxWidth: 400 }} onClick={() => setPage("wizard")}>
            Account Ready — Build My Campaign →
          </button>
        </div>
      </div>
    </div>
  );

  // ── WIZARD ──
  if (page === "wizard") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo">⚡ AdPlan<span>Pro</span> <span className="nav-pill">BETA</span></div>
        <div className="nav-tabs">
          <button className="nav-tab" onClick={() => setPage("home")}>Home</button>
          <button className="nav-tab" onClick={() => setPage("setup")}>Account Setup</button>
        </div>
      </nav>
      <div className="wizard-wrap" style={{ paddingTop: 48 }}>

        {/* Step indicator */}
        <div className="step-indicator">
          {[0,1,2,3].map((i) => (
            <>
              <div key={`dot-${i}`} className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
                {i < step ? "✓" : i + 1}
              </div>
              {i < 3 && <div key={`line-${i}`} className={`step-line ${i < step ? "done" : ""}`} />}
            </>
          ))}
        </div>

        <div className="step-card">
          <div className="step-label">{STEPS[step].label}</div>
          <div className="step-title">{STEPS[step].title}</div>
          <div className="step-desc">{STEPS[step].desc}</div>

          {/* STEP 0 */}
          {step === 0 && <>
            <div style={{ marginBottom: 12, fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>What type of offer are you running?</div>
            <div className="option-grid" style={{ marginBottom: 28 }}>
              {OFFER_TYPES.map(o => (
                <div key={o.id} className={`option-card ${form.offerType === o.id ? "selected" : ""}`} onClick={() => set("offerType", o.id)}>
                  <div className="option-card-icon">{o.icon}</div>
                  <div className="option-card-title">{o.title}</div>
                  <div className="option-card-desc">{o.desc}</div>
                </div>
              ))}
            </div>
            <div className="field-group">
              <div className="field">
                <label>Business / Brand Name</label>
                <input placeholder="e.g. Maple Cleaning Co." value={form.businessName} onChange={e => set("businessName", e.target.value)} />
              </div>
              <div className="field">
                <label>Describe your offer in 1-2 sentences</label>
                <textarea placeholder="e.g. We offer residential cleaning services in Austin, TX. First-time customers get 20% off their first clean." value={form.offerDesc} onChange={e => set("offerDesc", e.target.value)} />
              </div>
            </div>
          </>}

          {/* STEP 1 */}
          {step === 1 && <>
            <div className="field-group cols2">
              <div className="field">
                <label>Monthly Ad Budget ($)</label>
                <input type="number" placeholder="500" value={form.budget} onChange={e => set("budget", e.target.value)} />
              </div>
              <div className="field">
                <label>Price Point of Your Offer ($)</label>
                <input type="number" placeholder="97" value={form.pricePoint} onChange={e => set("pricePoint", e.target.value)} />
              </div>
            </div>
            <div className="warning-box">
              <strong>Honest truth about $500/month:</strong> Meta's algorithm needs data to optimise. At lower budgets, expect a 2-4 week learning period where results look rough. Don't panic-kill your ads before you have 50+ events. We'll factor your budget into every recommendation.
            </div>
          </>}

          {/* STEP 2 */}
          {step === 2 && <>
            <div style={{ marginBottom: 12, fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Where is this audience in their journey?</div>
            <div className="option-grid cols3" style={{ marginBottom: 28 }}>
              {FUNNEL_STAGES.map(s => (
                <div key={s.id} className={`option-card ${form.funnelStage === s.id ? "selected" : ""}`} onClick={() => set("funnelStage", s.id)}>
                  <div className="option-card-icon">{s.icon}</div>
                  <div className="option-card-title">{s.title}</div>
                  <div className="option-card-desc">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="field-group">
              <div className="field">
                <label>Who is your ideal customer? (age, interests, job, situation)</label>
                <textarea placeholder="e.g. Women 28-45 in Austin TX, homeowners with kids, too busy to clean, household income $80k+. They care about trusted, vetted cleaners." value={form.targetAudience} onChange={e => set("targetAudience", e.target.value)} />
              </div>
              <div className="field">
                <label>Target Location (city, region, or national)</label>
                <input placeholder="e.g. Austin, TX — 25 mile radius" value={form.location} onChange={e => set("location", e.target.value)} />
              </div>
            </div>
          </>}

          {/* STEP 3 */}
          {step === 3 && <>
            <div className="field-group">
              <div className="field">
                <label>What's your main campaign goal?</label>
                <select value={form.goal} onChange={e => set("goal", e.target.value)}>
                  <option value="">Select...</option>
                  <option value="Generate leads (form fills / calls)">Generate leads (form fills / calls)</option>
                  <option value="Drive online purchases">Drive online purchases</option>
                  <option value="Drive traffic to website">Drive traffic to website</option>
                  <option value="Get app installs">Get app installs</option>
                  <option value="Event registrations">Event registrations</option>
                </select>
              </div>
              <div className="field">
                <label>Existing assets? (optional but important)</label>
                <textarea placeholder="e.g. I have a website with ~200 visitors/month, an email list of 400 people, never run Meta ads before. OR: I've run ads before, have a pixel with ~300 events." value={form.existingAssets} onChange={e => set("existingAssets", e.target.value)} />
              </div>
            </div>
            <div className="warning-box">
              <strong>You're about to generate your campaign plan.</strong> Our AI has been trained on thousands of real Meta campaigns. The output is specific to your offer, budget, and situation — not generic advice.
            </div>
          </>}

          <div className="btn-row">
            {step > 0 && <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>← Back</button>}
            {step < 3
              ? <button className="btn btn-primary" disabled={!canNext} onClick={() => setStep(s => s + 1)}>Continue →</button>
              : <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={generate}>Generate My Campaign Plan ⚡</button>
            }
          </div>
        </div>
      </div>
    </div>
  );

  // ── LOADING ──
  if (page === "loading") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo">⚡ AdPlan<span>Pro</span> <span className="nav-pill">BETA</span></div>
      </nav>
      <div className="loading-screen">
        <div className="loader-ring" />
        <div className="loading-title">Building your campaign plan...</div>
        <p className="text-muted">Analysing your offer, budget, and audience against what's working on Meta right now.</p>
        <div className="loading-steps">
          {loadingSteps.map((s, i) => (
            <div key={i} className={`loading-step ${i <= loadingStep ? "done" : ""}`} style={{ animationDelay: `${i * 0.2}s` }}>
              <span className="ls-icon">{i <= loadingStep ? "✓" : "○"}</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── RESULTS ──
  if (page === "results") {
    if (!result || result.error) return (
      <div className="app">
        <nav className="nav">
          <div className="nav-logo">⚡ AdPlan<span>Pro</span></div>
        </nav>
        <div style={{ textAlign: "center", padding: 80 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Something went wrong</div>
          <p style={{ color: "var(--muted)", marginBottom: 32 }}>We couldn't generate your plan. Please try again.</p>
          <button className="btn btn-primary" onClick={() => { setPage("wizard"); setStep(0); }}>Try Again</button>
        </div>
      </div>
    );

    const r = result;
    return (
      <div className="app">
        <nav className="nav">
          <div className="nav-logo">⚡ AdPlan<span>Pro</span> <span className="nav-pill">BETA</span></div>
          <div className="nav-tabs">
            <button className="nav-tab" onClick={() => { setPage("home"); setStep(0); setResult(null); }}>← New Campaign</button>
            <button className="nav-tab" onClick={() => setPage("setup")}>Account Setup</button>
          </div>
        </nav>
        <div className="results-wrap" style={{ paddingTop: 48 }}>
          <div className="results-header">
            <div className="results-tag">✓ Campaign Plan Ready</div>
            <div className="results-title">{form.businessName} — Meta Ads Campaign Plan</div>
            <div className="results-sub">{form.offerType.replace(/_/g, " ")} · ${form.budget}/mo budget · {form.location || "National"}</div>
          </div>

          <div className="results-grid">
            {/* LEFT COL */}
            <div>
              {/* Campaign Strategy */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">🎯</div>
                  <div className="section-title">Campaign Strategy</div>
                </div>
                <div className="kv-list">
                  <div className="kv-row"><span className="kv-key">Objective</span><span className="kv-val">{r.campaignStrategy?.objective}</span></div>
                  <div className="kv-row"><span className="kv-key">Budget Strategy</span><span className="kv-val">{r.campaignStrategy?.budgetStrategy}</span></div>
                  <div className="kv-row"><span className="kv-key">Bid Strategy</span><span className="kv-val">{r.campaignStrategy?.bidStrategy}</span></div>
                </div>
                {r.campaignStrategy?.warmupAdvice && (
                  <div className="ss-tip" style={{ marginTop: 16 }}>{r.campaignStrategy.warmupAdvice}</div>
                )}
              </div>

              {/* Targeting */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">👥</div>
                  <div className="section-title">Targeting Settings</div>
                </div>
                <div className="kv-list">
                  <div className="kv-row"><span className="kv-key">Approach</span><span className="kv-val">{r.targeting?.audienceApproach}</span></div>
                  <div className="kv-row"><span className="kv-key">Primary Audience</span><span className="kv-val">{r.targeting?.primaryAudience}</span></div>
                  <div className="kv-row"><span className="kv-key">Advantage+</span><span className="kv-val">{r.targeting?.broadWarning}</span></div>
                  <div className="kv-row"><span className="kv-key">Geography</span><span className="kv-val">{r.targeting?.geographicSettings}</span></div>
                  <div className="kv-row"><span className="kv-key">Audience Size</span><span className="kv-val">{r.targeting?.audienceSizeAdvice}</span></div>
                </div>
              </div>

              {/* Creative */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">🎬</div>
                  <div className="section-title">Ad Creative Direction</div>
                </div>
                <div className="kv-list">
                  <div className="kv-row"><span className="kv-key">Top Format</span><span className="kv-val">{r.adCreative?.topFormat}</span></div>
                  <div className="kv-row"><span className="kv-key">Secondary Test</span><span className="kv-val">{r.adCreative?.secondaryFormat}</span></div>
                  <div className="kv-row"><span className="kv-key">Hook Strategy</span><span className="kv-val">{r.adCreative?.hookStrategy}</span></div>
                  <div className="kv-row"><span className="kv-key">How Many Creatives</span><span className="kv-val">{r.adCreative?.creativeCount}</span></div>
                  <div className="kv-row"><span className="kv-key">Video vs Static</span><span className="kv-val">{r.adCreative?.videoVsStatic}</span></div>
                </div>
              </div>

              {/* Copy */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">✍️</div>
                  <div className="section-title">Ad Copy Examples</div>
                </div>
                <div className="section-content" style={{ marginBottom: 16 }}>
                  <strong>Lead angle:</strong> {r.copyFramework?.primaryAngle}
                </div>
                <div className="ad-examples">
                  <div className="ad-card">
                    <div className="ad-card-label">Headline</div>
                    <div className="ad-card-text" style={{ fontWeight: 700, fontSize: 16 }}>{r.copyFramework?.headline}</div>
                  </div>
                  <div className="ad-card">
                    <div className="ad-card-label">Primary Text</div>
                    <div className="ad-card-text">{r.copyFramework?.primaryText}</div>
                    <div className="ad-card-cta">{r.copyFramework?.cta}</div>
                  </div>
                </div>
              </div>

              {/* Visual Brief */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">🖼️</div>
                  <div className="section-title">Visual / Creative Brief</div>
                </div>
                <div className="kv-list">
                  <div className="kv-row"><span className="kv-key">Concept</span><span className="kv-val">{r.visualBrief?.concept}</span></div>
                  <div className="kv-row"><span className="kv-key">Style</span><span className="kv-val">{r.visualBrief?.style}</span></div>
                  <div className="kv-row"><span className="kv-key">Text Overlay</span><span className="kv-val">{r.visualBrief?.textOverlay}</span></div>
                  <div className="kv-row"><span className="kv-key">Thumbnail</span><span className="kv-val">{r.visualBrief?.thumbnailAdvice}</span></div>
                </div>
              </div>

              {/* Landing Page */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">🌐</div>
                  <div className="section-title">Landing Page & Tracking</div>
                </div>
                <div className="kv-list">
                  <div className="kv-row"><span className="kv-key">Page Type</span><span className="kv-val">{r.landingPage?.pageType}</span></div>
                  <div className="kv-row"><span className="kv-key">Must-Haves</span><span className="kv-val">{r.landingPage?.mustHaves}</span></div>
                  <div className="kv-row"><span className="kv-key">Mobile Warning</span><span className="kv-val">{r.landingPage?.mobileWarning}</span></div>
                  <div className="kv-row"><span className="kv-key">Optimise For</span><span className="kv-val">{r.pixelAndTracking?.keyEvent}</span></div>
                  <div className="kv-row"><span className="kv-key">Why</span><span className="kv-val">{r.pixelAndTracking?.whyThisEvent}</span></div>
                  <div className="kv-row"><span className="kv-key">UTMs</span><span className="kv-val">{r.pixelAndTracking?.utmAdvice}</span></div>
                </div>
              </div>

              {/* Expectations */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">📊</div>
                  <div className="section-title">Realistic Expectations</div>
                </div>
                <div className="kv-list">
                  <div className="kv-row"><span className="kv-key">Expected CPL / CPA</span><span className="kv-val">{r.expectations?.realisticCPL}</span></div>
                  <div className="kv-row"><span className="kv-key">Learning Phase</span><span className="kv-val">{r.expectations?.learningPhase}</span></div>
                  <div className="kv-row"><span className="kv-key">Kill signal</span><span className="kv-val" style={{ color: "#ff6b6b" }}>{r.expectations?.whenToKill}</span></div>
                  <div className="kv-row"><span className="kv-key">Scale signal</span><span className="kv-val" style={{ color: "var(--success)" }}>{r.expectations?.whenToScale}</span></div>
                </div>
              </div>

              {/* Mistakes */}
              <div className="section-card">
                <div className="section-header">
                  <div className="section-icon">⚠️</div>
                  <div className="section-title">Common Mistakes to Avoid</div>
                </div>
                <div className="checklist">
                  {(r.commonMistakes || []).map((m, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < r.commonMistakes.length - 1 ? "1px solid var(--border)" : "none", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                      <span style={{ color: "#ff6b6b", flexShrink: 0 }}>✕</span>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="sidebar-sticky">
              <div className="summary-card">
                <div className="summary-title">Campaign Summary</div>
                <div className="kv-list">
                  <div className="kv-row"><span className="kv-key">Business</span><span className="kv-val">{form.businessName}</span></div>
                  <div className="kv-row"><span className="kv-key">Monthly Budget</span><span className="kv-val" style={{ color: "var(--accent)" }}>${form.budget}</span></div>
                  <div className="kv-row"><span className="kv-key">Price Point</span><span className="kv-val">${form.pricePoint}</span></div>
                  <div className="kv-row"><span className="kv-key">Location</span><span className="kv-val">{form.location || "National"}</span></div>
                  <div className="kv-row"><span className="kv-key">Funnel Stage</span><span className="kv-val">{form.funnelStage}</span></div>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-title">Launch Checklist</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(r.week1Checklist || []).map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--border)", flexShrink: 0 }}>○</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}
                onClick={() => { setPage("wizard"); setStep(0); setResult(null); setForm({ offerType: "", businessName: "", offerDesc: "", budget: "", pricePoint: "", location: "", targetAudience: "", funnelStage: "", existingAssets: "", goal: "" }); }}>
                + New Campaign
              </button>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => window.print()}>
                🖨️ Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080e0a;
    --surface: #0e1610;
    --surface2: #131f15;
    --border: #1e2e20;
    --accent: #c9a84c;
    --text: #f2ede4;
    --muted: #4a5e4c;
    --muted2: #8a9e8c;
    --success: #4caf72;
    --warning: #c9a84c;
  }

  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  .app { min-height: 100vh; background: var(--bg); overflow-x: hidden; }

  /* NAV */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px;
    border-bottom: 1px solid var(--border);
    background: rgba(12,12,14,0.95);
    backdrop-filter: blur(16px);
    position: sticky; top: 0; z-index: 100;
  }
  .nav-logo {
    font-family: 'Inter', sans-serif;
    font-weight: 700; font-size: 17px; letter-spacing: -0.02em;
    display: flex; align-items: center; gap: 10px;
  }
  .nav-logo-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, #c9a84c, #e8cc7a); }
  .nav-pill {
    background: rgba(201,168,76,0.1);
    color: var(--accent); font-size: 10px; font-weight: 600;
    padding: 3px 8px; border-radius: 4px; letter-spacing: 0.08em;
    text-transform: uppercase; border: 1px solid rgba(201,168,76,0.2);
  }
  .nav-tabs { display: flex; gap: 2px; }
  .nav-tab {
    background: none; border: none; cursor: pointer;
    color: var(--muted2); font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 500;
    padding: 7px 14px; border-radius: 6px;
    transition: all 0.15s;
  }
  .nav-tab:hover { color: var(--text); background: var(--surface2); }
  .nav-tab.active { color: var(--text); background: var(--surface2); }

  /* HERO */
  .hero { padding: 88px 48px 72px; max-width: 880px; margin: 0 auto; text-align: center; }
  .hero-eyebrow {
    display: inline-block; font-size: 11px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent);
    margin-bottom: 32px;
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 5.5vw, 62px);
    font-weight: 800; line-height: 1.08; letter-spacing: -0.02em;
    margin-bottom: 22px;
  }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero p { font-size: 17px; color: var(--muted2); line-height: 1.75; max-width: 520px; margin: 0 auto 44px; font-weight: 400; }
  .hero-price {
    display: inline-flex; align-items: center; gap: 12px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 13px 22px; font-size: 14px; color: var(--muted2);
  }
  .hero-price strong { color: var(--text); font-size: 15px; font-weight: 600; }
  .price-badge {
    background: rgba(201,168,76,0.1); color: var(--accent);
    font-size: 10px; font-weight: 700; padding: 3px 8px;
    border-radius: 4px; letter-spacing: 0.08em; text-transform: uppercase;
  }

  /* WIZARD */
  .wizard-wrap { max-width: 680px; margin: 0 auto; padding: 0 48px 100px; }

  .step-indicator { display: flex; align-items: center; margin-bottom: 44px; }
  .step-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    border: 1.5px solid var(--border);
    color: var(--muted); background: var(--surface);
    transition: all 0.25s; flex-shrink: 0;
  }
  .step-dot.done { background: var(--accent); border-color: var(--accent); color: white; }
  .step-dot.active { border-color: var(--accent); color: var(--accent); background: rgba(201,168,76,0.08); }
  .step-line { flex: 1; height: 1px; background: var(--border); transition: all 0.25s; }
  .step-line.done { background: var(--accent); opacity: 0.4; }

  .step-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 40px;
    animation: fadeUp 0.3s ease;
  }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .step-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
  .step-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; margin-bottom: 8px; line-height: 1.25; }
  .step-desc { color: var(--muted2); font-size: 14px; margin-bottom: 32px; line-height: 1.65; }

  /* FIELDS */
  .field-group { display: grid; gap: 16px; margin-bottom: 28px; }
  .field-group.cols2 { grid-template-columns: 1fr 1fr; }
  .field { display: flex; flex-direction: column; gap: 7px; }
  .field label { font-size: 12px; font-weight: 600; color: var(--muted2); letter-spacing: 0.02em; }
  .field input, .field select, .field textarea {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 8px; padding: 11px 14px;
    color: var(--text); font-family: 'Inter', sans-serif; font-size: 14px;
    transition: border-color 0.15s; width: 100%;
  }
  .field input:focus, .field select:focus, .field textarea:focus {
    outline: none; border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
  }
  .field textarea { resize: vertical; min-height: 88px; line-height: 1.6; }
  .field select option { background: #1a1a1e; }

  /* OPTION CARDS */
  .option-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 28px; }
  .option-grid.cols3 { grid-template-columns: repeat(3, 1fr); }
  .option-card {
    background: var(--bg); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 16px;
    cursor: pointer; transition: all 0.15s; text-align: left;
  }
  .option-card:hover { border-color: rgba(201,168,76,0.35); background: rgba(201,168,76,0.03); }
  .option-card.selected { border-color: var(--accent); background: rgba(201,168,76,0.06); }
  .option-card-label {
    display: inline-block; font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 8px;
  }
  .option-card.selected .option-card-label { color: var(--accent); }
  .option-card-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; letter-spacing: -0.01em; }
  .option-card-desc { font-size: 12px; color: var(--muted2); line-height: 1.45; }

  /* BUTTONS */
  .btn-row { display: flex; gap: 10px; align-items: center; }
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 8px; font-size: 14px;
    font-weight: 600; font-family: 'Inter', sans-serif;
    cursor: pointer; border: none; transition: all 0.15s; letter-spacing: -0.01em;
  }
  .btn-primary { background: linear-gradient(135deg, #c9a84c, #e8cc7a); color: #080e0a; }
  .btn-primary:hover { background: #b8922e; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,0.25); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-ghost { background: transparent; color: var(--muted2); border: 1px solid var(--border); }
  .btn-ghost:hover { color: var(--text); border-color: var(--muted); }
  .btn-big { padding: 15px 36px; font-size: 15px; border-radius: 10px; width: 100%; justify-content: center; }

  /* LOADING */
  .loading-screen { padding: 80px 48px; text-align: center; max-width: 560px; margin: 0 auto; }
  .loader-ring {
    width: 48px; height: 48px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    margin: 0 auto 32px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; margin-bottom: 10px; }
  .loading-subtitle { font-size: 14px; color: var(--muted2); line-height: 1.6; margin-bottom: 8px; }
  .loading-warning {
    font-size: 12px; color: var(--muted); margin-bottom: 36px;
    padding: 10px 16px; background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; display: inline-block;
  }
  .loading-steps { display: flex; flex-direction: column; gap: 8px; }
  .loading-step {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 16px; background: var(--surface);
    border: 1px solid var(--border); border-radius: 8px;
    font-size: 13px; color: var(--muted); animation: fadeIn 0.3s ease both;
    transition: all 0.2s;
  }
  .loading-step.done { color: var(--text); border-color: rgba(39,196,100,0.2); }
  .ls-check { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 9px; }
  .loading-step.done .ls-check { background: var(--success); border-color: var(--success); color: white; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* RESULTS */
  .results-wrap { max-width: 960px; margin: 0 auto; padding: 0 48px 100px; }
  .results-header { margin-bottom: 44px; padding-top: 48px; }
  .results-tag {
    display: inline-block; background: rgba(39,196,100,0.1);
    color: var(--success); font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 4px; margin-bottom: 16px;
    border: 1px solid rgba(39,196,100,0.2);
  }
  .results-title { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; line-height: 1.15; }
  .results-sub { color: var(--muted2); font-size: 14px; }
  .results-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; align-items: start; }

  .section-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 24px; margin-bottom: 16px;
  }
  .section-card:last-child { margin-bottom: 0; }
  .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .section-icon-box {
    width: 30px; height: 30px; border-radius: 6px;
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.15);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .section-icon-box svg { width: 14px; height: 14px; stroke: var(--accent); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .section-title { font-size: 14px; font-weight: 700; letter-spacing: -0.01em; }

  .doc-list { display: flex; flex-direction: column; gap: 0; }
  .doc-field {
    padding: 14px 0; border-bottom: 1px solid var(--border);
  }
  .doc-field:last-child { border-bottom: none; padding-bottom: 0; }
  .doc-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 6px;
  }
  .doc-value { font-size: 14px; color: var(--text); line-height: 1.65; }

  .ad-examples { display: flex; flex-direction: column; gap: 10px; }
  .ad-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
  .ad-card-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .ad-card-text { font-size: 13px; line-height: 1.7; color: var(--text); }
  .ad-card-cta {
    display: inline-block; margin-top: 10px;
    background: #1877f2; color: white;
    font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 5px;
    letter-spacing: 0.02em;
  }

  .warning-box {
    background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.15);
    border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;
    font-size: 13px; color: var(--muted2); line-height: 1.6;
  }
  .warning-box strong { color: var(--warning); }

  .info-box {
    background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.1);
    border-radius: 8px; padding: 14px 16px; margin-top: 16px;
    font-size: 13px; color: var(--muted2); line-height: 1.6;
  }
  .info-box strong { color: var(--text); }

  .sidebar-sticky { position: sticky; top: 90px; }
  .summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .summary-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }

  .checklist { display: flex; flex-direction: column; gap: 10px; }
  .check-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--muted2); line-height: 1.5; }
  .check-circle { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--border); flex-shrink: 0; margin-top: 1px; }

  .mistake-item {
    display: flex; gap: 10px; padding: 11px 0;
    border-bottom: 1px solid var(--border);
    font-size: 13px; color: var(--muted2); line-height: 1.6;
  }
  .mistake-item:last-child { border-bottom: none; padding-bottom: 0; }
  .mistake-x { color: #ef4444; flex-shrink: 0; font-weight: 700; font-size: 12px; margin-top: 1px; }

  .signal-item { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; color: var(--muted2); line-height: 1.55; }
  .signal-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }

  /* SETUP PAGE */
  .setup-page { max-width: 720px; margin: 0 auto; padding: 60px 48px; }
  .setup-steps { display: flex; flex-direction: column; }
  .setup-step { display: flex; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--border); animation: fadeUp 0.3s ease both; }
  .setup-step:last-child { border-bottom: none; }
  .ss-num {
    width: 36px; height: 36px; border-radius: 8px;
    background: linear-gradient(135deg, #c9a84c, #e8cc7a); color: #080e0a;
    font-size: 15px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ss-body { flex: 1; }
  .ss-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.01em; }
  .ss-desc { font-size: 14px; color: var(--muted2); line-height: 1.7; }
  .ss-tip {
    margin-top: 12px; padding: 11px 14px;
    background: rgba(79,142,247,0.06); border: 1px solid rgba(79,142,247,0.12);
    border-radius: 7px; font-size: 12px; color: #8ab4f8; line-height: 1.55;
  }
  .ss-tip::before { content: 'Note  —  '; font-weight: 600; }

  /* DIVIDER */
  .divider { height: 1px; background: var(--border); margin: 28px 0; }


  /* FOOTER */
  .site-footer {
    border-top: 1px solid var(--border);
    padding: 24px 48px;
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 40px;
  }
  .footer-copy { font-size: 12px; color: var(--muted); }
  .footer-links { display: flex; gap: 20px; }
  .footer-link {
    font-size: 12px; color: var(--muted); cursor: pointer;
    background: none; border: none; font-family: 'Inter', sans-serif;
    transition: color 0.15s;
  }
  .footer-link:hover { color: var(--muted2); }

  /* LEGAL PAGES */
  .legal-page { max-width: 720px; margin: 0 auto; padding: 60px 48px 100px; }
  .legal-page h1 { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }
  .legal-page .legal-date { font-size: 13px; color: var(--muted); margin-bottom: 48px; }
  .legal-page h2 { font-size: 16px; font-weight: 700; margin: 32px 0 10px; color: var(--text); letter-spacing: -0.01em; }
  .legal-page p { font-size: 14px; color: var(--muted2); line-height: 1.8; margin-bottom: 12px; }
  .legal-page ul { padding-left: 20px; margin-bottom: 12px; }
  .legal-page ul li { font-size: 14px; color: var(--muted2); line-height: 1.8; margin-bottom: 4px; }
  .legal-page a { color: var(--accent); text-decoration: none; }
  .legal-page a:hover { text-decoration: underline; }

  @media (max-width: 720px) {
    .site-footer { flex-direction: column; gap: 12px; text-align: center; padding: 20px; }
  }

  @media (max-width: 720px) {
    .nav { padding: 14px 20px; }
    .hero, .wizard-wrap, .results-wrap, .setup-page { padding-left: 20px; padding-right: 20px; }
    .results-grid { grid-template-columns: 1fr; }
    .field-group.cols2 { grid-template-columns: 1fr; }
    .option-grid { grid-template-columns: 1fr; }
    .option-grid.cols3 { grid-template-columns: repeat(2, 1fr); }
    .sidebar-sticky { position: static; }
    .kv-key { width: 100px; }
  }
`;

// SVG icons (no emojis)
const Icon = ({ name }) => {
  const icons = {
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    film: <><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
  };
  return <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{icons[name]}</svg>;
};

const OFFER_TYPES = [
  { id: "dtc_product", label: "E-Commerce", title: "Physical Product", desc: "DTC sale, ships to customer" },
  { id: "digital_product", label: "Digital", title: "Digital Product / SaaS", desc: "Course, ebook, software" },
  { id: "lead_gen_local", label: "Local", title: "Local Service", desc: "Book calls for a local business" },
  { id: "lead_gen_online", label: "Online", title: "Online Service / Coaching", desc: "Consultants, coaches, agencies" },
  { id: "event", label: "Event", title: "Event / Webinar", desc: "Drive registrations" },
  { id: "app", label: "App", title: "App Install", desc: "Drive mobile downloads" },
];

const FUNNEL_STAGES = [
  { id: "cold", label: "Cold", title: "No awareness", desc: "Audience has never heard of you" },
  { id: "warm", label: "Warm", title: "Some awareness", desc: "Retargeting, email list, past visitors" },
  { id: "hot", label: "Hot", title: "Ready to buy", desc: "Cart abandoners, direct intent" },
];

const SETUP_STEPS = [
  { num: 1, title: "Create a Facebook Account", desc: "Go to facebook.com and sign up or log in. Meta Ads requires a personal Facebook profile as the owner — you cannot run ads as a business alone.", tip: "Use a real name and real email. Fake accounts get banned before you spend a dollar." },
  { num: 2, title: "Create a Facebook Business Page", desc: "Go to facebook.com/pages/create. Choose Business or Brand, fill in your business name, category, and add a profile photo and cover image.", tip: "Your page needs to look real. Add a bio, a profile photo, and at least one post before running ads." },
  { num: 3, title: "Set Up Meta Business Suite", desc: "Go to business.facebook.com and create a Business account. This is your central dashboard — you'll manage pages, ad accounts, pixels, and assets from here.", tip: "Do not skip this and go straight to Ads Manager. Business Suite is the proper layer above it." },
  { num: 4, title: "Create Your Ad Account", desc: "Inside Business Suite, go to Business Settings → Accounts → Ad Accounts → Add → Create New Ad Account. Set your currency and time zone — you cannot change these later.", tip: "Set your currency and timezone correctly. A mismatch causes reporting headaches forever." },
  { num: 5, title: "Add a Payment Method", desc: "Go to Billing and Payments inside your Ad Account settings. Add a credit or debit card. Meta charges your card when you hit your billing threshold or monthly, whichever comes first.", tip: "Use a card with no international transaction fees if you can. Meta's billing entity is sometimes in Ireland." },
  { num: 6, title: "Install the Meta Pixel", desc: "In Events Manager inside Business Suite, create a Pixel and install it on your website. Shopify, WordPress, and Webflow have one-click integrations. Otherwise paste the base code into your site's head tag.", tip: "Without the Pixel you are flying blind. Meta cannot optimise for conversions if it cannot see who converts. Install it before you spend anything." },
  { num: 7, title: "Verify Your Domain", desc: "Go to Business Settings → Brand Safety → Domains. Add and verify your domain via DNS record or HTML tag. This step became required after iOS 14 and unlocks conversion event tracking.", tip: "This takes 10 minutes and you will regret skipping it. Unverified domains get throttled conversion data." },
  { num: 8, title: "Configure Your Pixel Events", desc: "In Events Manager, set up the key events you want Meta to track: PageView, ViewContent, AddToCart, Purchase for e-commerce — or Lead and CompleteRegistration for lead gen. Use the Event Setup Tool for a no-code setup.", tip: "You can only optimise for events that have fired at least 50 times in 7 days. If you're new, start by optimising for a higher-funnel event like AddToCart while you build data." },
  { num: 9, title: "You're Ready to Build", desc: "Go to adsmanager.facebook.com. Confirm your ad account appears top left. Familiarise yourself with the three-layer structure: Campaign, Ad Set, Ad. You'll spend most time at Ad Set (targeting, budget) and Ad (creative) level.", tip: "Build the campaign exactly as specified in your plan. Do not freelance the settings until you have real data." },
];

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
    "whyThisEvent": "Why this event specifically",
    "utmAdvice": "UTM parameter setup"
  },
  "expectations": {
    "realisticCPL": "Realistic cost per lead OR cost per purchase for their offer/budget",
    "learningPhase": "How long and how many results before they have real data",
    "whenToKill": "Specific signal to kill an ad set that is not working",
    "whenToScale": "Specific signal they have found a winner"
  },
  "commonMistakes": ["3-4 specific mistakes people make with this exact offer type and budget range"],
  "week1Checklist": ["6-8 specific action items to complete before or on launch day"],
  "visualBrief": {
    "concept": "Describe a specific visual/video concept for their top ad",
    "style": "Visual style direction",
    "textOverlay": "What text overlay if any",
    "thumbnailAdvice": "For video: thumbnail advice"
  }
}

Be extremely specific to their offer, budget, and situation. Do not give generic advice. If their budget is under $1,000/month, adjust your advice accordingly. Respond ONLY with the JSON object, no markdown, no preamble.`;
}

export default function AdPlanPro() {
  const [page, setPage] = useState("home");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    offerType: "", businessName: "", offerDesc: "", budget: "",
    pricePoint: "", location: "", targetAudience: "",
    funnelStage: "", existingAssets: "", goal: "",
  });
  const [result, setResult] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Analysing your offer type and budget",
    "Building campaign structure",
    "Generating targeting recommendations",
    "Writing ad copy examples",
    "Finalising your creative brief",
    "Campaign plan ready",
  ];

  const META_TIPS = [
    { label: "The 50-event rule", tip: "Meta's algorithm needs 50 conversion events per week to exit the Learning Phase. If your budget can't deliver that, optimise for a higher-funnel event — like Lead instead of Purchase — to give the algorithm enough signal." },
    { label: "Why broad targeting works at scale", tip: "Advantage+ broad targeting outperforms interest stacking — but only above ~$100/day. Below that, your budget gets diluted across too many user types before the algorithm finds its feet. Interest stacking concentrates your signal." },
    { label: "The first 3 seconds are everything", tip: "On Meta, 65% of people who watch 3 seconds will watch 10. Your hook isn't the first line — it's the first frame. Pattern interrupt, bold text overlay, or direct address before you say a word." },
    { label: "CPM is your canary", tip: "A rising CPM usually means your creative has fatigued or your audience is too small. A high CPM from day one usually means your creative isn't stopping the scroll. Low CTR + high CPM = creative problem, not targeting problem." },
    { label: "Never touch a learning ad set", tip: "Every significant edit — budget change over 20%, audience edit, creative swap — resets the Learning Phase. Let new ad sets run untouched for at least 5-7 days unless they're spending nothing at all." },
    { label: "The real job of an ad", tip: "Your ad doesn't need to sell. It needs to qualify and click. The landing page sells. Ads that try to do both usually do neither — they're too long, too detailed, and too slow to hook a cold audience." },
    { label: "Mobile first, always", tip: "Over 80% of Meta ad impressions are on mobile. Design your creative vertically (9:16), keep your copy under 125 characters before the 'See more' cutoff, and test your landing page on a real phone before spending a cent." },
    { label: "Retargeting is cheap and ignored", tip: "Website visitors who've seen your brand convert at 3-5x the rate of cold traffic — but most small advertisers never set it up. A simple retargeting ad set with a $5/day budget will outperform most cold campaigns dollar-for-dollar." },
    { label: "Social proof beats claims", tip: "'Trusted by 500+ clients' outperforms 'The best cleaning service in Austin'. Specificity and proof convert. If you don't have testimonials yet, a before/after, a result stat, or even a Google review screenshot will beat any clever headline." },
    { label: "Kill fast, scale slow", tip: "Kill underperforming ad sets after they've spent 2-3x your target CPA with no conversions. But scale winners slowly — increase budget by 20% every 2-3 days. Jumping budget resets learning and often tanks performance." },
  ];

  const [tipIndex, setTipIndex] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const STEPS = [
    { label: "Step 1 of 5", title: "Tell us about your offer", desc: "This shapes everything — campaign type, targeting, and creative direction." },
    { label: "Step 2 of 5", title: "Budget and pricing", desc: "Be honest here. We'll build a realistic plan for what you actually have." },
    { label: "Step 3 of 5", title: "Your audience", desc: "Who actually buys this, and where are they?" },
    { label: "Step 4 of 5", title: "Context and goals", desc: "A few final details to make your plan as specific as possible." },
    { label: "Step 5 of 5", title: "Complete your order", desc: "One campaign plan, tailored to your exact offer and budget." },
  ];

  const canNext = [
    form.offerType && form.businessName && form.offerDesc,
    form.budget && form.pricePoint,
    form.targetAudience && form.funnelStage,
    true,
    false,
  ][step];

  async function generate(formOverride) {
    const activeForm = formOverride || form;
    setPage("loading");
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(s => Math.min(s + 1, loadingSteps.length - 2));
    }, 1200);

    try {
      const response = await fetch("https://adplan-api-production.up.railway.app/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: buildPrompt(activeForm) }],
        }),
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const jsonPattern = /```json\n?|```\n?/g; const clean = text.replace(jsonPattern, "").trim();
      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch(e) {
        throw new Error("Failed to parse response");
      }
      clearInterval(interval);
      setLoadingStep(loadingSteps.length - 1);
      setTimeout(() => { setResult(parsed); setPage("results"); }, 600);
    } catch (e) {
      clearInterval(interval);
      setResult({ error: true });
      setPage("results");
    }
  }

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    // Load GHL embed script
    if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      document.body.appendChild(script);
    }
    return () => el.remove();
  }, []);

  useEffect(() => {
    // Check if returning from GHL payment
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "true") {
      // Clean the URL
      window.history.replaceState({}, "", window.location.pathname);
      // Restore form from localStorage
      const saved = localStorage.getItem("metplan_form");
      if (saved) {
        const savedForm = JSON.parse(saved);
        setForm(savedForm);
        localStorage.removeItem("metplan_form");
        // Small delay to let state settle then generate
        setTimeout(() => generate(savedForm), 100);
      }
    }
  }, []);

  useEffect(() => {
    if (page !== "loading") return;
    const interval = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIndex(i => (i + 1) % META_TIPS.length);
        setTipVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, [page]);

  const resetAll = () => {
    setPage("home"); setStep(0); setResult(null);
    setForm({ offerType: "", businessName: "", offerDesc: "", budget: "", pricePoint: "", location: "", targetAudience: "", funnelStage: "", existingAssets: "", goal: "" });
  };

  // HOME
  if (page === "home") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-dot"/> MetPlan <span className="nav-pill">Beta</span></div>
        <div className="nav-tabs">
          <button className="nav-tab active">Build Campaign</button>
          <button className="nav-tab" onClick={() => setPage("setup")}>Account Setup</button>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-eyebrow">Meta Ads — Built by Practitioners</div>
        <h1>Run ads like you've been doing it <em>for years.</em></h1>
        <p>Answer 10 questions. Get a complete, expert-level Meta campaign plan — targeting, budget, copy, creative direction, and more.</p>
        <div className="hero-price">
          <strong>$5 per campaign plan</strong>
          <span className="price-badge">Early Access</span>
          <span>No subscription</span>
        </div>
        <div style={{ marginTop: 40 }}>
          <button className="btn btn-primary btn-big" style={{ maxWidth: 340, margin: "0 auto" }} onClick={() => setPage("wizard")}>
            Build My Campaign Plan
          </button>
          <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--muted)" }}>
            New to Meta ads?{" "}
            <button onClick={() => setPage("setup")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 500 }}>
              Set up your account first
            </button>
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto 80px", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { icon: "target", title: "Targeting Strategy", desc: "Broad vs interest-based, Advantage+ guidance, audience sizing — calibrated for your exact budget." },
            { icon: "edit", title: "Copy and Creative Brief", desc: "Hooks, primary text, CTAs, and a visual concept brief ready to hand to a designer or creator." },
            { icon: "chart", title: "Realistic Benchmarks", desc: "Expected CPL or ROAS, when to kill an ad set, when to scale — no generic ranges." },
          ].map(f => (
            <div key={f.title} className="section-card" style={{ marginBottom: 0 }}>
              <div className="section-icon-box" style={{ marginBottom: 14 }}><Icon name={f.icon} /></div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.01em" }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted2)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );

  // SETUP
  if (page === "setup") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-dot"/> MetPlan <span className="nav-pill">Beta</span></div>
        <div className="nav-tabs">
          <button className="nav-tab" onClick={() => setPage("home")}>Build Campaign</button>
          <button className="nav-tab active">Account Setup</button>
        </div>
      </nav>
      <div className="setup-page">
        <div style={{ marginBottom: 48 }}>
          <div className="hero-eyebrow">Before You Run Ads</div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em" }}>Set Up Your Meta Ad Account</h2>
          <p style={{ fontSize: 15, color: "var(--muted2)", lineHeight: 1.7, maxWidth: 560 }}>Complete every step below before building your first campaign. Skipping steps — especially Pixel and domain verification — will cost you real money in wasted ad spend.</p>
        </div>
        <div className="setup-steps">
          {SETUP_STEPS.map((s, i) => (
            <div key={s.num} className="setup-step" style={{ animationDelay: `${i * 0.06}s` }}>
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
          <button className="btn btn-primary btn-big" style={{ maxWidth: 380 }} onClick={() => setPage("wizard")}>
            Account Ready — Build My Campaign
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );

  // WIZARD
  if (page === "wizard") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-dot"/> MetPlan <span className="nav-pill">Beta</span></div>
        <div className="nav-tabs">
          <button className="nav-tab" onClick={resetAll}>Home</button>
          <button className="nav-tab" onClick={() => setPage("setup")}>Account Setup</button>
        </div>
      </nav>
      <div className="wizard-wrap" style={{ paddingTop: 48 }}>
        <div className="step-indicator">
          {[0,1,2,3,4].map((i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
                {i < step ? <Icon name="check" /> : i + 1}
              </div>
              {i < 3 && <div className={`step-line ${i < step ? "done" : ""}`} />}
            </div>
          ))}
        </div>

        <div className="step-card">
          <div className="step-label">{STEPS[step].label}</div>
          <div className="step-title">{STEPS[step].title}</div>
          <div className="step-desc">{STEPS[step].desc}</div>

          {step === 0 && <>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted2)", marginBottom: 10, letterSpacing: "0.02em" }}>What type of offer are you running?</div>
            <div className="option-grid" style={{ marginBottom: 28 }}>
              {OFFER_TYPES.map(o => (
                <div key={o.id} className={`option-card ${form.offerType === o.id ? "selected" : ""}`} onClick={() => set("offerType", o.id)}>
                  <div className="option-card-label">{o.label}</div>
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
                <textarea placeholder="e.g. Residential cleaning in Austin TX. First-time customers get 20% off." value={form.offerDesc} onChange={e => set("offerDesc", e.target.value)} />
              </div>
            </div>
          </>}

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
              <strong>On smaller budgets:</strong> Meta's algorithm needs data to optimise. Expect a 2-4 week learning period where results look rough. Don't panic-kill ads before you have 50+ events. Your plan will account for this.
            </div>
          </>}

          {step === 2 && <>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted2)", marginBottom: 10, letterSpacing: "0.02em" }}>Where is this audience in their journey?</div>
            <div className="option-grid cols3" style={{ marginBottom: 28 }}>
              {FUNNEL_STAGES.map(s => (
                <div key={s.id} className={`option-card ${form.funnelStage === s.id ? "selected" : ""}`} onClick={() => set("funnelStage", s.id)}>
                  <div className="option-card-label">{s.label}</div>
                  <div className="option-card-title">{s.title}</div>
                  <div className="option-card-desc">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="field-group">
              <div className="field">
                <label>Who is your ideal customer?</label>
                <textarea placeholder="e.g. Women 28-45 in Austin TX, homeowners with kids, too busy to clean, household income $80k+." value={form.targetAudience} onChange={e => set("targetAudience", e.target.value)} />
              </div>
              <div className="field">
                <label>Target Location</label>
                <input placeholder="e.g. Austin, TX — 25 mile radius" value={form.location} onChange={e => set("location", e.target.value)} />
              </div>
            </div>
          </>}

          {step === 3 && <>
            <div className="field-group">
              <div className="field">
                <label>Main campaign goal</label>
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
                <label>Existing assets — optional but important</label>
                <textarea placeholder="e.g. Website with 200 visitors/month, email list of 400, no prior Meta ads. Or: pixel with 300 events, ran ads 6 months ago." value={form.existingAssets} onChange={e => set("existingAssets", e.target.value)} />
              </div>
            </div>
            <div className="info-box">
              <strong>You're about to generate your plan.</strong> The output is specific to your offer, budget, and situation — not generic advice.
            </div>
          </>}

          {step === 4 && <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Meta Ads Campaign Plan</div>
                  <div style={{ fontSize: 12, color: "var(--muted2)", marginTop: 3 }}>Full strategy for {form.businessName} · ${form.budget}/mo budget</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)", fontFamily: "Playfair Display, serif" }}>$5</div>
              </div>
            </div>
            <div style={{ borderRadius: 10, overflow: "hidden", background: "var(--bg)", minHeight: 1120 }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/qj26frfXrz5EVPGSZ9GL"
                style={{ width: "100%", height: "800px", border: "none", borderRadius: 8 }}
                id="inline-qj26frfXrz5EVPGSZ9GL"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="MetPlan Order Form"
                data-height="undefined"
                data-layout-iframe-id="inline-qj26frfXrz5EVPGSZ9GL"
                data-form-id="qj26frfXrz5EVPGSZ9GL"
                title="MetPlan Order Form"
              />
            </div>
            <div style={{ marginTop: 12, textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
              Secured by Stripe · All sales final · Plan generates immediately after payment
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={() => setStep(3)}>← Back to edit details</button>
            </div>
          </>}

          <div className="btn-row" style={{ marginTop: 28 }}>
            {step > 0 && step !== 4 && <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>Back</button>}
            {step < 4 && <button className="btn btn-primary" disabled={!canNext} onClick={() => {
              if (step === 3) {
                // Save form before going to payment step
                localStorage.setItem("metplan_form", JSON.stringify(form));
              }
              setStep(s => s + 1);
            }}>Continue</button>}
          </div>
        </div>
      </div>
    </div>
  );

  // LOADING
  if (page === "loading") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-dot"/> MetPlan <span className="nav-pill">Beta</span></div>
      </nav>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "64px 48px 80px" }}>

        {/* Top: spinner + title */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="loader-ring" />
          <div className="loading-title">Building your campaign plan...</div>
          <div className="loading-subtitle">This takes 20–40 seconds. We're generating a fully tailored strategy, not a template.</div>
          <div className="loading-warning">Please do not refresh or close this page</div>
        </div>

        {/* Progress steps */}
        <div className="loading-steps" style={{ marginBottom: 48 }}>
          {loadingSteps.map((s, i) => (
            <div key={i} className={`loading-step ${i <= loadingStep ? "done" : ""}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="ls-check">{i <= loadingStep ? "✓" : ""}</div>
              {s}
            </div>
          ))}
        </div>

        {/* Rotating tip card */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 12, padding: "24px 28px",
          opacity: tipVisible ? 1 : 0,
          transform: tipVisible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--accent)",
            marginBottom: 10,
          }}>
            While you wait — Meta Ads tip
          </div>
          <div style={{
            fontSize: 15, fontWeight: 700, marginBottom: 8,
            letterSpacing: "-0.01em", color: "var(--text)",
            fontFamily: "Playfair Display, serif",
          }}>
            {META_TIPS[tipIndex].label}
          </div>
          <div style={{ fontSize: 14, color: "var(--muted2)", lineHeight: 1.7 }}>
            {META_TIPS[tipIndex].tip}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 6 }}>
            {META_TIPS.map((_, i) => (
              <div key={i} style={{
                width: i === tipIndex ? 20 : 6, height: 6,
                borderRadius: 3,
                background: i === tipIndex ? "var(--accent)" : "var(--border)",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  // RESULTS
  if (page === "results") {
    if (!result || result.error) return (
      <div className="app">
        <nav className="nav"><div className="nav-logo"><div className="nav-logo-dot"/> MetPlan</div></nav>
        <div style={{ textAlign: "center", padding: "80px 40px" }}>
          <div style={{ width: 48, height: 48, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Icon name="alert" />
          </div>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, marginBottom: 10 }}>Something went wrong</div>
          <p style={{ color: "var(--muted2)", marginBottom: 32, fontSize: 14 }}>We could not generate your plan. Please try again.</p>
          <button className="btn btn-primary" onClick={() => { setPage("wizard"); setStep(0); }}>Try Again</button>
        </div>
      </div>
    );

    const r = result;
    const SectionCard = ({ icon, title, children }) => (
      <div className="section-card">
        <div className="section-header">
          <div className="section-icon-box"><Icon name={icon} /></div>
          <div className="section-title">{title}</div>
        </div>
        {children}
      </div>
    );

    return (
      <div className="app">
        <nav className="nav">
          <div className="nav-logo"><div className="nav-logo-dot"/> MetPlan <span className="nav-pill">Beta</span></div>
          <div className="nav-tabs">
            <button className="nav-tab" onClick={resetAll}>New Campaign</button>
            <button className="nav-tab" onClick={() => setPage("setup")}>Account Setup</button>
          </div>
        </nav>
        <div className="results-wrap">
          <div className="results-header">
            <div className="results-tag">Campaign Plan Ready</div>
            <div className="results-title">{form.businessName} — Meta Ads Campaign Plan</div>
            <div className="results-sub">{form.offerType.replace(/_/g, " ")} &middot; ${form.budget}/mo &middot; {form.location || "National"}</div>
          </div>

          <div className="results-grid">
            <div>
              <SectionCard icon="target" title="Campaign Strategy">
                <div className="doc-list">
                  <div className="doc-field"><div className="doc-label">Objective</div><div className="doc-value">{r.campaignStrategy?.objective}</div></div>
                  <div className="doc-field"><div className="doc-label">Budget Strategy</div><div className="doc-value">{r.campaignStrategy?.budgetStrategy}</div></div>
                  <div className="doc-field"><div className="doc-label">Bid Strategy</div><div className="doc-value">{r.campaignStrategy?.bidStrategy}</div></div>
                </div>
                {r.campaignStrategy?.warmupAdvice && <div className="info-box" style={{ marginTop: 16 }}>{r.campaignStrategy.warmupAdvice}</div>}
              </SectionCard>

              <SectionCard icon="users" title="Targeting Settings">
                <div className="doc-list">
                  <div className="doc-field"><div className="doc-label">Approach</div><div className="doc-value">{r.targeting?.audienceApproach}</div></div>
                  <div className="doc-field"><div className="doc-label">Primary Audience</div><div className="doc-value">{r.targeting?.primaryAudience}</div></div>
                  <div className="doc-field"><div className="doc-label">Advantage+ Audience</div><div className="doc-value">{r.targeting?.broadWarning}</div></div>
                  <div className="doc-field"><div className="doc-label">Geography</div><div className="doc-value">{r.targeting?.geographicSettings}</div></div>
                  <div className="doc-field"><div className="doc-label">Audience Size</div><div className="doc-value">{r.targeting?.audienceSizeAdvice}</div></div>
                </div>
              </SectionCard>

              <SectionCard icon="film" title="Ad Creative Direction">
                <div className="doc-list">
                  <div className="doc-field"><div className="doc-label">Top Format</div><div className="doc-value">{r.adCreative?.topFormat}</div></div>
                  <div className="doc-field"><div className="doc-label">Secondary Test</div><div className="doc-value">{r.adCreative?.secondaryFormat}</div></div>
                  <div className="doc-field"><div className="doc-label">Hook Strategy</div><div className="doc-value">{r.adCreative?.hookStrategy}</div></div>
                  <div className="doc-field"><div className="doc-label">How Many Creatives</div><div className="doc-value">{r.adCreative?.creativeCount}</div></div>
                  <div className="doc-field"><div className="doc-label">Video vs Static</div><div className="doc-value">{r.adCreative?.videoVsStatic}</div></div>
                </div>
              </SectionCard>

              <SectionCard icon="edit" title="Ad Copy Examples">
                <div style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 14 }}>
                  Lead angle: <span style={{ color: "var(--text)" }}>{r.copyFramework?.primaryAngle}</span>
                </div>
                <div className="ad-examples">
                  <div className="ad-card">
                    <div className="ad-card-label">Headline</div>
                    <div className="ad-card-text" style={{ fontWeight: 600, fontSize: 15 }}>{r.copyFramework?.headline}</div>
                  </div>
                  <div className="ad-card">
                    <div className="ad-card-label">Primary Text</div>
                    <div className="ad-card-text">{r.copyFramework?.primaryText}</div>
                    <div className="ad-card-cta">{r.copyFramework?.cta}</div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon="image" title="Visual / Creative Brief">
                <div className="doc-list">
                  <div className="doc-field"><div className="doc-label">Concept</div><div className="doc-value">{r.visualBrief?.concept}</div></div>
                  <div className="doc-field"><div className="doc-label">Visual Style</div><div className="doc-value">{r.visualBrief?.style}</div></div>
                  <div className="doc-field"><div className="doc-label">Text Overlay</div><div className="doc-value">{r.visualBrief?.textOverlay}</div></div>
                  <div className="doc-field"><div className="doc-label">Thumbnail</div><div className="doc-value">{r.visualBrief?.thumbnailAdvice}</div></div>
                </div>
              </SectionCard>

              <SectionCard icon="globe" title="Landing Page and Tracking">
                <div className="doc-list">
                  <div className="doc-field"><div className="doc-label">Page Type</div><div className="doc-value">{r.landingPage?.pageType}</div></div>
                  <div className="doc-field"><div className="doc-label">Must-Haves</div><div className="doc-value">{r.landingPage?.mustHaves}</div></div>
                  <div className="doc-field"><div className="doc-label">Mobile</div><div className="doc-value">{r.landingPage?.mobileWarning}</div></div>
                  <div className="doc-field"><div className="doc-label">Optimise For</div><div className="doc-value">{r.pixelAndTracking?.keyEvent}</div></div>
                  <div className="doc-field"><div className="doc-label">Why This Event</div><div className="doc-value">{r.pixelAndTracking?.whyThisEvent}</div></div>
                  <div className="doc-field"><div className="doc-label">UTM Setup</div><div className="doc-value">{r.pixelAndTracking?.utmAdvice}</div></div>
                </div>
              </SectionCard>

              <SectionCard icon="chart" title="Realistic Expectations">
                <div className="doc-list">
                  <div className="doc-field"><div className="doc-label">Expected CPL / CPA</div><div className="doc-value">{r.expectations?.realisticCPL}</div></div>
                  <div className="doc-field"><div className="doc-label">Learning Phase</div><div className="doc-value">{r.expectations?.learningPhase}</div></div>
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="signal-item">
                    <div className="signal-dot" style={{ background: "#ef4444" }} />
                    <span><strong style={{ color: "var(--text)", fontSize: 12 }}>Kill signal —</strong> {r.expectations?.whenToKill}</span>
                  </div>
                  <div className="signal-item">
                    <div className="signal-dot" style={{ background: "var(--success)" }} />
                    <span><strong style={{ color: "var(--text)", fontSize: 12 }}>Scale signal —</strong> {r.expectations?.whenToScale}</span>
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon="alert" title="Common Mistakes to Avoid">
                <div>
                  {(r.commonMistakes || []).map((m, i) => (
                    <div key={i} className="mistake-item">
                      <span className="mistake-x">✕</span>
                      {m}
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* SIDEBAR */}
            <div className="sidebar-sticky">
              <div className="summary-card">
                <div className="summary-label">Campaign Summary</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {[
                    { label: "Business", val: form.businessName },
                    { label: "Monthly Budget", val: `$${form.budget}/mo`, gold: true },
                    { label: "Price Point", val: `$${form.pricePoint}` },
                    { label: "Location", val: form.location || "National" },
                    { label: "Funnel Stage", val: form.funnelStage },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: item.gold ? "var(--accent)" : "var(--text)", textTransform: item.label === "Funnel Stage" ? "capitalize" : "none" }}>{item.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-label">Launch Checklist</div>
                <div className="checklist">
                  {(r.week1Checklist || []).map((item, i) => (
                    <div key={i} className="check-item">
                      <div className="check-circle" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary btn-big" onClick={resetAll} style={{ marginBottom: 10 }}>
                New Campaign
              </button>
              <button className="btn btn-ghost btn-big" onClick={() => window.print()}>
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // FOOTER COMPONENT
  const Footer = () => (
    <footer className="site-footer">
      <div className="footer-copy">© {new Date().getFullYear()} MetPlan. All rights reserved.</div>
      <div className="footer-links">
        <button className="footer-link" onClick={() => setPage("terms")}>Terms of Service</button>
        <button className="footer-link" onClick={() => setPage("privacy")}>Privacy Policy</button>
      </div>
    </footer>
  );

  // TERMS OF SERVICE
  if (page === "terms") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-dot"/> MetPlan <span className="nav-pill">Beta</span></div>
        <div className="nav-tabs">
          <button className="nav-tab" onClick={resetAll}>Home</button>
        </div>
      </nav>
      <div className="legal-page">
        <h1>Terms of Service</h1>
        <div className="legal-date">Last updated: June 1, 2026</div>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using MetPlan ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service. These terms apply to all users who access or use MetPlan at metplan.net.</p>

        <h2>2. Description of Service</h2>
        <p>MetPlan is an AI-assisted Meta advertising campaign planning tool. Upon payment, the Service generates campaign recommendations based on the information you provide, including offer type, budget, target audience, and business details.</p>
        <p>The recommendations generated are for informational and strategic guidance purposes only. MetPlan is not a licensed advertising agency and does not manage, operate, or directly execute advertising campaigns on your behalf.</p>

        <h2>3. No Guarantee of Results</h2>
        <p>All campaign plans generated by MetPlan are AI-assisted recommendations based on current best practices and the information you provide. MetPlan makes no guarantees regarding:</p>
        <ul>
          <li>Advertising campaign performance or return on ad spend (ROAS)</li>
          <li>Lead generation outcomes or conversion rates</li>
          <li>Compliance with Meta's advertising policies, which may change without notice</li>
          <li>The accuracy or completeness of any specific recommendation</li>
        </ul>
        <p>Results vary significantly based on creative quality, market conditions, budget, offer strength, and many other factors outside MetPlan's control. You assume full responsibility for any advertising spend and its outcomes.</p>

        <h2>4. Payment and Refund Policy</h2>
        <p>MetPlan charges a per-campaign fee for each plan generated. All sales are final. Due to the immediate digital delivery of campaign plans, we do not offer refunds once a plan has been generated.</p>
        <p>If you experience a technical issue that prevents plan delivery, please contact us at <a href="mailto:support@metplan.net">support@metplan.net</a> within 48 hours and we will investigate and remedy the issue.</p>

        <h2>5. Your Responsibilities</h2>
        <p>By using MetPlan, you agree to:</p>
        <ul>
          <li>Provide accurate and truthful information when completing the campaign form</li>
          <li>Use generated plans in compliance with Meta's Advertising Policies and all applicable laws</li>
          <li>Take sole responsibility for all advertising decisions and ad spend</li>
          <li>Not resell, redistribute, or claim MetPlan's generated content as your own proprietary methodology</li>
        </ul>

        <h2>6. Intellectual Property</h2>
        <p>The MetPlan platform, its design, and underlying technology are the property of MetPlan. Campaign plans generated for you are licensed for your personal or business use. You may not resell generated plans as a standalone product or service.</p>

        <h2>7. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, MetPlan shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of revenue, loss of data, or loss of business opportunity, arising from your use of the Service or reliance on any generated campaign plan.</p>
        <p>MetPlan's total liability to you for any claim arising from use of the Service shall not exceed the amount you paid for the specific campaign plan in question.</p>

        <h2>8. Third-Party Platforms</h2>
        <p>MetPlan references Meta (Facebook/Instagram) advertising platforms. MetPlan is not affiliated with, endorsed by, or officially connected to Meta Platforms, Inc. All Meta product names and trademarks are the property of Meta Platforms, Inc.</p>

        <h2>9. Modifications to Service</h2>
        <p>MetPlan reserves the right to modify, suspend, or discontinue the Service at any time. Pricing may change with reasonable notice. Continued use of the Service after changes constitutes acceptance of the new terms.</p>

        <h2>10. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which MetPlan operates, without regard to conflict of law principles.</p>

        <h2>11. Contact</h2>
        <p>For questions about these Terms, contact us at <a href="mailto:support@metplan.net">support@metplan.net</a>.</p>
      </div>
      <Footer />
    </div>
  );

  // PRIVACY POLICY
  if (page === "privacy") return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-dot"/> MetPlan <span className="nav-pill">Beta</span></div>
        <div className="nav-tabs">
          <button className="nav-tab" onClick={resetAll}>Home</button>
        </div>
      </nav>
      <div className="legal-page">
        <h1>Privacy Policy</h1>
        <div className="legal-date">Last updated: June 1, 2026</div>

        <h2>1. Introduction</h2>
        <p>MetPlan ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our service at metplan.net.</p>

        <h2>2. Information We Collect</h2>
        <p>When you use MetPlan, we collect the following information:</p>
        <ul>
          <li><strong style={{color: "var(--text)"}}>Campaign form data</strong> — offer type, business name, budget, price point, target audience, and location that you enter to generate your plan</li>
          <li><strong style={{color: "var(--text)"}}>Payment information</strong> — handled entirely by Stripe and GoHighLevel. MetPlan does not store your card details</li>
          <li><strong style={{color: "var(--text)"}}>Contact information</strong> — name, email, and phone number collected at checkout via our payment provider</li>
          <li><strong style={{color: "var(--text)"}}>Usage data</strong> — basic analytics such as pages visited and time on site</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information collected to:</p>
        <ul>
          <li>Generate your Meta ads campaign plan</li>
          <li>Process your payment and provide receipts</li>
          <li>Send you your campaign plan and related communications</li>
          <li>Improve the quality of MetPlan's recommendations over time</li>
          <li>Send you relevant updates about MetPlan features and offers (you may opt out at any time)</li>
        </ul>

        <h2>4. Data Storage and Security</h2>
        <p>Campaign form data you submit is processed in real time to generate your plan and is not permanently stored on MetPlan's servers. Payment and contact data is stored securely by our payment processor (Stripe) and CRM provider (GoHighLevel), both of which maintain industry-standard security practices.</p>
        <p>We implement reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse.</p>

        <h2>5. Third-Party Services</h2>
        <p>MetPlan uses the following third-party services which may process your data:</p>
        <ul>
          <li><strong style={{color: "var(--text)"}}>Anthropic</strong> — powers the AI plan generation. Campaign form inputs are sent to Anthropic's API to generate your plan. Anthropic's privacy policy applies to this processing.</li>
          <li><strong style={{color: "var(--text)"}}>Stripe</strong> — payment processing. Stripe's privacy policy governs payment data handling.</li>
          <li><strong style={{color: "var(--text)"}}>GoHighLevel</strong> — CRM and contact management. Your contact details are stored in GoHighLevel for order fulfilment and follow-up communications.</li>
          <li><strong style={{color: "var(--text)"}}>Netlify</strong> — website hosting</li>
          <li><strong style={{color: "var(--text)"}}>Railway</strong> — API infrastructure</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>MetPlan uses minimal cookies necessary for the site to function. We do not use tracking cookies or third-party advertising cookies. You can disable cookies in your browser settings, though this may affect site functionality.</p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to personal data we hold about you</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Opt out of marketing communications at any time</li>
          <li>Lodge a complaint with your local data protection authority</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:support@metplan.net">support@metplan.net</a>.</p>

        <h2>8. Children's Privacy</h2>
        <p>MetPlan is not directed at individuals under the age of 18. We do not knowingly collect personal information from children.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Continued use of the Service after changes constitutes acceptance.</p>

        <h2>10. Contact Us</h2>
        <p>For any privacy-related questions or requests, contact us at <a href="mailto:support@metplan.net">support@metplan.net</a>.</p>
      </div>
      <Footer />
    </div>
  );

  return null;
}

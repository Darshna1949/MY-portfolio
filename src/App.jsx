// App.jsx — Root component: global CSS, Nav, Footer, page routing
// ─────────────────────────────────────────────────────────────
// Pages:
//   Home      →  Home.jsx
//   About     →  About.jsx
//   Projects  →  Projects.jsx
//   Contact   →  Contact.jsx
//
// Images:
//   images.js — base64 data for all 19 images from portfolio_content.docx
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";

/* ══════════════════════════════════════════════════════════════
   GLOBAL CSS
   All shared styles used across every page live here.
   Page-specific layout is handled inline inside each component.
══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=Epilogue:wght@400;500;600;700&display=swap');

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: #f5f0e8; overflow-x: hidden; }
::selection { background: rgba(180,106,42,.22); color: #1a1208; }

/* ── Font helpers ── */
.fra { font-family: 'Fraunces', Georgia, serif; }
.epi { font-family: 'Epilogue', system-ui, sans-serif; }

/* ── Nav links ── */
.nl {
  background: none; border: none; cursor: pointer;
  font-family: 'Epilogue', sans-serif; font-size: 11px; font-weight: 600;
  letter-spacing: .15em; text-transform: uppercase; color: #8c7b6b;
  padding: 4px 0; transition: color .2s; position: relative;
}
.nl::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 100%; height: 1.5px; background: #b46a2a;
  transform: scaleX(0); transform-origin: left; transition: transform .26s;
}
.nl:hover, .nl.on { color: #2c1a0a; }
.nl.on::after, .nl:hover::after { transform: scaleX(1); }

/* ── Buttons ── */
.bi {
  display: inline-flex; align-items: center; gap: 8px;
  background: #1e1208; color: #f5f0e8; border: none; cursor: pointer;
  font-family: 'Epilogue', sans-serif; font-size: 12px; font-weight: 600;
  padding: 12px 26px; letter-spacing: .08em; transition: all .22s;
}
.bi:hover { background: #3d2010; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(30,18,8,.2); }

.bs {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: #5c4a35; border: 1.5px solid #c4a882; cursor: pointer;
  font-family: 'Epilogue', sans-serif; font-size: 12px; font-weight: 600;
  padding: 12px 26px; letter-spacing: .08em; transition: all .22s;
}
.bs:hover { border-color: #b46a2a; color: #b46a2a; background: rgba(180,106,42,.05); }

/* ── Tags / chips ── */
.chip {
  background: rgba(140,110,75,.1); border: 1px solid rgba(140,110,75,.2);
  color: #8c6e4a; font-family: 'Epilogue', sans-serif;
  font-size: 10px; font-weight: 600; padding: 3px 10px; letter-spacing: .06em; white-space: nowrap;
}

/* ── Form inputs ── */
.fin {
  background: rgba(255,255,255,.6); border: 1.5px solid rgba(140,110,75,.22);
  color: #1e1208; font-family: 'Epilogue', sans-serif; font-size: 13px;
  padding: 13px 15px; width: 100%; transition: all .2s; outline: none;
}
.fin::placeholder { color: #b09a80; }
.fin:focus { border-color: #b46a2a; background: #fff; }

/* ── Dividers ── */
.hr { border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(140,110,75,.2), transparent); }

/* ── Page enter animation ── */
@keyframes pgIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.pg { animation: pgIn .5s cubic-bezier(.22,1,.36,1) both; }

/* ── Shell entrance animation ── */
@keyframes navIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
@keyframes footIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
nav { animation: navIn .55s cubic-bezier(.22,1,.36,1) both; }
footer { animation: footIn .55s .08s cubic-bezier(.22,1,.36,1) both; }

/* ── Hero stagger animations ── */
@keyframes up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes lineIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes typeLoop {
  0% { width: 0ch; }
  30% { width: 7ch; }
  72% { width: 7ch; }
  100% { width: 0ch; }
}
@keyframes caretBlink {
  0%, 50% { border-right-color: rgba(180,106,42,.9); }
  51%, 100% { border-right-color: transparent; }
}
.type-loop {
  display: inline-block;
  width: 0ch;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  border-right: 2px solid rgba(180,106,42,.9);
  animation: typeLoop 5.4s steps(7, end) infinite, caretBlink 1.2s step-end infinite;
}
.a1 { animation: up 1.05s .08s cubic-bezier(.22,1,.36,1) both; }
.a2 { animation: up 1.05s .22s cubic-bezier(.22,1,.36,1) both; }
.a3 { animation: up 1.05s .36s cubic-bezier(.22,1,.36,1) both; }
.a4 { animation: up 1.05s .50s cubic-bezier(.22,1,.36,1) both; }
.a5 { animation: up 1.05s .64s cubic-bezier(.22,1,.36,1) both; }
.al { transform-origin: left; animation: lineIn .95s .48s cubic-bezier(.22,1,.36,1) both; }

/* ── Scroll reveal ── */
.sr {
  opacity: 0; transform: translateY(18px);
  transition: opacity .62s cubic-bezier(.22,1,.36,1), transform .62s cubic-bezier(.22,1,.36,1);
}
.sr.in { opacity: 1; transform: none; }

/* ── Marquee ── */
@keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.mqi {
  display: flex;
  width: max-content;
  white-space: nowrap;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  animation: mq 40s linear infinite;
}

/* ── Paper grain texture overlay ── */
.grain::after {
  content: ''; position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: .025; pointer-events: none; z-index: 9999;
}

/* ── Lightbox ── */
.lb {
  position: fixed; inset: 0; background: rgba(10,6,2,.95); z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  animation: pgIn .2s ease both; cursor: zoom-out; padding: 20px;
}
.lbc {
  position: fixed; top: 16px; right: 20px; background: none; border: none;
  color: rgba(245,240,232,.5); font-size: 36px; cursor: pointer;
  line-height: 1; font-weight: 300; transition: color .2s; z-index: 2001; font-family: sans-serif;
}
.lbc:hover { color: #b46a2a; }

/* ── Project card ── */
.pc {
  background: #ede6d6; border: 1px solid rgba(140,110,75,.16);
  transition: border-color .22s, box-shadow .22s, transform .22s;
}
.pc:hover { border-color: rgba(180,106,42,.28); box-shadow: 0 10px 28px rgba(60,30,8,.12); transform: translateY(-4px); }

/* ── Category filter button ── */
.fb {
  background: transparent; border: 1.5px solid rgba(140,110,75,.2);
  color: #8c7b6b; font-family: 'Epilogue', sans-serif;
  font-size: 10px; font-weight: 700; padding: 6px 14px;
  letter-spacing: .1em; text-transform: uppercase; cursor: pointer; transition: all .2s;
}
.fb.on, .fb:hover { border-color: #b46a2a; color: #b46a2a; background: rgba(180,106,42,.06); }

/* ── External link button ── */
.xl {
  display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px;
  border: 1.5px solid rgba(180,106,42,.38); color: #b46a2a;
  font-family: 'Epilogue', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: .09em; text-transform: uppercase; text-decoration: none; transition: all .2s;
}
.xl:hover { background: #b46a2a; color: #f5f0e8; }

/* ── Image gallery cell ──
   The key rules that fix alignment:
   • width: 100%  → fills the grid column
   • height: auto → grows to match the image's true proportions
   • NO fixed heights, NO object-fit: cover on gallery images
   ────────────────────────────────────────────────────── */
.img-cell {
  overflow: hidden; border: 1px solid rgba(140,110,75,.15);
  background: #e4d9c6; cursor: default; position: relative;
  transition: border-color .22s, box-shadow .22s, transform .22s;
}
.img-cell:hover { border-color: #b46a2a; box-shadow: 0 10px 24px rgba(60,30,8,.12); transform: translateY(-2px); }
.img-cell img { width: 100%; height: auto; display: block; transition: transform .35s; }
.img-cell:hover img { transform: scale(1.025); }
.img-cell .ov {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(20,12,4,0); transition: background .22s; pointer-events: none;
}
.img-cell:hover .ov { background: rgba(20,12,4,.08); }
.img-cell .ov svg { opacity: 0; transition: opacity .22s; }
.img-cell:hover .ov svg { opacity: 1; }

/* ── Skills chips ── */
.skill-chip-live {
  display: inline-flex;
  align-items: center;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transition: transform .32s cubic-bezier(.22,1,.36,1), background-color .32s ease, color .32s ease, border-color .32s ease, box-shadow .32s ease;
}
.skill-chip-live:hover {
  transform: translate3d(0, -2px, 0);
  background: rgba(180,106,42,.10);
  color: #5d3818;
  border-color: #b46a2a;
  box-shadow: 0 8px 18px rgba(60,30,8,.08);
}

/* ── Tool progress line animation ── */
@keyframes lineGrow {
  from { width: 0; }
  to { width: var(--target, 0%); }
}
@keyframes lineShine {
  from { transform: translateX(-130%); }
  to { transform: translateX(130%); }
}
.tool-track {
  height: 5px;
  background: rgba(140,110,75,.15);
  overflow: hidden;
  border-radius: 999px;
}
.tool-fill {
  position: relative;
  height: 100%;
  width: var(--target, 0%);
  background: linear-gradient(90deg,#b46a2a,#d4924a);
  border-radius: 999px;
}
.sr.in .tool-fill {
  animation: lineGrow 1.15s cubic-bezier(.22,1,.36,1) both;
}
.sr.in .tool-fill::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 34%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.38), transparent);
  animation: lineShine 1.25s .4s ease-out both;
}

/* ── Hero portrait motion ── */
@keyframes floatY {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -4px, 0); }
}
.hero-oval {
  will-change: transform;
  transform: translate3d(0, 0, 0);
  animation: floatY 7s ease-in-out infinite;
}

/* ── Accessibility: reduce motion ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

/* ── Contact layout helpers ── */
.contact-hero-wrap,
.contact-content-wrap {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.contact-content-wrap {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 60px;
  align-items: start;
}

.contact-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}

@media (max-width: 1100px) {
  .contact-content-wrap {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

@media (max-width: 760px) {
  .contact-form-grid {
    grid-template-columns: 1fr;
  }

  .contact-section {
    padding-bottom: 64px !important;
  }

  .contact-form-card,
  .contact-success-card {
    padding: 20px !important;
  }

  .contact-row {
    align-items: flex-start !important;
  }

  .contact-row-value {
    font-size: 12px !important;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .contact-hero-title {
    line-height: .95 !important;
  }
}

@media (max-width: 900px) {
  .nav-links {
    gap: 14px !important;
  }

  .nav-links .nl {
    font-size: 10px !important;
    letter-spacing: .1em !important;
  }
}

@media (max-width: 720px) {
  nav {
    padding: 0 14px !important;
  }

  .nav-links {
    display: flex !important;
    gap: 10px !important;
    max-width: 68vw;
    overflow-x: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .nav-links::-webkit-scrollbar {
    display: none;
  }

  .nav-links .nl {
    flex: 0 0 auto;
    font-size: 9px !important;
  }

  footer {
    justify-content: center !important;
    text-align: center;
  }

  footer > div {
    width: 100%;
    justify-content: center;
  }
}
`;

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
const PX = "clamp(22px,6vw,88px)";

function Nav({ page, setPage }) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${PX}`,
      background:      sc ? "rgba(245,240,232,.96)" : "transparent",
      backdropFilter:  sc ? "blur(16px)"            : "none",
      borderBottom:    sc ? "1px solid rgba(140,110,75,.14)" : "none",
      transition: "all .3s",
    }}>
      {/* Logo */}
      <button onClick={() => setPage("home")} className="fra" style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.1rem", fontWeight:700, color:"#2c1a0a" }}>
        Darshna<span style={{ color:"#b46a2a" }}>.</span>
      </button>

      {/* Page links */}
      <div className="nav-links" style={{ display:"flex", gap:"24px" }}>
        {["home","about","projects","contact"].map(p => (
          <button key={p} className={`nl${page===p?" on":""}`} onClick={() => setPage(p)}>{p}</button>
        ))}
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop:"1px solid rgba(140,110,75,.15)", padding:`22px ${PX}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px", background:"#ede6d6" }}>
      <button onClick={() => setPage("home")} className="fra" style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1rem", color:"#8c7b6b" }}>
        Darshna<span style={{ color:"#b46a2a" }}>.</span>
      </button>
      <span className="epi" style={{ fontSize:"11px", color:"#a09080" }}>© 2025 Darshna Gangoda · All rights reserved</span>
      <div style={{ display:"flex", gap:"18px" }}>
        {["home","about","projects","contact"].map(p => (
          <button key={p} className="nl" onClick={() => setPage(p)}>{p}</button>
        ))}
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   ROOT APP — client-side routing
══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");

  const go = useCallback(p => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPage(p);
  }, []);

  const pages = { home: Home, about: About, projects: Projects, contact: Contact };
  const Page = pages[page] || Home;

  return (
    <>
      <style>{CSS}</style>
      <div className="grain" style={{ background:"#f5f0e8", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <Nav page={page} setPage={go} />
        <main key={page} style={{ flex:1 }}>
          <Page setPage={go} />
        </main>
        <Footer setPage={go} />
      </div>
    </>
  );
}
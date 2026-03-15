// Projects.jsx — Projects page with image galleries and links
import { useState, useEffect } from "react";
import { I } from "../assets/projectsImages.js";

const PX = "clamp(22px,6vw,88px)";

function useReveal() {
  useEffect(() => {
    let obs;
    const t = setTimeout(() => {
      obs = new IntersectionObserver(
        es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
        { threshold: 0.06 }
      );
      document.querySelectorAll(".sr").forEach(el => obs.observe(el));
    }, 40);
    return () => {
      clearTimeout(t);
      obs?.disconnect();
    };
  }, []);
}

/* ── Single image cell ──
   width fills its grid column, height is 100% auto — no cropping */
function ImgCell({ imgKey }) {
  const src = I[imgKey];

  if (!src) {
    return (
      <div className="img-cell" style={{ display:"grid", placeItems:"center", minHeight:"140px", color:"#a09080", fontFamily:"'Epilogue',sans-serif", fontSize:"11px", letterSpacing:".08em", textTransform:"uppercase" }}>
        Image Missing
      </div>
    );
  }

  return (
    <div className="img-cell" style={{ cursor:"default" }}>
      <img src={src} alt="" />
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:"#b46a2a", marginBottom:"12px" }}>
      {text}
    </div>
  );
}

/* ══════════════════════════════
   PROJECT DATA
══════════════════════════════ */
const PROJECTS = [
  {
    id: "01",
    title: "Social Media & Event Poster Designs",
    cat: "Graphic Design",
    year: "2024 - Present",
    tags: ["Canva", "Instagram", "Social Media", "Print"],
    desc: "As part of the department media team, I designed posters for Instagram announcements, departmental events, and placement updates balancing typography, colors, and visual hierarchy for instant readability.",
    links: [],
  },
  {
    id: "02",
    title: "Department Newsletter Design",
    cat: "Editorial Layout",
    year: "2024–25",
    tags: ["Canva", "Typography", "Editorial", "Print"],
    desc: "Designed and structured multiple newsletter pages highlighting department activities, faculty achievements, student accomplishments, and academic updates with a consistent editorial grid and clear visual grouping.",
    yearSections: [
      {
        title: "IT Department Newsletter - 2024",
        volume: "Volume 9 | Jan 2024 - Dec 2024",
        imageKey: "image5_png",
        overview:
          "Designed and edited the IT Department Newsletter showcasing academic initiatives, workshops, faculty achievements, and student innovations during the 2024 academic year.",
        highlights: [
          "Orientation & Induction Programme 2024",
          "Industrial visit to ISRO Space Exhibition",
          "Expert talks on REST vs MVC architecture",
          "Cybersecurity workshop and academic seminars",
          "Faculty research publications and FDP participation",
          "Student achievements",
          "Hackathon achievements such as Odoo Combat and Spark The Summer Hackathon",
        ],
        contribution: [
          "Newsletter layout design and formatting",
          "Content alignment and page layout consistency",
          "Graphic elements and visual composition",
          "Collaboration with editorial team",
        ],
      },
      {
        title: "IT Department Newsletter - 2025",
        volume: "Volume 10 | Jan 2025 - Dec 2025",
        imageKey: "image9_png",
        overview:
          "Designed and contributed to the annual newsletter of the Information Technology Department. The newsletter documents departmental activities, workshops, achievements, research contributions, and student accomplishments throughout the academic year.",
        highlights: [
          "Orientation & Student Induction Program 2025",
          "Workshops on Artificial Intelligence and Web Designing",
          "Expert sessions on NLP, GenAI, and Soft Skills",
          "Cybersecurity Bootcamp and Industry Visits",
          "Faculty Development and Research Publications",
          "Student achievements including NASA Space Apps and Smart India Hackathon",
          "Hackathon victories and innovation initiatives",
        ],
        contribution: [
          "Newsletter layout design and page composition",
          "Content structuring and visual hierarchy",
          "Image placement and typography alignment",
          "Overall design and editing coordination",
        ],
      },
    ],
    links: [
      { href: "https://www.vgecg.ac.in/uploads/New-Letter/it/newsletter-it-vgec-2024.pdf", label: "View Full Newsletter 2024" },
      { href: "https://www.vgecg.ac.in/uploads/New-Letter/it/IT_NewsLetter_2025.pdf",       label: "View Full Newsletter 2025" },
    ],
  },
  {
    id: "03",
    title: "TechTreasure Magazine Vol. 06",
    cat: "Magazine Design",
    year: "2025",
    tags: ["Canva", "Editorial", "Layout", "Publication"],
    desc: "Contributed to the design and editorial layout of the department annual technology magazine — organizing articles, images, and visual elements into a structured and engaging publication covering emerging tech, startups, alumni, and student projects.",
    links: [
      { href: "https://vgecg.ac.in/uploads/New-Letter/it/IT-VGEC-TechTreasure_vol6-2025.pdf", label: "View Full Magazine 2025" },
    ],
  },
  {
    id: "04",
    title: "Parking Pass Management System",
    cat: "UI / UX Design",
    year: "2025",
    tags: ["Figma", "UI Design", "UX", "Prototype"],
    desc: "Designed the complete user interface for an academic software project in Figma — focused on clear navigation, structured layouts, and a user-friendly experience across both desktop and mobile screens.",
    links: [],
  },
];

/* ══════════════════════════════
   GALLERY COMPONENTS
   Rule: img-cell fills column width, height is auto.
   No fixed-height containers — images show at true proportions.
══════════════════════════════ */

/* P01 — 3 posters (portrait ~0.8:1 and square ~1:1) */
function GalleryPosters() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"10px", alignItems:"start" }}>
      {["image2_png","image3_png","image4_png"].map(k => <ImgCell key={k} imgKey={k} />)}
    </div>
  );
}

/* P03 — 1 magazine cover (portrait ~0.71:1)
   200px wide on left, description text on right */
function GalleryMagazine() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"clamp(16px,3vw,28px)", alignItems:"start" }}>
      <div style={{ maxWidth:"220px" }}>
        <ImgCell imgKey="image13_png" />
      </div>
      <div>
        <div className="fra" style={{ fontSize:"18px", color:"#1e1208", fontWeight:700, marginBottom:"8px", lineHeight:1.2 }}>
          TechTreasure Volume 06, 2025
        </div>
        <p className="epi" style={{ fontSize:"13px", lineHeight:1.88, color:"#6a5040", marginBottom:"14px", fontWeight:400 }}>
          The department annual technology magazine presenting insights into emerging tech, global companies, startups, alumni perspectives, and student projects. I designed the visual layout, organized articles and graphical elements, and maintained consistent visual style across the publication.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
          {["Editorial Grid Layout","Typography Hierarchy","Color Consistency","Visual Identity"].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* P04 — 4 landscape desktop screens (1.54:1) in 2×2 grid
         2 very tall mobile screens (0.46:1) at 150px wide, side by side */
function GalleryUI() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
      <div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"10px", alignItems:"start" }}>
          {["image14_png","image15_png","image16_png","image17_png"].map(k => <ImgCell key={k} imgKey={k} />)}
        </div>
      </div>
      <div>
        <SectionLabel text="Mobile Screens" />
        <div style={{ display:"flex", gap:"12px", alignItems:"flex-start", flexWrap:"wrap" }}>
          {["image18_png","image19_png"].map(k => (
            <div key={k} style={{ width:"min(150px, calc(50% - 6px))", minWidth:"120px", flexShrink:0 }}>
              <ImgCell imgKey={k} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   PAGE
══════════════════════════════ */
export default function Projects() {
  useReveal();
  const [filter, setFilter] = useState("All");

  const cats = ["All","Graphic Design","Editorial Layout","Magazine Design","UI / UX Design"];
  const list = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  const galleries = {
    "01": <GalleryPosters />,
    "02": null,
    "03": <GalleryMagazine />,
    "04": <GalleryUI />,
  };

  const galleryLabels = {
    "01": "Poster Designs",
    "02": "Newsletter Pages",
    "03": "Magazine Cover",
    "04": "UI Screens",
  };

  return (
    <div className="pg" style={{ paddingTop:"60px" }}>
      {/* ── Dark header ── */}
      <section style={{ background:"#1e1208", padding:`60px ${PX} 0`, position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div className="a1" style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
            <div className="al" style={{ height:"1.5px", width:"38px", background:"#b46a2a" }} />
            <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#b46a2a" }}>Portfolio</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"clamp(18px,3vw,28px)", alignItems:"end", paddingBottom:"44px" }}>
            <h1 className="a2 fra" style={{ fontSize:"clamp(40px,8vw,82px)", lineHeight:.9, letterSpacing:"-.025em", color:"#f5f0e8" }}>
              All<br /><em style={{ color:"#b46a2a", fontWeight:300 }}>Projects</em>
            </h1>
            <div className="a3">
              <p className="epi" style={{ fontSize:"13px", lineHeight:1.85, color:"rgba(245,240,232,.35)", marginBottom:"16px", fontWeight:400 }}>
                Graphic design, editorial layout, and UI/UX work across academic and digital contexts.
              </p>
              {/* Category filter */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {cats.map(c => (
                  <button
                    key={c}
                    className={`fb epi${filter === c ? " on" : ""}`}
                    onClick={() => setFilter(c)}
                    style={{
                      borderColor: filter===c ? "#b46a2a" : "rgba(245,240,232,.13)",
                      color:       filter===c ? "#b46a2a" : "rgba(245,240,232,.33)",
                      background:  filter===c ? "rgba(180,106,42,.1)" : "transparent",
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cards ── */}
      <section style={{ padding:`44px ${PX} 96px`, background:"#f5f0e8" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", flexDirection:"column", gap:"36px" }}>
          {list.map((p, i) => (
            <div key={p.id} className="sr pc" style={{ transitionDelay:`${i*.05}s` }}>

              {/* Card header */}
              <div style={{ padding:"22px 26px 16px", borderBottom:"1px solid rgba(140,110,75,.12)" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"10px" }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px", flexWrap:"wrap" }}>
                      <span style={{ display:"inline-block", background:"#1e1208", color:"#f5f0e8", fontFamily:"'Epilogue',sans-serif", fontSize:"9px", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", padding:"3px 8px" }}>{p.id}</span>
                      <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#b46a2a" }}>{p.cat}</span>
                      <span className="chip">{p.year}</span>
                    </div>
                    <h2 className="fra" style={{ fontSize:"clamp(18px,2.2vw,27px)", color:"#1e1208", lineHeight:1.1, fontWeight:700 }}>{p.title}</h2>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", paddingTop:"4px" }}>
                    {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ padding:"14px 26px 16px", borderBottom:"1px solid rgba(140,110,75,.09)" }}>
                <p className="epi" style={{ fontSize:"13px", lineHeight:1.9, color:"#6a5040", fontWeight:400, maxWidth:"800px" }}>{p.desc}</p>

                {Array.isArray(p.yearSections) && p.yearSections.length > 0 && (
                  <div style={{ marginTop:"16px", display:"flex", flexDirection:"column", gap:"14px" }}>
                    {p.yearSections.map((sec) => (
                      <div key={sec.title} style={{ border:"1px solid rgba(140,110,75,.14)", background:"#f1eadb", padding:"14px" }}>
                        <h3 className="fra" style={{ fontSize:"clamp(16px,2vw,24px)", color:"#1e1208", marginBottom:"4px", lineHeight:1.1 }}>{sec.title}</h3>
                        <p className="epi" style={{ fontSize:"11px", color:"#8c7060", marginBottom:"10px", letterSpacing:".05em", textTransform:"uppercase", fontWeight:700 }}>{sec.volume}</p>

                        <p className="epi" style={{ fontSize:"12px", lineHeight:1.85, color:"#6a5040", marginBottom:"10px", fontWeight:400 }}>{sec.overview}</p>

                        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"18px", alignItems:"start" }}>
                          <div>
                            <ImgCell imgKey={sec.imageKey} />
                          </div>

                          <div>
                            <div style={{ marginBottom:"10px" }}>
                              <div className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#b46a2a", marginBottom:"6px" }}>Key Sections Included</div>
                              <ul className="epi" style={{ margin:"0 0 0 18px", padding:0, color:"#6a5040", lineHeight:1.75, fontSize:"12px" }}>
                                {sec.highlights.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <div className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#b46a2a", marginBottom:"6px" }}>My Contribution</div>
                              <ul className="epi" style={{ margin:"0 0 0 18px", padding:0, color:"#6a5040", lineHeight:1.75, fontSize:"12px" }}>
                                {sec.contribution.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery */}
              {galleries[p.id] && (
                <div style={{ padding:"18px 26px", borderBottom:p.links.length ? "1px solid rgba(140,110,75,.09)" : "none" }}>
                  <SectionLabel text={galleryLabels[p.id]} />
                  {galleries[p.id]}
                </div>
              )}

              {/* External links */}
              {p.links.length > 0 && (
                <div style={{ padding:"13px 26px", display:"flex", flexWrap:"wrap", gap:"8px", alignItems:"center" }}>
                  <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".13em", textTransform:"uppercase", color:"#a09080" }}>Full Document</span>
                  {p.links.map(l => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="xl epi">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 9L9 1M9 1H3.5M9 1V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

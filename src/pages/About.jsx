// About.jsx — About me page
import { useEffect } from "react";
import { I } from "../assets/aboutImages.js";

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

const SKILLS = [
  "Poster Design", "Social Media Design", "Editorial Layout",
  "Typography", "Visual Communication", "Basic UI Design",
];

const TOOLS = [
  { name: "Canva", desc: "Graphic Design & Visuals",   pct: 85 },
  { name: "Figma", desc: "UI Design & Prototyping",    pct: 70 },
];

const STATS = [
  { n: "4+", l: "Projects",  s: "Completed"   },
  { n: "2",  l: "Design",    s: "Tools Used"  },
  { n: "2",  l: "Years",     s: "of Practice" },
  { n: "6+", l: "Skills",    s: "Mastered"    },
];

export default function About({ setPage }) {
  useReveal();
  return (
    <div className="pg" style={{ paddingTop:"60px" }}>

      {/* ── HERO ── */}
      <section style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", minHeight:"50vh" }}>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:`72px ${PX}` }}>
          <div className="a1" style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"24px" }}>
            <div className="al" style={{ height:"1.5px", width:"38px", background:"#b46a2a" }} />
            <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#b46a2a" }}>About Me</span>
          </div>
          <h1 className="a2 fra" style={{ fontSize:"clamp(40px,7vw,82px)", lineHeight:.9, letterSpacing:"-.022em", color:"#1e1208" }}>
            The<br /><em style={{ color:"#b46a2a", fontWeight:300 }}>Designer</em><br />Behind the Work
          </h1>
        </div>
        <div style={{ background:"#e8dcc8", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div className="fra" style={{ position:"absolute", fontSize:"clamp(70px,9vw,120px)", fontWeight:900, fontStyle:"italic", color:"rgba(180,106,42,.07)", bottom:"-8%", right:"-3%", lineHeight:1, userSelect:"none" }}>DG</div>
        </div>
      </section>

      <hr className="hr" />

      {/* ── BIO + STATS ── */}
      <section style={{ padding:`68px ${PX}`, background:"#f5f0e8" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"clamp(26px,4vw,60px)", alignItems:"start" }}>

          {/* Bio */}
          <div className="sr">
            <h2 className="fra" style={{ fontSize:"clamp(22px,3vw,36px)", color:"#1e1208", lineHeight:1.2, marginBottom:"22px" }}>
              Where Technology<br />Meets Creative Vision
            </h2>
            <p className="epi" style={{ fontSize:"14px", lineHeight:1.95, color:"#6a5040", marginBottom:"16px", fontWeight:400 }}>
              Coming from an IT background, I developed a strong interest in the creative side of technology. My journey began with creating visual content such as posters, newsletters, and magazine layouts for the department media cell.
            </p>
            <p className="epi" style={{ fontSize:"14px", lineHeight:1.95, color:"#6a5040", fontWeight:400 }}>
              Through these experiences, I explored how typography, layout design, and visual structure can make information more engaging and impactful. I have also explored UI design using Figma to create user friendly digital interfaces.
            </p>
            <p className="epi" style={{ fontSize:"14px", lineHeight:1.95, color:"#6a5040", marginTop:"16px", fontWeight:400 }}>
              Along with UI/UX and web-based projects, I have a strong interest in visual communication and graphic design. I am currently exploring industry standard tools like Adobe Illustrator and Adobe Photoshop to further enhance my creative and design capabilities.
            </p>
          </div>

          {/* Stats grid — offset stagger */}
          <div className="sr" style={{ transitionDelay:".1s" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"10px" }}>
              {STATS.map((x,i) => (
                <div key={x.l} style={{ background:i%2===0?"#ede6d6":"#e8dcc8", border:"1px solid rgba(140,110,75,.16)", padding:"22px 15px", textAlign:"center" }}>
                  <div className="fra" style={{ fontSize:"42px", color:"#b46a2a", lineHeight:1, fontWeight:900 }}>{x.n}</div>
                  <div className="epi" style={{ fontSize:"11px", fontWeight:700, color:"#2c1a0a", marginTop:"8px", letterSpacing:".04em" }}>{x.l}</div>
                  <div className="epi" style={{ fontSize:"10px", color:"#a09080", marginTop:"2px" }}>{x.s}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <hr className="hr" />

      {/* ── SKILLS + TOOLS ── */}
      <section style={{ padding:`60px ${PX}`, background:"#ede6d6" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"clamp(26px,4vw,60px)" }}>

          {/* Skills */}
          <div className="sr">
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
              <div style={{ height:"1.5px", width:"26px", background:"#b46a2a" }} />
              <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#8c6040" }}>Design Skills</span>
            </div>
            <h2 className="fra" style={{ fontSize:"clamp(22px,2.8vw,34px)", color:"#1e1208", lineHeight:1.2, marginBottom:"22px" }}>What I Can Do</h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {SKILLS.map((s, i) => (
                <span
                  key={s}
                  className="skill-chip-live"
                  style={{
                    background:"transparent",
                    border:"1.5px solid #c4a882",
                    color:"#7a5c3a",
                    fontFamily:"'Epilogue',sans-serif",
                    fontSize:"11px",
                    fontWeight:600,
                    padding:"7px 15px",
                    letterSpacing:".06em",
                    animationDelay:`${i * 0.12}s`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="sr" style={{ transitionDelay:".1s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
              <div style={{ height:"1.5px", width:"26px", background:"#b46a2a" }} />
              <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#8c6040" }}>Tools</span>
            </div>
            <h2 className="fra" style={{ fontSize:"clamp(22px,2.8vw,34px)", color:"#1e1208", lineHeight:1.2, marginBottom:"22px" }}>Software I Use</h2>
            {TOOLS.map(t => (
              <div key={t.name} style={{ background:"#f5f0e8", border:"1px solid rgba(140,110,75,.15)", padding:"16px 18px", marginBottom:"9px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
                  <div>
                    <div className="fra" style={{ fontSize:"19px", color:"#1e1208", fontWeight:700 }}>{t.name}</div>
                    <div className="epi" style={{ fontSize:"11px", color:"#a09080", marginTop:"2px" }}>{t.desc}</div>
                  </div>
                  <span className="fra" style={{ fontSize:"24px", color:"#b46a2a", fontWeight:900, lineHeight:1 }}>{t.pct}%</span>
                </div>
                <div className="tool-track">
                  <div className="tool-fill" style={{ "--target": `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── QUOTE + CTA ── */}
      <section style={{ padding:`60px ${PX} 96px`, background:"#1e1208" }}>
        <div className="sr" style={{ maxWidth:"700px", margin:"0 auto", display:"flex", gap:"20px", alignItems:"flex-start" }}>
          <div style={{ width:"2px", flexShrink:0, height:"64px", background:"linear-gradient(to bottom,#b46a2a,transparent)" }} />
          <div>
            <p className="fra" style={{ fontSize:"clamp(19px,3vw,32px)", color:"#f5f0e8", lineHeight:1.35, fontStyle:"italic", fontWeight:300, marginBottom:"22px" }}>
              "Design is not just what it looks like — it is how it works and how it makes people feel."
            </p>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              <button className="bi epi" onClick={() => setPage("projects")} style={{ background:"#b46a2a" }}>See My Projects</button>
              <button className="bs epi" onClick={() => setPage("contact")} style={{ borderColor:"rgba(245,240,232,.2)", color:"rgba(245,240,232,.6)" }}>Let us Connect</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Home.jsx — Landing page
import { useEffect, useState } from "react";
import { I } from "../assets/homeImages.js";

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

export default function Home({ setPage }) {
  useReveal();
  const [heroSrc, setHeroSrc] = useState("/images/professional-portrait.jpg");

  return (
    <div className="pg">

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", paddingTop:"60px", overflow:"hidden" }}>

        {/* Left — text */}
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:`72px ${PX}` }}>
          <div className="a1" style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"30px" }}>
            <div className="al" style={{ height:"1.5px", width:"38px", background:"#b46a2a" }} />
            <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#b46a2a" }}>Portfolio</span>
          </div>

          <h1 className="a2 fra" style={{ fontSize:"clamp(46px,6.5vw,80px)", lineHeight:.88, letterSpacing:"-.02em", color:"#1e1208", marginBottom:"20px" }}>
            <span className="type-loop">Darshna</span><br /><em style={{ color:"#b46a2a", fontWeight:300 }}>Gangoda</em>
          </h1>

          <div className="a3" style={{ marginBottom:"22px" }}>
            <span className="epi" style={{ display:"inline-block", padding:"8px 16px", border:"1.5px solid rgba(180,106,42,.34)", background:"rgba(180,106,42,.06)", fontSize:"12px", fontWeight:600, color:"#8c5030", letterSpacing:".05em" }}>
              Graphic Design &amp; UI Design Enthusiast
            </span>
          </div>

          <p className="a4 epi" style={{ fontSize:"14px", lineHeight:1.9, color:"#6a5040", maxWidth:"390px", marginBottom:"36px", fontWeight:400 }}>
            A creative design enthusiast with hands-on experience in poster design, newsletter layout, magazine design, and UI design — combining creativity with clean design.
          </p>

          <div className="a5" style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
            <button className="bi epi" onClick={() => setPage("projects")}>View My Work</button>
            <button className="bs epi" onClick={() => setPage("contact")}>Get in Touch</button>
          </div>
        </div>

        {/* Right — image-only visual (same side position) */}
        <div style={{ background:"#e8dcc8", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", padding:"28px" }}>
          <div className="hero-oval" style={{ position:"relative", zIndex:1 }}>
            <div style={{ width:"min(80vw,300px)", aspectRatio:"3/4", borderRadius:"999px", overflow:"hidden", border:"6px solid #fff", boxShadow:"0 12px 30px rgba(40,20,7,.16)" }}>
              <img
                src={heroSrc}
                alt="Professional portrait of Darshna Gangoda"
                onError={() => setHeroSrc(I.image1_jpeg)}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}
              />
            </div>
          </div>

          {/* Subtle background lines */}
          {[0,1,2].map(i => <div key={i} style={{ position:"absolute", left:`${20+i*26}%`, top:0, bottom:0, width:"1px", background:"rgba(140,110,75,.06)" }} />)}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:"#1e1208", padding:"13px 0", overflow:"hidden" }}>
        <div className="mqi epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(245,240,232,.38)" }}>
          {[...Array(8)].map((_,i) => (
            <span key={i} style={{ marginRight:"48px" }}>
              Poster Design <span style={{ color:"#b46a2a", margin:"0 8px" }}>✦</span>
              Editorial Layout <span style={{ color:"#b46a2a", margin:"0 8px" }}>✦</span>
              UI Design <span style={{ color:"#b46a2a", margin:"0 8px" }}>✦</span>
              Typography <span style={{ color:"#b46a2a", margin:"0 8px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding:`84px ${PX}`, background:"#f5f0e8" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>

          <div className="sr" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"clamp(22px,4vw,44px)", alignItems:"end", marginBottom:"44px" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                <div style={{ height:"1.5px", width:"26px", background:"#b46a2a", flexShrink:0 }} />
                <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"#8c6040" }}>Featured Work</span>
              </div>
              <h2 className="fra" style={{ fontSize:"clamp(30px,4.5vw,52px)", color:"#1e1208", lineHeight:.95, letterSpacing:"-.02em" }}>
                Selected<br /><em style={{ color:"#b46a2a", fontWeight:300 }}>Projects</em>
              </h2>
            </div>
            <div>
              <p className="epi" style={{ fontSize:"13px", lineHeight:1.88, color:"#8c7060", marginBottom:"18px", fontWeight:400 }}>
                A curated selection of design work spanning editorial, graphic, and UI/UX design.
              </p>
              <button className="bs epi" onClick={() => setPage("projects")}>See All Projects →</button>
            </div>
          </div>

          {/* 2-column preview cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"14px" }}>
            {[
              { img:"image2_png",  cat:"Graphic Design",  year:"2024 - Present",    title:"Social Media & Event Poster Designs", desc:"Posters for Instagram announcements, departmental events and placement updates." },
              { img:"image9_png",  cat:"Editorial Layout", year:"2024–25", title:"Department Newsletter Design",         desc:"Newsletter pages highlighting department activities and academic updates." },
            ].map((p,i) => (
              <div key={i} className="sr pc" style={{ transitionDelay:`${i*.08}s`, cursor:"pointer", overflow:"hidden" }} onClick={() => setPage("projects")}>
                <div style={{ overflow:"hidden", background:"#e4d9c6" }}>
                  <img src={I[p.img]} alt={p.title} style={{ width:"100%", height:"220px", objectFit:"cover", objectPosition:"top", display:"block", transition:"transform .3s" }}
                    onMouseEnter={e => e.target.style.transform="scale(1.04)"}
                    onMouseLeave={e => e.target.style.transform="none"} />
                </div>
                <div style={{ padding:"17px 19px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"5px" }}>
                    <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#b46a2a" }}>{p.cat}</span>
                    <span className="chip">{p.year}</span>
                  </div>
                  <h3 className="fra" style={{ fontSize:"clamp(14px,1.4vw,18px)", color:"#1e1208", lineHeight:1.15, fontWeight:700, marginBottom:"6px" }}>{p.title}</h3>
                  <p className="epi" style={{ fontSize:"12px", lineHeight:1.8, color:"#8c7060", fontWeight:400 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

// Contact.jsx — Contact page with form and info
import { useState, useEffect } from "react";

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

const CONTACT_INFO = [
  { lbl:"Email",    val:"gangodadarshna@gmail.com",  href:"mailto:gangodadarshna@gmail.com",                          icon:"✉"  },
  { lbl:"LinkedIn", val:"darshna-gangoda-519a13324", href:"https://www.linkedin.com/in/darshna-gangoda-519a13324/",   icon:"in" },
  { lbl:"Phone",    val:"+91 84698 67271",            href:"tel:8469867271",                                            icon:"☎"  },
];

const OPEN_FOR = ["Design Internship","UI/UX Projects","Freelance Work","Collaborations"];

export default function Contact() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setError("Please fill in name, email, and message.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    const finalSubject = subject || `Portfolio message from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    const mailto = `mailto:gangodadarshna@gmail.com?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="pg" style={{ paddingTop:"60px" }}>

      {/* ── HERO ── */}
      <section style={{ background:"#e8dcc8", padding:`60px ${PX}`, position:"relative", overflow:"hidden" }}>
        {/* Decorative letter */}
        <div className="fra" style={{ position:"absolute", right:"-2%", top:"-10%", fontSize:"clamp(150px,22vw,340px)", fontWeight:900, fontStyle:"italic", color:"rgba(180,106,42,.06)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>C</div>

        <div className="contact-hero-wrap" style={{ position:"relative", zIndex:1 }}>
          <div className="a1" style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
            <div className="al" style={{ height:"1.5px", width:"38px", background:"#b46a2a" }} />
            <span className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:"#b46a2a" }}>Get in Touch</span>
          </div>
          <h1 className="a2 fra" style={{ fontSize:"clamp(40px,8vw,82px)", lineHeight:.9, letterSpacing:"-.025em", color:"#1e1208" }}>
            Let us Build<br />Something<br /><em style={{ color:"#b46a2a", fontWeight:300 }}>Beautiful</em>
          </h1>
        </div>
      </section>

      <hr className="hr" />

      {/* ── SPLIT: INFO + FORM ── */}
      <section style={{ padding:`60px ${PX} 96px`, background:"#f5f0e8" }}>
        <div className="contact-content-wrap">

          {/* Info column */}
          <div className="sr">
            <p className="epi" style={{ fontSize:"14px", lineHeight:1.95, color:"#6a5040", marginBottom:"28px", fontWeight:400 }}>
              I would love to collaborate on creative projects, internship opportunities, or freelance work. Feel free to reach out through any channel below.
            </p>

            {/* Contact rows */}
            {CONTACT_INFO.map(x => (
              <a
                key={x.lbl}
                href={x.href}
                target={x.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                style={{ display:"flex", alignItems:"center", gap:"13px", padding:"13px 15px", background:"#ede6d6", border:"1px solid rgba(140,110,75,.15)", marginBottom:"8px", textDecoration:"none", transition:"border-color .2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#b46a2a"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(140,110,75,.15)"}
              >
                <div style={{ width:"33px", height:"33px", background:"rgba(180,106,42,.09)", border:"1px solid rgba(180,106,42,.17)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ color:"#b46a2a", fontSize:"12px", fontWeight:700, fontFamily:"'Epilogue',sans-serif" }}>{x.icon}</span>
                </div>
                <div>
                  <div className="epi" style={{ fontSize:"9px", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"#a09080" }}>{x.lbl}</div>
                  <div className="epi" style={{ fontSize:"13px", color:"#3d2010", marginTop:"2px", fontWeight:500 }}>{x.val}</div>
                </div>
              </a>
            ))}

            {/* Open For */}
            <div style={{ marginTop:"20px", padding:"15px 17px", background:"#1e1208" }}>
              <div className="epi" style={{ fontSize:"10px", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:"#b46a2a", marginBottom:"8px" }}>Open For</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {OPEN_FOR.map(o => (
                  <span key={o} style={{ background:"rgba(180,106,42,.13)", border:"1px solid rgba(180,106,42,.24)", color:"rgba(245,240,232,.65)", fontFamily:"'Epilogue',sans-serif", fontSize:"10px", fontWeight:600, padding:"3px 9px", letterSpacing:".06em" }}>
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="sr" style={{ transitionDelay:".1s" }}>
            {sent ? (
              /* Success state */
              <div style={{ textAlign:"center", padding:"48px 30px", background:"#ede6d6", border:"1px solid rgba(140,110,75,.18)" }}>
                <div style={{ width:"52px", height:"52px", background:"rgba(180,106,42,.1)", border:"1.5px solid rgba(180,106,42,.28)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 11l4 4L16 5" stroke="#b46a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="fra" style={{ fontSize:"23px", color:"#1e1208", marginBottom:"8px", fontWeight:700 }}>Message Sent!</h3>
                <p className="epi" style={{ fontSize:"13px", color:"#6a5040", lineHeight:1.8 }}>Thank you for reaching out. I will get back to you soon.</p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} style={{ background:"#ede6d6", border:"1px solid rgba(140,110,75,.15)", padding:"28px" }}>
                <h3 className="fra" style={{ fontSize:"22px", color:"#1e1208", marginBottom:"4px", fontWeight:700 }}>Send a Message</h3>
                <p className="epi" style={{ fontSize:"11px", color:"#a09080", marginBottom:"20px" }}>I respond within 24 hours.</p>

                <div className="contact-form-grid">
                  <input className="fin" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                  <input className="fin" type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
                </div>
                <input    className="fin" placeholder="Subject"   value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} style={{ marginBottom:"8px" }} />
                <textarea className="fin" rows={5} placeholder="Your Message..." value={form.message} onChange={e => setForm({...form, message:e.target.value})} style={{ resize:"vertical", display:"block", marginBottom:"12px" }} />

                {error && (
                  <p className="epi" style={{ fontSize:"11px", color:"#9b3d2b", marginBottom:"10px" }}>
                    {error}
                  </p>
                )}

                <button type="submit" className="bi epi" style={{ width:"100%", justifyContent:"center", padding:"13px", fontSize:"13px" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

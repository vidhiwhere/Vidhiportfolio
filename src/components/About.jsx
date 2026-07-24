import React, { useEffect, useRef, useState } from "react";

const NAV = [
    { label: "HOME", href: "/" },
    { label: "PROJECTS", href: "/projects" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
];

const FACTS = [
    { icon: "📍", tag: "AVAILABLE", title: "Based In", desc: "Delhi, India — open to remote and hybrid roles across time zones.", tags: ["Remote", "Hybrid"] },
    { icon: "🧭", tag: "ACTIVE", title: "Experience", desc: "3+ years shipping full-stack products, from schema design to pixel-level UI polish.", tags: ["Full-Stack", "Shipping"] },
    { icon: "🎯", tag: "FOCUS", title: "What I Do", desc: "ASP.NET Core and Blazor backends paired with React front ends, plus a growing interest in dev tooling.", tags: [".NET", "React"] },
];

const STACK = [
    { icon: "🧩", tag: "FRONTEND", title: "Interfaces", desc: "Building interfaces people can click, type into, and trust.", tags: ["React", "Blazor", "JavaScript", "Tailwind CSS"] },
    { icon: "🗄️", tag: "BACKEND", title: "Systems", desc: "APIs and data layers that stay fast and boring in the best way.", tags: ["ASP.NET Core", "Node.js", "SQL Server", "MongoDB"] },
    { icon: "🛠️", tag: "TOOLING", title: "Workflow", desc: "The everyday tools that keep shipping smooth and repeatable.", tags: ["Git", "Docker", "Figma", "Azure"] },
];

const RAIL = [
    { id: "identity", label: "IDENTITY" },
    { id: "stack", label: "STACK" },
    { id: "contact", label: "CONTACT" },
];

export default function AboutPage() {
    const [active, setActive] = useState("identity");
    const sectionRefs = useRef({});

    useEffect(() => {
        const onScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight * 0.35;
            let current = RAIL[0].id;
            RAIL.forEach((r) => {
                const el = sectionRefs.current[r.id];
                if (el && el.offsetTop <= scrollPos) current = r.id;
            });
            setActive(current);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        const el = sectionRefs.current[id];
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="about-root">
            <style>{`
        .about-root{
          --ink:#111111;
          --ink-soft:#6b6b6b;
          --white:#ffffff;
          --grey-bg:#d4d4d1;
          --grey-card:#e9e9e6;
          --grey-tag:#9c9c98;
          --accent:#f4e000;
          background:var(--grey-bg);
          color:var(--ink);
          font-family:'JetBrains Mono', monospace;
          min-height:100vh;
        }
        .about-root *{ box-sizing:border-box; }

        /* ---------- nav ---------- */
        .nav{
          display:flex; align-items:center; justify-content:space-between;
          padding:0 32px; background:var(--grey-card); border-bottom:4px solid var(--ink);
          flex-wrap:wrap;
        }
        .brand{ font-size:clamp(26px,4vw,40px); font-weight:800; padding:24px 0; }
        .brand .dot{ color:var(--accent); }
        .navlinks{ display:flex; }
        .navlinks a{
          display:flex; align-items:center; gap:10px; padding:24px 26px; font-weight:800;
          font-size:15px; letter-spacing:.04em; color:var(--ink); text-decoration:none;
          background:var(--grey-bg); border-left:1px solid rgba(0,0,0,.12); cursor:pointer;
        }
        .navlinks a span{ color:var(--accent); font-weight:800; }
        .navlinks a.active, .navlinks a:hover{ background:var(--ink); color:var(--white); }
        .navlinks a.active span, .navlinks a:hover span{ color:var(--accent); }

        /* ---------- hero ---------- */
        .hero{ position:relative; background:var(--grey-bg); padding:64px 32px 0; overflow:hidden; }
        .hero h1{
          font-size:clamp(40px,8vw,90px); font-weight:800; margin:0; line-height:.95;
          text-transform:uppercase; letter-spacing:-.01em;
        }
        .hero .sub{ font-size:15px; color:var(--ink-soft); font-weight:700; letter-spacing:.05em; margin:14px 0 40px; }
        .hero-band{ height:130px; background:var(--ink); position:relative; }
        .hero-strip{ height:14px; background:var(--accent); }

        /* ---------- section header (ALL PROJECTS style) ---------- */
        .section{ padding:44px 32px 8px; }
        .section-head{ display:flex; align-items:baseline; justify-content:space-between; margin-bottom:26px; flex-wrap:wrap; gap:10px; }
        .section-head h2{ font-size:clamp(26px,5vw,42px); font-weight:800; margin:0; text-transform:uppercase; }
        .section-head .meta{ font-size:13px; color:var(--ink-soft); font-weight:700; letter-spacing:.05em; }

        /* ---------- cards ---------- */
        .card-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; padding-bottom:48px; }
        @media (max-width:900px){ .card-grid{ grid-template-columns:1fr; } }
        .card{
          background:var(--white); border:1px solid rgba(0,0,0,.15); border-radius:10px; overflow:hidden;
          display:flex; flex-direction:column;
        }
        .card-top{
          display:flex; align-items:center; justify-content:space-between; padding:12px 16px;
          background:var(--grey-card); border-bottom:1px solid rgba(0,0,0,.12);
        }
        .card-dots{ display:flex; gap:6px; }
        .card-dots span{ width:9px; height:9px; border-radius:50%; background:rgba(0,0,0,.35); display:block; }
        .card-tag{
          background:var(--accent); color:var(--ink); font-size:11px; font-weight:800;
          letter-spacing:.08em; padding:4px 10px; border-radius:4px;
        }
        .card-body{ padding:22px 20px 24px; flex:1; display:flex; flex-direction:column; }
        .card-icon{ font-size:30px; margin-bottom:14px; }
        .card-title{ font-size:20px; font-weight:800; margin:0 0 10px; }
        .card-desc{ font-size:14px; line-height:1.6; color:#3a3a3a; margin:0 0 18px; flex:1; }
        .card-tags{ display:flex; flex-wrap:wrap; gap:8px; }
        .card-tags span{
          background:var(--grey-tag); color:var(--white); font-size:11px; font-weight:700;
          letter-spacing:.03em; padding:6px 10px; border-radius:4px;
        }

        /* ---------- contact ---------- */
        .contact-band{
          background:var(--ink); color:var(--white); margin:0 32px 48px; border-radius:10px;
          padding:44px 32px; display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:20px;
        }
        .contact-band h2{ font-size:clamp(24px,4vw,36px); font-weight:800; margin:0; text-transform:uppercase; }
        .contact-band h2 .hl{ background:var(--accent); color:var(--ink); padding:0 8px; }
        .cta-btn{
          font-family:'JetBrains Mono', monospace; font-weight:800; border:none; background:var(--accent);
          color:var(--ink); padding:14px 26px; font-size:13px; letter-spacing:.06em; border-radius:6px;
          cursor:pointer; text-decoration:none; display:inline-block; transition:transform .12s;
        }
        .cta-btn:hover{ transform:translateY(-2px); }

        /* ---------- floating right rail (like the FinTech/Gamification tabs) ---------- */
        .side-rail{
          position:fixed; right:22px; top:50%; transform:translateY(-50%); z-index:30;
          display:flex; flex-direction:column; gap:8px;
        }
        .side-tab{
          background:var(--grey-tag); color:var(--white); font-size:11px; font-weight:800;
          letter-spacing:.1em; padding:14px 8px; writing-mode:vertical-rl; text-align:center;
          border-radius:4px; cursor:pointer; transition:background .15s;
        }
        .side-tab.active, .side-tab:hover{ background:var(--ink); }
        .side-tab.active{ outline:2px solid var(--accent); }
        @media (max-width:700px){ .side-rail{ display:none; } }

        .about-footer{
          padding:20px 32px; font-size:11px; color:var(--ink-soft); letter-spacing:.05em;
          display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; font-weight:700;
          border-top:2px solid rgba(0,0,0,.12);
        }
        .about-footer a{ color:var(--ink-soft); text-decoration:none; border-bottom:1px dotted var(--ink-soft); }
        .about-footer a:hover{ color:var(--ink); }
      `}</style>

            <div className="side-rail">
                {RAIL.map((r) => (
                    <div
                        key={r.id}
                        className={`side-tab${active === r.id ? " active" : ""}`}
                        onClick={() => scrollTo(r.id)}
                    >
                        {r.label}
                    </div>
                ))}
            </div>

            <nav className="nav">
                <div className="brand">
                    vidhi<span className="dot">.</span>
                </div>
                <div className="navlinks">
                    {NAV.map((n) => (
                        <a key={n.label} href={n.href} className={n.label === "ABOUT" ? "active" : ""}>
                            <span>&gt;</span> {n.label}
                        </a>
                    ))}
                </div>
            </nav>

            <div className="hero">
                <h1>Hi I am Vidhi</h1>
                <p className="sub">Full-Stack Developer — ASP.NET Core · Blazor · React</p>
            </div>
            <div className="hero-band" />
            <div className="hero-strip" />

            <section id="identity" ref={(el) => (sectionRefs.current.identity = el)} className="section">
                <div className="section-head">
                    <h2>Know Who I Am</h2>
                    <span className="meta">3 highlights</span>
                </div>
                <div className="card-grid">
                    {FACTS.map((f) => (
                        <div className="card" key={f.title}>
                            <div className="card-top">
                                <div className="card-dots">
                                    <span /><span /><span />
                                </div>
                                <div className="card-tag">{f.tag}</div>
                            </div>
                            <div className="card-body">
                                <div className="card-icon">{f.icon}</div>
                                <h3 className="card-title">{f.title}</h3>
                                <p className="card-desc">{f.desc}</p>
                                <div className="card-tags">
                                    {f.tags.map((t) => (
                                        <span key={t}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="stack" ref={(el) => (sectionRefs.current.stack = el)} className="section">
                <div className="section-head">
                    <h2>Tech Stack</h2>
                    <span className="meta">3 groups</span>
                </div>
                <div className="card-grid">
                    {STACK.map((s) => (
                        <div className="card" key={s.title}>
                            <div className="card-top">
                                <div className="card-dots">
                                    <span /><span /><span />
                                </div>
                                <div className="card-tag">{s.tag}</div>
                            </div>
                            <div className="card-body">
                                <div className="card-icon">{s.icon}</div>
                                <h3 className="card-title">{s.title}</h3>
                                <p className="card-desc">{s.desc}</p>
                                <div className="card-tags">
                                    {s.tags.map((t) => (
                                        <span key={t}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact" ref={(el) => (sectionRefs.current.contact = el)} className="section">
                <div className="contact-band">
                    <h2>
                        Let's build <span className="hl">something</span>
                    </h2>
                    <a className="cta-btn" href="mailto:hello@vidhi.dev">
                        ✉ SAY HELLO
                    </a>
                </div>
            </section>

            <footer className="about-footer">
                <span>© 2026 VIDHI</span>
                <span>
                    <a href="#">TERMS</a> &nbsp; <a href="#">PRIVACY POLICY</a>
                </span>
            </footer>
        </div>
    );
}
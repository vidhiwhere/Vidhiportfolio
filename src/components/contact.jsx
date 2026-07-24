import React, { useState } from "react";

const TermiteSVG = () => (
    <svg viewBox="0 0 20 10">
        <ellipse cx="6" cy="5" rx="5" ry="3" fill="#f4d000" />
        <ellipse cx="15" cy="5" rx="3.2" ry="2.6" fill="#f4d000" />
    </svg>
);

const RoamerSVG = () => (
    <svg viewBox="0 0 20 10">
        <ellipse cx="6" cy="5" rx="5" ry="3" fill="#111111" />
        <ellipse cx="15" cy="5" rx="3.2" ry="2.6" fill="#111111" />
        <line x1="4" y1="7" x2="1" y2="9.5" stroke="#111111" strokeWidth="1" />
        <line x1="7" y1="7" x2="6" y2="9.8" stroke="#111111" strokeWidth="1" />
        <line x1="9" y1="6.5" x2="10" y2="9.3" stroke="#111111" strokeWidth="1" />
    </svg>
);

const PARTICULARS = [
    { tab: "01", label: "EMAIL", value: "vidhiam2005@gmail.com", walk: "walk-a" },
    { tab: "02", label: "PHONE", value: "+91 9625247370", walk: "walk-b" },
];

const REFERENCES = [
    { label: "GITHUB", value: "github.com/vidhiwhere", link: "https://github.com/vidhiwhere" },
    { label: "LINKEDIN", value: "linkedin.com/in/Vidhi-", link: "https://www.linkedin.com/in/vidhi-b215a4325/" },
    { label: "INSTAGRAM", value: "@vidhi_ie6025", link: "https://instagram.com/vidhi_ie6025" },
    { label: "TWITTER / X", value: "@witchtech_eif", link: "https://x.com/witchtech_eif" },
];

export default function Dossier() {
    const [copiedField, setCopiedField] = useState(null);

    const handleCopy = (value, label) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(value).catch(() => { });
        }
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 1500);
    };

    const handleOpen = (link) => {
        window.open(link, "_blank");
    };

    return (
        <div className="dossier-root">
            <style>{`
        .dossier-root {
          --ink:#111111;
          --ink-soft:#6b6b6b;
          --white:#ffffff;
          --grey-light:#e4e4e2;
          --grey-mid:#c9c9c6;
          --grey-dark:#4a4a48;
          --accent:#f4d000;
          background:var(--grey-light);
          color:var(--ink);
          font-family:'JetBrains Mono', monospace;
          min-height:100vh;
          position:relative;
          overflow-x:hidden;
        }
        .dossier-root *{ box-sizing:border-box; }

        .dossier-main{width:100%; margin:0; padding:0 0 40px; position:relative; z-index:2;}

        .doc-head{
          display:flex; justify-content:space-between; align-items:center;
          padding:20px 28px; border-bottom:4px solid var(--ink); flex-wrap:wrap; gap:16px;
          background:var(--grey-mid);
        }
        .doc-id{font-size:12px; letter-spacing:.12em; color:var(--ink-soft); font-weight:600;}
        .doc-id b{color:var(--ink);}
        .stamp{
          background:var(--accent); color:var(--ink); font-weight:700;
          padding:8px 14px; font-size:12px; letter-spacing:.14em; border:2px solid var(--ink);
        }

        .hero{padding:52px 28px 44px; border-bottom:4px solid var(--ink); background:var(--ink); color:var(--white);}
        .name{
          font-family:'JetBrains Mono', monospace; font-weight:800;
          font-size:clamp(46px, 9vw, 84px); line-height:.92; margin:0 0 16px; letter-spacing:-.01em;
          text-transform:uppercase; color:var(--white);
        }
        .name .hl{background:var(--accent); color:var(--ink); padding:0 8px; box-decoration-break:clone; -webkit-box-decoration-break:clone;}
        .cursor{display:inline-block; width:.5ch; background:var(--white); animation:blink 1s steps(1) infinite; margin-left:2px;}
        @keyframes blink{0%,49%{opacity:1;} 50%,100%{opacity:0;}}

        .role{font-size:14px; color:#c9c9c6; letter-spacing:.06em; margin:0; text-transform:uppercase; font-weight:600;}
        .role b{color:var(--white); font-weight:800;}

        .section-label{
          font-size:12px; letter-spacing:.2em; color:var(--white); text-transform:uppercase;
          margin:0; padding:14px 28px; display:flex; align-items:center; gap:10px;
          background:var(--grey-dark); border-bottom:2px solid var(--ink); font-weight:700;
        }

        .grid2{display:grid; grid-template-columns:1fr 1fr;}
        @media (max-width:600px){.grid2{grid-template-columns:1fr;}}

        .field{
          border-right:2px solid var(--ink); border-bottom:4px solid var(--ink); background:var(--white);
          padding:20px 24px; position:relative; overflow:hidden; cursor:pointer;
          transition:background .15s;
        }
        .field:nth-child(2){background:var(--grey-light);}
        .field:last-child{border-right:none;}
        .field:hover{background:var(--accent);}
        .field .tab{
          position:absolute; top:0; right:0; font-size:10px; color:var(--white);
          background:var(--ink); padding:2px 8px; letter-spacing:.1em; font-weight:700;
        }
        .field .flabel{font-size:11px; color:var(--ink-soft); letter-spacing:.14em; margin-bottom:8px; font-weight:700;}
        .field .fvalue{
          font-size:18px; font-weight:800; word-break:break-word;
        }
        .field .fnote{font-size:10px; color:var(--ink-soft); margin-top:10px; letter-spacing:.05em; font-weight:600;}
        .field.done .fnote{color:var(--ink); font-weight:700;}
        .field.done{background:var(--accent);}

        .attachment{
          border-bottom:4px solid var(--ink); background:var(--ink); color:var(--white);
          padding:22px 28px; display:flex; justify-content:space-between; align-items:center;
          gap:16px; flex-wrap:wrap;
        }
        .attachment .flabel{font-size:11px; color:#c9c9c6; letter-spacing:.14em; margin-bottom:6px; font-weight:700;}
        .attachment .ftitle{font-size:18px; font-weight:800; color:var(--white);}
        .stamp-btn{
          font-family:'JetBrains Mono', monospace; font-weight:800; border:2px solid var(--white); background:var(--accent);
          color:var(--ink); padding:12px 20px; font-size:13px; letter-spacing:.08em; text-decoration:none;
          transition:transform .12s, background .12s; cursor:pointer;
        }
        .stamp-btn:hover{transform:translate(-2px,-2px); box-shadow:4px 4px 0 var(--white);}
        .stamp-btn:active{transform:translate(0,0); box-shadow:none;}

        .checklist{border-bottom:4px solid var(--ink); background:var(--white);}
        .check-row{
          display:flex; align-items:center; gap:14px; padding:16px 28px;
          border-bottom:2px solid var(--ink); cursor:pointer; transition:background .12s;
        }
        .check-row:nth-child(even){background:var(--grey-light);}
        .check-row:last-child{border-bottom:none;}
        .check-row:hover{background:var(--accent);}
        .box{
          width:16px; height:16px; border:2px solid var(--ink); flex:none; position:relative; background:var(--ink);
        }
        .check-label{font-size:11px; letter-spacing:.1em; color:var(--ink-soft); width:110px; flex:none; font-weight:700;}
        .check-value{font-size:15px; font-weight:800; flex:1;}
        .check-go{font-size:11px; color:var(--ink-soft); letter-spacing:.05em; font-weight:700;}

        .signoff{display:flex; justify-content:space-between; gap:24px; flex-wrap:wrap; font-size:11px; color:var(--ink-soft); letter-spacing:.08em; padding:20px 28px; font-weight:700; background:var(--grey-mid);}
        .signoff .line{border-top:2px solid var(--ink); padding-top:6px; min-width:160px;}

        .dossier-footer{width:100%; margin:0; padding:14px 28px 40px; font-size:10px; color:#c9c9c6; letter-spacing:.08em; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; font-weight:700; background:var(--grey-dark);}
        .dossier-footer a{color:#c9c9c6; text-decoration:none; border-bottom:1px dotted #c9c9c6;}
        .dossier-footer a:hover{color:var(--white);}

        .termite{
          position:absolute; width:14px; height:8px; pointer-events:none; z-index:5;
          opacity:.9;
        }
        .termite svg{width:100%; height:100%; display:block;}
        .border-walk{position:relative;}
        .walk-a{animation:walk-box 9s linear infinite;}
        .walk-b{animation:walk-box 12s linear infinite reverse; animation-delay:2s;}
        .walk-c{animation:walk-box 10s linear infinite; animation-delay:4s;}

        @keyframes walk-box{
          0%   {left:2%;  top:6%;  transform:translate(-50%,-50%) rotate(0deg);}
          24%  {left:96%; top:6%;  transform:translate(-50%,-50%) rotate(90deg);}
          26%  {left:96%; top:6%;  transform:translate(-50%,-50%) rotate(90deg);}
          49%  {left:96%; top:92%; transform:translate(-50%,-50%) rotate(180deg);}
          51%  {left:96%; top:92%; transform:translate(-50%,-50%) rotate(180deg);}
          74%  {left:2%;  top:92%; transform:translate(-50%,-50%) rotate(270deg);}
          76%  {left:2%;  top:92%; transform:translate(-50%,-50%) rotate(270deg);}
          99%  {left:2%;  top:6%;  transform:translate(-50%,-50%) rotate(360deg);}
          100% {left:2%;  top:6%;  transform:translate(-50%,-50%) rotate(360deg);}
        }

        .roamer{
          position:fixed; width:16px; height:9px; z-index:1; opacity:.3;
          animation:roam1 26s linear infinite;
        }
        .roamer.two{animation:roam2 32s linear infinite; animation-delay:6s; opacity:.2;}
        @keyframes roam1{
          0%  {left:-5%; top:14%; transform:rotate(8deg);}
          30% {left:40%; top:30%; transform:rotate(-4deg);}
          55% {left:70%; top:12%; transform:rotate(10deg);}
          80% {left:90%; top:55%; transform:rotate(20deg);}
          100%{left:-5%; top:14%; transform:rotate(8deg);}
        }
        @keyframes roam2{
          0%  {left:105%; top:70%; transform:rotate(190deg);}
          35% {left:60%;  top:85%; transform:rotate(160deg);}
          60% {left:30%;  top:60%; transform:rotate(200deg);}
          100%{left:105%; top:70%; transform:rotate(190deg);}
        }

        @media (prefers-reduced-motion: reduce){
          .termite, .roamer, .cursor{animation:none !important;}
        }
      `}</style>

            <div className="roamer" style={{ top: "14%" }}>
                <RoamerSVG />
            </div>
            <div className="roamer two">
                <RoamerSVG />
            </div>

            <div className="doc-head">
                <div className="doc-id">
                    DOSSIER Nº <b>2026-014</b> — FILED 23 JUL 2026
                </div>
                <div className="stamp">STATUS: AVAILABLE</div>
            </div>

            <main className="dossier-main">
                <div className="hero">
                    <h1 className="name">
                        <span className="hl">Vidhi</span>
                        <span className="cursor">&nbsp;</span>
                    </h1>
                    <p className="role">
                        <b>Full-Stack Developer</b> — ASP.NET Core · Blazor · React
                    </p>
                </div>

                <div className="section-label">Particulars</div>
                <div className="grid2">
                    {PARTICULARS.map((p) => (
                        <div
                            key={p.label}
                            className={`field border-walk${copiedField === p.label ? " done" : ""}`}
                            onClick={() => handleCopy(p.value, p.label)}
                        >
                            <span className="tab">{p.tab}</span>
                            <div className="flabel">{p.label}</div>
                            <div className="fvalue">{p.value}</div>
                            <div className="fnote">{copiedField === p.label ? "copied ✓" : "click to copy"}</div>
                            <div className={`termite ${p.walk}`}>
                                <TermiteSVG />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-label">Attachment</div>
                <div className="attachment border-walk">
                    <div>
                        <div className="flabel">CURRICULUM VITAE</div>
                        <div className="ftitle">VidhiResume.pdf</div>
                    </div>
                    <a className="stamp-btn" href="/VidhiResume.pdf" download="VidhiResume.pdf">
                        ⬇ DOWNLOAD
                    </a>
                    <div className="termite walk-c">
                        <TermiteSVG />
                    </div>
                </div>

                <div className="section-label">References</div>
                <div className="checklist">
                    {REFERENCES.map((r) => (
                        <div
                            key={r.label}
                            className="check-row checked"
                            onClick={() => handleOpen(r.link)}
                        >
                            <div className="box"></div>
                            <div className="check-label">{r.label}</div>
                            <div className="check-value">{r.value}</div>
                            <div className="check-go">open →</div>
                        </div>
                    ))}
                </div>

                <div className="signoff">
                    <div className="line">SIGNED — VIDHI</div>
                    <div className="line">DATE — 23 / 07 / 2026</div>
                </div>
            </main>

            <footer className="dossier-footer">
                <span>© 2026 VIDHI</span>
                <span>
                    <a href="#">TERMS</a> &nbsp; <a href="#">PRIVACY POLICY</a>
                </span>
            </footer>
        </div>
    );
}
< !DOCTYPE html >
    <html lang="en">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dossier — Aarav Mehta</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link href="https://fonts.googleapis.com/css2?family=Special+Elite&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
                            <style>
                                :root{
                                    --ink:#2b2a28;
                                --ink-soft:#6e6c68;
                                --paper:#d7d5cf;
                                --paper-dim:#c3c1ba;
                                --paper-hi:#e5e3dd;
  }
                                *{box - sizing:border-box;}
                                html,body{margin:0;padding:0;}
                                body{
                                    background:var(--paper);
                                background-image:
                                repeating-linear-gradient(0deg, rgba(43,42,40,.05) 0px, rgba(43,42,40,.05) 1px, transparent 1px, transparent 28px),
                                repeating-linear-gradient(90deg, rgba(43,42,40,.05) 0px, rgba(43,42,40,.05) 1px, transparent 1px, transparent 28px);
                                color:var(--ink);
                                font-family:'JetBrains Mono', monospace;
                                min-height:100vh;
                                position:relative;
                                overflow-x:hidden;
  }

                                main{max - width:880px; margin:0 auto; padding:56px 28px 40px; position:relative; z-index:2;}

                                /* header */
                                .doc-head{display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:36px; flex-wrap:wrap; gap:16px;}
                                .doc-id{font - size:12px; letter-spacing:.12em; color:var(--ink-soft);}
                                .doc-id b{color:var(--ink);}
                                .stamp{
                                    border:3px double var(--ink); color:var(--ink); font-family:'Special Elite', monospace;
                                padding:8px 14px; font-size:12px; letter-spacing:.14em; transform:rotate(-6deg);
                                opacity:.85; animation:stamp-in .5s ease-out;
  }
                                @keyframes stamp-in{from{transform:rotate(-18deg) scale(1.6); opacity:0;} to{transform:rotate(-6deg) scale(1); opacity:.85;}}

                                h1.name{
                                    font - family:'Special Elite', monospace; font-weight:400;
                                font-size:clamp(38px, 7vw, 66px); line-height:1; margin:0 0 10px; letter-spacing:.01em;
  }
                                .cursor{display:inline-block; width:.5ch; background:var(--ink); animation:blink 1s steps(1) infinite; margin-left:2px;}
                                @keyframes blink{0 %, 49 % { opacity: 1; } 50%,100%{opacity:0;}}

                                .role{font - size:13px; color:var(--ink-soft); letter-spacing:.08em; margin:0 0 42px; text-transform:uppercase;}
                                .role b{color:var(--ink); font-weight:600;}

                                .section-label{
                                    font - size:11px; letter-spacing:.2em; color:var(--ink-soft); text-transform:uppercase;
                                margin:0 0 14px; display:flex; align-items:center; gap:10px;
  }
                                .section-label::after{content:""; flex:1; height:1px; background:repeating-linear-gradient(90deg, var(--ink-soft) 0 4px, transparent 4px 8px); opacity:.6;}

                                /* particulars grid = the "form" fields */
                                .grid2{display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:40px;}
                                @media (max-width:600px){.grid2{grid - template - columns:1fr;}}

                                .field{
                                    border:1.5px solid var(--ink); background:var(--paper-hi);
                                padding:14px 16px 16px; position:relative; overflow:hidden; cursor:pointer;
                                transition:background .2s;
  }
                                .field:hover{background:#eeece6;}
                                .field .tab{
                                    position:absolute; top:0; right:0; font-size:10px; color:var(--paper);
                                background:var(--ink); padding:2px 8px; letter-spacing:.1em;
  }
                                .field .flabel{font - size:10px; color:var(--ink-soft); letter-spacing:.14em; margin-bottom:8px;}
                                .field .fvalue{
                                    font - size:16px; font-weight:600; border-bottom:1px dashed var(--ink-soft);
                                padding-bottom:8px; word-break:break-word;
  }
                                .field .fnote{font - size:10px; color:var(--ink-soft); margin-top:8px; letter-spacing:.05em;}
                                .field.done .fnote{color:var(--ink); font-weight:600;}

                                /* attachment / resume stamp button */
                                .attachment{
                                    border:1.5px solid var(--ink); background:var(--paper-hi);
                                padding:18px 20px; display:flex; justify-content:space-between; align-items:center;
                                margin-bottom:40px; gap:16px; flex-wrap:wrap;
  }
                                .attachment .flabel{font - size:10px; color:var(--ink-soft); letter-spacing:.14em; margin-bottom:6px;}
                                .attachment .ftitle{font - size:16px; font-weight:600;}
                                .stamp-btn{
                                    font - family:'Special Elite', monospace; border:3px double var(--ink); background:transparent;
                                color:var(--ink); padding:10px 18px; font-size:14px; letter-spacing:.1em; text-decoration:none;
                                transform:rotate(-2deg); transition:transform .15s, background .15s;
  }
                                .stamp-btn:hover{transform:rotate(0deg) scale(1.03); background:rgba(43,42,40,.06);}
                                .stamp-btn:active{transform:rotate(0deg) scale(.97);}

                                /* references = checklist of socials */
                                .checklist{border:1.5px solid var(--ink); background:var(--paper-hi); margin-bottom:44px;}
                                .check-row{
                                    display:flex; align-items:center; gap:14px; padding:13px 16px;
                                border-bottom:1px dashed var(--ink-soft); cursor:pointer; transition:background .15s;
  }
                                .check-row:last-child{border - bottom:none;}
                                .check-row:hover{background:#eeece6;}
                                .box{
                                    width:16px; height:16px; border:1.5px solid var(--ink); flex:none; position:relative;
  }
                                .box::after{
                                    content:""; position:absolute; inset:2px; background:var(--ink); transform:scale(0);
                                transition:transform .18s;
  }
                                .check-row.checked .box::after{transform:scale(1);}
                                .check-label{font - size:11px; letter-spacing:.1em; color:var(--ink-soft); width:110px; flex:none;}
                                .check-value{font - size:14px; font-weight:600; flex:1;}
                                .check-go{font - size:11px; color:var(--ink-soft); letter-spacing:.05em;}

                                /* footer signature line */
                                .signoff{display:flex; justify-content:space-between; gap:24px; flex-wrap:wrap; font-size:11px; color:var(--ink-soft); letter-spacing:.08em; margin-bottom:8px;}
                                .signoff .line{border - top:1px solid var(--ink-soft); padding-top:6px; min-width:160px;}
                                footer{max - width:880px; margin:0 auto; padding:0 28px 40px; font-size:10px; color:var(--ink-soft); letter-spacing:.08em; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px;}
                                footer a{color:var(--ink-soft); text-decoration:none; border-bottom:1px dotted var(--ink-soft);}
                                footer a:hover{color:var(--ink);}

                                /* ---------- termites (signature animation) ---------- */
                                .termite{
                                    position:absolute; width:14px; height:8px; pointer-events:none; z-index:5;
                                opacity:.85;
  }
                                .termite svg{width:100%; height:100%; display:block;}
                                .border-walk{position:relative;}
                                .walk-a{animation:walk-box 9s linear infinite; }
                                .walk-b{animation:walk-box 12s linear infinite reverse; animation-delay:2s; }
                                .walk-c{animation:walk-box 10s linear infinite; animation-delay:4s; }

                                @keyframes walk-box{
                                    0 % { left: 2 %; top: 6 %; transform: translate(-50 %, -50 %) rotate(0deg); }
    24%  {left:96%; top:6%;  transform:translate(-50%,-50%) rotate(90deg);}
                                26%  {left:96%; top:6%;  transform:translate(-50%,-50%) rotate(90deg);}
                                49%  {left:96%; top:92%; transform:translate(-50%,-50%) rotate(180deg);}
                                51%  {left:96%; top:92%; transform:translate(-50%,-50%) rotate(180deg);}
                                74%  {left:2%;  top:92%; transform:translate(-50%,-50%) rotate(270deg);}
                                76%  {left:2%;  top:92%; transform:translate(-50%,-50%) rotate(270deg);}
                                99%  {left:2%;  top:6%;  transform:translate(-50%,-50%) rotate(360deg);}
                                100% {left:2%;  top:6%;  transform:translate(-50%,-50%) rotate(360deg);}
  }

                                /* free roamers across full page */
                                .roamer{
                                    position:fixed; width:16px; height:9px; z-index:1; opacity:.5;
                                animation:roam1 26s linear infinite;
  }
                                .roamer.two{animation:roam2 32s linear infinite; animation-delay:6s; opacity:.35;}
                                @keyframes roam1{
                                    0 % { left: -5 %; top: 14 %; transform: rotate(8deg); }
    30%{left:40%; top:30%; transform:rotate(-4deg);}
                                55%{left:70%; top:12%; transform:rotate(10deg);}
                                80%{left:90%; top:55%; transform:rotate(20deg);}
                                100%{left:-5%; top:14%; transform:rotate(8deg);}
  }
                                @keyframes roam2{
                                    0 % { left: 105 %; top: 70 %; transform: rotate(190deg); }
    35%{left:60%; top:85%; transform:rotate(160deg);}
                                60%{left:30%; top:60%; transform:rotate(200deg);}
                                100%{left:105%; top:70%; transform:rotate(190deg);}
  }

                                @media (prefers-reduced-motion: reduce){
    .termite, .roamer, .cursor, .stamp{animation:none !important;}
  }
                            </style>
                        </head>
                        <body>

                            <div class="roamer" style="top:14%;">
                                <svg viewBox="0 0 20 10"><ellipse cx="6" cy="5" rx="5" ry="3" fill="#2b2a28" /><ellipse cx="15" cy="5" rx="3.2" ry="2.6" fill="#2b2a28" /><line x1="4" y1="7" x2="1" y2="9.5" stroke="#2b2a28" stroke-width="1" /><line x1="7" y1="7" x2="6" y2="9.8" stroke="#2b2a28" stroke-width="1" /><line x1="9" y1="6.5" x2="10" y2="9.3" stroke="#2b2a28" stroke-width="1" /></svg>
                            </div>
                            <div class="roamer two">
                                <svg viewBox="0 0 20 10"><ellipse cx="6" cy="5" rx="5" ry="3" fill="#2b2a28" /><ellipse cx="15" cy="5" rx="3.2" ry="2.6" fill="#2b2a28" /><line x1="4" y1="7" x2="1" y2="9.5" stroke="#2b2a28" stroke-width="1" /><line x1="7" y1="7" x2="6" y2="9.8" stroke="#2b2a28" stroke-width="1" /><line x1="9" y1="6.5" x2="10" y2="9.3" stroke="#2b2a28" stroke-width="1" /></svg>
                            </div>

                            <main>
                                <div class="doc-head">
                                    <div class="doc-id">DOSSIER Nº <b>2026-014</b><br>FILED 23 JUL 2026</div>
                                    <div class="stamp">STATUS: AVAILABLE</div>
                                </div>

                                <h1 class="name">Aarav Mehta<span class="cursor">&nbsp;</span></h1>
                                <p class="role"><b>Full-Stack Developer</b> — ASP.NET Core · Blazor · React</p>

                                <div class="section-label">Particulars</div>
                                <div class="grid2">
                                    <div class="field border-walk" data-copy="hello@aaravmehta.dev">
                                        <span class="tab">01</span>
                                        <div class="flabel">EMAIL</div>
                                        <div class="fvalue">hello@aaravmehta.dev</div>
                                        <div class="fnote">click to copy</div>
                                        <div class="termite walk-a"><svg viewBox="0 0 20 10"><ellipse cx="6" cy="5" rx="5" ry="3" fill="#2b2a28" /><ellipse cx="15" cy="5" rx="3.2" ry="2.6" fill="#2b2a28" /></svg></div>
                                    </div>
                                    <div class="field border-walk" data-copy="+91 98765 43210">
                                        <span class="tab">02</span>
                                        <div class="flabel">PHONE</div>
                                        <div class="fvalue">+91 98765 43210</div>
                                        <div class="fnote">click to copy</div>
                                        <div class="termite walk-b"><svg viewBox="0 0 20 10"><ellipse cx="6" cy="5" rx="5" ry="3" fill="#2b2a28" /><ellipse cx="15" cy="5" rx="3.2" ry="2.6" fill="#2b2a28" /></svg></div>
                                    </div>
                                </div>

                                <div class="section-label">Attachment</div>
                                <div class="attachment border-walk">
                                    <div>
                                        <div class="flabel">CURRICULUM VITAE</div>
                                        <div class="ftitle">resume.pdf</div>
                                    </div>
                                    <a class="stamp-btn" href="resume.pdf" download>⬇ DOWNLOAD</a>
                                    <div class="termite walk-c"><svg viewBox="0 0 20 10"><ellipse cx="6" cy="5" rx="5" ry="3" fill="#2b2a28" /><ellipse cx="15" cy="5" rx="3.2" ry="2.6" fill="#2b2a28" /></svg></div>
                                </div>

                                <div class="section-label">References</div>
                                <div class="checklist">
                                    <div class="check-row checked" data-link="https://github.com/yourhandle">
                                        <div class="box"></div>
                                        <div class="check-label">GITHUB</div>
                                        <div class="check-value">github.com/yourhandle</div>
                                        <div class="check-go">open →</div>
                                    </div>
                                    <div class="check-row checked" data-link="https://linkedin.com/in/yourhandle">
                                        <div class="box"></div>
                                        <div class="check-label">LINKEDIN</div>
                                        <div class="check-value">linkedin.com/in/yourhandle</div>
                                        <div class="check-go">open →</div>
                                    </div>
                                    <div class="check-row checked" data-link="https://instagram.com/yourhandle">
                                        <div class="box"></div>
                                        <div class="check-label">INSTAGRAM</div>
                                        <div class="check-value">@yourhandle</div>
                                        <div class="check-go">open →</div>
                                    </div>
                                    <div class="check-row checked" data-link="https://x.com/yourhandle">
                                        <div class="box"></div>
                                        <div class="check-label">TWITTER / X</div>
                                        <div class="check-value">@yourhandle</div>
                                        <div class="check-go">open →</div>
                                    </div>
                                </div>

                                <div class="signoff">
                                    <div class="line">SIGNED — AARAV MEHTA</div>
                                    <div class="line">DATE — 23 / 07 / 2026</div>
                                </div>
                            </main>

                            <footer>
                                <span>© 2026 AARAV MEHTA</span>
                                <span><a href="#">TERMS</a> &nbsp; <a href="#">PRIVACY POLICY</a></span>
                            </footer>

                            <script>
                                document.querySelectorAll('.field').forEach(function(f){
                                    f.addEventListener('click', function () {
                                        var val = f.getAttribute('data-copy');
                                        if (val && navigator.clipboard) { navigator.clipboard.writeText(val).catch(function () { }); }
                                        f.classList.add('done');
                                        var note = f.querySelector('.fnote');
                                        var original = note.textContent;
                                        note.textContent = 'copied ✓';
                                        setTimeout(function () { f.classList.remove('done'); note.textContent = original; }, 1500);
                                    });
    });
                                document.querySelectorAll('.check-row').forEach(function(r){
                                    r.addEventListener('click', function () {
                                        var link = r.getAttribute('data-link');
                                        if (link) window.open(link, '_blank');
                                    });
    });
                            </script>

                        </body>
                    </html>
import React, { useState, useEffect, useCallback } from "react";

const STORE_KEY = "projects-list";
const SEED_FLAG_KEY = "seed-real-v1";

const REAL_PROJECTS = [
    { name: "Tic Tac Toe", cat: "GAME", status: "SHIPPED", year: "2026", icon: "🎮", desc: "A fun, interactive two-player Tic Tac Toe with a modern UI, emoji markers, a countdown timer, and live score tracking.", tags: ["HTML5", "CSS3", "JavaScript"], link: "https://tic-tac-toe-self-gamma-80.vercel.app/" },
    { name: "Palmelo", cat: "AI", status: "SHIPPED", year: "2026", icon: "🤟", desc: "A real-time sign language to speech translator, turning hand gestures into spoken words on the fly.", tags: ["AI", "Real-time", "Accessibility"], link: "https://palmelonew.vercel.app/" },
    { name: "ToxIQ", cat: "AI", status: "SHIPPED", year: "2026", icon: "🧪", desc: "Predicts whether a drug molecule is toxic across 12 biological assays from the Tox21 benchmark — in seconds, from just a SMILES string. Includes a premium interface with interactive 3D elements, detailed toxicity reports, and an integrated AI assistant for pharmacological context.", tags: ["AI", "Bioinformatics", "3D"], link: "https://github.com/vidhiwhere/TOXIQ" },
    { name: "Lumia Wellness", cat: "APP", status: "SHIPPED", year: "2026", icon: "🏥", desc: "A full-stack healthcare platform streamlining consultations between doctors and patients, with separate portals for patients, doctors, and admins to book appointments, issue prescriptions, and verify providers.", tags: ["Full-stack", "Healthcare"], link: "https://github.com/vidhiwhere/meditrack" },
    { name: "Connoiseur", cat: "WEB", status: "SHIPPED", year: "2026", icon: "⌚", desc: "A watch website UI design — clean product presentation with a premium retail feel.", tags: ["UI Design"], link: "https://connoiseur.vercel.app/" },
    { name: "Memory Match — Cyberpunk Edition", cat: "GAME", status: "SHIPPED", year: "2026", icon: "⚡", desc: "A React memory matching game with a futuristic glassmorphism theme, multi-tiered scoring, power-ups, and a dynamic sound synthesis engine.", tags: ["React", "Glassmorphism", "Audio"], link: "https://memory-match-alpha-mauve.vercel.app/" },
    { name: "StreetWealth", cat: "APP", status: "ACTIVE", year: "2026", icon: "💰", desc: "Empowering India's street vendors with smart financial tools — income tracking, digital payments, micro-loan access, and gamified financial literacy, built mobile-first with mock UPI integration.", tags: ["FinTech", "Gamification", "UPI"], link: "https://github.com/vidhiwhere/StreetWealth" },
];

const CATS = ["ALL", "WEB", "APP", "GAME", "AI"];
const STATUSES = ["ALL", "PLANNED", "ACTIVE", "SHIPPED"];

const uid = () => "p_" + Date.now() + "_" + Math.floor(Math.random() * 9999);

const styleVars = {
    "--bg": "#aeaea7",
    "--bg-dark": "#131311",
    "--accent": "#d7d400",
    "--ink": "#17170f",
    "--paper": "#f3f2e9",
    "--panel": "#84847b",
    "--panel-dark": "#5b5b53",
};

const fontDisplay = 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';
const fontBody = '"Segoe UI", Arial, sans-serif';
const fontMono = '"Courier New", Courier, monospace';

function emptyForm() {
    return { name: "", cat: "WEB", status: "ACTIVE", year: "", icon: "", desc: "", tags: "", link: "" };
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [activeCat, setActiveCat] = useState("ALL");
    const [activeStatus, setActiveStatus] = useState("ALL");
    const [activeTag, setActiveTag] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm());
    const [formMsg, setFormMsg] = useState("");

    const saveProjects = useCallback(async (list) => {
        try {
            await window.storage.set(STORE_KEY, JSON.stringify(list), false);
        } catch (e) {
            console.error("save failed", e);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            let list = [];
            try {
                const res = await window.storage.get(STORE_KEY, false);
                list = res && res.value ? JSON.parse(res.value) : [];
            } catch (e) {
                list = [];
            }
            let flag = null;
            try {
                flag = await window.storage.get(SEED_FLAG_KEY, false);
            } catch (e) {
                flag = null;
            }
            if (!flag) {
                const existingNames = new Set(list.map((p) => p.name));
                const merged = [...list];
                REAL_PROJECTS.forEach((p) => {
                    if (!existingNames.has(p.name)) merged.unshift({ id: uid(), ...p });
                });
                list = merged;
                await saveProjects(list);
                try {
                    await window.storage.set(SEED_FLAG_KEY, "true", false);
                } catch (e) {
                    /* ignore */
                }
            }
            if (!cancelled) {
                setProjects(list);
                setLoaded(true);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [saveProjects]);

    const allTags = () => {
        const s = new Set();
        projects.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
        return Array.from(s);
    };

    const filtered = projects.filter((p) => {
        if (activeCat !== "ALL" && p.cat !== activeCat) return false;
        if (activeStatus !== "ALL" && p.status !== activeStatus) return false;
        if (activeTag && !(p.tags || []).includes(activeTag)) return false;
        return true;
    });

    const handleDelete = async (id) => {
        const next = projects.filter((p) => p.id !== id);
        setProjects(next);
        await saveProjects(next);
    };

    const openModal = () => {
        setFormMsg("");
        setForm(emptyForm());
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    const handleSave = async () => {
        const name = form.name.trim();
        if (!name) {
            setFormMsg("Project name is required.");
            return;
        }
        const p = {
            id: uid(),
            name,
            cat: form.cat,
            status: form.status,
            year: form.year.trim(),
            icon: form.icon.trim(),
            desc: form.desc.trim(),
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            link: form.link.trim(),
        };
        const next = [p, ...projects];
        setProjects(next);
        await saveProjects(next);
        setForm(emptyForm());
        setModalOpen(false);
    };

    const mainHeading = activeCat === "ALL" ? "ALL PROJECTS" : `${activeCat} PROJECTS`;
    const subCount = `${filtered.length} shown / ${projects.length} total`;

    return (
        <div style={{ ...styleVars, background: "var(--bg)", color: "var(--ink)", fontFamily: fontBody, minHeight: "100%" }}>
            <style>{`
        * { box-sizing: border-box; }
        .rp-fadein { animation: rp-fade .15s ease; }
        @keyframes rp-fade { from { opacity: 0; } to { opacity: 1; } }
        .rp-card:hover { transform: translateY(-4px); }
        .rp-tag:hover, .rp-navbtn:hover, .rp-sidebtn:hover, .rp-spine:hover { opacity: .9; }
        .rp-del:hover { color: #c0392b !important; }
        .rp-save:hover { background: var(--ink) !important; color: var(--accent) !important; }
        .rp-fab:hover { background: var(--paper) !important; }
        .rp-scroll::-webkit-scrollbar { width: 8px; }
      `}</style>

            {/* NAV */}
            <div style={{ background: "var(--bg-dark)", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", flexWrap: "wrap", gap: 12, borderBottom: "4px solid var(--accent)" }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 26, letterSpacing: 1, display: "flex", alignItems: "center", gap: 6 }}>
                    my<span style={{ color: "var(--accent)" }}>.projects</span>
                </div>
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                    {CATS.map((c) => (
                        <button
                            key={c}
                            className="rp-navbtn"
                            onClick={() => setActiveCat(c)}
                            style={{
                                background: "none",
                                border: "none",
                                color: activeCat === c ? "var(--accent)" : "var(--paper)",
                                fontFamily: fontMono,
                                fontSize: 13,
                                letterSpacing: 2,
                                cursor: "pointer",
                                padding: "6px 4px",
                                borderBottom: activeCat === c ? "2px solid var(--accent)" : "2px solid transparent",
                            }}
                        >
                            {c === "APP" ? "APPS" : c === "GAME" ? "GAMES" : c}
                        </button>
                    ))}
                </div>
            </div>

            {/* BREADCRUMB */}
            <div style={{ display: "flex", height: 44 }}>
                <div style={{ background: "var(--accent)", color: "var(--ink)", fontFamily: fontMono, fontSize: 12, letterSpacing: 2, display: "flex", alignItems: "center", padding: "0 32px", flex: 1 }}>
                    HOME <b style={{ margin: "0 8px" }}>&rsaquo;</b> PROJECTS
                </div>
                <div style={{ background: "var(--bg-dark)", flex: 1 }} />
            </div>

            {/* HERO */}
            <div style={{ display: "flex", minHeight: 220, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 320px", background: "var(--bg)", padding: "40px 32px 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <div style={{ fontFamily: fontDisplay, fontSize: "clamp(48px,9vw,110px)", lineHeight: 0.85, color: "var(--ink)", letterSpacing: 1 }}>WORK</div>
                </div>
                <div style={{ flex: "1 1 280px", background: "var(--bg-dark)", color: "var(--paper)", padding: "24px 32px", display: "flex", alignItems: "center" }}>
                    <p style={{ fontFamily: fontBody, fontSize: 15, lineHeight: 1.6, color: "#cfcfc4" }}>
                        A running record of what's been built, what's live, and what's next. Add a project below and it stays here — saved to this page, visible only to you.
                    </p>
                </div>
            </div>
            <div style={{ display: "flex", height: 10 }}>
                <div style={{ background: "var(--bg-dark)", flex: 1 }} />
                <div style={{ background: "var(--accent)", flex: 1 }} />
            </div>

            {/* LAYOUT */}
            <div style={{ display: "grid", gridTemplateColumns: "96px 1fr 110px", minHeight: "60vh" }} className="rp-layout">
                {/* SIDEBAR - status filter */}
                <div style={{ background: "var(--bg-dark)", color: "var(--paper)", display: "flex", flexDirection: "column", borderRight: "4px solid var(--ink)" }}>
                    {STATUSES.map((s) => {
                        const count = s === "ALL" ? projects.length : projects.filter((p) => p.status === s).length;
                        const active = activeStatus === s;
                        return (
                            <button
                                key={s}
                                className="rp-sidebtn"
                                onClick={() => setActiveStatus(s)}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                    padding: "18px 6px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #333",
                                    borderLeft: 0,
                                    borderRight: 0,
                                    borderTop: 0,
                                    textAlign: "center",
                                    background: active ? "var(--accent)" : "transparent",
                                    color: active ? "var(--ink)" : "inherit",
                                    fontFamily: fontMono,
                                }}
                            >
                                <span style={{ writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: 3, fontSize: 12 }}>{s}</span>
                                <span style={{ fontFamily: fontDisplay, fontSize: 20 }}>{count}</span>
                            </button>
                        );
                    })}
                </div>

                {/* MAIN */}
                <div style={{ padding: 32, background: "var(--bg)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                        <h2 style={{ fontFamily: fontDisplay, fontSize: 34 }}>{mainHeading}</h2>
                        <div style={{ fontFamily: fontMono, fontSize: 12, color: "var(--panel-dark)", letterSpacing: 1 }}>{subCount}</div>
                    </div>

                    {!loaded ? (
                        <div style={{ fontFamily: fontMono, fontSize: 13, color: "var(--panel-dark)", letterSpacing: 1, border: "2px dashed var(--panel)", padding: 40, textAlign: "center" }}>
                            LOADING…
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ fontFamily: fontMono, fontSize: 13, color: "var(--panel-dark)", letterSpacing: 1, border: "2px dashed var(--panel)", padding: 40, textAlign: "center" }}>
                            NOTHING HERE YET. HIT THE + ON THE RIGHT TO ADD A PROJECT.
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22 }}>
                            {filtered.map((p) => (
                                <div key={p.id} className="rp-card rp-fadein" style={{ background: "var(--paper)", border: "3px solid var(--ink)", position: "relative", display: "flex", flexDirection: "column", transition: "transform .15s" }}>
                                    <span style={{ position: "absolute", top: -12, right: 14, background: "var(--accent)", color: "var(--ink)", fontFamily: fontMono, fontSize: 10, letterSpacing: 1, padding: "4px 8px", border: "2px solid var(--ink)" }}>
                                        {p.status}
                                    </span>
                                    <div style={{ background: "var(--ink)", color: "var(--paper)", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", fontFamily: fontMono, fontSize: 11, letterSpacing: 1 }}>
                                        <div style={{ display: "flex", gap: 5 }}>
                                            <i style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--panel)", display: "block" }} />
                                            <i style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--panel)", display: "block" }} />
                                            <i style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--panel)", display: "block" }} />
                                        </div>
                                        <div style={{ flex: 1, opacity: 0.75, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {p.cat.toLowerCase()}/{(p.name || "").toLowerCase().replace(/\s+/g, "-")}
                                        </div>
                                    </div>
                                    <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                                        <div style={{ fontSize: 34, lineHeight: 1 }}>{p.icon || "📁"}</div>
                                        <div style={{ fontFamily: fontDisplay, fontSize: 22, letterSpacing: 0.5 }}>{p.name}</div>
                                        <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", flex: 1 }}>{p.desc}</div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                            {(p.tags || []).map((t) => (
                                                <span
                                                    key={t}
                                                    className="rp-tag"
                                                    onClick={() => setActiveTag(activeTag === t ? null : t)}
                                                    style={{
                                                        fontFamily: fontMono,
                                                        fontSize: 10,
                                                        letterSpacing: 1,
                                                        padding: "4px 8px",
                                                        background: activeTag === t ? "var(--accent)" : "var(--panel)",
                                                        color: activeTag === t ? "var(--ink)" : "var(--paper)",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                                            {p.link ? (
                                                <a
                                                    href={p.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ fontFamily: fontMono, fontSize: 12, letterSpacing: 1, color: "var(--ink)", textDecoration: "none", borderBottom: "2px solid var(--accent)" }}
                                                >
                                                    VIEW &rarr;
                                                </a>
                                            ) : (
                                                <span style={{ fontFamily: fontMono, fontSize: 12, letterSpacing: 1, opacity: 0.4, borderBottom: "2px solid #ccc" }}>{p.year || ""}</span>
                                            )}
                                            <button
                                                className="rp-del"
                                                onClick={() => handleDelete(p.id)}
                                                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: fontMono, fontSize: 11, color: "#999", letterSpacing: 1 }}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT RAIL - tech spines */}
                <div className="rp-scroll" style={{ background: "var(--bg-dark)", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", gap: 10, borderLeft: "4px solid var(--ink)", overflowY: "auto" }}>
                    <button
                        className="rp-fab"
                        onClick={openModal}
                        title="Add project"
                        style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--ink)", fontFamily: fontDisplay, fontSize: 28, color: "var(--ink)", cursor: "pointer", marginBottom: 6, flexShrink: 0 }}
                    >
                        +
                    </button>
                    {allTags().map((t) => (
                        <button
                            key={t}
                            className="rp-spine"
                            onClick={() => setActiveTag(activeTag === t ? null : t)}
                            style={{
                                writingMode: "vertical-rl",
                                textOrientation: "mixed",
                                background: activeTag === t ? "var(--accent)" : "var(--panel)",
                                color: activeTag === t ? "var(--ink)" : "var(--paper)",
                                fontFamily: fontMono,
                                fontSize: 11,
                                letterSpacing: 2,
                                padding: "12px 6px",
                                cursor: "pointer",
                                border: activeTag === t ? "2px solid var(--paper)" : "2px solid transparent",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <footer style={{ textAlign: "center", padding: 24, fontFamily: fontMono, fontSize: 11, color: "var(--panel-dark)", letterSpacing: 1 }}>
                BUILT WITH BINARYTHINKERS STYLE — DATA STORED TO THIS PAGE
            </footer>

            {/* MODAL */}
            {modalOpen && (
                <div
                    onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
                    style={{ position: "fixed", inset: 0, background: "rgba(10,10,8,.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 }}
                >
                    <div style={{ background: "var(--paper)", border: "4px solid var(--ink)", width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto" }}>
                        <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "14px 20px", fontFamily: fontDisplay, fontSize: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>NEW PROJECT</span>
                            <button onClick={closeModal} style={{ background: "none", border: "none", color: "var(--paper)", fontSize: 20, cursor: "pointer" }}>&times;</button>
                        </div>
                        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                            <Field label="PROJECT NAME">
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Portfolio Redesign" style={inputStyle} />
                            </Field>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <Field label="CATEGORY">
                                    <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} style={inputStyle}>
                                        <option>WEB</option><option>APP</option><option>GAME</option><option>AI</option>
                                    </select>
                                </Field>
                                <Field label="STATUS">
                                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                                        <option>PLANNED</option><option>ACTIVE</option><option>SHIPPED</option>
                                    </select>
                                </Field>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <Field label="YEAR">
                                    <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2026" style={inputStyle} />
                                </Field>
                                <Field label="ICON (emoji)">
                                    <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🚀" style={inputStyle} />
                                </Field>
                            </div>
                            <Field label="DESCRIPTION">
                                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="What is it, what does it do?" style={{ ...inputStyle, resize: "vertical", minHeight: 70 }} />
                            </Field>
                            <Field label="TECH / TAGS (comma separated)">
                                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Node, Postgres" style={inputStyle} />
                            </Field>
                            <Field label="LINK (optional)">
                                <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." style={inputStyle} />
                            </Field>
                            <div style={{ fontFamily: fontMono, fontSize: 11, color: "#c0392b", minHeight: 14 }}>{formMsg}</div>
                            <button
                                className="rp-save"
                                onClick={handleSave}
                                style={{ background: "var(--accent)", border: "3px solid var(--ink)", fontFamily: fontDisplay, fontSize: 18, padding: 10, cursor: "pointer", letterSpacing: 1 }}
                            >
                                SAVE PROJECT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const inputStyle = {
    width: "100%",
    border: "2px solid var(--ink)",
    background: "#fff",
    padding: "9px 10px",
    fontFamily: fontBody,
    fontSize: 14,
};

function Field({ label, children }) {
    return (
        <div>
            <label style={{ display: "block", fontFamily: fontMono, fontSize: 11, letterSpacing: 1, marginBottom: 5, color: "var(--panel-dark)" }}>{label}</label>
            {children}
        </div>
    );
}
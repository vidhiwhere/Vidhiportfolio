import { useEffect, useRef } from 'react'

// Fixed star positions so they don't reshuffle on re-render
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 1.6 + 0.6,
  delay: Math.random() * 6,
  duration: Math.random() * 3 + 3,
}))

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const TABS = [
  'About Me',
  'Projects',
  'Skills',
  'Experience',
  'Contact',
  'Blog',
]

const TIMELINE = ['2030', 'FUTURE', 'PRESENT', '2024', 'PAST', '2020']

function Navbar() {
  return (
    <nav className="navbar">
      <style>{`
        .navbar {
          display: flex;
          align-items: stretch;
          width: 100%;
          height: 160px;
          font-family: 'JetBrains Mono', monospace;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .navbar-logo-block {
          display: flex;
          align-items: center;
          background: #b0b3b8;
          width: 42%;
          padding: 0 40px;
          white-space: nowrap;
          box-sizing: border-box;
          border-right: 1px solid rgba(26, 31, 46, 0.3);
        }

        .navbar-logo {
          font-size: 1.15rem;
          font-weight: 500;
          color: #1a1c1f;
          letter-spacing: 0.02em;
        }

        .navbar-logo .navbar-bracket {
          color: #3f4246;
        }

        .navbar-cursor {
          display: inline-block;
          width: 9px;
          height: 1.1em;
          background: #ffd23f;
          margin-left: 6px;
          vertical-align: text-bottom;
          animation: navbar-blink 1s step-end infinite;
        }

        @keyframes navbar-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .navbar-links-block {
          flex: 1;
          display: flex;
          background: #686b6f;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.02) 0px,
            rgba(255, 255, 255, 0.02) 1px,
            transparent 1px,
            transparent 3px
          );
        }

        .navbar-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-left: 1px solid rgba(0, 0, 0, 0.25);
          position: relative;
          overflow: hidden;
          transition: background 0.25s ease;
        }

        .navbar-item:hover {
          background: rgba(255, 210, 63, 0.1);
        }

        .navbar-item::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #ffd23f;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .navbar-item:hover::before {
          transform: scaleX(1);
        }

        .navbar-label {
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          color: #d8dadd;
          transition: color 0.25s ease;
        }

        .navbar-label .navbar-prompt {
          color: #ffd23f;
          margin-right: 6px;
        }

        .navbar-item:hover .navbar-label {
          color: #ffffff;
        }
      `}</style>

      <div className="navbar-logo-block">
        <div className="navbar-logo">
          <span className="navbar-bracket">&lt;</span>Your<span className="navbar-bracket">/</span>Name<span className="navbar-bracket">&gt;</span>
          <span className="navbar-cursor" />
        </div>
      </div>

      <div className="navbar-links-block">
        {LINKS.map((link) => (
          <a className="navbar-item" href={link.href} key={link.label}>
            <span className="navbar-label">
              <span className="navbar-prompt">&gt;</span>{link.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

function useReducedMotion() {
  const ref = useRef(false)
  useEffect(() => {
    ref.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  return ref.current
}

export default function Background() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="bg-root" id="home">
      <style>{`
        /* ── Base ── */
        .bg-root {
          --bg-base: #000319;
          --gradient-glow: radial-gradient(ellipse 70% 50% at 50% 0%, #12184a 0%, #000319 65%);
          background: var(--bg-base);
          flex: 1;
          min-height: 100vh;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
        }

        .bg-glow {
          position: fixed;
          inset: 0;
          background: var(--gradient-glow);
          pointer-events: none;
          z-index: 0;
        }

        .bg-star {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          opacity: 0.5;
        }

        .bg-star.animated {
          animation: bg-twinkle var(--dur, 4s) ease-in-out var(--delay, 0s) infinite;
        }

        @keyframes bg-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-star.animated { animation: none; opacity: 0.5; }
        }

        /* ── Hero Layout ── */
        .hero-section {
          display: flex;
          flex: 1;
          flex-grow: 1;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* Giant editorial bleed text — positioned over both panels */
        .hero-giant-text {
          position: absolute;
          top: 22px;
          left: -12px;                    /* slight left bleed */
          white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14vw;
          font-weight: 900;
          color: #1a1f2e;                 /* dark on gray = visible; dark on dark = fades */
          line-height: 0.82;
          letter-spacing: -0.03em;
          z-index: 3;
          pointer-events: none;
          user-select: none;
        }

        /* HOME accent badge */
        .hero-accent-bar {
          position: absolute;
          top: 16px;
          left: 22px;
          background: #cce040;
          padding: 3px 11px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.57rem;
          font-weight: 700;
          color: #1a1f2e;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          z-index: 5;
        }

        /* ── Left grey panel ── */
        .hero-left {
          width: 42%;
          background: #b0b4ae;
          position: relative;
          display: flex;
          flex-direction: column;
          z-index: 1;
        }

        /* Vertical timeline strip on far left — fixed so it stays
           visible the whole way down the page, not just in the hero */
        .hero-timeline {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 16px 0;
          border-right: 1px solid rgba(26, 31, 46, 0.16);
          background: #b0b4ae;
          z-index: 20;
        }

        .hero-timeline-item {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.43rem;
          color: #1a1f2e;
          opacity: 0.45;
          letter-spacing: 0.1em;
          text-align: center;
          line-height: 1;
        }

        /* Spinning gear decoration */
        .hero-gear {
          position: absolute;
          left: 38px;
          top: calc(14vw * 1.64 + 48px);
          font-size: 2.8rem;
          color: #1a1f2e;
          opacity: 0.2;
          z-index: 2;
          animation: hero-gear-spin 30s linear infinite;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        @keyframes hero-gear-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Body text + socials at bottom */
        .hero-content {
          flex: 1;
          padding: 0 28px 34px 46px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 18px;
        }

        .hero-body-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.74rem;
          line-height: 1.9;
          color: #1a1f2e;
          text-align: justify;
        }

        .hero-socials {
          display: flex;
          gap: 8px;
        }

        .hero-social-btn {
          width: 32px;
          height: 32px;
          background: rgba(26, 31, 46, 0.13);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1f2e;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .hero-social-btn:hover {
          background: rgba(26, 31, 46, 0.28);
        }

        /* ── Right dark panel (transparent — stars show through) ── */
        .hero-right {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        /* Vertical pill tab navigation */
        .hero-tabs {
          position: absolute;
          right: 50px;
          top: 18px;
          display: flex;
          gap: 4px;
          align-items: flex-start;
          z-index: 5;
        }

        .hero-tab {
          background: rgba(100, 103, 108, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 10px 5px;
          writing-mode: vertical-rl;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.49rem;
          color: #d8dadd;
          border-radius: 3px;
          height: 108px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          letter-spacing: 0.07em;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }

        .hero-tab:hover {
          background: rgba(77, 255, 184, 0.18);
          color: #4dffb8;
          transform: translateY(-4px);
        }

        /* W. branding box — fixed so it stays visible while scrolling.
           top offset clears the 160px navbar so it doesn't overlap it. */
        .hero-branding {
          position: fixed;
          right: 0;
          top: 160px;
          background: #1a1c1f;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 1.05rem;
          padding: 13px 15px;
          letter-spacing: -0.02em;
          z-index: 21;
        }

        /* Nominee side badge — fixed so it stays visible while scrolling */
        .hero-nominee {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          writing-mode: vertical-rl;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.5rem;
          color: #c8cacd;
          background: rgba(18, 22, 35, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          padding: 14px 7px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          z-index: 20;
        }

        /* Right-side action icon strip — fixed so it stays visible
           while scrolling */
        .hero-actions {
          position: fixed;
          right: 0;
          bottom: 80px;
          display: flex;
          flex-direction: column;
          z-index: 20;
        }

        .hero-action-btn {
          width: 38px;
          height: 38px;
          background: rgba(18, 22, 35, 0.58);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8cacd;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.2s ease, color 0.2s ease;
        }

        .hero-action-btn:hover {
          background: rgba(77, 255, 184, 0.15);
          color: #4dffb8;
        }

        /* Separator line between panels */
        .hero-left::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: rgba(26, 31, 46, 0.3);
          z-index: 4;
        }

        /* Grey region below the hero holding the AI Experts content.
           No longer force-grows via flex or a huge min-height — the
           content itself determines the height now. flex-shrink: 0
           keeps it from ever being squeezed by hero-section. */
        .hero-bleed-spacer {
          flex: 0 0 auto;
          width: 100%;
          background: #b0b4ae;
          min-height: 300px;
        }

        /* ── AI Experts section (lives inside the grey bleed area) ── */
        .ai-experts {
          position: relative;
          width: 100%;
          /* Clears the fixed left timeline strip (26px) and the fixed
             right icon rail so text never sits underneath them */
          padding: 40px 90px 40px 46px;
          box-sizing: border-box;
        }

        .ai-experts-header {
          display: flex;
          width: 100%;
          border-bottom: 1px dashed rgba(26, 31, 46, 0.35);
        }

        .ai-experts-header-white {
          display: flex;
          width: 65%;
          background: #ffffff;
        }

        .ai-experts-title-cell {
          flex: 1.6;
          padding: 22px 28px;
          display: flex;
          align-items: center;
        }

        .ai-experts-title {
          margin: 0;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: 2.1rem;
          letter-spacing: -0.01em;
          color: #1a1f2e;
          text-transform: uppercase;
        }

        .ai-experts-title-cell-empty {
          flex: 1;
          border-left: 1px solid rgba(26, 31, 46, 0.15);
        }

        .ai-experts-body {
          padding-top: 32px;
          padding-bottom: 40px;
        }

        .ai-experts-body p {
          margin: 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.15rem;
          line-height: 1.85;
          color: #2b2f36;
          text-align: justify;
          max-width: 1080px;
        }

        .ai-experts-divider-bar {
          width: 100%;
          height: 6px;
          background: #16181c;
        }

        .ai-experts-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 28px;
          padding: 22px 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #33363c;
        }

        .ai-experts-footer a {
          color: #33363c;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .ai-experts-footer a:hover {
          color: #1a1f2e;
        }

        @media (max-width: 900px) {
          .ai-experts { padding: 30px 60px 30px 46px; }
          .ai-experts-header-white { width: 100%; }
          .ai-experts-title { font-size: 1.5rem; }
        }
      `}</style>

      <Navbar />

      {/* Starfield background */}
      <div className="bg-glow">
        {STARS.map((s) => (
          <span
            key={s.id}
            className="bg-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          />
        ))}
      </div>

      {/* ── Hero Layout ── */}
      <div className="hero-section">

        {/* Giant editorial text — bleeds across both panels */}
        <div className="hero-giant-text" aria-hidden="true">
          CREATIVE DEVELOPER
        </div>

        {/* HOME accent badge */}
        <div className="hero-accent-bar">HOME</div>

        {/* ── Left grey panel (bleeds below the right panel) ── */}
        <div className="hero-left">

          {/* Vertical timeline strip */}
          <div className="hero-timeline">
            {TIMELINE.map((t, i) => (
              <span key={i} className="hero-timeline-item">{t}</span>
            ))}
          </div>

          {/* Spinning gear decoration */}
          <div className="hero-gear" aria-hidden="true">⚙</div>

          {/* Body content pinned to bottom */}
          <div className="hero-content">
            <div className="hero-body-text">
              A passionate developer crafting beautiful, high-performance
              digital experiences. From pixel-perfect interfaces to robust
              back-end systems — I design and build software that makes a
              difference. Specializing in React, Node.js, and modern web
              technologies, turning creative ideas into interactive realities.
            </div>
            <div className="hero-socials">
              <a className="hero-social-btn" href="#" title="GitHub">GH</a>
              <a className="hero-social-btn" href="#" title="LinkedIn">in</a>
            </div>
          </div>
        </div>

        {/* ── Right dark panel (stars show through) ── */}
        <div className="hero-right">

          {/* Vertical tab navigation */}
          <div className="hero-tabs">
            {TABS.map((tab) => (
              <a className="hero-tab" href="#" key={tab}>{tab}</a>
            ))}
          </div>

          {/* Branding mark */}
          <div className="hero-branding">W.</div>

          {/* Nominee side badge */}
          <div className="hero-nominee">Nominee</div>

          {/* Action icon strip */}
          <div className="hero-actions">
            <div className="hero-action-btn">⟨/⟩</div>
            <div className="hero-action-btn">↺</div>
            <div className="hero-action-btn">≡</div>
            <div className="hero-action-btn">♪</div>
          </div>
        </div>

      </div>

      {/* Grey bleed area — now holds the AI Experts section instead of
          being empty. min-height keeps the grey going even if the
          content here is shorter than a full screen. */}
      <section className="hero-bleed-spacer ai-experts" id="about">

        <div className="ai-experts-header">
          <div className="ai-experts-header-white">
            <div className="ai-experts-title-cell">
              <h2 className="ai-experts-title">AI Experts</h2>
            </div>
            <div className="ai-experts-title-cell-empty" />
          </div>
        </div>

        <div className="ai-experts-body">
          <p>
            AI is transforming how software is designed, built, and maintained
            — and we stay at the cutting edge of that evolution. Our AI
            Experts continuously adopt the latest advancements in AI-powered
            development to deliver software that is faster to build, easier
            to maintain, and more cost-effective. By leveraging AI throughout
            the development lifecycle, we optimize every solution for
            performance, security, standards compliance, and scalability. The
            result is future-ready software that reduces technical debt,
            accelerates innovation, and grows seamlessly with your business.
          </p>
        </div>

        <div className="ai-experts-divider-bar" />

        <footer className="ai-experts-footer">
          <span>©2026</span>
          <a href="#terms">TERMS</a>
          <a href="#privacy">PRIVACY POLICY</a>
        </footer>
      </section>
    </div>
  )
}
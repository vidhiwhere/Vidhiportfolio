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

function Navbar() {
  return (
    <nav className="navbar">
      <style>{`
        .navbar {
          display: flex;
          align-items: stretch;
          width: 100%;
          height: 90px;
          font-family: 'JetBrains Mono', monospace;
          position: relative;
          z-index: 10;
        }

        .navbar-logo-block {
          display: flex;
          align-items: center;
          background: #b0b3b8;
          padding: 0 40px;
          white-space: nowrap;
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
          background: #4dffb8;
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
          background: rgba(77, 255, 184, 0.08);
        }

        .navbar-item::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #4dffb8;
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
          color: #4dffb8;
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
    <div className="bg-root">
      <style>{`
        .bg-root {
          --bg-base: #000319;
          --gradient-glow: radial-gradient(ellipse 70% 50% at 50% 0%, #12184a 0%, #000319 65%);

          background: var(--bg-base);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
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
      `}</style>

      <Navbar />

      <div className="bg-glow">
        {STARS.map((s) => (
          <span
            key={s.id}
            className={`bg-star${reducedMotion ? '' : ' animated'}`}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--dur': `${s.duration}s`,
              '--delay': `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
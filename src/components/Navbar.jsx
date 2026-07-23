import { useLayoutEffect, useRef } from 'react'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  // Measure the navbar's real height and publish it as a CSS variable
  // on :root so any other component can align to it without guessing.
  useLayoutEffect(() => {
    const el = navRef.current
    if (!el) return

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${el.offsetHeight}px`
      )
    }

    updateHeight()

    const ro = new ResizeObserver(updateHeight)
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  return (
    <nav className="navbar" ref={navRef}>
      <style>{`
        .navbar {
          display: flex;
          align-items: stretch;
          width: 100%;
          height: 220px;
          font-family: 'JetBrains Mono', monospace;
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 3px solid rgba(26, 31, 46, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
        }

        .navbar-logo-block {
          display: flex;
          align-items: center;
          background: #b0b3b8;
          width: 42%;
          padding: 0 48px;
          white-space: nowrap;
          box-sizing: border-box;
          border-right: 1px solid rgba(26, 31, 46, 0.3);
        }

        .navbar-logo {
          font-size: 2.8rem;
          font-weight: 800;
          color: #1a1c1f;
          letter-spacing: -0.02em;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .navbar-logo .logo-highlight {
          color: #1a1c1f;
        }

        .navbar-logo .logo-accent {
          color: #2b2e33;
          display: inline-flex;
          align-items: center;
        }

        .navbar-logo .logo-dot {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #ffd23f;
          border-radius: 50%;
          margin-left: 6px;
          margin-bottom: 24px;
          box-shadow: 0 0 12px #ffd23f;
        }

        .navbar-links-block {
          flex: 1;
          display: flex;
          background: #73777d;
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
          border-left: 1px solid rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
          transition: background 0.25s ease;
        }

        .navbar-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .navbar-item::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 5px;
          background: #ffd23f;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .navbar-item:hover::before {
          transform: scaleX(1);
        }

        .navbar-label {
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #dcdedf;
          text-transform: uppercase;
          transition: color 0.25s ease;
        }

        .navbar-label .navbar-prompt {
          color: #ffd23f;
          margin-right: 8px;
        }

        .navbar-item:hover .navbar-label {
          color: #ffffff;
        }
      `}</style>

      <div className="navbar-logo-block">
        <div className="navbar-logo">
          <span className="logo-highlight">binary</span>
          <span className="logo-accent">
            thinkers
            <span className="logo-dot" />
          </span>
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
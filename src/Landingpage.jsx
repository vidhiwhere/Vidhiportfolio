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
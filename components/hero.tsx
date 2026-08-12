'use client'

import { useEffect, useRef } from 'react'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrameId: number
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 100,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.life > p.maxLife || p.y < 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 5
          p.vx = (Math.random() - 0.5) * 0.3
          p.vy = -Math.random() * 0.4 - 0.1
          p.life = 0
          p.maxLife = 200 + Math.random() * 100
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.4
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 110, 40, ${alpha})`
        ctx.fill()
      })

      animFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(oklch(1 0 0 / 3%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 3%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Tech badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'oklch(0.65 0.18 38)', boxShadow: '0 0 6px oklch(0.65 0.18 38)' }}
          />
          Built with Rust + egui
        </div>

        {/* Title */}
        <h1
          className="font-mono font-bold tracking-tight text-foreground mb-4 text-balance"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.05 }}
        >
          Rust{' '}
          <span
            className="ember-glow"
            style={{ color: 'oklch(0.65 0.18 38)' }}
          >
            RPG
          </span>
        </h1>

        <p className="text-lg text-muted-foreground mb-3 font-mono">
          Turn-Based Combat Engine
        </p>

        <p className="text-base leading-relaxed text-muted-foreground mb-10 max-w-xl mx-auto">
          A turn-based RPG implemented in Rust — featuring class-based characters, enemy AI, a
          skill system with cooldowns, and a grid-based world rendered with{' '}
          <span className="font-mono" style={{ color: 'oklch(0.65 0.18 38)' }}>egui</span>.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://github.com/DogoRobert/rust-rpg-be"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-mono text-sm font-medium transition-all"
            style={{
              background: 'oklch(0.65 0.18 38)',
              color: 'oklch(0.09 0.005 260)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'oklch(0.72 0.18 38)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'oklch(0.65 0.18 38)'
            }}
          >
            <GitHubIcon />
            View on GitHub
          </a>
          <a
            href="#architecture"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-mono text-sm font-medium border border-border bg-card text-foreground transition-colors hover:border-[oklch(0.65_0.18_38/60%)] hover:text-foreground"
          >
            Explore Architecture
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

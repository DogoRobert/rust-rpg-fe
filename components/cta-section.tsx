'use client'

const highlights = [
  { value: '3', label: 'Playable Classes' },
  { value: '6', label: 'Enemy Types' },
  { value: '9', label: 'Player Skills' },
  { value: '6', label: 'Enemy Skills' },
  { value: '8', label: 'Source Modules' },
  { value: '∞', label: 'Possible Encounters' },
]

export function CTASection() {
  return (
    <section id="cta" className="py-28 px-6 relative">
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, oklch(1 0 0 / 8%), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-24">
          {highlights.map((h) => (
            <div key={h.label} className="text-center">
              <p
                className="font-mono font-bold text-3xl ember-glow mb-1"
                style={{ color: 'oklch(0.65 0.18 38)' }}
              >
                {h.value}
              </p>
              <p className="text-xs text-muted-foreground leading-tight">{h.label}</p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div
          className="rounded-lg border border-border bg-card p-10 md:p-14 text-center relative overflow-hidden"
          style={{ boxShadow: '0 0 60px oklch(0.65 0.18 38 / 6%)' }}
        >
          {/* Corner accents */}
          <div
            className="absolute top-0 left-0 w-16 h-16"
            style={{
              background:
                'linear-gradient(135deg, oklch(0.65 0.18 38 / 20%) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-16 h-16"
            style={{
              background:
                'linear-gradient(315deg, oklch(0.65 0.18 38 / 20%) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />

          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            — View the Source
          </p>

          <h2 className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4 text-balance">
            Explore the Code
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            The full source is on GitHub. Browse the module structure, inspect the combat logic,
            and see how Rust&apos;s type system shapes the architecture.
          </p>

          <a
            href="https://github.com/DogoRobert/rust-rpg-be"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded font-mono text-sm font-bold transition-all"
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
            https://github.com/DogoRobert/rust-rpg-be
          </a>

        </div>
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

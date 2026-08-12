const enemies = [
  {
    name: 'Death Rabbit',
    tier: 'Common',
    hp: 120,
    pAtt: 12,
    def: 4,
    skills: ['Fangs', 'Bite'],
    lore: 'Deceptively fast. Underestimate it at your own risk.',
    color: 'oklch(0.6 0.17 155)',
    symbol: '⬡',
  },
  {
    name: 'Small Lion',
    tier: 'Common',
    hp: 130,
    pAtt: 15,
    def: 6,
    skills: ['Fangs', 'Lick Wounds'],
    lore: 'Can sustain itself mid-fight with its healing ability.',
    color: 'oklch(0.65 0.18 65)',
    symbol: '⬡',
  },
  {
    name: 'Big Lion',
    tier: 'Uncommon',
    hp: 170,
    pAtt: 20,
    def: 15,
    skills: ['Bite', 'Lick Wounds'],
    lore: 'Heavy armor equivalent in beast form. High defense.',
    color: 'oklch(0.65 0.18 50)',
    symbol: '⬢',
  },
  {
    name: 'Horse Rider',
    tier: 'Uncommon',
    hp: 250,
    pAtt: 30,
    def: 9,
    skills: ['Pierce', 'Sword Slash'],
    lore: 'High offense, capable of piercing defensive builds.',
    color: 'oklch(0.65 0.18 38)',
    symbol: '⬢',
  },
  {
    name: 'Light Knight',
    tier: 'Elite',
    hp: 170,
    pAtt: 17,
    def: 8,
    skills: ['Shield Bash', 'Sword Slash'],
    lore: 'Trained soldier with shield disruption capability.',
    color: 'oklch(0.6 0.15 230)',
    symbol: '⬟',
  },
  {
    name: 'Heavy Knight',
    tier: 'Elite',
    hp: 300,
    pAtt: 22,
    def: 18,
    skills: ['Shield Bash', 'Sword Slash'],
    lore: 'The toughest foe — maximum HP and defense values.',
    color: 'oklch(0.55 0.1 270)',
    symbol: '⬟',
  },
]

const tierStyle: Record<string, { bg: string; text: string }> = {
  Common: { bg: 'oklch(0.6 0.17 155 / 12%)', text: 'oklch(0.6 0.17 155)' },
  Uncommon: { bg: 'oklch(0.65 0.18 38 / 12%)', text: 'oklch(0.65 0.18 38)' },
  Elite: { bg: 'oklch(0.6 0.2 280 / 12%)', text: 'oklch(0.6 0.2 280)' },
}

export function EnemiesSection() {
  return (
    <section id="enemies" className="py-28 px-6 relative">
      {/* Subtle divider */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, oklch(1 0 0 / 8%), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest uppercase">
            — Enemy Types
          </p>
          <h2 className="text-3xl font-mono font-bold text-foreground text-balance">
            Six{' '}
            <span style={{ color: 'oklch(0.65 0.18 38)' }}>Enemies</span>
            {' '}to Overcome
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Each enemy type has unique stats and skills. The engine randomly selects and spawns
            enemies on the game world each session.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enemies.map((enemy) => {
            const tier = tierStyle[enemy.tier]
            return (
              <div
                key={enemy.name}
                className="group rounded-lg border border-border bg-card p-5 transition-all duration-300 card-glow cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="text-3xl w-12 h-12 flex items-center justify-center rounded border border-border"
                    style={{ color: enemy.color }}
                    aria-hidden="true"
                  >
                    {enemy.symbol}
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ background: tier.bg, color: tier.text }}
                  >
                    {enemy.tier}
                  </span>
                </div>

                <h3 className="font-mono font-bold text-foreground mb-1">{enemy.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{enemy.lore}</p>

                {/* Compact stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'HP', value: enemy.hp },
                    { label: 'ATT', value: enemy.pAtt },
                    { label: 'DEF', value: enemy.def },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded p-2 text-center"
                      style={{ background: 'oklch(1 0 0 / 4%)' }}
                    >
                      <p className="text-xs font-mono text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-mono font-bold" style={{ color: enemy.color }}>
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {enemy.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2 py-0.5 rounded border border-border text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

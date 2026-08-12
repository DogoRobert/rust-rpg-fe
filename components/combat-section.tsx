'use client'

import { useState, useEffect } from 'react'

const PHASES = [
  {
    phase: 'Setup',
    description: 'Player picks a class and sets their character name. 10 random enemies spawn on the world.',
    actor: 'Player',
    color: 'oklch(0.6 0.2 280)',
  },
  {
    phase: 'Player Turn',
    description: 'Player selects an action: basic attack or one of three class skills (if off cooldown).',
    actor: 'Player',
    color: 'oklch(0.6 0.17 155)',
  },
  {
    phase: 'Enemy Turn',
    description: 'Enemy AI selects the first available skill from its list, respecting cooldown state.',
    actor: 'Enemy',
    color: 'oklch(0.65 0.18 38)',
  },
  {
    phase: 'Victory / Defeat',
    description: 'If the enemy HP drops to zero, it is removed from the world. If the player dies, game resets.',
    actor: 'System',
    color: 'oklch(0.6 0.15 230)',
  },
]

const combatFormula = [
  { label: 'Physical Damage', formula: 'p_att × multiplier + base_dmg − def', color: 'oklch(0.65 0.18 38)' },
  { label: 'Magic Damage', formula: 'm_att × multiplier + base_dmg', color: 'oklch(0.6 0.2 280)' },
  { label: 'Heal', formula: 'heal_amount + multiplier', color: 'oklch(0.6 0.17 155)' },
]

export function CombatSection() {
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % PHASES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const phase = PHASES[activePhase]

  return (
    <section id="combat" className="py-28 px-6 relative">
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, oklch(1 0 0 / 8%), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest uppercase">
            — Combat System
          </p>
          <h2 className="text-3xl font-mono font-bold text-foreground text-balance">
            Turn-Based{' '}
            <span style={{ color: 'oklch(0.65 0.18 38)' }}>Logic</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Fight phases */}
          <div>
            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
              Fight Loop
            </p>
            <div className="space-y-2 mb-6">
              {PHASES.map((p, i) => (
                <button
                  key={p.phase}
                  onClick={() => setActivePhase(i)}
                  className="w-full text-left flex items-center gap-4 p-4 rounded-lg border transition-all duration-200"
                  style={
                    activePhase === i
                      ? {
                          borderColor: `${p.color}50`,
                          background: `${p.color}08`,
                        }
                      : {
                          borderColor: 'oklch(1 0 0 / 8%)',
                          background: 'oklch(0.13 0.006 260)',
                        }
                  }
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0 transition-all"
                    style={{
                      background: activePhase === i ? p.color : 'oklch(1 0 0 / 15%)',
                      boxShadow: activePhase === i ? `0 0 8px ${p.color}` : 'none',
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-sm font-bold text-foreground">{p.phase}</span>
                      <span
                        className="text-xs font-mono px-1.5 py-0.5 rounded"
                        style={
                          activePhase === i
                            ? { background: `${p.color}20`, color: p.color }
                            : { background: 'oklch(1 0 0 / 5%)', color: 'oklch(0.55 0.006 260)' }
                        }
                      >
                        {p.actor}
                      </span>
                    </div>
                    {activePhase === i && (
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Animated indicator */}
            <div className="flex gap-1.5">
              {PHASES.map((p, i) => (
                <div
                  key={i}
                  className="h-0.5 rounded-full transition-all duration-300"
                  style={{
                    flex: activePhase === i ? 3 : 1,
                    background: activePhase === i ? phase.color : 'oklch(1 0 0 / 12%)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Damage formulas + code */}
          <div className="space-y-5">
            <div>
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
                Damage Formulas
              </p>
              <div className="space-y-3">
                {combatFormula.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: f.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">{f.label}</p>
                      <p className="font-mono text-sm text-foreground truncate">{f.formula}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code snippet: skill dispatch */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted">
                <span className="font-mono text-xs text-muted-foreground">skills.rs — use_skill()</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-relaxed text-muted-foreground overflow-x-auto">
                <code>
                  <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'match '}</span>
                  <span>{'stats.skill_type {\n'}</span>
                  <span>{'    '}</span>
                  <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'SkillType'}</span>
                  <span>{'::'}</span>
                  <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'PDmg'}</span>
                  <span>{' => {\n'}</span>
                  <span style={{ color: 'oklch(0.55 0.006 260)' }}>{'        // Physical damage\n'}</span>
                  <span>{'        let dmg = p_att\n'}</span>
                  <span>{'            * stats.multiplier\n'}</span>
                  <span>{'            + stats.dmg;\n'}</span>
                  <span>{'        opponent.'}</span>
                  <span style={{ color: 'oklch(0.6 0.17 155)' }}>{'take_dmg'}</span>
                  <span>{'(dmg);\n'}</span>
                  <span>{'    }\n'}</span>
                  <span>{'    '}</span>
                  <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'SkillType'}</span>
                  <span>{'::'}</span>
                  <span style={{ color: 'oklch(0.6 0.2 280)' }}>{'MDmg'}</span>
                  <span>{' => {\n'}</span>
                  <span>{'        let dmg = m_att\n'}</span>
                  <span>{'            * stats.multiplier\n'}</span>
                  <span>{'            + stats.dmg;\n'}</span>
                  <span>{'        opponent.'}</span>
                  <span style={{ color: 'oklch(0.6 0.17 155)' }}>{'take_dmg'}</span>
                  <span>{'(dmg);\n'}</span>
                  <span>{'    }\n'}</span>
                  <span>{'    '}</span>
                  <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'SkillType'}</span>
                  <span>{'::'}</span>
                  <span style={{ color: 'oklch(0.6 0.17 155)' }}>{'Heal'}</span>
                  <span>{' => {\n'}</span>
                  <span>{'        char.'}</span>
                  <span style={{ color: 'oklch(0.6 0.17 155)' }}>{'heal_self'}</span>
                  <span>{'(heal + mult);\n'}</span>
                  <span>{'    }\n'}</span>
                  <span>{'}'}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

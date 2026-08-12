'use client'

import { useState } from 'react'

interface ClassData {
  name: string
  tagline: string
  mainStat: string
  hp: number
  maxHp: number
  pAtt: number
  mAtt: number
  def: number
  str: number
  int: number
  dex: number
  stamina: number
  wisdom: number
  skills: { name: string; type: 'PDmg' | 'MDmg' | 'Heal'; dmg: number; multiplier: number }[]
  color: string
  icon: string
}

const classes: ClassData[] = [
  {
    name: 'Wizard',
    tagline: 'Master of arcane destruction',
    mainStat: 'INT',
    hp: 380,
    maxHp: 380,
    pAtt: 5,
    mAtt: 13,
    def: 4,
    str: 3,
    int: 12,
    dex: 5,
    stamina: 2,
    wisdom: 9,
    skills: [
      { name: 'Fireball', type: 'MDmg', dmg: 50, multiplier: 1.3 },
      { name: 'Gravity Pull', type: 'MDmg', dmg: 20, multiplier: 2.2 },
      { name: 'Heal', type: 'Heal', dmg: 0, multiplier: 1.5 },
    ],
    color: 'oklch(0.6 0.2 280)',
    icon: '✦',
  },
  {
    name: 'Warrior',
    tagline: 'Unyielding frontline bruiser',
    mainStat: 'STR',
    hp: 700,
    maxHp: 700,
    pAtt: 8,
    mAtt: 0,
    def: 14,
    str: 9,
    int: 3,
    dex: 4,
    stamina: 12,
    wisdom: 1,
    skills: [
      { name: 'Dark Cut', type: 'PDmg', dmg: 37, multiplier: 1.5 },
      { name: 'Rotating Cut', type: 'PDmg', dmg: 48, multiplier: 1.3 },
      { name: 'Pierce', type: 'PDmg', dmg: 65, multiplier: 1.2 },
    ],
    color: 'oklch(0.65 0.18 38)',
    icon: '⚔',
  },
  {
    name: 'Ranger',
    tagline: 'Swift precision from the shadows',
    mainStat: 'DEX',
    hp: 440,
    maxHp: 440,
    pAtt: 17,
    mAtt: 4,
    def: 8,
    str: 4,
    int: 4,
    dex: 12,
    stamina: 5,
    wisdom: 4,
    skills: [
      { name: 'Head Shot', type: 'PDmg', dmg: 55, multiplier: 1.3 },
      { name: 'Hidden Arrow', type: 'MDmg', dmg: 22, multiplier: 1.3 },
      { name: 'Volley', type: 'MDmg', dmg: 30, multiplier: 2.0 },
    ],
    color: 'oklch(0.6 0.17 155)',
    icon: '◈',
  },
]

const statMax: Record<string, number> = {
  hp: 700, pAtt: 20, mAtt: 15, def: 16, str: 12, int: 14, dex: 14, stamina: 14, wisdom: 10,
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-muted-foreground w-14 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'oklch(1 0 0 / 8%)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="font-mono text-xs text-muted-foreground w-6 text-right">{value}</span>
    </div>
  )
}

function SkillTypeBadge({ type }: { type: 'PDmg' | 'MDmg' | 'Heal' }) {
  const map = {
    PDmg: { label: 'Physical', bg: 'oklch(0.65 0.18 38 / 15%)', text: 'oklch(0.65 0.18 38)' },
    MDmg: { label: 'Magic', bg: 'oklch(0.6 0.2 280 / 15%)', text: 'oklch(0.6 0.2 280)' },
    Heal: { label: 'Heal', bg: 'oklch(0.6 0.17 155 / 15%)', text: 'oklch(0.6 0.17 155)' },
  }
  const s = map[type]
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  )
}

export function ClassesSection() {
  const [active, setActive] = useState(1)
  const cls = classes[active]

  return (
    <section id="classes" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest uppercase">
            — Player Classes
          </p>
          <h2 className="text-3xl font-mono font-bold text-foreground text-balance">
            Choose Your{' '}
            <span style={{ color: 'oklch(0.65 0.18 38)' }}>Build</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main class display */}
          <div
            className="rounded-lg border border-border bg-card p-8 transition-all duration-300"
            style={{ boxShadow: `0 0 40px ${cls.color}18` }}
          >
            {/* Class selector tabs */}
            <div className="flex gap-1 mb-8 p-1 rounded bg-muted w-fit">
              {classes.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActive(i)}
                  className="px-4 py-1.5 rounded text-sm font-mono transition-all"
                  style={
                    active === i
                      ? { background: cls.color, color: 'oklch(0.09 0.005 260)', fontWeight: 600 }
                      : { color: 'oklch(0.55 0.006 260)' }
                  }
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Identity */}
              <div>
                <div
                  className="text-5xl mb-4 w-16 h-16 flex items-center justify-center rounded-lg border border-border"
                  style={{ color: cls.color }}
                  aria-hidden="true"
                >
                  {cls.icon}
                </div>
                <h3 className="text-2xl font-mono font-bold text-foreground mb-1">{cls.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cls.tagline}</p>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold"
                  style={{ background: `${cls.color}20`, color: cls.color }}
                >
                  Main stat: {cls.mainStat}
                </div>

                {/* Skills */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-3">
                    Skills
                  </p>
                  {cls.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between gap-4 p-3 rounded border border-border bg-muted"
                    >
                      <div>
                        <p className="text-sm font-mono font-medium text-foreground">{skill.name}</p>
                        {skill.dmg > 0 ? (
                          <p className="text-xs text-muted-foreground font-mono">
                            {skill.dmg} base + {skill.multiplier}x stat
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground font-mono">
                            {skill.multiplier}x heal
                          </p>
                        )}
                      </div>
                      <SkillTypeBadge type={skill.type} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
                  Base Statistics
                </p>
                <div className="space-y-3">
                  <StatBar label="HP" value={cls.hp} max={statMax.hp} color={cls.color} />
                  <StatBar label="P.ATT" value={cls.pAtt} max={statMax.pAtt} color={cls.color} />
                  <StatBar label="M.ATT" value={cls.mAtt} max={statMax.mAtt} color={cls.color} />
                  <StatBar label="DEF" value={cls.def} max={statMax.def} color={cls.color} />
                  <StatBar label="STR" value={cls.str} max={statMax.str} color={cls.color} />
                  <StatBar label="INT" value={cls.int} max={statMax.int} color={cls.color} />
                  <StatBar label="DEX" value={cls.dex} max={statMax.dex} color={cls.color} />
                  <StatBar label="STA" value={cls.stamina} max={statMax.stamina} color={cls.color} />
                  <StatBar label="WIS" value={cls.wisdom} max={statMax.wisdom} color={cls.color} />
                </div>
              </div>
            </div>
          </div>

          {/* Rust code snippet panel */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.65 0.18 38 / 60%)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(1 0 0 / 15%)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(1 0 0 / 15%)' }} />
              </div>
              <span className="font-mono text-xs text-muted-foreground ml-2">classes.rs</span>
            </div>
            <pre className="p-4 text-xs font-mono leading-relaxed overflow-auto text-muted-foreground h-[calc(100%-44px)]">
              <code>
                <span style={{ color: 'oklch(0.6 0.2 280)' }}>{'#[derive(Clone, PartialEq)]\n'}</span>
                <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'pub enum '}</span>
                <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'Class '}</span>
                <span>{'{\n'}</span>
                <span>{'    Wizard,\n'}</span>
                <span>{'    Warrior,\n'}</span>
                <span>{'    Ranger,\n'}</span>
                <span>{'}\n\n'}</span>
                <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'impl '}</span>
                <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'Class '}</span>
                <span>{'{\n'}</span>
                <span style={{ color: 'oklch(0.55 0.006 260)' }}>{'    // Returns base stats\n'}</span>
                <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'    pub fn '}</span>
                <span style={{ color: 'oklch(0.6 0.17 155)' }}>{'base_stats'}</span>
                <span>{'(&self)\n'}</span>
                <span>{'        -> '}</span>
                <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'ClassStats'}</span>
                <span>{' {\n'}</span>
                <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'        match '}</span>
                <span>{'self {\n'}</span>
                <span>{'            '}</span>
                <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'Class'}</span>
                <span>::</span>
                <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'Wizard'}</span>
                <span>{' => ...\n'}</span>
                <span>{'            '}</span>
                <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'Class'}</span>
                <span>::</span>
                <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'Warrior'}</span>
                <span>{' => ...\n'}</span>
                <span>{'            '}</span>
                <span style={{ color: 'oklch(0.92 0.005 260)' }}>{'Class'}</span>
                <span>::</span>
                <span style={{ color: 'oklch(0.65 0.18 38)' }}>{'Ranger'}</span>
                <span>{' => ...\n'}</span>
                <span>{'        }\n'}</span>
                <span>{'    }\n'}</span>
                <span>{'}'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

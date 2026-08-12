const modules = [
  {
    file: 'lib.rs',
    description: 'Root library. Declares all public modules and shared enums.',
    exports: ['GameState', 'FightPhase', 'LifeState', 'SkillType', 'MoveDirection'],
    color: 'oklch(0.65 0.18 38)',
  },
  {
    file: 'character.rs',
    description: 'Player character struct with stats, skills, and movement logic.',
    exports: ['Character', 'CharacterStats'],
    color: 'oklch(0.6 0.2 280)',
  },
  {
    file: 'classes.rs',
    description: 'Defines the three playable classes and their base stat distributions.',
    exports: ['Class', 'ClassStats', 'StatsKind'],
    color: 'oklch(0.6 0.2 280)',
  },
  {
    file: 'skills.rs',
    description: 'Player skill definitions, damage formulas, and dispatch logic.',
    exports: ['Skill', 'SkillStats'],
    color: 'oklch(0.6 0.17 155)',
  },
  {
    file: 'mob.rs',
    description: 'Enemy (mob) struct with its own stats and position tracking.',
    exports: ['Mob', 'MobStats'],
    color: 'oklch(0.65 0.18 38)',
  },
  {
    file: 'mob_type.rs',
    description: 'Six enemy archetypes with unique stat profiles and skill sets.',
    exports: ['MobType', 'MobTypeStats'],
    color: 'oklch(0.65 0.18 38)',
  },
  {
    file: 'mob_skills.rs',
    description: 'Enemy skill definitions with cooldown tracking for AI behavior.',
    exports: ['MobSkill', 'MobSkillStats'],
    color: 'oklch(0.6 0.17 155)',
  },
  {
    file: 'main.rs',
    description: 'egui application entry point — game loop, fight panel, and setup screen.',
    exports: ['RpgApp', 'FightConfig', 'MobConfig'],
    color: 'oklch(0.6 0.15 230)',
  },
]

const techStack = [
  { name: 'Rust', role: 'Core language — memory safety, no GC', badge: 'Language' },
  { name: 'egui', role: 'Immediate-mode GUI framework for rendering', badge: 'UI' },
  { name: 'eframe', role: 'Native window + event loop wrapper for egui', badge: 'Runtime' },
  { name: 'fastrand', role: 'Lightweight random number generation', badge: 'Utility' },
  { name: 'rand', role: 'Extended RNG for mob type selection', badge: 'Utility' },
]

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-28 px-6 relative">
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, oklch(1 0 0 / 8%), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest uppercase">
            — Code Architecture
          </p>
          <h2 className="text-3xl font-mono font-bold text-foreground text-balance">
            Module{' '}
            <span style={{ color: 'oklch(0.65 0.18 38)' }}>Structure</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg">
            The codebase is cleanly split into focused modules, each owning a single domain of
            game logic — ready to be extended or refactored.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Module map */}
          <div className="space-y-2">
            {modules.map((mod) => (
              <div
                key={mod.file}
                className="group flex gap-4 p-4 rounded-lg border border-border bg-card hover:border-[oklch(0.65_0.18_38/40%)] transition-all duration-200"
              >
                <div
                  className="w-1 rounded-full shrink-0 mt-0.5"
                  style={{ background: mod.color, minHeight: '1.5rem' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm font-bold text-foreground">{mod.file}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{mod.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.exports.map((exp) => (
                      <span
                        key={exp}
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: `${mod.color}15`, color: mod.color }}
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack + design notes */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-bold text-foreground mb-4">Dependencies</h3>
              <div className="space-y-3">
                {techStack.map((t) => (
                  <div key={t.name} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-0.5 text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        background: 'oklch(0.65 0.18 38 / 12%)',
                        color: 'oklch(0.65 0.18 38)',
                      }}
                    >
                      {t.badge}
                    </span>
                    <div>
                      <p className="text-sm font-mono font-bold text-foreground leading-tight">{t.name}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-bold text-foreground mb-3">Design Patterns</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span style={{ color: 'oklch(0.65 0.18 38)' }}>→</span>
                  <span>Enum-driven dispatch via <span className="font-mono text-foreground">match</span> for class/enemy branching</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: 'oklch(0.65 0.18 38)' }}>→</span>
                  <span>Builder-style methods on game state structs</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: 'oklch(0.65 0.18 38)' }}>→</span>
                  <span>Cooldown tracking embedded in skill stats</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: 'oklch(0.65 0.18 38)' }}>→</span>
                  <span>Immediate-mode UI — no retained widget state</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: 'oklch(0.65 0.18 38)' }}>→</span>
                  <span>Random mob spawning with position assignment per-frame</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-bold text-foreground mb-2">Status</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Game logic is structurally complete. Currently under refactoring to resolve
                compilation issues and connect all game state paths end-to-end.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: 'oklch(0.65 0.18 38)',
                    boxShadow: '0 0 6px oklch(0.65 0.18 38)',
                    animation: 'pulse-ember 2s ease-in-out infinite',
                  }}
                />
                <span className="text-xs font-mono" style={{ color: 'oklch(0.65 0.18 38)' }}>
                  Active development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

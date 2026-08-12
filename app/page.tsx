import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { ClassesSection } from '@/components/classes-section'
import { EnemiesSection } from '@/components/enemies-section'
import { CombatSection } from '@/components/combat-section'
import { ArchitectureSection } from '@/components/architecture-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ClassesSection />
      <EnemiesSection />
      <CombatSection />
      <ArchitectureSection />
      <CTASection />
      <Footer />
    </main>
  )
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rust RPG — Turn-Based Combat Engine',
  description:
    'A turn-based RPG built in Rust featuring three playable classes, six enemy types, and a skill-based combat system. Built with Rust + egui.',
  keywords: ['Rust', 'RPG', 'game development', 'turn-based', 'egui', 'portfolio'],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f0e14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

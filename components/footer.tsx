export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span
            className="w-5 h-5 rounded flex items-center justify-center text-xs font-black"
            style={{ background: 'oklch(0.65 0.18 38)', color: 'oklch(0.09 0.005 260)' }}
          >
            R
          </span>
          <span className="text-muted-foreground">rust-rpg — Turn-Based Combat Engine</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span>Built with Rust + egui</span>
          <span className="text-border">|</span>
          <a
            href="https://github.com/DogoRobert/rust-rpg-be"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

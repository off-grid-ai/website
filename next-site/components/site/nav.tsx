const LINKS = [
  { href: '/download/', label: 'Download' },
  { href: '/pro/', label: 'Pro' },
  { href: '/console/', label: 'Console' },
  { href: '/ogap/', label: 'OGAP' },
  { href: '/guides/', label: 'Guides' },
  { href: '/writing/', label: 'Perspectives' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] items-center gap-7 px-5 py-3.5 sm:px-8 lg:px-16">
        <a href="/" className="flex shrink-0 items-center gap-2.5 text-sm tracking-tight text-fg">
          <span className="grid h-6 w-6 place-items-center rounded-sm border border-accent/40 text-[10px] text-accent">
            OG
          </span>
          Off Grid AI
        </a>
        <nav aria-label="Primary" className="mr-auto hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-fg-3 transition-colors duration-100 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="/download/"
          className="ml-auto shrink-0 rounded-md bg-accent px-4 py-2 text-xs text-accent-on transition-transform duration-100 ease-og hover:-translate-y-px lg:ml-0"
        >
          Download
        </a>
      </div>
    </header>
  );
}

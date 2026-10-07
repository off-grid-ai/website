import React, { useEffect, useRef, useState } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import Button from '@smoothui/smooth-button';
import { ArrowUpRight } from '@phosphor-icons/react';
import { AnimatedBackground } from '@motion-primitives/animated-background';
import { MagicCard } from '@magicui/magic-card';
import { BlurFade } from '@magicui/blur-fade';
import { TextAnimate } from '@magicui/text-animate';
import { TextReveal } from '@magicui/text-reveal';
import { NumberTicker } from '@magicui/number-ticker';
import { Kicker, Title, Lede, SectionBg, MobileRail, PlatformIcon } from '../shared.jsx';

// Shared composition for the ideas pages (ethos, mission, vision, design partners).
// Every visual element is an upstream component; this file only arranges them.

export const PLATFORMS = [['android', 'Android'], ['ios', 'iOS'], ['macos', 'macOS'], ['windows', 'Windows'], ['linux', 'Linux']];
export const GITHUB = 'https://github.com/off-grid-ai/off-grid-ai-mobile?utm_source=offgrid-docs&utm_medium=website&utm_campaign=';

export function Platforms({ label = 'Available on' }) {
  return <div className="ideas-platforms"><span>{label}</span>
    <span className="ideas-platform-icons" role="img" aria-label={PLATFORMS.map(p => p[1]).join(', ')}>
      {PLATFORMS.map(([id, name]) => <span key={id} className="ideas-pf" title={name}><PlatformIcon id={id} size={18} /></span>)}
    </span>
  </div>;
}

// Page opener: kicker, two-tone headline, one-line lede, then whatever the page adds.
export function IdeasHero({ kicker, id, lead, dim, lede, children }) {
  return <section className="has-bg ideas-hero" aria-labelledby={id}><SectionBg />
    <div className="section-shell">
      <div className="sec-head ideas-head"><Kicker>{kicker}</Kicker><Title as="h1" id={id} lead={lead} dim={dim} />{lede && <Lede>{lede}</Lede>}</div>
      {children}
    </div>
  </section>;
}

// Sticky chapter index: Motion Primitives AnimatedBackground follows the chapter in view.
export function ChapterNav({ items, label = 'Chapters' }) {
  const [active, setActive] = useState(items[0][0]);
  const rowRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const row = rowRef.current; if (!row) return;
    const link = row.querySelector(`[data-id="${active}"]`); if (!link) return;
    const left = link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active]);
  return <nav className="ideas-nav" aria-label={label}><div className="ideas-nav-row" ref={rowRef}>
    <AnimatedBackground defaultValue={active} className="seg-hover" transition={{ type: 'spring', bounce: .15, duration: .4 }}>
      {items.map(([id, name], i) => <a key={id} data-id={id} href={`#${id}`} className="seg ideas-nav-link" aria-current={active === id ? 'true' : undefined}><span className="ideas-nav-n">{String(i + 1).padStart(2, '0')}</span>{name}</a>)}
    </AnimatedBackground>
  </div></nav>;
}

// One chapter: the claim on the left, the argument on the right. The id keeps old deep links working.
export function Chapter({ id, n, kicker, title, pull, children, wide }) {
  return <section id={id} className={`ideas-ch${wide ? ' ideas-ch-wide' : ''}`} aria-labelledby={`${id}-h`}>
    <div className="section-shell ideas-ch-grid">
      <div className="ideas-ch-head">
        <div className="ideas-ch-meta"><span className="ideas-ch-n">{n}</span><Kicker>{kicker}</Kicker></div>
        <Title id={`${id}-h`} lead={title} />
      </div>
      <div className="ideas-ch-body">
        {pull && <TextAnimate as="p" by="word" animation="blurInUp" duration={.7} once startOnView className="ideas-pull">{pull}</TextAnimate>}
        <BlurFade blur="0px" inView inViewMargin="-60px" className="ideas-prose">{children}</BlurFade>
      </div>
    </div>
  </section>;
}

// Short points as Magic UI cards; a swipe row on phones.
export function Points({ items, className = '', featured }) {
  return <MobileRail className={`ideas-points ideas-points-${items.length}${featured ? ' ideas-points-feat' : ''} ${className}`}>
    {items.map(([Icon, title, text]) => <MagicCard key={title} className="feat ideas-point" gradientColor="rgba(16, 185, 129, 0.08)" gradientFrom="var(--og-primary)" gradientTo="var(--og-primary-dark)">
      <div className="feat-in">{Icon && <Icon size={22} />}<Heading as="h3">{title}</Heading>{text && <Text as="p">{text}</Text>}</div>
    </MagicCard>)}
  </MobileRail>;
}

// One sentence, revealed word by word as the reader scrolls (Magic UI TextReveal).
export function Statement({ children, label }) {
  return <section className="has-bg manifesto ideas-statement" aria-label={label}><SectionBg /><TextReveal className="reveal">{children}</TextReveal></section>;
}

export const PROOF = [[250000, 'downloads'], [3400, 'GitHub stars'], [600, 'community members']];
export function Proof() {
  return <div className="ideas-proof">{PROOF.map(([v, l]) => <div key={l} className="ideas-stat"><span className="ideas-stat-n"><NumberTicker value={v} />+</span><span className="ideas-stat-l">{l}</span></div>)}</div>;
}

export function Cta({ href, children, primary, ...rest }) {
  return <Button asChild size="lg" variant={primary ? undefined : 'outline'} className={primary ? 'ideas-cta-primary' : 'ideas-cta'}><a href={href} {...rest}>{children}<ArrowUpRight size={16} /></a></Button>;
}

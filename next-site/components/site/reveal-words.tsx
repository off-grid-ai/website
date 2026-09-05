import { Fragment } from 'react';

/**
 * Word-by-word blur reveal — same motion as right-suite's TextGenerateEffect
 * (0.5s, 60ms stagger, blur(4px) → 0, 12px rise) but driven by CSS instead of
 * framer-motion, and used for the page's <h1> only.
 *
 * Why it diverges: framer-motion's `initial` prop is serialised into the SSR
 * markup, so the H1 ships as `opacity: 0` and stays invisible until hydration
 * finishes. For a marketing page's single most important line — the one a
 * crawler reads and a first-paint user sees — that is the wrong trade. A CSS
 * animation needs no JavaScript at all, and the text is in the HTML either way.
 *
 * TextGenerateEffect is still the right tool where a stalled reveal is
 * cosmetic rather than fatal.
 *
 * Keyframes live in globals.css as `og-word`.
 */
export function RevealWords({
  words,
  className,
  as: Tag = 'div',
  stagger = 0.06,
}: {
  words: string;
  className?: string;
  as?: 'h1' | 'h2' | 'p' | 'div';
  /** Seconds between words. */
  stagger?: number;
}) {
  const parts = words.split(' ');

  return (
    <Tag className={className}>
      {parts.map((word, i) => (
        <Fragment key={word + i}>
          <span className="og-word inline-block" style={{ animationDelay: `${i * stagger}s` }}>
            {word}
          </span>
          {i < parts.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}

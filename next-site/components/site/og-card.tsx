'use client';

import { MagicCard } from '@/components/magicui/magic-card';
import { cn } from '@/lib/utils';

/**
 * MagicCard in Off Grid's skin.
 *
 * right-suite's MagicCard ships white-on-24px-radius with a layered green
 * shadow and an 8px hover lift. Off Grid law keeps the mouse-follow spotlight
 * (it tracks attention, so it is functional under §7) and replaces everything
 * else: a surface tier, a 1px border, an 8px radius, a 1px lift, no shadow (§4).
 *
 * The emerald rule across the top edge is the flat equivalent of right-suite's
 * 1.5px brand-gradient strip — it marks which card is live.
 */
export function OgCard({
  children,
  className,
  beam,
  rule = true,
}: {
  children: React.ReactNode;
  className?: string;
  beam?: React.ReactNode;
  /** Emerald rule that wipes in across the top edge on hover. */
  rule?: boolean;
}) {
  return (
    <MagicCard
      beam={beam}
      gradientSize={260}
      gradientColor="rgba(52, 211, 153, 0.07)"
      className={cn(
        'group rounded-md border-line bg-surface shadow-none',
        'hover:-translate-y-px hover:border-accent/40 hover:shadow-none',
        className
      )}
    >
      {rule ? (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-accent transition-transform duration-200 ease-og group-hover:scale-x-100"
        />
      ) : null}
      {children}
    </MagicCard>
  );
}

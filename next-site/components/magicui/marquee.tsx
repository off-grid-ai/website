'use client';

import { cn } from '@/lib/utils';

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  duration = 40,
}: {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0 gap-6 animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

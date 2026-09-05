'use client';

import { cn } from '@/lib/utils';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 10,
  borderWidth = 2,
  colorFrom = '#4ade80',
  colorTo = '#0d9488',
}: BorderBeamProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 rounded-[inherit]', className)}
      style={
        {
          border: `${borderWidth}px solid transparent`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
    >
      <div
        className="border-beam-dot absolute aspect-square"
        style={
          {
            width: `${size}px`,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            offsetAnchor: '90% 50%',
            animationDuration: `${duration}s`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

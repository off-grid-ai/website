import { useId } from 'react';
import { cn } from '@/lib/utils';

interface GridLinesProps {
  className?: string;
  color?: string;
  size?: number;
}

export function GridLines({ className, color = 'rgba(0,0,0,0.05)', size = 40 }: GridLinesProps) {
  const id = useId();
  const patternId = `grid-lines-${id}`.replace(/:/g, '');

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
            <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={color} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

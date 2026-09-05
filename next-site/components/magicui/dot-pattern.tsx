import { cn } from '@/lib/utils';

interface DotPatternProps {
  className?: string;
  color?: string;
  size?: number;
}

export function DotPattern({ className, color = '#D4D4D8', size = 24 }: DotPatternProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

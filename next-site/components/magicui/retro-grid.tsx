import { cn } from '@/lib/utils';

interface RetroGridProps {
  className?: string;
  /** Grid line colour — defaults to a subtle gray */
  color?: string;
  /** Fade colour at the bottom — should match the section bg */
  fadeColor?: string;
}

export function RetroGrid({
  className,
  color = 'rgba(0,0,0,0.12)',
  fadeColor = '#FAFAFA',
}: RetroGridProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Perspective container */}
      <div className="absolute inset-0 [perspective:200px]">
        <div className="absolute inset-0 origin-top" style={{ transform: 'rotateX(38deg)' }}>
          <div
            className="animate-grid absolute w-[200%] h-[200%] -ml-[50%] -mt-[50%] opacity-100"
            style={{
              backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
              backgroundSize: '44px 44px',
            }}
          />
        </div>
      </div>
      {/* Top fade to hide the scrolling grid edge */}
      <div
        className="absolute inset-x-0 top-0 h-[15%]"
        style={{
          background: `linear-gradient(to bottom, ${fadeColor} 0%, transparent 100%)`,
        }}
      />
      {/* Bottom fade so grid blends into section */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35%]"
        style={{
          background: `linear-gradient(to top, ${fadeColor} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

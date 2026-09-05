'use client';

import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  background?: string;
}

const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = 'rgba(255, 255, 255, 0.2)',
      shimmerSize = '0.1em',
      shimmerDuration = '2.5s',
      background = 'linear-gradient(180deg, #4ADE80 0%, #3ACC72 50%, #2AB862 100%)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-[14px] px-6 py-3',
          'font-body text-[15px] font-semibold text-white',
          'shadow-button hover:shadow-button-hover',
          'transform transition-all duration-300 ease-out',
          'hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        style={{ background }}
        {...props}
      >
        {/* Top highlight */}
        <span className="absolute top-[1px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        {/* Shimmer */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{
            mask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
            maskComposite: 'exclude',
            padding: shimmerSize,
          }}
        >
          <span
            className="absolute inset-[-100%] animate-[shimmer_2.5s_ease-in-out_infinite]"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
              animationDuration: shimmerDuration,
            }}
          />
        </span>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';

export { ShimmerButton };

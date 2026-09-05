'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function BackgroundBeams({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Ambient animation handled by CSS
  }, []);

  const paths = [
    'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
    'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
    'M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859',
    'M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851',
    'M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843',
    'M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835',
  ];

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg
        ref={svgRef}
        className="absolute w-full h-full opacity-30"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={`url(#beam-gradient-${i})`}
            strokeWidth="0.5"
            strokeOpacity={0.3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3 + i * 0.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.3,
            }}
          />
        ))}
        <defs>
          {paths.map((_, i) => (
            <linearGradient key={i} id={`beam-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0" />
              <stop offset="50%" stopColor="#0D9488" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}

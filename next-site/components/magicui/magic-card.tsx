'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function MagicCard({
  children,
  className,
  beam,
  gradientSize = 300,
  gradientColor = 'rgba(74, 222, 128, 0.12)',
}: {
  children: React.ReactNode;
  className?: string;
  beam?: React.ReactNode;
  gradientSize?: number;
  gradientColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative overflow-hidden rounded-[24px] bg-white',
        'border border-[rgba(74,222,128,0.15)]',
        'shadow-card transition-all duration-300 ease-out',
        'hover:shadow-card-hover hover:-translate-y-2',
        className
      )}
    >
      {/* Mouse-follow gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(${gradientSize}px circle at ${pos.x}px ${pos.y}px, ${gradientColor}, transparent 40%)`,
        }}
      />
      {/* Beam renders here — at root level, not inside z-10 */}
      {beam}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

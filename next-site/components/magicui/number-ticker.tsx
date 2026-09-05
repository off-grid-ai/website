'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function NumberTicker({
  value,
  className,
  duration = 1.5,
  prefix = '',
  suffix = '',
}: {
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (started.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.floor(eased * value));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          // requestAnimationFrame is paused in background tabs, so a page opened
          // in one and read later would show a figure frozen part-way to its
          // real value — a wrong number, presented as a fact. This guarantees
          // the true value lands regardless of whether the frames ever ran.
          settle.current = setTimeout(() => setDisplay(value), duration * 1000 + 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (settle.current) clearTimeout(settle.current);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

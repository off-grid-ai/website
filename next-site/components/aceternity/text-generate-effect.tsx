'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  as: Tag = 'div',
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const wordsArray = words.split(' ');

  return (
    <Tag className={cn('font-display', className)}>
      <div>
        {wordsArray.map((word, idx) => (
          <React.Fragment key={word + idx}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, filter: filter ? 'blur(4px)' : 'none' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration, delay: idx * 0.06 }}
            >
              {word}
            </motion.span>{' '}
          </React.Fragment>
        ))}
      </div>
    </Tag>
  );
}

'use client';

import { motion } from 'framer-motion';

/**
 * LampGlow — purely visual overlay, no layout changes.
 * Drop this inside any section as a sibling to your background and content.
 * The parent must be `relative overflow-hidden`.
 */
export function LampGlow({ bg = '#FAFAFA' }: { bg?: string }) {
  return (
    <div className="absolute inset-0 flex w-full items-start justify-center overflow-hidden pointer-events-none z-[1]">
      <div className="relative flex w-full scale-y-110 items-center justify-center">
        {/* Left beam */}
        <motion.div
          initial={{ opacity: 0.2, width: '20rem' }}
          animate={{ opacity: 0.65, width: '72rem' }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeInOut' }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-96 overflow-visible w-[72rem] bg-gradient-to-b from-[#4ade80]/70 via-[#4ade80]/10 to-transparent"
        >
          <div
            className="absolute w-full left-0 h-64 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: bg }}
          />
          <div
            className="absolute w-64 h-full left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{ backgroundColor: bg }}
          />
        </motion.div>

        {/* Right beam */}
        <motion.div
          initial={{ opacity: 0.2, width: '20rem' }}
          animate={{ opacity: 0.65, width: '72rem' }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeInOut' }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-96 overflow-visible w-[72rem] bg-gradient-to-b from-[#4ade80]/70 via-[#4ade80]/10 to-transparent"
        >
          <div
            className="absolute w-full right-0 h-64 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: bg }}
          />
          <div
            className="absolute w-64 h-full right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{ backgroundColor: bg }}
          />
        </motion.div>

        {/* Glow blob — sits at the top, well above content */}
        <motion.div
          initial={{ width: '8rem' }}
          animate={{ width: '36rem' }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-auto h-40 -translate-y-4 rounded-full bg-[#4ade80] blur-3xl opacity-20"
        />

        {/* Lamp line */}
        <motion.div
          initial={{ width: '20rem' }}
          animate={{ width: '72rem' }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-auto h-0.5 bg-gradient-to-r from-transparent via-[#4ade80] to-transparent"
        />

        {/* Bottom cover so beams don't bleed into content */}
        <div
          className="absolute top-[60%] h-full w-full"
          style={{ backgroundColor: bg, filter: 'blur(32px)' }}
        />
      </div>
    </div>
  );
}

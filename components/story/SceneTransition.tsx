'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface SceneTransitionProps {
  children: ReactNode
  isActive: boolean
  transitionType?: 'cinematic' | 'fade' | 'slide'
}

export function SceneTransition({
  children,
  isActive,
  transitionType = 'cinematic',
}: SceneTransitionProps) {
  const variants = {
    cinematic: {
      hidden: {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
      },
      visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1], // smooth cinematic curve
        },
      },
      exit: {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(6px)',
        transition: {
          duration: 0.8,
          ease: 'easeInOut',
        },
      },
    },

    slide: {
      hidden: { opacity: 0, x: 120, scale: 0.98 },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      exit: {
        opacity: 0,
        x: -120,
        scale: 0.98,
        transition: { duration: 0.5 },
      },
    },

    fade: {
      hidden: { opacity: 0, filter: 'blur(6px)' },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 1, ease: 'easeInOut' },
      },
      exit: {
        opacity: 0,
        filter: 'blur(4px)',
        transition: { duration: 0.6 },
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          className="absolute inset-0"
          variants={variants[transitionType]}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 🌫️ Subtle cinematic overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,120,120,0.2), transparent 70%)',
            }}
          />

          {/* 🎬 Scene Content */}
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  currentScene: number
  totalScenes: number
}

export function ProgressBar({ currentScene, totalScenes }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 w-full px-4 pt-3 z-50">
      <div className="flex gap-2">
        {Array.from({ length: totalScenes }).map((_, index) => {
          const isActive = index === currentScene
          const isCompleted = index < currentScene

          return (
            <div
              key={index}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10 backdrop-blur-md"
            >
              {/* Completed */}
              {isCompleted && (
                <div className="w-full h-full bg-pink-400/80 shadow-[0_0_10px_rgba(255,120,150,0.7)]" />
              )}

              {/* Active */}
              {isActive && (
                <motion.div
                  className="h-full bg-pink-400 shadow-[0_0_12px_rgba(255,120,150,0.9)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 3.5, // slower = cinematic
                    ease: 'linear',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
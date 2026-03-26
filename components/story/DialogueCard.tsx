'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TypewriterText } from './TypewriterText'

interface DialogueCardProps {
  dialogue: string
  quote?: string
  isVisible: boolean
  onComplete?: () => void
}

export function DialogueCard({ dialogue, quote, isVisible, onComplete }: DialogueCardProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 px-6"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.98 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative rounded-3xl p-7 backdrop-blur-3xl border border-white/10 overflow-hidden">

            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,120,120,0.15),transparent_60%)]" />

            {/* Dark layer */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="relative z-10 space-y-5">

              {/* Main Dialogue */}
              <div className="min-h-[90px] flex items-center">
                <div className="text-lg leading-relaxed font-medium text-white/90">
                  <TypewriterText
                    text={dialogue}
                    isVisible={isVisible}
                    delay={80}
                    onComplete={onComplete} // ✅ KEY
                  />
                </div>
              </div>

              {/* Quote */}
              {quote && (
                <div className="pt-4 border-t border-white/10">
                  <div className="text-sm italic text-white/60">
                    <TypewriterText
                      text={quote}
                      isVisible={isVisible}
                      delay={900}
                      isQuote
                    />
                  </div>
                </div>
              )}

              {/* Indicator */}
              <motion.div
                className="flex justify-center items-center pt-3"
                animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <span className="text-white/70 text-xs">↗</span>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
'use client'

import { motion } from 'framer-motion'

interface BackgroundLayerProps {
  backgroundImage: string
  isActive: boolean
}

export function BackgroundLayer({
  backgroundImage,
  isActive,
}: BackgroundLayerProps) {
  const isVideo = backgroundImage.endsWith('.mp4')

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black"
      initial={{ scale: 1 }}
      animate={{ scale: isActive ? 1.03 : 1 }}
      transition={{ duration: 8, ease: 'easeInOut' }}
    >
      {/* 🎥 BACKGROUND VIDEO (BLURRED ONLY HERE) */}
      {isVideo ? (
        <video
          key={backgroundImage + '-bg'}
          src={backgroundImage}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 brightness-50"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center blur-sm scale-110 brightness-50"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* 🌫️ Optional dim (no blur) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 🎬 CENTER VIDEO (NO BLUR AT ALL) */}
      <motion.div
        className="relative z-50 w-[95%] max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black flex items-center justify-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {isVideo ? (
          <video
            key={backgroundImage + '-main'}
            src={backgroundImage}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain"
          />
        ) : (
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
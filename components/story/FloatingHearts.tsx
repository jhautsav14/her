'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Heart {
  id: number
  left: number
  size: number
  duration: number
  delay: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: 16 + Math.random() * 24, // random size
        duration: 4 + Math.random() * 3, // random speed
        delay: 0,
      }

      setHearts((prev) => [...prev.slice(-20), newHeart]) // keep last 20
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
          }}
          initial={{
            y: 0,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            y: -600,
            opacity: [0, 1, 0],
            x: [0, Math.random() * 40 - 20], // drift left/right
            scale: [0.8, 1.2, 0.6],
          }}
          transition={{
            duration: heart.duration,
            ease: 'easeOut',
          }}
        >
          {/* ❤️ Glow Layer */}
          <div className="absolute inset-0 blur-md opacity-70 bg-pink-400 rounded-full" />

          {/* ❤️ Heart SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="#fb7185"
            className="relative w-full h-full drop-shadow-[0_0_10px_rgba(255,105,135,0.6)]"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
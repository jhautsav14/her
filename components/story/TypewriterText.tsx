'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  isVisible: boolean
  delay?: number
  onComplete?: () => void
  isQuote?: boolean
  skip?: boolean // 👈 NEW
}

export function TypewriterText({
  text,
  isVisible,
  delay = 0,
  onComplete,
  isQuote = false,
  skip = false,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('')
      setIsAnimating(false)
      return
    }

    // ⚡ Skip instantly
    if (skip) {
      setDisplayedText(text)
      setIsAnimating(false)
      onComplete?.()
      return
    }

    setDisplayedText('')
    setIsAnimating(true)

    let currentIndex = 0
    let timeout: NodeJS.Timeout

    const type = () => {
      if (currentIndex > text.length) {
        setIsAnimating(false)
        onComplete?.()
        return
      }

      setDisplayedText(text.slice(0, currentIndex))

      const char = text[currentIndex]

      // 💬 Natural typing speed (pause on punctuation)
      let speed = 30
      if (char === '.' || char === ',' || char === '…') speed = 200
      if (char === ' ') speed = 20

      currentIndex++

      timeout = setTimeout(type, speed)
    }

    const start = setTimeout(type, delay)

    return () => {
      clearTimeout(start)
      clearTimeout(timeout)
    }
  }, [isVisible, text, delay, skip])

  return (
    <span className="text-center inline-block leading-relaxed">
      {displayedText}

      {/* 💓 Soft blinking cursor */}
      {isAnimating && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  )
}
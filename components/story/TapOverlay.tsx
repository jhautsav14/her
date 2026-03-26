'use client'

import { useRef } from 'react'

interface TapOverlayProps {
  onNext: () => void
  onPrev?: () => void
  onPause?: (paused: boolean) => void
}

export function TapOverlay({ onNext, onPrev, onPause }: TapOverlayProps) {
  const holdTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleTap = (clientX: number) => {
    const screenWidth = window.innerWidth

    if (clientX < screenWidth / 2) {
      onPrev?.()
    } else {
      onNext()
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // ⏸️ pause on hold
    onPause?.(true)

    holdTimeout.current = setTimeout(() => {
      // long press detected (optional future use)
    }, 200)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    onPause?.(false)

    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current)
    }

    handleTap(e.clientX)
  }

  return (
    <div
      className="absolute inset-0 w-full h-full z-30 cursor-pointer select-none"

      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}

      role="button"
      tabIndex={0}
      aria-label="Story navigation"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onNext()
        if (e.key === 'ArrowLeft') onPrev?.()
      }}
    >
      {/* 👇 subtle left/right zones (for debugging or optional UI hint) */}
      <div className="absolute left-0 top-0 h-full w-1/2" />
      <div className="absolute right-0 top-0 h-full w-1/2" />
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStory } from '@/hooks/useStory'
import { BackgroundLayer } from './BackgroundLayer'
import { ProgressBar } from './ProgressBar'
import { DialogueCard } from './DialogueCard'
import { FloatingHearts } from './FloatingHearts'
import { SceneTransition } from './SceneTransition'

export function StoryContainer() {
  const {
    currentScene,
    showDialogue,
    nextScene,
    previousScene,
    showCurrentDialogue,
    getCurrentScene,
    totalScenes,
    isLastScene,
  } = useStory()

  const scene = getCurrentScene()
  const [isTextComplete, setIsTextComplete] = useState(false)

  // show dialogue
  useEffect(() => {
    const timer = setTimeout(() => {
      showCurrentDialogue()
    }, 400)

    return () => clearTimeout(timer)
  }, [currentScene])

  // reset text completion
  useEffect(() => {
    setIsTextComplete(false)
  }, [currentScene])

  return (
    <div className="mobile-frame relative flex items-center justify-center overflow-hidden">

      {/* 🎥 Background */}
      <SceneTransition isActive={true} transitionType="cinematic">
        <BackgroundLayer
          key={currentScene}
          backgroundImage={scene.backgroundImage}
          isActive={true}
        />
      </SceneTransition>

      {/* overlay */}
      <div className={`absolute inset-0 ${showDialogue ? 'bg-black/20' : ''}`} />

      {/* progress */}
      <ProgressBar
        currentScene={currentScene}
        totalScenes={totalScenes}
      />

      {/* dialogue */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 flex items-end z-50">
        <SceneTransition key={currentScene} isActive={true}>
          <DialogueCard
            dialogue={scene.dialogue}
            quote={scene.quote}
            isVisible={showDialogue}
            onComplete={() => setIsTextComplete(true)}
          />
        </SceneTransition>
      </div>

      {/* ❤️ hearts */}
      {isLastScene() && showDialogue && <FloatingHearts />}

      {/* 🎮 BUTTONS */}
      {isTextComplete && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-6 left-0 right-0 z-50 flex justify-center gap-4"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white"
            onClick={previousScene}
          >
            Back
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-5 py-2 rounded-full bg-pink-400 text-black font-medium"
            onClick={nextScene}
          >
            Next
          </motion.button>
        </motion.div>
      )}

      <div className="safe-area" />
    </div>
  )
}
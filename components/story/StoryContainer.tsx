'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  
  // Apology state
  const [apologyAccepted, setApologyAccepted] = useState(false)
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 })
  const [dodgeCount, setDodgeCount] = useState(0)

  // Funny messages for the runaway button
  const noButtonMessages = [
    "No way 😤",
    "Oops, u missed! 🙈",
    "Misclicked? 🤨",
    "Too slow! 🏃‍♂️💨",
    "Catch me! 👻"
  ]

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

  // Function to move the "No" button away
  const dodgeClick = () => {
    setDodgeCount((prev) => prev + 1)
    const randomX = Math.floor(Math.random() * 160) - 80; 
    const randomY = Math.floor(Math.random() * -150) - 60; 
    setNoBtnPos({ x: randomX, y: randomY })
  }

  return (
    <div className="mobile-frame relative flex items-center justify-center overflow-hidden bg-black">

      {/* 🎥 Background */}
      <SceneTransition isActive={true} transitionType="cinematic">
        <BackgroundLayer
          key={currentScene}
          backgroundImage={scene.backgroundImage}
          isActive={true}
        />
      </SceneTransition>

      {/* overlay */}
      <div className={`absolute inset-0 transition-colors duration-700 ${showDialogue ? 'bg-black/40' : ''}`} />

      {/* 👆 INVISIBLE TAP NAVIGATION ZONES (Like Insta Stories) */}
      {/* We only show these when the text is done reading, and hide them on the final apology scene */}
      {isTextComplete && !isLastScene() && (
        <div className="absolute inset-0 z-30 flex">
          {/* Left Side - Go Back */}
          <div 
            className="w-1/2 h-full cursor-pointer" 
            onClick={previousScene}
          />
          {/* Right Side - Go Next */}
          <div 
            className="w-1/2 h-full cursor-pointer" 
            onClick={nextScene}
          />
        </div>
      )}

      {/* progress */}
      <ProgressBar
        currentScene={currentScene}
        totalScenes={totalScenes}
      />

      {/* dialogue */}
      {/* Added pointer-events-none so tapping ON the text box still passes through to the tap zones */}
      <div className="absolute bottom-24 left-0 right-0 h-1/3 flex items-end z-40 pointer-events-none">
        <div className="w-full pointer-events-auto">
          <SceneTransition key={currentScene} isActive={true}>
            <DialogueCard
              dialogue={scene.dialogue}
              quote={scene.quote}
              isVisible={showDialogue} 
              onComplete={() => setIsTextComplete(true)}
            />
          </SceneTransition>
        </div>
      </div>

      {/* ❤️ hearts */}
      {isLastScene() && showDialogue && <FloatingHearts />}

      {/* 🎮 NAVIGATION BUTTONS */}
      <AnimatePresence>
        {isTextComplete && !isLastScene() && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-32 left-0 right-0 z-50 flex justify-center gap-4"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
              onClick={previousScene}
            >
              Back
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium shadow-[0_0_15px_rgba(244,114,182,0.5)]"
              onClick={nextScene}
            >
              Next
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🙏 PREMIUM APOLOGY BOTTOM SHEET */}
      <AnimatePresence>
        {isLastScene() && isTextComplete && !apologyAccepted && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-[60] bg-white/10 backdrop-blur-2xl border-t border-white/20 rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center"
          >
            <div className="w-12 h-1.5 bg-white/30 rounded-full mb-6" /> 
            
            <h2 className="text-3xl font-serif text-white mb-2 text-center">
              {dodgeCount >= 5 ? "Okay fine, you win! 🏳️" : "I'm so sorry... 🥺"}
            </h2>
            
            <p className="text-white/80 text-center mb-8 text-sm px-4 min-h-[40px]">
              {dodgeCount >= 5 
                ? "I disabled the No button. You literally have no choice now. Forgive me? 🥺💖" 
                : "Please forgive me! I promise to make it up to you."}
            </p>

            <div className="flex flex-col w-full gap-4 relative min-h-[140px] items-center">
               
               <motion.button
                 whileTap={{ scale: 0.95 }}
                 className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold shadow-[0_0_20px_rgba(236,72,153,0.4)] z-10"
                 onClick={() => setApologyAccepted(true)}
               >
                 {dodgeCount >= 5 ? "I accept (Forced) ❤️" : "I accept your apology ❤️"}
               </motion.button>

               {dodgeCount < 5 && (
                 <motion.button
                   animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                   onHoverStart={dodgeClick}
                   onTouchStart={dodgeClick}
                   className="relative px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md text-white/90 border border-white/10 whitespace-nowrap z-20"
                 >
                   {noButtonMessages[dodgeCount]}
                 </motion.button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎉 SUCCESS OVERLAY */}
      <AnimatePresence>
        {apologyAccepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-7xl mb-4"
            >
              🥰
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Thank you!</h2>
            <p className="text-pink-300">You're the absolute best.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="safe-area" />
    </div>
  )
}
import { useState, useCallback } from 'react'

export interface Scene {
  id: number
  backgroundImage: string
  dialogue: string
  quote?: string
  duration?: number
  hasHearts?: boolean
}

export const STORY_SCENES: Scene[] = [
  {
    id: 1,
    backgroundImage: '/s0.mp4',
    dialogue: 'From the moment I met you… I honestly thought, "Yeah… she\'s way out of my league." But somehow… you still said yes to spending time with me. And I still don\'t know how I got that lucky.',
    quote: 'From the moment I met you…',
  },
  {
    id: 2,
    backgroundImage: '/s1.mp4',
    dialogue: 'We had these random, beautiful moments… ',
    quote: 'We had these random, beautiful moments…',
  },
  {
    id: 3,
    backgroundImage: '/s2.mp4',
    dialogue: 'Those weekends… almost every single one… From midnight till 4 a.m...',
    quote: 'From midnight till 4 a.m. just talking…',
  },
  {
    id: 4,
    backgroundImage: '/s3.mp4',
    dialogue: 'There\'s something I still feel really bad about… when I accidentally burned your hand...',
    quote: 'I\'m really, truly sorry for that.',
  },
  
  {
    id: 6,
    backgroundImage: '/s3.mp4',
    dialogue: 'I care about you. Genuinely.',
    quote: 'I care about you. Genuinely.',
  },
  {
    id: 7,
    backgroundImage: '/s2.mp4',
    dialogue: 'I really like you. And I mean that.',
    quote: 'I really like you. And I mean that.',
    hasHearts: true,
  },
]

export function useStory() {
  const [currentScene, setCurrentScene] = useState(0)
  const [showDialogue, setShowDialogue] = useState(false)

  const nextScene = useCallback(() => {
    if (currentScene < STORY_SCENES.length - 1) {
      setCurrentScene((prev) => prev + 1)
      setShowDialogue(false)
    }
  }, [currentScene])

  const previousScene = useCallback(() => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1)
      setShowDialogue(false)
    }
  }, [currentScene])

  const resetStory = useCallback(() => {
    setCurrentScene(0)
    setShowDialogue(false)
  }, [])

  const showCurrentDialogue = useCallback(() => {
    setShowDialogue(true)
  }, [])

  const getCurrentScene = () => STORY_SCENES[currentScene]
  const getProgress = () => ((currentScene + 1) / STORY_SCENES.length) * 100
  const isLastScene = () => currentScene === STORY_SCENES.length - 1

  return {
    currentScene,
    showDialogue,
    nextScene,
    previousScene,
    resetStory,
    showCurrentDialogue,
    getCurrentScene,
    getProgress,
    isLastScene,
    totalScenes: STORY_SCENES.length,
  }
}

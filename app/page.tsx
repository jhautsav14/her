'use client'

import { StoryContainer } from '@/components/story/StoryContainer'
import DusKaDumUI from './game/game'
import AndazaLagaoUI from './game/game'
import NoCapGame from './game/game'

export default function Home() {
  return (
    <main className="w-full h-full overflow-hidden bg-midnight">
      <NoCapGame />
    </main>
  )
}

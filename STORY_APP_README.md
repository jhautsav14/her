# Midnight Velvet - Interactive Storytelling App

A beautiful, immersive mobile-first storytelling experience built with Next.js, Tailwind CSS, and Framer Motion.

## Features

### Visual Design
- **Midnight Velvet Theme**: Deep indigo backgrounds (#020617) with soft rose accents (#FDA4AF)
- **9:16 Mobile Aspect Ratio**: Optimized for vertical mobile displays
- **Glassmorphism UI**: Semi-transparent dialogue cards with backdrop blur effects
- **Ken Burns Effect**: Subtle zoom animation on background images for dynamic visual appeal

### Interactive Elements
- **7-Segment Progress Bar**: Track your position in the story at the top
- **Typewriter Text Effect**: Characters appear one at a time (50ms per character)
- **Scene Transitions**: Smooth fade/slide transitions between scenes
- **Tap to Continue**: Full-screen invisible overlay for seamless scene navigation
- **Floating Hearts**: Particle effect on the final scene for emotional impact

### Typography
- **Inter Font**: Clean, readable body text and dialogue
- **Playfair Display**: Elegant poetic quotes for emphasis
- **Color-coded**: Dialogue in ghost white, quotes in soft rose

## How to Run

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Architecture

### Component Structure
- **StoryContainer**: Main orchestrator component
- **BackgroundLayer**: Animated background with Ken Burns effect
- **ProgressBar**: 7-segment progress indicator
- **DialogueCard**: Glassmorphism card with typewriter text
- **TypewriterText**: Character-by-character text animation
- **TapOverlay**: Invisible full-screen tap handler
- **FloatingHearts**: Particle effect system
- **SceneTransition**: Framer Motion wrapper for scene changes

### State Management
- **useStory Hook**: Centralized story state
  - Current scene tracking
  - Scene navigation (next/previous)
  - Progress calculation
  - Dialogue visibility control

### Story Data
- 7 scenes total with deep poetic themes
- Each scene includes:
  - Background gradient (layered for depth)
  - Main dialogue text
  - Philosophical quote
  - Optional floating hearts on final scene

## Theme & Colors

| Element | Color | Hex |
|---------|-------|-----|
| Primary Background | Deep Navy | #020617 |
| Accent Text | Soft Rose | #FDA4AF |
| Body Text | Ghost White | #F8FAFC |
| Progress Bar | Lavender | #818CF8 |
| Background Layer | Navy Light | #0F172A |

## Animations

| Animation | Duration | Effect |
|-----------|----------|--------|
| Ken Burns | 8s | Subtle zoom on backgrounds |
| Typewriter | 50ms per char | Text reveals character-by-character |
| Scene Transition | 0.6s | Smooth fade/slide between scenes |
| Floating Hearts | 2.5s | Upward float with opacity fade |
| Progress Update | 0.3s | Segment color change |

## Mobile Optimizations

- Safe area padding for notches
- 44px+ touch targets
- Fullscreen immersive mode
- No scrolling/overflow
- Optimized for OLED screens (dark colors save battery)
- Prevents user scaling

## Browser Support

- Chrome/Chromium (Mobile & Desktop)
- Firefox (Mobile & Desktop)
- Safari (iOS 15+)
- Samsung Internet

## Tech Stack

- **Framework**: Next.js 16
- **UI Framework**: Tailwind CSS 4
- **Animation**: Framer Motion 11
- **Typography**: Google Fonts (Inter, Playfair Display)
- **Language**: TypeScript
- **Package Manager**: pnpm

## Future Enhancements

- Multiple story modes/paths
- User-customizable text speed
- Background image support (replace gradients)
- Sound effects/ambient music
- Share story progress functionality
- Dark/light theme toggle
- Story branching for interactive choices

## Notes

The app uses Next.js App Router and React 19.2 with server component support. All animations are GPU-accelerated using Framer Motion and CSS transforms for optimal mobile performance.

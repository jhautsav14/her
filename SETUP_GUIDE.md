# Midnight Velvet - Interactive Storytelling App

## Overview

A mobile-first (9:16 aspect ratio) interactive storytelling experience built with Next.js, Tailwind CSS, and Framer Motion. This app delivers a poetic narrative with immersive animations, glassmorphic UI, and smooth scene transitions.

## Project Structure

```
/app
  /layout.tsx          # Root layout with fonts & metadata
  /page.tsx            # Main page component
  /globals.css         # Theme colors, animations, utilities

/components/story
  /BackgroundLayer.tsx     # Animated background with Ken Burns effect
  /ProgressBar.tsx         # 7-segment progress indicator
  /DialogueCard.tsx        # Glassmorphic dialogue card (bottom 30%)
  /TypewriterText.tsx      # Character-by-character text animation
  /TapOverlay.tsx          # Invisible full-screen tap handler
  /FloatingHearts.tsx      # Particle effect for final scene
  /SceneTransition.tsx     # Fade/slide transitions
  /StoryContainer.tsx      # Main orchestrator component

/hooks
  /useStory.ts         # Story state management & scene data

/public
  /scene-1.jpg through /scene-7.jpg  # Background images

/tailwind.config.ts    # Tailwind configuration with custom colors
```

## Key Features

### 1. **Immersive Mobile Experience**
- Full-screen 9:16 aspect ratio
- Safe area handling for notches/home indicators
- Optimized for OLED screens (uses #020617 deep navy)

### 2. **Visual Design - "Midnight Velvet" Theme**
- **Primary Background**: #020617 (deepest navy)
- **Accent Text**: #FDA4AF (soft rose)
- **Body Text**: #F8FAFC (ghost white)
- **Highlights**: #818CF8 (soft lavender)

### 3. **Typography**
- **Body Text**: Inter font for readability
- **Poetic Quotes**: Playfair Display for elegance

### 4. **Animations**
- **Ken Burns Zoom**: 8-second subtle background zoom
- **Typewriter Effect**: 50ms per character with staggered motion
- **Scene Transitions**: Fade/slide using AnimatePresence
- **Floating Hearts**: Particle effect on final scene
- **TAP TO CONTINUE**: Pulsing indicator with 2-second cycle

### 5. **UI Components**
- **Glassmorphism Card**: white/10 background, 16px blur, white/20 border
- **Progress Bar**: 7 segments tracking story progression
- **Tap Overlay**: Invisible full-screen interaction layer

## Customization Guide

### Updating Story Content

Edit `/hooks/useStory.ts` and modify the `STORY_SCENES` array:

```typescript
export const STORY_SCENES: Scene[] = [
  {
    id: 1,
    backgroundImage: '/your-image.jpg',  // Reference images in /public
    dialogue: 'Your dialogue text here...',
    quote: 'Optional poetic quote...',
    hasHearts: false,  // Set true for final scene particle effect
  },
  // ... more scenes
]
```

### Changing Scene Count

1. Update `STORY_SCENES` array length
2. Progress Bar automatically adapts (7 is default in design)
3. FloatingHearts effect triggers when `hasHearts: true`

### Custom Background Images

1. Place images in `/public` folder
2. Reference in scene: `backgroundImage: '/your-image.jpg'`
3. Component auto-detects image URLs vs gradients
4. All images support Ken Burns zoom effect

### Theme Customization

Edit `/app/globals.css` `:root` section:

```css
:root {
  --midnight: #020617;        /* Main background */
  --rose-accent: #FDA4AF;     /* Highlight text */
  --white-ghost: #F8FAFC;     /* Body text */
  --lavender: #818CF8;        /* Progress bar */
}
```

### Animation Timing

Adjust in component files:
- **TypewriterText**: `delay={100}` controls ms per character
- **Ken Burns**: `duration={8}` in BackgroundLayer
- **TAP indicator**: `duration={2}` in DialogueCard
- **Scene transition**: `duration={0.6}` in DialogueCard

## Component Details

### BackgroundLayer
Displays full-screen background with subtle Ken Burns zoom effect. Supports both image URLs and CSS gradients.

### ProgressBar
7-segment indicator at top. Lavender color for current/past scenes. Animates width during active scene.

### TypewriterText
Renders text character-by-character with Framer Motion. Quotes automatically styled in rose accent with italics.

### DialogueCard
Glassmorphic card positioned in bottom 30% of screen. Shows dialogue first, then quote with staggered timing. TAP indicator pulses during interaction readiness.

### TapOverlay
Invisible full-screen element capturing taps. Triggers next scene when dialogue is visible.

### FloatingHearts
12 animated hearts floating upward over 1.5 seconds. Only renders on final scene with `hasHearts: true`.

### StoryContainer
Main orchestrator. Manages scene state, auto-shows dialogue, handles transitions, and coordinates all components.

## Mobile Optimization

- No zoom on tap-to-continue
- Touch targets: 44px+ minimum
- Safe area padding for notches
- Viewport set to `viewport-fit=cover`
- Optimized color contrast for readability
- GPU-accelerated transforms for 60fps

## Performance Notes

- Framer Motion animations use GPU acceleration
- Background images cached by browser
- Font files locally served (Inter, Playfair Display)
- No external dependencies besides framer-motion
- Estimated bundle: ~35KB (gzipped)

## Deployment

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

The app is fully optimized for Vercel deployment with automatic static optimization and edge caching.

## Browser Support

- Modern browsers (Chrome 90+, Safari 14+, Firefox 88+)
- Mobile browsers with CSS backdrop-filter support
- Graceful degradation for unsupported features

## Tips for Best Results

1. Use portrait-format images for backgrounds
2. Keep dialogue text concise (fits in 1-2 lines ideal)
3. Position important elements in bottom 30% for visibility
4. Test on actual mobile devices for accurate experience
5. Keep scene count between 5-10 for pacing
6. Use high-contrast text for accessibility

# Quick Customization Guide

## 🎨 Change Colors

**File**: `/app/globals.css`

```css
:root {
  --midnight: #020617;        /* Main background */
  --rose-accent: #FDA4AF;     /* Text highlights */
  --white-ghost: #F8FAFC;     /* Body text */
  --lavender: #818CF8;        /* Progress bar */
}
```

**Result**: Automatically applies to entire app

---

## 📖 Update Story Content

**File**: `/hooks/useStory.ts`

```typescript
export const STORY_SCENES: Scene[] = [
  {
    id: 1,
    backgroundImage: '/your-image.jpg',
    dialogue: 'Your main text here...',
    quote: 'Optional poetic quote...',
    hasHearts: false,
  },
  // Add more scenes as needed
]
```

**Tips**:
- Use `/image-name.jpg` for files in `/public` folder
- `quote` is optional (set to `undefined` if not needed)
- Set `hasHearts: true` only on final scene for particle effect

---

## 🖼️ Add Background Images

1. **Save image** to `/public/` folder
   - Recommended: JPEG, WebP format
   - Size: 1080x1920px (9:16 ratio)
   - Keep under 500KB for fast loading

2. **Update scene** in `/hooks/useStory.ts`
   ```typescript
   backgroundImage: '/my-background.jpg'
   ```

3. **Auto Features**:
   - Ken Burns zoom effect (8 seconds)
   - Fade transition between scenes
   - Works with gradients too

---

## ⏱️ Adjust Animation Timing

### Typewriter Speed (Text Reveal)
**File**: `/components/story/TypewriterText.tsx` (line ~45)
```typescript
}, 50)  // Change this: milliseconds per character
```
- `30` = faster
- `50` = default (recommended)
- `100` = slower

### Scene Transition Duration
**File**: `/components/story/DialogueCard.tsx` (line ~18)
```typescript
transition: { duration: 0.6 }  // Change this: seconds
```
- `0.3` = quick
- `0.6` = default
- `1.0` = slow/dramatic

### Ken Burns Zoom Duration
**File**: `/components/story/BackgroundLayer.tsx` (line ~28)
```typescript
duration: 8,  // Change this: seconds
```
- `4` = fast pan
- `8` = default
- `12` = slow, subtle

### TAP Indicator Pulse
**File**: `/components/story/DialogueCard.tsx` (line ~67)
```typescript
transition={{ duration: 2, repeat: Infinity }}  // Change this: seconds
```
- `1` = fast pulse
- `2` = default
- `3` = slow, subtle

---

## 🎯 Font Customization

**File**: `/app/layout.tsx`

```typescript
import { Inter, Playfair_Display } from 'next/font/google'
// Change to other Google Fonts:
// import { Poppins, Merriweather } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })
```

Popular alternatives:
- **Body Text**: Poppins, Raleway, Opensans
- **Quotes**: Georgia, Merriweather, Cinzel

---

## 🎭 Change Theme Name

1. **HTML Title**: `/app/layout.tsx` (line ~11)
   ```typescript
   title: 'Midnight Velvet - An Interactive Story',
   ```

2. **Description**: `/app/layout.tsx` (line ~12)
   ```typescript
   description: 'Immerse yourself in a poetic...',
   ```

3. **OG Meta Tags**: Add to metadata object
   ```typescript
   openGraph: {
     title: 'Your Story Title',
     description: 'Your description',
     images: [{ url: '/preview-image.jpg' }],
   }
   ```

---

## 🎪 Scene Count Adjustment

Current: 7 scenes with 7-segment progress bar

### To add scene:
1. Add new object to `STORY_SCENES` array
2. Progress bar auto-adjusts

### To change progress bar segments:
**File**: `/components/story/ProgressBar.tsx` (line ~9)
```typescript
return (
  <div className="flex gap-1">
    {Array.from({ length: totalScenes }).map((_, index) => (  // Uses actual count
```
✅ Already dynamic! No changes needed.

---

## 📱 Adjust Bottom Panel Height

**File**: `/components/story/StoryContainer.tsx` (line ~56)

```typescript
<div className="absolute bottom-0 left-0 right-0 h-1/3 flex items-end">
  {/* Change h-1/3 to adjust height */}
  {/* h-1/4 = 25% */}
  {/* h-1/3 = 33% (default - fits bottom 30%) */}
  {/* h-2/5 = 40% */}
  {/* h-1/2 = 50% */}
</div>
```

---

## 🎨 Glassmorphism Effect Adjustment

**File**: `/components/story/DialogueCard.tsx` (line ~40)

```typescript
<div className="glass rounded-2xl p-6 backdrop-blur-2xl border border-white/20 space-y-4">
  {/* Adjust these values: */}
  {/* backdrop-blur-2xl = 16px blur (current) */}
  {/* backdrop-blur-xl = 12px blur */}
  {/* backdrop-blur-3xl = 24px blur */}
  {/* border-white/20 = opacity (0-100) */}
</div>
```

---

## 🌈 Create Color Variant

Instead of changing `:root`, create new theme:

**File**: `/app/globals.css`

```css
/* Add new theme class */
.theme-rose {
  --midnight: #3d1f1f;
  --rose-accent: #ff69b4;
  --white-ghost: #fff5f7;
  --lavender: #d8a5d8;
}
```

**Usage in HTML**: `<html class="theme-rose">`

---

## 🔧 Advanced: Custom Scene Delay

Some scenes might need different start timing.

**File**: `/components/story/DialogueCard.tsx`

```typescript
<TypewriterText
  text={dialogue}
  delay={100}  // Change this per scene
/>
```

Scenes with longer text benefit from `delay={200}` to let background zoom in first.

---

## 📊 Add Sound/Music

Coming soon feature idea:

```typescript
// Future addition:
interface Scene {
  audioUrl?: string;
  audioVolume?: number;
}

// In StoryContainer:
useEffect(() => {
  if (currentScene !== prevScene && scene.audioUrl) {
    new Audio(scene.audioUrl).play()
  }
}, [currentScene])
```

---

## 🚀 Common Tweaks Cheatsheet

| What | Where | Change |
|------|-------|--------|
| Text color | `globals.css` | `--rose-accent` |
| Background color | `globals.css` | `--midnight` |
| Text speed | `TypewriterText.tsx` | `50` |
| Zoom speed | `BackgroundLayer.tsx` | `8` |
| Dialog size | `DialogueCard.tsx` | `p-6` (padding) |
| Font family | `layout.tsx` | Import new font |
| Story content | `useStory.ts` | Update array |
| Button glow | `globals.css` | `--lavender` |

---

## 💡 Tips

✅ **Do:**
- Keep scenes between 5-12 for pacing
- Use 9:16 aspect ratio images
- Test on real mobile device
- Keep dialogue under 100 words per scene

❌ **Don't:**
- Add more than 20 scenes (pacing suffers)
- Use full brightness gradients (test on OLED)
- Ignore viewport settings
- Forget to add `/` before image paths

---

**Need help? Check SETUP_GUIDE.md for detailed explanations!**

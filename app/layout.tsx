import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: false,
  themeColor: '#020617',
}

export const metadata: Metadata = {
  title: 'Midnight Velvet - An Interactive Story',
  description: 'Immerse yourself in a poetic storytelling experience',
  generator: 'v0.app',

  icons: {
    icon: '/e0.png',          // ✅ favicon
    shortcut: '/e0.png',      // ✅ browser shortcut
    apple: '/e0.png',         // ✅ iOS home screen
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body
        className="font-sans antialiased"
        style={{ backgroundColor: '#020617' }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
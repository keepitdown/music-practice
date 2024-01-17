import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import StateProvider from '@/state/state-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Practice',
  description: 'Инструмент для выполнения музыкальных упражнений. Создает случайную последовательность тональностей. В настройках можно выбрать, какие тональности должны входить в последовательность.',
  openGraph: {
    title: 'Случайные тональности',
    type: 'website',
    url: 'https://keepitdown.github.io/music-practice/',
    images: [{
      url: 'https://keepitdown.github.io/music-practice/preview-image-cropped.png',
      width: 960,
      height: 620
    }]
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>
          {children}
        </StateProvider>
      </body>
    </html>
  )
}
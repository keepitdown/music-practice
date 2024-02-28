import type { Metadata } from 'next'
import { Inter, Teko } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import StateProvider from '@/state/state-provider'
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] })
const teko = Teko({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Music Practice',
  description: 'Инструмент для выполнения музыкальных упражнений. Создает случайную последовательность тональностей. В настройках можно выбрать, какие тональности должны входить в последовательность.',
  metadataBase: new URL('https://musicpractice.space'),
  openGraph: {
    title: 'Случайные тональности',
    type: 'website',
    url: '/',
    images: [{
      url: '/images/preview-image.png',
      width: 910,
      height: 620
    }]
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header className={styles.header + ' ' + teko.className}><h1 className={styles.heading}>Music<br />Practice</h1></header>
        <StateProvider>
          {children}
        </StateProvider>
      </body>
    </html>
  )
}
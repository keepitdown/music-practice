import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import StateProvider from '@/state/state-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Practice',
  description: 'Случайные тональности',
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
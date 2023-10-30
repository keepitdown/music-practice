'use client'
import SettingsButton from '@/components/settings-button/settings-button'
import { useState } from 'react'
import styles from './layout.module.css'
import Slideout from '@/components/slideout/slideout';

export default function RandomKeyLayout({ children, settings }: { children: React.ReactNode, settings: React.ReactNode }) {
  const [showSettings, setShowSettings] = useState(false);
  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };
  return (
    <main>
      {children}
      <Slideout
        isOpen={showSettings}
      >
        {settings}
      </Slideout>
      <SettingsButton onClick={handleToggleSettings} extraClass={styles.optionsButton} />
    </main>
  )
}
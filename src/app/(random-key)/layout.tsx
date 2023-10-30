'use client'
import SettingsButton from '@/components/settings-button/settings-button';
import { useState } from 'react';
import styles from './layout.module.css'

export default function RandomKeyLayout({ children, settings }: { children: React.ReactNode, settings: React.ReactNode }) {
  const [showSettings, setShowSettings] = useState(false);
  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };
  return (
    <main>
      {children}
      {showSettings && settings}
      <SettingsButton onClick={handleToggleSettings} extraClass={styles.optionsButton}/>
    </main>
  )
}
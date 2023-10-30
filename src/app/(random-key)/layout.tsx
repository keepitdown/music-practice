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
      {showSettings && (
        <div className={styles.overlay}>
          <aside className={styles.aside}>
            {settings}
          </aside>
        </div>
      )}
      <SettingsButton onClick={handleToggleSettings} extraClass={styles.optionsButton} />
    </main>
  )
}
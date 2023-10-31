'use client'
import SettingsButton from '@/components/settings-button/settings-button'
import { useState, useEffect, useCallback, ReactNode } from 'react'
import styles from './layout.module.css'
import Slideout from '@/components/slideout/slideout';

export default function RandomKeyLayout({ children, settings }: { children: ReactNode, settings: ReactNode }) {
  const [showSettings, setShowSettings] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleToggleSettings = useCallback(() => {
    setShowSettings(!showSettings);
  }, [showSettings]);

  useEffect(() => {
    const handleSettingsHotKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyS') {
        handleToggleSettings();
      }
    };
    !disableButton && window.addEventListener('keydown', handleSettingsHotKey);
    return () => {
      window.removeEventListener('keydown', handleSettingsHotKey);
    }
  }, [handleToggleSettings, disableButton]);

  return (
    <main>
      {children}
      <Slideout
        isOpen={showSettings}
        setDisableButton={setDisableButton}
        setShowSettings={setShowSettings}
      >
        {settings}
      </Slideout>
      <SettingsButton onClick={handleToggleSettings} extraClass={styles.optionsButton} disabled={disableButton} />
    </main>
  )
}
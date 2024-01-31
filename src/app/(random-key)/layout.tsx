'use client'
import SettingsButton from '@/components/settings-button/settings-button'
import { useState, useEffect, useCallback, ReactNode } from 'react'
import styles from './layout.module.css'
import Sidebar from '@/components/sidebar/sidebar';
import { useAtom } from 'jotai';
import { settingsSidebarAtom } from '@/state/atoms';
import MetronomeProvider from '@/metronome/metronome-provider';

export default function RandomKeyLayout({ children, settings }: { children: ReactNode, settings: ReactNode }) {
  const [showSettings, setShowSettings] = useAtom(settingsSidebarAtom);
  const [disableButton, setDisableButton] = useState(false);

  const handleToggleSettings = useCallback(() => {
    setShowSettings(!showSettings);
  }, [setShowSettings, showSettings]);

  //Enable toogle settings sidebar hotkey
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
      <Sidebar
        isOpen={showSettings}
        setDisableButton={setDisableButton}
        setShowSettings={setShowSettings}
      >
        {settings}
      </Sidebar>
      <SettingsButton
        onClick={handleToggleSettings}
        extraClass={styles.optionsButton}
        disabled={disableButton}
      />
      <MetronomeProvider>{null}</MetronomeProvider>
    </main>
  )
}
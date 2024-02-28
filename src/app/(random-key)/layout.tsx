'use client'
import SettingsButton from '@/components/settings-button/settings-button'
import { useEffect, useCallback, ReactNode, MouseEventHandler } from 'react'
import styles from './layout.module.css'
import Sidebar from '@/components/sidebar/sidebar';
import { useAtom } from 'jotai';
import { settingsSidebarAtom, metronomeAtom } from '@/state/atoms';
import useMetronome from '@/metronome/metronome-hook';
import { useImmerAtom } from 'jotai-immer';
import { MAX_TEMPO, MAX_VOLUME_LEVEL, MIN_TEMPO, MIN_VOLUME_LEVEL } from '@/utility/constants';
import MetronomeButton from '@/components/metronome-button/metronome-button';

export default function RandomKeyLayout({ children, settings }: { children: ReactNode, settings: ReactNode }) {
  const [showSettings, setShowSettings] = useAtom(settingsSidebarAtom);

  const [metronomeSettings, setMetronomeSettings] = useImmerAtom(metronomeAtom);

  const metronome = useMetronome({ initTempo: metronomeSettings.tempo, initVolume: metronomeSettings.volume, initBeatsPerBar: 4 });

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
    window.addEventListener('keydown', handleSettingsHotKey);
    return () => {
      window.removeEventListener('keydown', handleSettingsHotKey);
    };
  }, [handleToggleSettings]);

  useEffect(() => {
    metronome.setTempo(metronomeSettings.tempo);
    metronome.setVolume(metronomeSettings.volume);
    metronome.setBeatsPerBar(metronomeSettings.beatsPerBar);

  }, [metronomeSettings, metronome]);

  const toggleMetronomeOn: MouseEventHandler<HTMLButtonElement> = () => {
    metronome.setIsOn(state => !state);
  };

  const handleMetronomeHotKeys = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      metronome.setIsOn(state => !state);
    }
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      setMetronomeSettings(draft => { draft.volume < MAX_VOLUME_LEVEL && draft.volume++ });
    }
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      setMetronomeSettings(draft => { draft.volume > MIN_VOLUME_LEVEL && draft.volume-- });
    }
    if (e.code === 'ArrowLeft') {
      e.preventDefault();
      setMetronomeSettings(draft => { draft.tempo > MIN_TEMPO && draft.tempo-- });
    }
    if (e.code === 'ArrowRight') {
      e.preventDefault();
      setMetronomeSettings(draft => { draft.tempo < MAX_TEMPO && draft.tempo++ });
    }
  }, [metronome, setMetronomeSettings]);

  useEffect(() => {
    window.addEventListener('keydown', handleMetronomeHotKeys);
    return () => {
      window.removeEventListener('keydown', handleMetronomeHotKeys);
    };
  }, [handleMetronomeHotKeys]);

  return (
    <main>
      {children}
      <Sidebar
        isOpen={showSettings}
        setShowSettings={setShowSettings}
      >
        {settings}
      </Sidebar>
      <MetronomeButton
        metronomeIsOn={metronome.isOn}
        onClick={toggleMetronomeOn}
        addStyles={styles.metronomeButton}
      />
      <SettingsButton
        onClick={handleToggleSettings}
        addStyles={styles.optionsButton}
      />
    </main>
  )
}
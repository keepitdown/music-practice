'use client'
import SettingsButton from '@/components/settings-button/settings-button'
import { useState, useEffect, useCallback, ReactNode, MouseEventHandler } from 'react'
import styles from './layout.module.css'
import Sidebar from '@/components/sidebar/sidebar';
import { useAtom } from 'jotai';
import { settingsSidebarAtom, metronomeAtom } from '@/state/atoms';
import useMetronome from '@/metronome/metronome-hook';
import { useImmerAtom } from 'jotai-immer';
import { MAX_TEMPO, MAX_VOLUME_LEVEL, MIN_TEMPO, MIN_VOLUME_LEVEL } from '@/utility/constants';

export default function RandomKeyLayout({ children, settings }: { children: ReactNode, settings: ReactNode }) {
  const [showSettings, setShowSettings] = useAtom(settingsSidebarAtom);
  const [disableButton, setDisableButton] = useState(false);

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
    !disableButton && window.addEventListener('keydown', handleSettingsHotKey);
    return () => {
      window.removeEventListener('keydown', handleSettingsHotKey);
    };
  }, [handleToggleSettings, disableButton]);

  useEffect(() => {
    metronome.setTempo(metronomeSettings.tempo);
    metronome.setVolume(metronomeSettings.volume);

  }, [metronomeSettings, metronome]);

  const toggleMetronomeOn: MouseEventHandler<HTMLButtonElement> = () => {
    metronome.setIsTurnedOn(state => !state);
  };

  const handleMetronomeHotKeys = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      metronome.setIsTurnedOn(state => !state);
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
      <button onClick={toggleMetronomeOn} style={{ position: 'fixed', left: 30, bottom: 30, fontSize: 16, padding: 5 }}>Beep</button>
      <p style={{ position: 'fixed', left: 110, bottom: 115 }}>{metronomeSettings.tempo}</p>
      <input
        type="range"
        min="20"
        max="180"
        step="1"
        value={metronomeSettings.tempo}
        onChange={(e) => setMetronomeSettings(draft => { e.preventDefault; draft.tempo = Number(e.currentTarget.value) })}
        style={{ position: 'fixed', left: 30, bottom: 80, height: 30, fontSize: 16 }}
      />
      <p style={{ position: 'fixed', left: 110, bottom: 195 }}>{metronomeSettings.volume}</p>
      <input
        type="range"
        min="0"
        max="20"
        step="1"
        value={metronomeSettings.volume}
        onChange={(e) => setMetronomeSettings(draft => { draft.volume = Number(e.currentTarget.value) })}
        style={{ position: 'fixed', left: 30, bottom: 160, height: 30, fontSize: 16 }}
      />
    </main>
  )
}
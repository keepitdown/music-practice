'use client'
import KeySelector from '../key-selector/key-selector';
import { useAtomValue } from 'jotai';
import { settingsTabAtom } from '@/state/atoms';
import MetronomeSettings from '../metronome-settings/metronome-settings';

export default function TabContent() {

  const activeTab = useAtomValue(settingsTabAtom);

  return (
    <>
      {activeTab === 'keys' && <KeySelector />}
    </>
  );
}
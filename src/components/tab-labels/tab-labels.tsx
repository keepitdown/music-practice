'use client'
import { settingsTabAtom } from '@/state/atoms';
import styles from './tab-labels.module.css'
import { useAtom } from 'jotai';
import { TSettingsTab } from '@/utility/types';

export default function TabLabels() {

  const [activeTab, setActiveTab] = useAtom(settingsTabAtom);

  const handleClick = (tabName: TSettingsTab) => {
    setActiveTab(tabName);
  };

  const getTabStyles = (tabName: TSettingsTab) => {
    const addStyles = activeTab === tabName ? (' ' + styles.selected) : '';
    return styles.label + addStyles;
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={getTabStyles('keys')}
        onClick={() => handleClick('keys')}
      >
        𝄞
      </button>
      <button
        type="button"
        className={getTabStyles('metronome')}
        onClick={() => handleClick('metronome')}
      >
        𝄞
      </button>
    </div>
  );
}
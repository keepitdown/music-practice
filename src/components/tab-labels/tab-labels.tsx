'use client'
import { settingsTabAtom } from '@/state/atoms';
import styles from './tab-labels.module.css'
import { useAtom } from 'jotai';
import { TSettingsTab } from '@/utility/types';
import MetronomeIcon from '@/inline-svg/metronome-icon';
import KeysIcon from '@/inline-svg/keys-icon';

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
        <KeysIcon addStyles={styles.labelIcon} title="Выбор тональностей" width={25} height={25} />
      </button>
      <button
        type="button"
        className={getTabStyles('metronome')}
        onClick={() => handleClick('metronome')}
      >
        <MetronomeIcon addStyles={styles.labelIcon} title="Настройки метронома" width={20} height={20} />
      </button>
    </div>
  );
}
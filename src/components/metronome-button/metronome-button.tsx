import styles from './metronome-button.module.css';
import { useAtomValue } from 'jotai';
import { metronomeAtom, settingsSidebarAtom } from '@/state/atoms';
import { AnimationEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import MetronomeIcon from '@/inline-svg/metronome-icon';

type TMetronomeButton = {
  metronomeIsOn: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function MetronomeButton({ metronomeIsOn, onClick, disabled }: TMetronomeButton) {

  const metronomeSettings = useAtomValue(metronomeAtom);
  const [displayedTempo, setDisplayedTempo] = useState<number | null>(null);

  const sidebarIsOpen = useAtomValue(settingsSidebarAtom);

  //Update displayed tempo only when settings sidebar is closed
  useEffect(() => {
    if (!sidebarIsOpen) {
      setDisplayedTempo(metronomeSettings.tempo);
    }
  }, [metronomeSettings, sidebarIsOpen, setDisplayedTempo]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick(e);
    e.currentTarget.classList.add(styles.pressed);
  }

  const handleAnimationEnd: AnimationEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.classList.remove(styles.pressed);
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      disabled={disabled}
    >
      <MetronomeIcon addStyles={styles.buttonIcon} title={(!metronomeIsOn ? "Включить" : "Выключить") + " метроном"} />
      <span className={styles.tempoValue}>{displayedTempo}</span>
    </button>
  );
}
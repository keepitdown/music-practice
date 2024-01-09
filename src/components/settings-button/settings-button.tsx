import Image from 'next/image'
import settingsIcon from '@/images/settings-icon-cropped.svg'
import styles from './settings-button.module.css'
import { AnimationEventHandler, MouseEventHandler } from 'react';

export default function SettingsButton({ onClick, extraClass, disabled }: { onClick: () => void, extraClass?: string, disabled?: boolean }) {
  
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick();
    e.currentTarget.classList.add(styles.pushed);
  };

  const handleAnimationEnd: AnimationEventHandler<HTMLButtonElement> = (e) => e.currentTarget.classList.remove(styles.pushed);

  return (
    <button
      type="button"
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      className={styles.button + (extraClass ? (' ' + extraClass) : '')}
      disabled={disabled}
      >
      <Image
        src={settingsIcon}
        alt="Показать настройки"
        className={styles.buttonImage}
      />
    </ button>
  )
}
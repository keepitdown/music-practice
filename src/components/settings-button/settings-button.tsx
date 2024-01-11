import Image from 'next/image'
import settingsIcon from '@/images/settings-icon-cropped.svg'
import styles from './settings-button.module.css'
import { AnimationEventHandler, MouseEventHandler } from 'react';

type TSettingsButton = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  extraClass?: string;
  disabled?: boolean;
};

export default function SettingsButton({ onClick, extraClass, disabled }: TSettingsButton) {

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick(e);
    e.currentTarget.classList.add(styles.pressed);
  };

  const handleAnimationEnd: AnimationEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.classList.remove(styles.pressed);
  };

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
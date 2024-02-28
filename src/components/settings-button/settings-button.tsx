import styles from './settings-button.module.css'
import { AnimationEventHandler, MouseEventHandler } from 'react';
import SettingsIcon from '@/inline-svg/settings-icon';

type TSettingsButton = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  addStyles?: string;
  disabled?: boolean;
};

export default function SettingsButton({ onClick, addStyles, disabled }: TSettingsButton) {

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick(e);
    e.currentTarget.classList.remove(styles.pressed);
    //Trigger reflow to make removing class take effect
    e.currentTarget.offsetHeight;
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
      className={styles.button + (addStyles ? (' ' + addStyles) : '')}
      disabled={disabled}
    >
      <SettingsIcon title="Настройки" width={44} height={44} addStyles={styles.buttonIcon} />
    </ button>
  )
}
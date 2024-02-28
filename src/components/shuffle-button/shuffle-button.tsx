'use client'
import styles from './shuffle-button.module.css'
import { AnimationEventHandler, MouseEventHandler } from 'react'
import ShuffleIcon from '@/inline-svg/shuffle-icon'

type TShuffleButton = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  addStyles: string;
};

// TODO: pass prop onClick from parent component or remove

export default function ShuffleButton({ onClick, addStyles }: TShuffleButton) {

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
      className={styles.button + (addStyles ? (' ' + addStyles) : '')}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <ShuffleIcon title="Перемешать" addStyles={styles.buttonIcon} width={50} />
    </button>
  )
}
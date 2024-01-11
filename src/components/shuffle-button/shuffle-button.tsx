'use client'
import Button from '../button/button'
import styles from './shuffle-button.module.css'
import Image from 'next/image'
import shuffleIcon from '@/images/repeat-icon-2-cropped.svg'
import { AnimationEventHandler, MouseEventHandler } from 'react'

type TShuffleButton = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

// TODO: pass prop onClick from parent component or remove

export default function ShuffleButton({ onClick }: TShuffleButton) {

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.classList.add(styles.pressed);
  };

  const handleAnimationEnd: AnimationEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.classList.remove(styles.pressed);
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <Image width={50} src={shuffleIcon} alt="Перемешать" className={styles.buttonImage} />
    </button>
  )
}
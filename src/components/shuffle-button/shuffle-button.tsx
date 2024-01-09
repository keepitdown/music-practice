'use client'
import Button from '../button/button'
import styles from './shuffle-button.module.css'
import Image from 'next/image'
import shuffleIcon from '@/images/repeat-icon-2-cropped.svg'

export default function ShuffleButton() {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => { }}
    >
      <Image width={50} src={shuffleIcon} alt="Перемешать" className={styles.buttonImage} />
    </button>
  )
}
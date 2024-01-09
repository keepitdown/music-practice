import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import KeyDisplay from '@/components/key-display/key-display'
import ShuffleButton from '@/components/shuffle-button/shuffle-button'

export default function RandomKeyPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Случайные тональности</h1>
      <KeyDisplay stylesClass={styles.displayContainer} />
      <ShuffleButton />
    </ div>
  )
}
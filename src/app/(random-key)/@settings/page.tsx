import KeySelector from '@/components/key-selector/key-selector'
import styles from './page.module.css'

export default function Settings() {
  return (
    <>
      <h2 className={styles.heading}>Настройки</h2>
      <article>
        <h3 className={styles.subHeading}>Тональности</h3>
        <KeySelector />
      </article>
    </>
  )
}
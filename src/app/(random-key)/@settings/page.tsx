import styles from './page.module.css'

export default function Settings() {
  return (
    <div className={styles.overlay}>
      <aside className={styles.aside}>
        <h2 className={styles.heading}>Настройки</h2>
      </aside>
    </div>
  )
}
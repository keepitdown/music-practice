import styles from './page.module.css'
import TabLabels from '@/components/tab-labels/tab-labels'
import TabContent from '@/components/tab-content/tabs-content'

export default function Settings() {

  return (
    <section className={styles.container}>
      <TabLabels />
      <div className={styles.content}>
        <h2 className={styles.heading}>Настройки</h2>
        <TabContent />
      </div>
    </section>
  )
}
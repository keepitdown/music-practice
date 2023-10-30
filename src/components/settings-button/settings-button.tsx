import Image from 'next/image'
import settingsIcon from '@/images/settings-icon.svg'
import styles from './settings-button.module.css'

export default function SettingsButton({ onClick, extraClass }: { onClick: () => void, extraClass?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button + (extraClass ? (' ' + extraClass) : '')}
      >
      <Image
        src={settingsIcon}
        alt="Показать настройки"
        className={styles.image}
      />
    </ button>
  )
}
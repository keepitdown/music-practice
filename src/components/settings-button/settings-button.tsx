import Image from 'next/image'
import settingsIcon from '@/images/settings-icon.svg'
import styles from './settings-button.module.css'

export default function SettingsButton({ onClick, extraClass, disabled }: { onClick: () => void, extraClass?: string, disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button + (extraClass ? (' ' + extraClass) : '')}
      disabled={disabled}
      >
      <Image
        src={settingsIcon}
        alt="Показать настройки"
        className={styles.image}
      />
    </ button>
  )
}
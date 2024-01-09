import { ReactNode } from 'react'
import styles from './button.module.css'

type TButton = {
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: TButton) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
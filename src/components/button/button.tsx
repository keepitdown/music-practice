import { ReactNode } from 'react'
import styles from './button.module.css'

type TButton = {
  children: ReactNode;
  onClick: () => void;
  addStyles?: string;
}

export default function Button({ children, onClick, addStyles }: TButton) {
  return (
    <button
      className={styles.button + (addStyles ? (' ' + addStyles) : '')}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
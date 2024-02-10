'use client'
import { ReactNode, Dispatch, SetStateAction, MouseEventHandler } from 'react'
import styles from './sidebar.module.css'

type TSidebar = {
  children: ReactNode;
  isOpen: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ children, isOpen, setShowSettings }: TSidebar) {

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      setShowSettings(false);
    }
  };

  return (
    <div
      className={styles.overlay + (isOpen ? (' ' + styles.show) : '')}
      onClick={handleOverlayClick}
    >
      <aside className={styles.content + (isOpen ? (' ' + styles.show) : '')}>
        {children}
      </aside>
    </div>
  )
}
'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './slideout.module.css'

export default function Slideout({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
    if (!isOpen && shouldRender) {
      overlayRef.current?.addEventListener('animationend', () => setShouldRender(false), { once: true });
    }
  }
    , [isOpen, shouldRender]);


  if (!shouldRender) {
    return null
  }

  return (
    <div className={styles.overlay + (!isOpen ? (' ' + styles.closing) : '')} ref={overlayRef}>
      <aside className={styles.content + (!isOpen ? (' ' + styles.closing) : '')}>
        {children}
      </aside>
    </div>
  )
}
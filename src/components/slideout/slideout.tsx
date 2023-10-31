'use client'
import { useState, useRef, useEffect, ReactNode, Dispatch, SetStateAction, MouseEventHandler } from 'react'
import styles from './slideout.module.css'

type TSlideout = {
  children: ReactNode;
  isOpen: boolean;
  setDisableButton: Dispatch<SetStateAction<boolean>>;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
};

export default function Slideout({ children, isOpen, setDisableButton, setShowSettings }: TSlideout) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    isOpen && setShouldRender(true);
  }, [isOpen]);

  const unmountOnClose = () => {
    !isOpen && setShouldRender(false);
  };

  const disableButton = () => {
    setDisableButton(true);
  };

  const reenableButton = () => {
    setDisableButton(false);
  };

  const handleAnimationEnd = () => {
    unmountOnClose();
    reenableButton();
  }

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      setShowSettings(false);
    }
  };


  if (!shouldRender) {
    return null
  }

  return (
    <div
      className={styles.overlay + (!isOpen ? (' ' + styles.close) : '')}
      onAnimationEnd={handleAnimationEnd}
      onAnimationStart={disableButton}
      onClick={handleOverlayClick}
    >
      <aside className={styles.content + (!isOpen ? (' ' + styles.close) : '')}>
        {children}
      </aside>
    </div>
  )
}
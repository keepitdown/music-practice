'use client'
import { useState, useEffect, ReactNode, Dispatch, SetStateAction, MouseEventHandler, AnimationEventHandler } from 'react'
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

  //TODO: Button reenable refactor

  const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      unmountOnClose();
    }
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
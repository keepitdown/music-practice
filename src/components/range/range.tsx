import IncreaseIcon from '@/inline-svg/increase-icon';
import styles from './range.module.css';
import { ChangeEventHandler, MouseEventHandler, ReactNode, WheelEventHandler } from 'react';
import DecreaseIcon from '@/inline-svg/decrease-icon';

type TRange = {
  min: number;
  max: number;
  step: number;
  value: number;
  addStyles?: string;
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onWheel: WheelEventHandler<HTMLInputElement>;
  onIncrease: MouseEventHandler<HTMLButtonElement>;
  onDecrease: MouseEventHandler<HTMLButtonElement>;
};

export default function Range({ min, max, step, value, addStyles, children, onChange, onWheel, onIncrease, onDecrease }: TRange) {

  return (
    <div className={addStyles}>
      <div className={styles.valueContainer}>
        <button
          className={styles.button}
          type="button"
          onClick={onDecrease}
        >
          <DecreaseIcon title="Уменьшить" addStyles={styles.buttonIcon} width={30} height={30} />
        </button>
        <span className={styles.value}>{value}</span>
        <button
          className={styles.button}
          type="button"
          onClick={onIncrease}
        >
          <IncreaseIcon title="Увеличить" addStyles={styles.buttonIcon} width={30} height={30} />
        </button>
      </div >
      <div className={styles.inputContainer}>
        <div className={styles.labelContainer}>{children}</div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={styles.rangeInput}
          onChange={onChange}
          onWheel={onWheel}
        />
      </div>
    </div>
  );
}
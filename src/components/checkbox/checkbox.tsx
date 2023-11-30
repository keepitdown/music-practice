import { MouseEventHandler } from 'react';
import styles from './checkbox.module.css'

type TCheckbox = {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
};

export default function Checkbox({ id, name, checked, onChange }: TCheckbox) {
  const handleMouseDrag: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.buttons === 1) {
      onChange();
    }
  }
  return (
      <input
        type="checkbox"
        id={id}
        name={name}
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
        onMouseEnter={handleMouseDrag}
      />
  )
}
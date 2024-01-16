import { ChangeEventHandler } from 'react';
import styles from './checkbox.module.css'

type TCheckbox = {
  id: string;
  name: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Checkbox({ id, name, checked, onChange }: TCheckbox) {

  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      className={styles.checkbox}
      checked={checked}
      onChange={onChange}
    />
  )
}
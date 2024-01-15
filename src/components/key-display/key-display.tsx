import { useState } from 'react';
import styles from './key-display.module.css'

type TKeyDisplay = {
  data: string[]
  stylesClass?: string;
}

export default function KeyDisplay({ data, stylesClass }: TKeyDisplay) {
  return (
    <ol className={styles.container + (stylesClass ? (' ' + stylesClass) : '')}>
      {data.map(dataItem => (<li className={styles.item} key={dataItem}>{dataItem}</li>))}
    </ol>
  )
}
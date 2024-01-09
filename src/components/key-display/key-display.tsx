import styles from './key-display.module.css'

type TKeyDisplay = {
  stylesClass?: string;
}

export default function KeyDisplay({ stylesClass }: TKeyDisplay) {
  return (
    <ol className={styles.gridContainer + (stylesClass ? (' ' + stylesClass) : '')}>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ol>
  )
}
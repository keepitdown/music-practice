import { useImmerAtom } from 'jotai-immer';
import styles from './signature-selector.module.css';
import { metronomeAtom } from '@/state/atoms';
import { Archivo } from 'next/font/google';
import { TMetronomeSettings } from '@/utility/types';
import NoneIcon from '@/inline-svg/none-icon';

const archivo = Archivo({ subsets: ['latin', 'latin-ext'] });

type TSignatureSelector = {
  addStyles?: string;
};

export default function SignatureSelector({ addStyles }: TSignatureSelector) {

  const [metronomeSettings, setMetronomeSettings] = useImmerAtom(metronomeAtom);

  const handleClick = (buttonValue: TMetronomeSettings['beatsPerBar']) => {
    setMetronomeSettings(draft => { draft.beatsPerBar = buttonValue; });
  };

  const getButtonStyles = (buttonValue: TMetronomeSettings['beatsPerBar']) => {
    const addStyles = metronomeSettings.beatsPerBar === buttonValue ? (' ' + styles.selected) : '';
    return styles.button + addStyles;
  };

  return (
    <div className={styles.container + ' ' + archivo.className + (addStyles ? (' ' + addStyles) : '')}>

      <button
        type="button"
        aria-label="Без размера"
        className={getButtonStyles(null)}
        onClick={() => handleClick(null)}
      >
        <NoneIcon title="Без размера" width={15} height={15} addStyles={styles.noSignatureIcon} />
      </button>

      <button
        type="button"
        aria-label="Размер две четверти"
        className={getButtonStyles(2)}
        onClick={() => handleClick(2)}
      >
        <div className={styles.timeSiganture}>
          <span>2</span>
          <span>4</span>
        </div>
      </button>

      <button
        type="button"
        aria-label="Размер три четверти"
        className={getButtonStyles(3)}
        onClick={() => handleClick(3)}
      >
        <div className={styles.timeSiganture}>
          <span>3</span>
          <span>4</span>
        </div>
      </button>

      <button
        type="button"
        aria-label="Размер четыре четверти"
        className={getButtonStyles(4)}
        onClick={() => handleClick(4)}
      >
        <div className={styles.timeSiganture}>
          <span>4</span>
          <span>4</span>
        </div>
      </button>

    </div>
  );
}
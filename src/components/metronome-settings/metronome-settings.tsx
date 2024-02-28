'use client'
import { useImmerAtom } from 'jotai-immer';
import styles from './metronome-settings.module.css'
import { metronomeAtom } from '@/state/atoms';
import { MAX_TEMPO, MAX_VOLUME_LEVEL, MIN_TEMPO, MIN_VOLUME_LEVEL } from '@/utility/constants';
import { ChangeEventHandler, WheelEventHandler } from 'react';
import volumeIcon from '@/images/volume-icon.svg';
import tempoIcon from '@/images/tempo-icon.svg';
import Image from 'next/image';
import Range from '../range/range';
import SignatureSelector from '../signature-selector/signature-selector';

export default function MetronomeSettings() {

  const [metronomeSettings, setMetronomeSettings] = useImmerAtom(metronomeAtom);

  const handleTempoChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMetronomeSettings(draft => { draft.tempo = Number(e.currentTarget.value) });
  };

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMetronomeSettings(draft => { draft.volume = Number(e.currentTarget.value) });
  };

  const handleVolumeScroll: WheelEventHandler<HTMLInputElement> = (e) => {
    if (e.deltaY < 0 && metronomeSettings.volume < MAX_VOLUME_LEVEL) {
      setMetronomeSettings(draft => { draft.volume++ });
    }
    if (e.deltaY > 0 && metronomeSettings.volume > MIN_VOLUME_LEVEL) {
      setMetronomeSettings(draft => { draft.volume-- });
    }
  };

  const handleTempoScroll: WheelEventHandler<HTMLInputElement> = (e) => {
    if (e.deltaY < 0 && metronomeSettings.tempo < MAX_TEMPO) {
      setMetronomeSettings(draft => { draft.tempo++ });
    }
    if (e.deltaY > 0 && metronomeSettings.tempo > MIN_TEMPO) {
      setMetronomeSettings(draft => { draft.tempo-- });
    }
  };

  const handleIncreaseVolume = () => {
    (metronomeSettings.volume < MAX_VOLUME_LEVEL) && setMetronomeSettings(draft => { draft.volume++ });
  };

  const handleDecreaseVolume = () => {
    (metronomeSettings.volume > MIN_VOLUME_LEVEL) && setMetronomeSettings(draft => { draft.volume-- });
  }

  const handleIncreaseTempo = () => {
    (metronomeSettings.tempo < MAX_TEMPO) && setMetronomeSettings(draft => { draft.tempo++ });
  };

  const handleDecreaseTempo = () => {
    (metronomeSettings.tempo > MIN_TEMPO) && setMetronomeSettings(draft => { draft.tempo-- });
  }

  return (
    <article className={styles.container}>
      <h3 className={styles.heading}>Метроном</h3>
      <form className={styles.form}>
        <Range
          min={MIN_VOLUME_LEVEL}
          max={MAX_VOLUME_LEVEL}
          step={1}
          value={metronomeSettings.volume}
          addStyles={styles.range}
          onChange={handleVolumeChange}
          onWheel={handleVolumeScroll}
          onIncrease={handleIncreaseVolume}
          onDecrease={handleDecreaseVolume}
        >
          <Image src={volumeIcon} loading="eager" alt="Громкость" title="Громкость" width={25} height={25} />
        </Range>
        <Range
          min={MIN_TEMPO}
          max={MAX_TEMPO}
          step={1}
          value={metronomeSettings.tempo}
          addStyles={styles.range}
          onChange={handleTempoChange}
          onWheel={handleTempoScroll}
          onIncrease={handleIncreaseTempo}
          onDecrease={handleDecreaseTempo}
        >
          <Image src={tempoIcon} loading="eager" alt="Темп" title="Темп" width={20} height={20} />
        </Range>
        <SignatureSelector addStyles={styles.signatureSelector} />
      </form>
    </article>
  )
}
'use client'
import styles from './page.module.css'
import KeyDisplay from '@/components/key-display/key-display'
import ShuffleButton from '@/components/shuffle-button/shuffle-button'
import { keysAtom } from '@/state/atoms'
import { accidentalChars } from '@/utility/constants'
import { TSelectedKeys } from '@/utility/types'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'

const addChars = {
  natural: '',
  sharp: accidentalChars.sharp,
  flat: accidentalChars.flat
} as const;

function generatePool(selectedKeys: TSelectedKeys) {

  const result: string[] = [];

  let accidentalKeys: TSelectedKeys[keyof TSelectedKeys], key: boolean;

  // Iterate over groups of music keys for each accidental
  for (let accidental in selectedKeys) {

    accidentalKeys = selectedKeys[accidental as keyof typeof selectedKeys];

    //Iterate over music keys in each group
    for (let keyName in accidentalKeys) {

      key = accidentalKeys[keyName as keyof typeof accidentalKeys];

      //If selected create string representation by converting key name to uppercase and adding accidental char if passed, then add to result array
      if (key) {
        const displayedString = keyName.toUpperCase() + (addChars[accidental as keyof typeof selectedKeys]);
        result.push(displayedString);
      }
    }
  }
  return result;
}

function shuffleKeys(keysPool: string[], lengthLimit: number) {
  //Fisher–Yates shuffle modified to produce output of defined length or shorter
  const shuffledArray = keysPool.slice();
  const arrayLength = shuffledArray.length;

  let i = 0, randomIndex: number, swappedValue: string;

  while ((i < arrayLength - 1) && (i < lengthLimit)) {
    randomIndex = i + Math.floor(Math.random() * (arrayLength - i));
    swappedValue = shuffledArray[i];
    shuffledArray[i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = swappedValue;
    i++;
  }

  return shuffledArray.slice(0, lengthLimit);
}

export default function RandomKeyPage() {

  const [displayedKeys, setDisplayedKeys] = useState([] as string[]);

  const selectedKeys = useAtomValue(keysAtom);

  const keysPool = useMemo(() => {
    return generatePool(selectedKeys);
  }, [selectedKeys]);

  const handleTriggerShuffle = useCallback(() => {
    setDisplayedKeys(shuffleKeys(keysPool, 16))
  }, [keysPool]);


  //TODO: prevent shuffling when settings are open (use atom for setting state)
  useEffect(() => {
    handleTriggerShuffle();
  }, [handleTriggerShuffle]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Случайные тональности</h1>
      <KeyDisplay data={displayedKeys} stylesClass={styles.displayContainer} />
      <ShuffleButton onClick={handleTriggerShuffle} />
    </ div>
  )
}
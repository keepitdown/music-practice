'use client'
import styles from './page.module.css'
import KeyDisplay from '@/components/key-display/key-display'
import ShuffleButton from '@/components/shuffle-button/shuffle-button'
import { keysAtom, settingsSidebarAtom } from '@/state/atoms'
import { accidentalChars } from '@/utility/constants'
import { TSelectedKeys } from '@/utility/types'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'

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

function shuffleKeys(keysPool: string[], lengthLimit: number = 16) {
  //Fisher–Yates shuffle modified to produce output of defined length or shorter (16 is default limit)
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
  const sidebarIsOpen = useAtomValue(settingsSidebarAtom);

  const prevSelectedKeysRef = useRef<typeof selectedKeys | null>(null);
  const keysPoolRef = useRef([] as string[]);

  const handleTriggerShuffle = useCallback(() => {
    setDisplayedKeys(shuffleKeys(keysPoolRef.current));
  }, []);

  //On sidebar close checks whether selected keys where changed, if yes updates keysPool and triggers shuffle
  useEffect(() => {
    if (!sidebarIsOpen) {
      if (selectedKeys !== prevSelectedKeysRef.current) {
        prevSelectedKeysRef.current = selectedKeys;
        keysPoolRef.current = (generatePool(selectedKeys));
        handleTriggerShuffle();
      }
    }
  }, [sidebarIsOpen, selectedKeys, handleTriggerShuffle]);

  //Enable shuffle hotkey
  useEffect(() => {
    const handleShuffleHotKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyR') {
        handleTriggerShuffle();
      }
    };
    !sidebarIsOpen && window.addEventListener('keydown', handleShuffleHotKey);
    return () => {
      window.removeEventListener('keydown', handleShuffleHotKey);
    }
  }, [handleTriggerShuffle, sidebarIsOpen]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Случайные тональности</h1>
      <KeyDisplay data={displayedKeys} stylesClass={styles.displayContainer} />
      <ShuffleButton onClick={handleTriggerShuffle} />
    </ div>
  )
}
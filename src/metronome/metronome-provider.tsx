'use client'
import { MouseEventHandler, ReactNode, createContext, useEffect, useRef, useState } from "react"
import Metronome from "./metronome";

type TMetronomeProvider = {
  children: ReactNode;
}

const MetronomeContext = createContext(null);

export default function MetronomeProvider({ children }: TMetronomeProvider) {

  const metronomeRef = useRef<Metronome | null>(null);

  const [isTurnedOn, setIsTurnedOn] = useState(false);
  // TODO: add default tempo config option or component prop
  const [tempo, setTempo] = useState(60);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    metronomeRef.current = new Metronome();
    metronomeRef.current.loadSamples();
    return () => metronomeRef.current?.remove();
  }, []);

  useEffect(() => {
    if (isTurnedOn) {
      console.log('start');
      metronomeRef.current?.start();
    }
    return () => {
      console.log('stop');
      metronomeRef.current?.stop();
    }
  }, [isTurnedOn, tempo]);

  const buttonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setIsTurnedOn(state => !state);
  }

  return (
    <MetronomeContext.Provider value={null}>
      <button onClick={buttonHandler} style={{ position: 'fixed', left: 30, bottom: 30, fontSize: 16, padding: 5 }}>Beep</button>
      {children}
    </MetronomeContext.Provider>
  );
}
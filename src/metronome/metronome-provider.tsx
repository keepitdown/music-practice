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
  const [volume, setVolume] = useState(20);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    metronomeRef.current = new Metronome({ tempo: 60, beatsPerBar: 4, volume: 20 });
    metronomeRef.current.loadSamples();
    return () => metronomeRef.current?.remove();
  }, []);

  useEffect(() => {
    //TODO: rewrite without optional chaining
    if (isTurnedOn) {
      metronomeRef.current?.start();
    }
    return () => {
      metronomeRef.current?.stop();
    }
  }, [isTurnedOn]);

  useEffect(() => {
    if (metronomeRef.current) {
      metronomeRef.current.tempo = tempo;
    }
  }, [tempo]);

  useEffect(() => {
    if (metronomeRef.current) {
      metronomeRef.current.volume = volume;
    }
  }, [volume]);

  const buttonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setIsTurnedOn(state => !state);
  }

  return (
    <MetronomeContext.Provider value={null}>
      <button onClick={buttonHandler} style={{ position: 'fixed', left: 30, bottom: 30, fontSize: 16, padding: 5 }}>Beep</button>
      <p style={{ position: 'fixed', left: 110, bottom: 115 }}>{tempo}</p>
      <input
        type="range"
        min="20"
        max="180"
        step="1"
        value={tempo}
        onChange={(e) => setTempo(Number(e.currentTarget.value))}
        style={{ position: 'fixed', left: 30, bottom: 80, height: 30, fontSize: 16 }}
      />
      <p style={{ position: 'fixed', left: 110, bottom: 195 }}>{volume}</p>
      <input
        type="range"
        min="0"
        max="20"
        step="1"
        value={volume}
        onChange={(e) => setVolume(Number(e.currentTarget.value))}
        style={{ position: 'fixed', left: 30, bottom: 160, height: 30, fontSize: 16 }}
      />
      {children}
    </MetronomeContext.Provider>
  );
}
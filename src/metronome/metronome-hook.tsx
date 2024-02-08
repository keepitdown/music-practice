import { useEffect, useRef, useState } from "react"
import Metronome from "./metronome";

type TMetronomeHook = {
  initTempo: number;
  initBeatsPerBar: 2 | 3 | 4;
  initVolume: number;
}

export default function useMetronome({ initTempo, initBeatsPerBar, initVolume }: TMetronomeHook) {

  const metronomeRef = useRef<Metronome | null>(null);

  const [isTurnedOn, setIsTurnedOn] = useState(false);
  const [tempo, setTempo] = useState(initTempo);
  const [volume, setVolume] = useState(initVolume);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    metronomeRef.current = new Metronome({ tempo: initTempo, beatsPerBar: initBeatsPerBar, volume: initVolume });
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

  return { setTempo, setVolume, status, setIsTurnedOn };
}
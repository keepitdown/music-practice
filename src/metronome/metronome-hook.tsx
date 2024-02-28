import { useEffect, useRef, useState } from "react"
import Metronome from "./metronome";

type TMetronomeHook = {
  initTempo: number;
  initBeatsPerBar: null | 2 | 3 | 4;
  initVolume: number;
}

export default function useMetronome({ initTempo, initBeatsPerBar, initVolume }: TMetronomeHook) {

  const metronomeRef = useRef<Metronome | null>(null);

  const [isOn, setIsOn] = useState(false);
  const [tempo, setTempo] = useState(initTempo);
  const [volume, setVolume] = useState(initVolume);
  const [beatsPerBar, setBeatsPerBar] = useState(initBeatsPerBar);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    metronomeRef.current = new Metronome({ tempo: initTempo, beatsPerBar: initBeatsPerBar, volume: initVolume });
    metronomeRef.current.loadSamples();
    return () => metronomeRef.current?.remove();
  }, []);

  useEffect(() => {
    if (metronomeRef.current) {
      if (isOn) {
        metronomeRef.current.start();
      } else {
        metronomeRef.current.stop();
      }
    }
  }, [isOn]);

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

  useEffect(() => {
    if (metronomeRef.current) {
      metronomeRef.current.beatsPerBar = beatsPerBar;
    }
  }, [beatsPerBar]);

  return { setIsOn, setTempo, setVolume, setBeatsPerBar, status, isOn };
}
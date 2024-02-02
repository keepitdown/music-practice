'use client'
import { MouseEventHandler, ReactNode, createContext, useEffect, useRef, useState } from "react"
import config from "./metronome.config.json"

function loadSamples(sampleUrls: string[], audioContext: AudioContext) {
  const bufferPromises = sampleUrls.map(async url => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  });
  return Promise.all(bufferPromises);
}

function playSample(sampleBuffer: AudioBuffer, audioContext: AudioContext, time?: number) {
  const source = audioContext.createBufferSource();
  source.buffer = sampleBuffer;
  source.connect(audioContext.destination);
  source.start(time);
}

function createScheduler(audioContext: AudioContext, sampleBuffer: AudioBuffer, tempo: number, startTime: number) {
  const beatDuration = 60 / tempo;
  const scheduleAheadSec = config.scheduleAheadMilSec / 1000;
  let nextBeat = 0;
  let nextNoteTime = startTime;

  function schedulePlayback() {
    while (nextNoteTime <= audioContext.currentTime + scheduleAheadSec) {
      // const sampleBuffer = (nextBeat === 0) ? downbeatBuffer : beatBuffer;
      playSample(sampleBuffer, audioContext, nextNoteTime);
      nextBeat = (nextBeat + 1) % 4; // TODO: replace 4 with a betsPerBar parameter
      nextNoteTime += beatDuration;
    }
  }
  return schedulePlayback;
}

type TMetronomeProvider = {
  children: ReactNode;
}

const MetronomeContext = createContext(null);

export default function MetronomeProvider({ children }: TMetronomeProvider) {

  const audioContextRef = useRef<AudioContext | null>(null);
  const sampleBufferRef = useRef<AudioBuffer | null>(null);

  const [isTurnedOn, setIsTurnedOn] = useState(false);
  // TODO: add default tempo config option or component prop
  const [tempo, setTempo] = useState(60);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    const audioContext = audioContextRef.current;
    loadSamples(['/audio/downbeat-click.wav', '/audio/beat-click.wav'], audioContext)
      .then(sampleBuffers => {
        sampleBufferRef.current = sampleBuffers[0];
      })
    return () => {
      audioContext.close();
    };
  }, []);

  useEffect(() => {
    console.log('effect')
    const audioContext = audioContextRef.current as AudioContext;
    const sampleBuffer = sampleBufferRef.current as AudioBuffer;
    if (audioContext?.state === 'suspended') {
      audioContext.resume();
    }

    let timerId: ReturnType<typeof setTimeout>;
    //NOTE: Inferred type is NodeJs.Timeout. Incorrect in this case, but not important.

    if (isTurnedOn) {
      const schedulePlayback = createScheduler(audioContext, sampleBuffer, tempo, audioContext.currentTime);
      const scheduleRepeatedly = () => {
        schedulePlayback();
        timerId = setTimeout(scheduleRepeatedly, config.scheduleAfterMilSec);
      };
      scheduleRepeatedly();
    }
    return () => {
      console.log('stop');
      clearTimeout(timerId);
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
'use client'
import { MouseEventHandler, ReactNode, createContext, useEffect, useRef, useState } from "react";

type TMetronomeProvider = {
  children: ReactNode;
}

function schedulePlayback({ downbeatBuffer, beatBuffer }: { [bufferName: string]: AudioBuffer }, tempo: number, beatsPerBar: number, context: AudioContext) {
  const beatDuration = 60 / tempo;
  const scheduleAfterMilSec = 25;
  const scheduleAheadSec = 0.1;
  let nextBeat = 0;

  let nextNote = context.currentTime + beatDuration;
  while (nextNote <= context.currentTime + scheduleAheadSec) {
    const sampleBuffer = (nextBeat === 0) ? downbeatBuffer : beatBuffer;
    playSample(sampleBuffer, context, nextNote);
    nextBeat = (nextBeat + 1) % beatsPerBar;
    nextNote += beatDuration;
  }

}

async function loadSample(sampleUrl: string, context: AudioContext) {
  const response = await fetch(sampleUrl);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await context.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

function playSample(sampleBuffer: AudioBuffer, audioContext: AudioContext, time: number = 0) {
  const source = audioContext.createBufferSource();
  source.buffer = sampleBuffer;
  source.connect(audioContext.destination);
  source.start(time);
}

const MetronomeContext = createContext(null);

export default function MetronomeProvider({ children }: TMetronomeProvider) {

  const audioContextRef = useRef<AudioContext | null>(null);
  const sampleBufferRef = useRef<AudioBuffer | null>(null);

  const [isTurnedOn, setIsTurnedOn] = useState(false);
  // TODO: add default tempo constant or component prop
  const [tempo, setTempo] = useState(60);

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    const audioContext = audioContextRef.current;
    loadSample("/audio/beat-click.wav", audioContext)
      .then(sampleBuffer => {
        sampleBufferRef.current = sampleBuffer;
      })
    return () => {
      audioContext.close();
    };
  }, []);

  /* useEffect(() => {
    const audioContext = audioContextRef.current as AudioContext;
    const sampleBuffer = sampleBufferRef.current as AudioBuffer;
    if (isTurnedOn) {
      if (audioContext?.state === "suspended") {
        audioContext.resume();
      }
      const source = audioContext.createBufferSource();
      source.buffer = sampleBuffer;
      source.connect((audioContext).destination);
      source.start();
      console.log('beep');
    }
    return () => {
      //TODO: delete interval during clean-up
    };
  }, [isTurnedOn, tempo]); */

  useEffect(() => {
    const audioContext = audioContextRef.current as AudioContext;
    const sampleBuffer = sampleBufferRef.current as AudioBuffer;
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }
    // playSample(sampleBuffer, audioContext);
    const beatDuration = 60 / tempo;
    const scheduleAfterMilSec = 25;
    const scheduleAheadSec = 0.1;
    let nextBeat = 0;
    //TODO: find out if overhead is needed
    let nextNote = audioContext.currentTime;
    let timerId: ReturnType<typeof setTimeout>;

    function schedulePlayback() {
      while (nextNote <= audioContext.currentTime + scheduleAheadSec) {
        // const sampleBuffer = (nextBeat === 0) ? downbeatBuffer : beatBuffer;
        playSample(sampleBuffer, audioContext, nextNote);
        nextBeat = (nextBeat + 1) % 4;
        nextNote += beatDuration;
      }
      timerId = setTimeout(schedulePlayback, scheduleAfterMilSec);
    }
    if (isTurnedOn) {
      console.log('start');
      schedulePlayback();
    }
    return () => {
      console.log('stop');
      clearTimeout(timerId);
    }
  }, [isTurnedOn]);

  const buttonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setIsTurnedOn(value => !value);
  }

  return (
    <MetronomeContext.Provider value={null}>
      <button onClick={buttonHandler} style={{ position: 'fixed', left: 30, bottom: 30, fontSize: 16, padding: 5 }}>Beep</button>
      {children}
    </MetronomeContext.Provider>
  );
}
'use client'
import { MouseEventHandler, ReactNode, createContext, useEffect, useRef, useState } from "react";

type TMetronomeProvider = {
  children: ReactNode;
}

function schedulePulse({ context, beatBuffer, downBeatBuffer, tempo, schedulingWindow }: any) {

}

async function loadAudio(context: AudioContext) {
  const response = await fetch("/audio/beat-click.wav");
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await context.decodeAudioData(arrayBuffer);
  return audioBuffer;
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
    loadAudio(audioContext)
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

  const buttonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const audioContext = audioContextRef.current as AudioContext;
    const sampleBuffer = sampleBufferRef.current as AudioBuffer;
    /* if (audioContext?.state === "suspended") {
      audioContext.resume();
    } */
    const source = audioContext.createBufferSource();
    source.buffer = sampleBuffer;
    source.connect((audioContext).destination);
    source.start();
    console.log('beep');
  };

  return (
    <MetronomeContext.Provider value={null}>
      <button onClick={buttonHandler}>Beep</button>
      {children}
    </MetronomeContext.Provider>
  );
}
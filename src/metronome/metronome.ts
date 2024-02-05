import config from './metronome.config.json'

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

export default class Metronome {

  constructor() { };

  private context = new AudioContext();
  tempo = config.defaultTempo;
  private samples: AudioBuffer[] | null = null;
  private beat = 0;
  beatsPerBar: 2 | 3 | 4 = 4;

  private timerId: ReturnType<typeof setTimeout> | undefined;

  remove() {
    this.context.close();
  }

  async loadSamples() {
    try {
      this.samples = await loadSamples(['/audio/downbeat-click.wav', '/audio/beat-click.wav'], this.context)
      return 'success';
    }
    catch (error) {
      return error;
    }
  }

  start() {
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
    const scheduleAheadSec = config.scheduleAheadMilSec / 1000;
    // Init with values for immediate playback on first schedulePlayback call
    this.beat = 0;
    let beatDuration = 60 / this.tempo;
    let nextNoteTime = this.context.currentTime;
    let prevNoteTime: number; // Value assigned during first schedulePlayback call

    const schedulePlayback = () => {
      while (nextNoteTime <= this.context.currentTime + scheduleAheadSec) {
        // const sampleBuffer = (nextBeat === 0) ? downbeatBuffer : beatBuffer;
        playSample(this.samples![1], this.context, nextNoteTime);
        this.beat = (this.beat + 1) % this.beatsPerBar;
        prevNoteTime = nextNoteTime;
        nextNoteTime = prevNoteTime + beatDuration;
      };
    }

    schedulePlayback(); // Schedule first note or group of notes right after metronome start

    const scheduleRepeatedly = () => {
      // Recalculate values according to currently set tempo
      beatDuration = 60 / this.tempo;
      nextNoteTime = prevNoteTime + beatDuration;
      schedulePlayback();
      this.timerId = setTimeout(scheduleRepeatedly, config.scheduleAfterMilSec);
    };

    scheduleRepeatedly(); // Schedule subsequent notes on repeat
  }
  stop() {
    clearTimeout(this.timerId);
  }
}
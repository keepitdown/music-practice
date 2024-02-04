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

  private nextNoteTime = 0; //TODO: replace init value
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

    this.beat = 0;
    this.nextNoteTime = this.context.currentTime;

    const schedulePlayback = (tempo: number) => {
      const scheduleAheadSec = config.scheduleAheadMilSec / 1000;
      const beatDuration = 60 / tempo;
      while (this.nextNoteTime <= this.context.currentTime + scheduleAheadSec) {
        // const sampleBuffer = (nextBeat === 0) ? downbeatBuffer : beatBuffer;
        playSample(this.samples![0], this.context, this.nextNoteTime);
        this.beat = (this.beat + 1) % this.beatsPerBar;
        this.nextNoteTime += beatDuration;
      }
    }
    const scheduleRepeatedly = () => {
      schedulePlayback(this.tempo);
      this.timerId = setTimeout(scheduleRepeatedly, config.scheduleAfterMilSec);
    }
    scheduleRepeatedly();
  }
  stop() {
    clearTimeout(this.timerId);
  }
}



const metro = new Metronome();
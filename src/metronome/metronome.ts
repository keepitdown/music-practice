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

  beatsPerBar: 2 | 3 | 4 = 4;

  private _context = new AudioContext();
  private _samples: AudioBuffer[] | null = null;
  private _tempo = config.defaultTempo;
  private _beat = 0;
  private _timerId: ReturnType<typeof setTimeout> | undefined;

  get tempo() {
    return this._tempo;
  }

  set tempo(value) {
    if (value < 1 || value > 1000) {
      throw RangeError('Tempo value must must be between 1 and 1000');
    }
    this._tempo = value;
  }

  remove() {
    this._context.close();
  }

  async loadSamples() {
    try {
      this._samples = await loadSamples(['/audio/downbeat-click.wav', '/audio/beat-click.wav'], this._context)
      return 'success';
    }
    catch (error) {
      return error;
    }
  }

  start() {
    if (this._context.state === 'suspended') {
      this._context.resume();
    }
    const scheduleAheadSec = config.scheduleAheadMilSec / 1000;
    // Init with values for immediate playback on first schedulePlayback call
    this._beat = 0;
    let beatDuration = 60 / this._tempo;
    let nextNoteTime = this._context.currentTime;
    let prevNoteTime: number; // Value assigned during first schedulePlayback call

    const schedulePlayback = () => {
      while (nextNoteTime <= this._context.currentTime + scheduleAheadSec) {
        // const sampleBuffer = (nextBeat === 0) ? downbeatBuffer : beatBuffer;
        playSample(this._samples![1], this._context, nextNoteTime);
        this._beat = (this._beat + 1) % this.beatsPerBar;
        prevNoteTime = nextNoteTime;
        nextNoteTime = prevNoteTime + beatDuration;
      };
    }

    schedulePlayback(); // Schedule first note or group of notes right after metronome start

    const scheduleRepeatedly = () => {
      // Recalculate values according to currently set tempo
      beatDuration = 60 / this._tempo;
      nextNoteTime = prevNoteTime + beatDuration;
      schedulePlayback();
      this._timerId = setTimeout(scheduleRepeatedly, config.scheduleAfterMilSec);
    };

    scheduleRepeatedly(); // Schedule subsequent notes on repeat
  }
  stop() {
    clearTimeout(this._timerId);
  }
}
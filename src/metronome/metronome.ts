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

function playSample(sampleBuffer: AudioBuffer, audioContext: AudioContext, gain: number, time?: number) {
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = sampleBuffer;
  const gainNode = audioContext.createGain();
  gainNode.gain.value = gain;
  sourceNode.connect(gainNode).connect(audioContext.destination);
  sourceNode.start(time);
}

function calculateGain(volume: number) {
  if (volume === 0) {
    return 0;
  }
  const dBPerStep = config.dBVolumeRange / config.volumeSteps;
  const dBFSVolume = (volume - config.volumeSteps) * dBPerStep;
  const gain = Math.pow(10, dBFSVolume / 20);
  return gain;
}

export default class Metronome {

  constructor({ tempo, beatsPerBar, volume }: { tempo: number, beatsPerBar: 2 | 3 | 4, volume: number }) {
    this.tempo = tempo;
    this.beatsPerBar = beatsPerBar;
    this.volume = volume;
  }

  beatsPerBar;

  private _context = new AudioContext();
  private _samples: AudioBuffer[] | null = null;
  private _tempo = config.defaultTempo;
  private _gain!: number; // Init value is assigned by the volume setter;
  private _volume = 20;
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

  get volume() {
    return this._volume;
  }

  set volume(value) {
    if (value < 0 || value > config.volumeSteps) {
      throw RangeError(`Volume value must be between 0 and ${config.volumeSteps}`);
    }
    this._volume = value;
    this._gain = calculateGain(value);
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
        playSample(this._samples![1], this._context, this._gain, nextNoteTime);
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
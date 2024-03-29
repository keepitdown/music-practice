import config from './metronome.config.json'

function loadSamples(sampleUrls: string[]) {
  const bufferPromises = sampleUrls.map(async url => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  });
  return Promise.all(bufferPromises);
}

function processSamples(sampleBuffers: ArrayBuffer[], audioContext: AudioContext) {
  const bufferPromises = sampleBuffers.map(async buffer => await audioContext.decodeAudioData(buffer));
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

  constructor({ tempo, beatsPerBar, volume }: { tempo: number, beatsPerBar: null | 2 | 3 | 4, volume: number }) {
    this.tempo = tempo;
    this.beatsPerBar = beatsPerBar;
    this.volume = volume;
  }

  beatsPerBar;

  private _context: AudioContext | null = null;
  private _sampleBuffers: { downBeat: ArrayBuffer, beat: ArrayBuffer } | null = null;
  private _samples: { downBeat: AudioBuffer, beat: AudioBuffer } | null = null;
  // Gain and volume init values is assigned by constructor using volume setter;
  private _tempo!: number;
  private _gain!: number;
  private _volume!: number;
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
    if (this._context) {
      this._context.close();
    }
  }

  async loadSamples() {
    try {
      const [downBeat, beat] = await loadSamples(['/audio/downbeat-click.wav', '/audio/beat-click.wav']);
      this._sampleBuffers = { downBeat, beat };
      return 'success';
    }
    catch (error) {
      return error;
    }
  }

  async start() {
    //TODO: add error handling for no samples
    if (!this._sampleBuffers) {
      console.error('Samples are not loaded');
      return null;
    }
    if (!this._context) {
      //AudioContext created on first playback to avoid AudioContext suspended console warning
      this._context = new AudioContext();
      const [downBeat, beat] = await processSamples([this._sampleBuffers.downBeat, this._sampleBuffers.beat], this._context);
      this._samples = { downBeat, beat };
      this._context.resume();
    }
    const scheduleAheadSec = config.scheduleAheadMilSec / 1000;
    // Init with values for immediate playback on first schedulePlayback call
    this._beat = 0;
    let beatDuration = 60 / this._tempo;
    let nextNoteTime = this._context.currentTime;
    let prevNoteTime: number; // Value assigned during first schedulePlayback call

    const schedulePlayback = () => {
      while (nextNoteTime <= this._context!.currentTime + scheduleAheadSec) {
        if (this.beatsPerBar) {
          this._beat = (this._beat < this.beatsPerBar) ? (this._beat + 1) : 1;
        } else {
          this._beat = 0;
        }
        const nextNoteSample = (this._beat === 1) ? this._samples!.downBeat : this._samples!.beat;
        playSample(nextNoteSample, this._context!, this._gain, nextNoteTime);
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
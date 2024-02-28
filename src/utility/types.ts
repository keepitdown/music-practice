export type TAccidental =
  | 'natural'
  | 'sharp'
  | 'flat';

export type TKey =
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'a'
  | 'b';

export type TSelectedKeys = { [accidental in TAccidental]: { [key in TKey]: boolean } };

export type TSettingsTab =
  | 'keys'
  | 'metronome'
  | 'general';

export type TMetronomeSettings = {
  volume: number;
  tempo: number;
  beatsPerBar: null | 2 | 3 | 4;
};
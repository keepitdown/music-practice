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
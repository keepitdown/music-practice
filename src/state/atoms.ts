import { atomWithStorage } from "jotai/utils";

const keysInitialState = {
  natural: {
    c: true,
    d: true,
    e: true,
    f: true,
    g: true,
    a: true,
    b: true
  },
  sharp: {
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    a: false,
    b: false
  },
  flat: {
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    a: false,
    b: false
  }
};

export const keysAtom = atomWithStorage('selectedKeys', keysInitialState);
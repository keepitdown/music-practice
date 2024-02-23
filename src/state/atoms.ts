import { TSettingsTab } from "@/utility/types";
import { atom } from "jotai";
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

const metronomeInitialState = {
  volume: 20,
  tempo: 60
};

export const keysAtom = atomWithStorage('selectedKeys', keysInitialState);
export const settingsSidebarAtom = atom(false);
export const settingsTabAtom = atomWithStorage<TSettingsTab>('settingsTab', 'keys');
export const metronomeAtom = atomWithStorage('metronomeSettings', metronomeInitialState);
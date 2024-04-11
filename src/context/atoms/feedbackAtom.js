import { atom } from "jotai";

export const feedbackAtom = atom([
  {
    corrects: [],
    wrongs: [],
  },
]);

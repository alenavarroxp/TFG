import { atom } from "jotai";

export const errorsQuestionAtom = atom({
  questionText: false,
  answers: false,
  correct: false,
  score: false,
});

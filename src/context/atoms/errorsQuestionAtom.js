import { atom } from "jotai";

export const errorsQuestionAtom = atom({
  questionText: false,
  answers: false,
  answerError: false,
  correct: false,
  score: false,
});

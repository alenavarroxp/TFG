import { atom } from "jotai";

export const questionAtom = atom({
  id: "",
  questionText: "",
  answers: [{ answerText: "", isCorrect: false }],
  correct: [],
  score: 0,
});

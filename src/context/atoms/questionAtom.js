import {atom} from "jotai";

export const questionAtom = atom ({
    id: "",
    questionText: "",
    answers: [],
    correct: []
})
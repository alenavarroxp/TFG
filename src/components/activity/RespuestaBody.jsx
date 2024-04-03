import { AnswerActivity } from "./AnswerActivity";

export const RespuestaBody = () => {
  const question = {
    id: 1,
    text: "¿Cuál es la capital de Francia?",
    answers: [
      { id: 1, answerText: "París", isCorrect: true },
      { id: 2, answerText: "Londres", isCorrect: false },
      { id: 3, answerText: "Roma", isCorrect: false },
      { id: 4, answerText: "Madrid", isCorrect: false },
    ],
  };

  return (
    <div className="mt-2 text-black flex flex-col max-h-96 overflow-auto custom-scrollbar">
      {question.answers.map((answer, index) => (
        <AnswerActivity key={index} index={index} answer={answer} />
      ))}
    </div>
  );
};

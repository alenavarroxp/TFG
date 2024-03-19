/* eslint-disable react/prop-types */
import { LuAsterisk } from "react-icons/lu";
import { PlusInput } from "../../inputs/plusInput";
import { AnswerInput } from "../../inputs/answerInput";
import { NumberInput } from "../../inputs/numberInput";
import { useAtom } from "jotai";
import { questionAtom } from "../..//context/atoms/questionAtom";

export const TestForm = ({ numQuestion, questions }) => {
  const [question, setQuestion] = useAtom(questionAtom); // Usa el átomo questionAtom

  const handleAnswerChange = (index, updatedAnswer) => {
    const newAnswers = question.answers.map((answer, i) => {
      if (i === index) return updatedAnswer;
      return answer;
    });

    setQuestion({ ...question, id: numQuestion, answers: newAnswers });
  };

  const handleClick = () => {
    setQuestion({
      ...question,
      answers: [...question.answers, { answerText: "", isCorrect: false }],
      correct: [...question.correct, false],
    });
  };

  const handleQuestionTextChange = (text) => {
    setQuestion({ ...question, id: numQuestion, questionText: text });
  };

  return (
    <div className="relative">
      <div id="question" className="flex flex-col px-3">
        <div className="flex flex-row">
          <p className="text-lg border-b-2 font-semibold">
            {question ? `Pregunta ${numQuestion}` : ""}
          </p>
          <LuAsterisk className="mt-1" size={12} />
        </div>
        <div className="mt-2">
          <textarea
            className="text-[#167563] text-sm placeholder-[#167563] placeholder-opacity-80 font-medium focus:outline-none px-3 py-2 rounded-xl w-full custom-scrollbar"
            placeholder="Escriba la pregunta..."
            style={{ minHeight: "5rem", paddingTop: "0.5rem", resize: "none" }}
            value={question ? question.questionText : ""}
            onChange={(e) => handleQuestionTextChange(e.target.value)}
          />
        </div>
      </div>

      <div
        id="options"
        className="px-3  max-h-96 overflow-y-auto custom-scrollbar"
      >
        <div className="flex flex-row">
          <p className="text-lg border-b-2 font-semibold">Respuestas</p>
          <LuAsterisk className="mt-1" size={12} />
        </div>
        {question.answers.map((answer, i) => (
          <AnswerInput
            key={i}
            index={i}
            answer={answer}
            setAnswer={(updatedAnswer) => handleAnswerChange(i, updatedAnswer)}
          />
        ))}
      </div>

      <PlusInput onClick={handleClick} />

      <div className="absolute top-1 right-2 flex">
        <div className="flex flex-row">
          <p className="text-md border-b-2 font-semibold">Puntuación</p>
          <LuAsterisk className="mt-1" size={12} />
        </div>
        <NumberInput />
      </div>
    </div>
  );
};

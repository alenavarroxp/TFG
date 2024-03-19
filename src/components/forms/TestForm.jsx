/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import { PlusInput } from "../../inputs/plusInput";
import { AnswerInput } from "../../inputs/answerInput";
import { NumberInput } from "../../inputs/numberInput";

export const TestForm = ({
  numQuestion,
  question,
  setQuestion,
  setQuestions,
}) => {
  const [numAnswers, setNumAnswers] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState([]);

  const handleAnswerChange = (index, updatedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = updatedAnswer;
  
    setAnswers(updatedAnswers);
  
    const updatedCorrect = updatedAnswers
      .map((answer, i) => answer.isCorrect ? i : null)
      .filter(i => i !== null);
  
    setCorrect(updatedCorrect);
  
    const updatedQuestion = {
      ...question,
      answers: updatedAnswers,
      correct: updatedCorrect,
    };
  
    setQuestion(updatedQuestion);
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q === question ? updatedQuestion : q))
    );
  };

  const handleClick = () => {
    setNumAnswers(numAnswers + 1);
    setAnswers([...answers, { answerText: "", isCorrect: false }]);
    setCorrect([...correct, false]);
  };

  const handleQuestionTextChange = (text) => {
    const updatedQuestion = { ...question, questionText: text };
    setQuestion(updatedQuestion);
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q === question ? updatedQuestion : q))
    );
  };

  useEffect(() => {
    console.log("USETESTFORM", question);
    setAnswers(question.answers || []);
    setCorrect(question.correct || []);
    setNumAnswers(question.answers?.length || 0);
  }, [question]);

  
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
        {Array.from({ length: numAnswers }, (_, i) => (
          <AnswerInput
            key={i}
            index={i}
            answer={answers[i] || { answerText: "", isCorrect: false }}
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

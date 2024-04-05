/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { actualAnswerAtom } from "../../context/atoms/actualAnswerAtom";
import { useAtom } from "jotai";
import { totalAnswersAtom } from "../../context/atoms/totalAnswers";

export const GridActivity = ({
  questions,
  actualQuestion,
  setActualQuestion,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useAtom(actualAnswerAtom);
  const [answers, setAnswers] = useAtom(totalAnswersAtom);

  const handleQuestionClick = (question) => {
    setActualQuestion(question);
    setSelectedQuestion(question);
    console.log(question);
    saveAnswers(); // Guardar respuestas al cambiar de pregunta
  };

  useEffect(() => {
    setSelectedQuestion(actualQuestion);
    saveAnswers();
  }, [actualQuestion]);

  const saveAnswers = () => {
    // console.log("Guardando respuestas");
    const actualAnswers = { ...currentAnswer };

    // console.log("Respuestas actuales", actualAnswers);
    const oldAnswers = { ...answers };
    // console.log("oldAnswers", oldAnswers);
    if (actualAnswers.id != "") {
      const existingIndex = oldAnswers.answers.findIndex(
        (answer) => answer.id === actualAnswers.id
      );

      if (existingIndex !== -1) {
        oldAnswers.answers[existingIndex] = actualAnswers;
      } else {
        oldAnswers.answers.push(actualAnswers);
      }
    }
    setAnswers(oldAnswers);
    setCurrentAnswer({
      id: "",
      answerOption: [],
    });
  };

  useEffect(() => {
    console.log("Respuestas", answers);
  }, [answers]);

  return (
    <div className="flex flex-col w-full ml-5">
      <label className="font-semibold text-xl mb-2">
        <p className="border-b-2 w-fit">Todas las preguntas</p>
      </label>
      <div className="mr-6">
        {Array.isArray(questions) && questions.length > 0 && (
          <div className="grid grid-cols-10 gap-2 overflow-y-auto max-h-60w custom-scrollbar overflow-x-hidden">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`bg-white min-w-8 max-w-8 min-h-10 max-h-10 p-2 px-pointer-events-auto cursor-pointer rounded-md flex items-center justify-center ${
                  selectedQuestion === question
                    ? "border-2 border-yellow-500"
                    : ""
                }`}
                onClick={() => handleQuestionClick(question)}
              >
                <p className="text-[#167563] font-semibold">{`${index + 1}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

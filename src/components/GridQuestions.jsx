import { useAtom } from "jotai";
import { errorsTestAtom } from "../context/atoms/errorsTestAtom";
import { ErrorAlert } from "./ErrorAlert";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export const GridQuestions = ({ questions, question, setQuestion, style }) => {
  const [errorTest] = useAtom(errorsTestAtom); // Crear un nuevo estado con useAtom
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    setQuestion(question);
    setSelectedQuestion(question);
  };

  useEffect(() => {
    setSelectedQuestion(question);
  }, [question]);

  return (
    <div className={`flex flex-col ml-5 mr-5 ${style}`}>
      <label className="font-semibold text-xl mb-2">
        <p className="border-b-2 w-fit">Preguntas guardadas</p>
        {errorTest.questions && (
          <div className="w-fit mt-1">
            <ErrorAlert message={"Debes añadir al menos una pregunta"} />
          </div>
        )}
      </label>
      <div className="mr-6">
        {Array.isArray(questions) && questions.length > 0 ? (
          <div className="grid grid-cols-10 gap-3  overflow-y-auto lg:max-h-60vw custom-scrollbar overflow-x-hidden">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`min-w-8 max-w-8 min-h-10 max-h-10 p-2 border-2 pointer-events-auto cursor-pointer rounded-md flex items-center justify-center bg-white ${
                  selectedQuestion === question
                    ? "border-yellow-500"
                    : "border-white"
                }`}
                onClick={() => handleQuestionClick(question)}
              >
                <p className="text-[#167563] font-semibold">{`${index + 1}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="font-semibold text-white text-md">
              No has añadido preguntas aún.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

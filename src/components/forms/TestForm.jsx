import { LuAsterisk } from "react-icons/lu";
import { PlusInput } from "../../inputs/plusInput";
import { AnswerInput } from "../../inputs/answerInput";
import { useState } from "react";
export const TestForm = () => {
  const [numAnswers, setNumAnswers] = useState(0);
  const handleClick = () => {
    console.log("click");
    setNumAnswers(numAnswers + 1);
  };

  return (
    <div>
      <div id="question" className="flex flex-col px-3">
        <div className="flex flex-row">
          <p className="text-lg border-b-2 font-semibold">Pregunta 1</p>
          <LuAsterisk className="mt-1" size={12} />
        </div>
        <div className="mt-2">
          <textarea
            className="text-[#167563] text-sm placeholder-[#167563] placeholder-opacity-80 font-medium focus:outline-none px-3 py-2 rounded-xl w-full custom-scrollbar"
            placeholder="Escriba la pregunta..."
            style={{ minHeight: "5rem", paddingTop: "0.5rem", resize: "none" }} // Establece una altura mínima y un relleno superior para el textarea
          />
        </div>
      </div>

      <div id="answers" className="flex flex-col px-3">
        <div className="flex flex-row">
          <p className="text-lg border-b-2 font-semibold">Respuestas</p>
          <LuAsterisk className="mt-1" size={12} />
        </div>

        <div className="mt-2"></div>
      </div>

      <div id="options" className="px-3  max-h-52 overflow-y-auto custom-scrollbar">
        {Array.from({ length: numAnswers }, (_, i) => (
          <AnswerInput key={i} index={i} />
        ))}

      </div>
        <PlusInput onClick={handleClick} />
    </div>
  );
};

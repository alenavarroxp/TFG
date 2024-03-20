import { useEffect } from "react";

/* eslint-disable react/prop-types */
export const GridQuestions = ({ questions, setQuestion }) => {
    const handleQuestionClick = (question) => {
      console.log("question",question)
      //SACAR EL INDICE DE LA PREGUNTA
      console.log("indice",questions.indexOf(question))
      setQuestion(question);
    };

    useEffect(() => {
      console.log("USEGRIDQUESTIONS", questions);
    }, [questions]);
  
    return (
      <div className="flex flex-col w-96 ml-16">
        <label className="font-semibold text-xl mb-2">
          <p className="border-b-2 w-fit">
          Preguntas añadidas
          </p>
        </label>
        {Array.isArray(questions) && questions.length > 0 ? (
          <div className="grid grid-cols-10 gap-2 overflow-y-auto max-h-48 custom-scrollbar overflow-x-hidden">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white py-2 px-pointer-events-auto cursor-pointer rounded-sm flex items-center justify-center"
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
    );
  };
  
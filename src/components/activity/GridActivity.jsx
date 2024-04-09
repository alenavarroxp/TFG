/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { actualAnswerAtom } from "../../context/atoms/actualAnswerAtom";
import { useAtom } from "jotai";
import { totalAnswersAtom } from "../../context/atoms/totalAnswers";
import { feedbackAtom } from "../../context/atoms/feedbackAtom";

export const GridActivity = ({
  questions,
  actualQuestion,
  setActualQuestion,
  feedbackVisible,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useAtom(actualAnswerAtom);
  const [answers, setAnswers] = useAtom(totalAnswersAtom);
  const [feedback] = useAtom(feedbackAtom);

  const customColor = (question) => {
    if (feedbackVisible) {
      const questionFeedback = feedback[question.id - 1];
      const correctsAnswers = questionFeedback?.corrects[0] || [];
      const wrongsAnswers = questionFeedback?.wrongs[0] || [];

      console.log(
        "correctsAnswers,wrongAnswers",
        correctsAnswers,
        wrongsAnswers
      );
      console.log(
        "correctsAnswers.length",
        correctsAnswers.length,
        "questions",
        questions,
        "actualQuestion.id",
        actualQuestion.id,
        "questions[actualQuestion.id - 1].correct",
        questions[actualQuestion.id - 1].correct,
        "questions[actualQuestion.id - 1].correct.length",
        questions[actualQuestion.id - 1].correct.length
      );

      if (
        correctsAnswers.length === questions[question.id - 1].correct.length &&
        wrongsAnswers.length === 0
      ) {
        return "bg-green-500 text-white"; // Todas las respuestas son correctas y no hay incorrectas
      } else if (correctsAnswers.length > 0 && wrongsAnswers.length >= 0) {
        return "bg-yellow-500 text-white"; // Al menos una respuesta es correcta y al menos una es incorrecta
      } else if (correctsAnswers.length === 0 && wrongsAnswers.length > 0) {
        return "bg-red-500 text-white"; // No hay respuestas correctas, pero hay respuestas incorrectas
      } else {
        return "bg-white text-white"; // No hay respuestas
      }
    }
  };

  const handleQuestionClick = (question) => {
    setActualQuestion(question);
    setSelectedQuestion(question);
    console.group("Pregunta seleccionada con Respuestas");
    console.log(question);
    console.log(answers);
    console.groupEnd();
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
    const oldAnswers = [...answers];
    // console.log("oldAnswers", oldAnswers);
    if (actualAnswers.id != "") {
      const existingIndex = oldAnswers.findIndex(
        (answer) => answer.id === actualAnswers.id
      );

      if (existingIndex !== -1) {
        oldAnswers[existingIndex] = actualAnswers;
      } else {
        oldAnswers.push(actualAnswers);
      }
    }
    setAnswers(oldAnswers);
    setCurrentAnswer({
      id: "",
      answerOption: [],
    });
  };

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
                className={`${
                  feedbackVisible ? customColor(question) : "bg-white"
                } min-w-8 max-w-8 min-h-10 max-h-10 p-2 px-pointer-events-auto cursor-pointer rounded-md flex items-center justify-center ${
                  !feedbackVisible && selectedQuestion  === question
                    ? "border-2  border-yellow-500"
                    : feedbackVisible && selectedQuestion === question
                    ? "border-2 border-white"
                    : ""
                }`}
                onClick={() => handleQuestionClick(question)}
              >
                <p
                  className={` font-semibold ${
                    feedbackVisible ? "text-white" : "text-[#167563]"
                  }`}
                >{`${index + 1}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

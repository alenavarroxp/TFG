/* eslint-disable react/prop-types */
import { LuAsterisk } from "react-icons/lu";
import { PlusInput } from "../../inputs/plusInput";
import { AnswerInput } from "../../inputs/answerInput";
import { NumberInput } from "../../inputs/numberInput";
import { useAtom } from "jotai";
import { questionAtom } from "../../context/atoms/questionAtom";
import { errorsQuestionAtom } from "../../context/atoms/errorsQuestionAtom";
import { ErrorAlert } from "../ErrorAlert";

export const TestForm = ({ numQuestion }) => {
  const [question, setQuestion] = useAtom(questionAtom);
  const [errors, setErrors] = useAtom(errorsQuestionAtom); // Utilizar el átomo errorsQuestionAtom

  const handleAnswerChange = (index, updatedAnswer) => {
    const newAnswers = question.answers.map((answer, i) => {
      if (i === index) return updatedAnswer;
      return answer;
    });

    const newCorrectsIndex = newAnswers
      .map((answer, i) => (answer.isCorrect ? i : -1))
      .filter((index) => index !== -1);

    setQuestion({
      ...question,
      id: numQuestion,
      answers: newAnswers,
      correct: newCorrectsIndex,
    });
  };

  const handleClick = () => {
    console.log("errros", errors);
    setErrors((prevErrors) => ({ ...prevErrors, correct: false }));
    setQuestion({
      ...question,
      answers: [...question.answers, { answerText: "", isCorrect: false }],
    });
  };

  const handleQuestionTextChange = (text) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      questionText: text.trim() === "",
    }));
    setQuestion({ ...question, id: numQuestion, questionText: text });
  };

  return (
    <div className="relative">
      <div id="question" className="flex flex-col px-3">
        <div className="flex flex-row items-center">
          <p className="text-lg border-b-2 font-semibold">
            {question ? `Pregunta ${numQuestion}` : ""}
          </p>
          <LuAsterisk className="mb-2" size={12} />
          {errors.questionText && (
            <ErrorAlert
              message="La pregunta no puede estar vacía"
              style={{ marginLeft: "0.5em" }}
            />
          )}
        </div>
        <div className="mt-2">
          <textarea
            className={`text-[#167563] text-sm placeholder-[#167563] placeholder-opacity-80 font-medium focus:outline-none px-3 py-2 rounded-xl w-full custom-scrollbar ${
              errors.questionText ? "border-2 border-red-500" : ""
            }`}
            placeholder="Escriba la pregunta..."
            style={{ minHeight: "5rem", paddingTop: "0.5rem", resize: "none" }}
            value={question ? question.questionText : ""}
            onChange={(e) => handleQuestionTextChange(e.target.value)}
          />
        </div>
      </div>

      <div
        id="options"
        className="px-3 max-h-40"
      >
        <div className="flex flex-row">
          <p className="text-lg border-b-2 font-semibold">Respuestas</p>
          <LuAsterisk className="mt-1" size={12} />
          {errors.answers && errors.correct && (
            <ErrorAlert message="Debe haber al menos una respuesta y una opción correcta" />
          )}
          {errors.correct && !errors.answers && !errors.answerError && (
            <ErrorAlert message="Debe haber al menos una opción correcta" />
          )}
          {errors.answerError && errors.correct && (
            <ErrorAlert message="Las respuestas no pueden estar vacías y debe haber al menos una opción correcta" />
          )}
          {errors.answerError && !errors.correct && (
            <ErrorAlert message="Las respuestas no pueden estar vacías" />
          )}
        </div>
        <div className="overflow-y-auto custom-scrollbar max-h-32 ">
        {question.answers.map((answer, i) => (
          <AnswerInput
            key={i}
            index={i}
            answer={answer}
            setAnswer={(updatedAnswer) => handleAnswerChange(i, updatedAnswer)}
          />
        ))}
        </div>
      </div>

      <PlusInput onClick={handleClick} />

      <div className="absolute top-1 right-2 flex">
        <div className="flex flex-row">
          {errors.score && (
            <ErrorAlert
              message="La puntuación debe de estar entre 0 y 10"
              style={{ marginRight: "0.5em" }}
            />
          )}
          <p className="text-md border-b-2 font-semibold">Puntuación</p>
          <LuAsterisk className="mt-1" size={12} />
        </div>
        <NumberInput numQuestion={numQuestion} />
      </div>
    </div>
  );
};

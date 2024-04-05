import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { actualAnswerAtom } from "../../context/atoms/actualAnswerAtom";
import { useAtom } from "jotai";
import { totalAnswersAtom } from "../../context/atoms/totalAnswers";

/* eslint-disable react/prop-types */
export const AnswerActivity = ({ index, answer, actualQuestion }) => {
  const optionId = `option-${index}`;
  const { answerText } = answer;
  const [visibleCorrect, setVisibleCorrect] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useAtom(actualAnswerAtom);
  const [answers, setAnswers] = useAtom(totalAnswersAtom);

  useEffect(() => {
    if (answers.answers[actualQuestion.id - 1]) {
      if (
        answers.answers[actualQuestion.id - 1].answerOption.includes(index + 1)
      ) {
        setVisibleCorrect(true);
        return;
      }
    }
    setVisibleCorrect(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualQuestion]);

  useEffect(() => {
    // Solo actualiza si currentAnswer tiene una id y opciones de respuesta.
    if (currentAnswer.id && currentAnswer.answerOption.length > 0) {
      setAnswers((prevState) => {
        // Encuentra el índice de la respuesta a actualizar.
        const answerIndex = prevState.answers.findIndex(
          (answer) => answer.id === currentAnswer.id
        );

        // Si se encuentra la respuesta, actualiza su 'answerOption'.
        if (answerIndex !== -1) {
          const updatedAnswers = [...prevState.answers];
          updatedAnswers[answerIndex].answerOption = currentAnswer.answerOption;

          // Retorna el estado actualizado.
          return { ...prevState, answers: updatedAnswers };
        }

        // Si no se necesita actualizar (o no se encuentra la respuesta, lo cual no debería ocurrir en este contexto), retorna el estado previo.
        return prevState;
      });
    }
  }, [currentAnswer, setAnswers]);

  const handleCheckboxChange = () => {
    setVisibleCorrect(!visibleCorrect);
    if (!visibleCorrect) {
      const prevAnswers = answers.answers[actualQuestion.id - 1]
        ? answers.answers[actualQuestion.id - 1].answerOption
        : [];

      setCurrentAnswer({
        ...currentAnswer,
        id: actualQuestion.id,
        answerOption: [...prevAnswers, index + 1],
      });
    } else {
      const objAnswer = answers.answers[actualQuestion.id - 1]
        ? answers.answers[actualQuestion.id - 1].answerOption.filter(
            (answer) => answer !== index + 1
          )
        : [];

      console.warn("objAnswer", objAnswer);
      setCurrentAnswer({
        ...currentAnswer,
        id: actualQuestion.id,
        answerOption: [...objAnswer],
      });
    }
    checkOldAnswers();
  };

  const checkOldAnswers = () => {
    console.log("answers.answers[actualQuestion.id - 1]", answers.answers);
  };

  return (
    <div className="flex mt-2 rounded-lg py-2.5 bg-white ">
      <p className="px-4 font-medium">{index + 1}.</p>
      <div className="mr-4  flex items-center">
        <input
          type="checkbox"
          id={optionId}
          name={optionId}
          className="peer sr-only hidden"
          checked={visibleCorrect}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor={optionId}
          className="cursor-pointer relative inline-flex items-center justify-center w-4 h-4 border border-gray-400 rounded-full transition-all duration-300 bg-white"
        >
          <IoCheckmarkCircle
            className={`text-[#24B817] ${
              visibleCorrect ? "opacity-100" : "opacity-0"
            } absolute transition-all duration-300 ease-out`}
            size={20}
          />
        </label>
      </div>
      {answerText}
    </div>
  );
};

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useAtom } from "jotai";
import { totalAnswersAtom } from "../../context/atoms/totalAnswers";

export const AnswerActivity = ({ index, answer, actualQuestion }) => {
  const optionId = `option-${index}`;
  const { answerText } = answer;
  const [visibleCorrect, setVisibleCorrect] = useState(false);
  const [answers, setAnswers] = useAtom(totalAnswersAtom);

  useEffect(() => {
    answers.map((answer) => {
      if (answer.id === actualQuestion.id - 1) {
        if (answer.answerOption.includes(index + 1)) {
          setVisibleCorrect(true);
        } else {
          setVisibleCorrect(false);
        }
      }
    });
  }, [actualQuestion, answers, index]);

  // Función para manejar el cambio en la selección de la opción
  const handleCheckboxChange = () => {
    const newAnswer = {
      id: actualQuestion.id - 1,
      answerOption: [index + 1],
    };

    console.log("actualQuestion", actualQuestion);
    const currentAnswers =
      answers[actualQuestion.id - 1] &&
      answers[actualQuestion.id - 1].answerOption;

    if (!visibleCorrect) {
      if (!answers[actualQuestion.id - 1]) {
        setAnswers([...answers, newAnswer]);
      } else {
        const updatedAnswers = answers.map((answer) => {
          if (answer.id === actualQuestion.id - 1) {
            return {
              ...answer,
              answerOption: currentAnswers.includes(index + 1)
                ? currentAnswers.filter((option) => option !== index + 1)
                : [...currentAnswers, index + 1],
            };
          }
          return answer;
        });

        setAnswers(updatedAnswers);
      }
    } else {
      const updatedAnswers = answers.map((answer) => {
        if (answer.id === actualQuestion.id - 1) {
          return {
            ...answer,
            answerOption: currentAnswers.includes(index + 1)
              ? currentAnswers.filter((option) => option !== index + 1)
              : [...currentAnswers, index + 1],
          };
        }
        return answer;
      });

      setAnswers(updatedAnswers);
    }
    setVisibleCorrect((prevVisibleCorrect) => !prevVisibleCorrect);
    console.log("ANSWERS AFTER", answers);
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

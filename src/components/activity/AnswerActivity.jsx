import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { actualAnswerAtom } from "../../context/atoms/actualAnswerAtom";
import { useAtom } from "jotai";

/* eslint-disable react/prop-types */
export const AnswerActivity = ({ index, answer, actualQuestion }) => {
  const optionId = `option-${index}`;
  const { answerText } = answer;
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useAtom(actualAnswerAtom);

  const handleCheckboxChange = () => {
    setIsCorrect(!isCorrect);
    if (!isCorrect) {
      console.log("index", index + 1);
      setCurrentAnswer({
        ...currentAnswer,
        id: actualQuestion.id,
        answerOption: [...currentAnswer.answerOption, index + 1],
      });
    }else{
      setCurrentAnswer({
        ...currentAnswer,
        id: actualQuestion.id,
        answerOption:[...currentAnswer.answerOption.filter((option)=>option !== index + 1)]
      })
    }
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
          checked={isCorrect}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor={optionId}
          className="cursor-pointer relative inline-flex items-center justify-center w-4 h-4 border border-gray-400 rounded-full transition-all duration-300 bg-white"
        >
          <IoCheckmarkCircle
            className={`text-[#24B817] ${
              isCorrect ? "opacity-100" : "opacity-0"
            } absolute transition-all duration-300 ease-out`}
            size={20}
          />
        </label>
      </div>
      {answerText}
    </div>
  );
};

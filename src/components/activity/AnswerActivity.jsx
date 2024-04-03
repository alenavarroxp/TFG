import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

/* eslint-disable react/prop-types */
export const AnswerActivity = ({ index, answer }) => {
  const optionId = `option-${index}`;
  const { answerText } = answer;
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheckboxChange = () => {
    setIsCorrect(!isCorrect);
  };

  return (
    <div className="flex mt-2 rounded-lg py-2.5 bg-white">
      <div className="mr-4 ml-4 flex items-center">
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

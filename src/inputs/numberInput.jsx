/* eslint-disable react/prop-types */
import { useAtom } from "jotai";
import { questionAtom } from "../context/atoms/questionAtom";
import { errorsQuestionAtom } from "../context/atoms/errorsQuestionAtom";

export const NumberInput = ({ numQuestion }) => {
  const [question, setQuestion] = useAtom(questionAtom);
  const [errors, setErrors] = useAtom(errorsQuestionAtom); // Utilizar el átomo errorsQuestionAtom

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    if (!isNaN(inputValue)) {
      setErrors((prevErrors) => ({ ...prevErrors, score: inputValue <= 0 || inputValue > 10 }));
      setQuestion({ ...question, id: numQuestion, score: inputValue });
    }
  };

  return (
    <input
      type="text"
      value={question.score !== undefined ? question.score : 0}
      onChange={handleChange}
      maxLength={5}
      max={10}
      min={0}
      className={`ml-1 rounded-full w-12 text-[#167563] text-center font-semibold focus:outline-none ${errors.score ? "border-[1.5px] border-red-500" : ""}`}
    />
  );
};

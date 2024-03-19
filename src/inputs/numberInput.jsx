/* eslint-disable react/prop-types */
import { useAtom } from "jotai";
import { questionAtom } from "../context/atoms/questionAtom";

export const NumberInput = ({ numQuestion }) => {
  const [question, setQuestion] = useAtom(questionAtom);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      setQuestion({ ...question, id: numQuestion, score: parsedValue });
    }
  };

  return (
    <input
      type="text"
      value={question.score !== undefined ? question.score : 0}
      onChange={handleChange}
      maxLength={4}
      max={10}
      min={0}
      className="ml-1 rounded-full w-12 text-[#167563] text-center font-semibold focus:outline-none"
    />
  );
};

/* eslint-disable react/prop-types */
import { useAtom } from "jotai";
import { IoCheckmarkCircle } from "react-icons/io5";
import { errorsQuestionAtom } from "../context/atoms/errorsQuestionAtom";
import { DeleteAnswerButton } from "./DeleteAnswerButton";

export const AnswerInput = ({ index, answer, setAnswer, deleteAnswer }) => {
  const [errors, setErrors] = useAtom(errorsQuestionAtom); // Utilizar el átomo errorsQuestionAtom
  const optionId = `option${index}`;
  const { answerText, isCorrect } = answer;

  const handleCheckboxChange = () => {
    setErrors((prevErrors) => ({ ...prevErrors, correct: false }));
    setAnswer({ ...answer, isCorrect: !isCorrect });
  };

  const handleAnswerTextChange = (text) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      newErrors.answerError = text.trim() === "";
      return newErrors;
    });
    setAnswer({ ...answer, answerText: text });
  };

  const handleDeleteAnswer = () => {
    deleteAnswer();
  };

  return (
    <div className="flex flex-col relative mt-1 overflow-y-auto">
      <p className="text-sm font-semibold">{`Opción ${index + 1}`}</p>
      <div className="flex-1 flex items-center justify-between tourP-step10">
        <div className="flex bg-white rounded-lg  w-full">
          <textarea
            className={`text-[#167563] text-sm mr-3 placeholder-[#167563] placeholder-opacity-80 font-medium focus:outline-none px-2 rounded-l-lg w-full custom-scrollbar bg-white ${
              errors.answerError ? "border-[1.5px] border-red-500" : ""
            }`}
            placeholder="Escriba la opción..."
            style={{
              minHeight: "3rem",
              paddingTop: "0.125rem",
              paddingRight: "1rem",
              resize: "none",
            }}
            value={answerText || ""}
            onChange={(e) => handleAnswerTextChange(e.target.value)}
          />
          <div className="mr-4 flex items-center">
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
        </div>

        <DeleteAnswerButton
          handleDelete={() => handleDeleteAnswer()}
        />
      </div>
    </div>
  );
};

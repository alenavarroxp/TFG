import { IoCheckmarkCircle } from "react-icons/io5";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const AnswerInput = ({ index }) => {
  const optionId = `option${index}`;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col relative m-1">
      <p className="text-sm font-semibold">{`Opción ${index + 1}`}</p>
      <div className="flex bg-white rounded-lg">
        <textarea
          className="text-[#167563] text-sm placeholder-[#167563] placeholder-opacity-80 font-medium focus:outline-none px-3 rounded-xl w-full mr-4 custom-scrollbar bg-white"
          placeholder="Escriba la opción..."
          style={{
            minHeight: "3rem",
            paddingTop: "0.125rem",
            paddingRight: "2rem",
            resize: "none",
          }}
        />
        <div className="mr-4 flex items-center">
          <input
            type="checkbox"
            id={optionId}
            name={optionId}
            className="peer sr-only hidden"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor={optionId}
            className="cursor-pointer relative inline-flex items-center justify-center w-4 h-4 border border-gray-400 rounded-full transition-all duration-300 bg-white"
          >
            <IoCheckmarkCircle
              className={`text-[#24B817] ${
                isChecked ? "opacity-100" : "opacity-0"
              } absolute transition-all duration-300 ease-out`}
              size={20}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

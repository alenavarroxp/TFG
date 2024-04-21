import { useState } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

/* eslint-disable react/prop-types */
export const DeleteAnswerButton = ({ handleDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex justify-center items-center px-1 ml-2 rounded-full border-2 py-1 ${
        isHovered ? "bg-red-500" : ""
      }`}
    >
      <button
        onClick={() => handleDelete()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? <AiFillDelete size={28} /> : <AiOutlineDelete size={28} />}
      </button>
    </div>
  );
};

import { LuAsterisk } from "react-icons/lu";

// eslint-disable-next-line react/prop-types
export const MandatoryText = ({ text }) => {
  return (
    <div className="flex-row flex ">
      <label htmlFor={text} className="font-semibold lg:text-xl md:text-md sm:text-lg border-b-2 mb-2">
        {text}
      </label>
      <LuAsterisk className="mt-1" size={14} />
    </div>
  );
};

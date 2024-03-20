import { LuPlus } from "react-icons/lu";
// eslint-disable-next-line react/prop-types
export const PlusInput = ({onClick}) => {
  return (
    <div className="w-full flex items-center justify-center mt-3 mb-3
    ">
      <button className="border-2 rounded-xl p-1 focus:outline-none" onClick={onClick}>
        <LuPlus className="text-white" size={24}  />
      </button>
    </div>
  );
};

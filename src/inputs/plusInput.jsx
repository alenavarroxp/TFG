import { LuPlus } from "react-icons/lu";
// eslint-disable-next-line react/prop-types
export const PlusInput = ({ onClick, style }) => {
  return (
    <div
      className={`w-full flex items-center justify-center mt-3 mb-3 ${style}`}
    >
      <button
        className="border-2 rounded-xl p-1 focus:outline-none tourP-step11"
        onClick={onClick}
      >
        <LuPlus className="text-white " size={24} />
      </button>
    </div>
  );
};

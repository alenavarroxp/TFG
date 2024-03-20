import {
  MdOutlineRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";
// eslint-disable-next-line react/prop-types
export const RadioLocation = ({ text, selected, onSelect }) => {
  return (
    <div
      className={`relative p-3 flex items-center cursor-pointer bg-white text-[#167563] font-semibold mb-2 rounded-2xl max-w-96 ${
        selected ? "pointer-events-none" : ""
      }`}
      onClick={onSelect}
    >
      {text}
      {selected ? (
        <MdRadioButtonChecked
          className="absolute right-4 text-[#167563] font-semibold ml-2"
          size={22}
        />
      ) : (
        <MdOutlineRadioButtonUnchecked
          className="absolute right-4 text-[#167563] font-semibold ml-2"
          size={22}
        />
      )}
    </div>
  );
};

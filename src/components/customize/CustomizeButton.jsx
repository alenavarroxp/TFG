/* eslint-disable react/prop-types */
export const CustomizeButton = ({ text, onClick }) => {
  return (
    <button className="px-4 py-2 bg-white text-[#167563] rounded-full font-semibold" onClick={onClick}>
      {text}
    </button>
  );
};

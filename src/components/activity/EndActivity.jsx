/* eslint-disable react/prop-types */
export const EndActivity = ({ text, onClick }) => {
  return (
    <div className=" mt-2 flex flex-1 flex-col items-center justify-center">
      <div
        className="bg-white text-[#167563] p-2 px-8 font-semibold text-lg rounded-3xl pointer-events-auto cursor-pointer"
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

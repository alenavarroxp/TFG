// eslint-disable-next-line react/prop-types
export const QuestionNavButton = ({ text, onClick, icon, style }) => {
  return (
    <button
      className={`bg-white px-6 py-2 text-[#167563] font-semibold rounded-2xl flex flex-col justify-center items-center ${style}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

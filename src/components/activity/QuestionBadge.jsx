/* eslint-disable react/prop-types */
export const QuestionBadge = ({ text, icon }) => {
  return (
    <div className="rounded-full bg-white text-xs px-2 h-fit p-1 text-black  font-semibold flex items-center">
      <h1 className="mr-1">{text}</h1>
      {icon}
    </div>
  );
};

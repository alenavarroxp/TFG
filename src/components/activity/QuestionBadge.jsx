/* eslint-disable react/prop-types */
export const QuestionBadge = ({ text, icon }) => {
  return (
    <div className="rounded-full bg-white text-sm text-black p-1 px-3 font-semibold flex items-center">
      <h1 className="mr-1">{text}</h1>
      {icon}
    </div>
  );
};

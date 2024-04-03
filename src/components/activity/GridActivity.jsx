/* eslint-disable react/prop-types */
export const GridActivity = ({ questions, setActualQuestion}) => {

    const handleQuestionClick = (question) => {
        setActualQuestion(question);
        console.log(question)
    };
    
  return (
    <div className="flex flex-col w-full ml-5">
      <label className="font-semibold text-xl mb-2">
        <p className="border-b-2 w-fit">Todas las preguntas</p>
      </label>
      <div className="mr-6">
        {Array.isArray(questions) && questions.length > 0 && (
          <div className="grid grid-cols-10 gap-2 overflow-y-auto max-h-36 custom-scrollbar overflow-x-hidden">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white p-2 px-pointer-events-auto cursor-pointer rounded-md flex items-center justify-center"
                onClick={() => handleQuestionClick(question)}
              >
                <p className="text-[#167563] font-semibold">{`${index + 1}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

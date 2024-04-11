/* eslint-disable react/prop-types */
import { AnswerActivity } from "./AnswerActivity";

export const RespuestaBody = ({ actualQuestion, feedbackVisible}) => {
  return (
    <div className="mt-2 text-black flex flex-col max-h-[625px] overflow-auto custom-scrollbar tour-step7">
      {actualQuestion.answers &&
        actualQuestion.answers.map((answer, index) => (
          <AnswerActivity
            key={index}
            index={index}
            answer={answer}
            actualQuestion={actualQuestion}
            feedbackVisible={feedbackVisible}
          />
        ))}
    </div>
  );
};

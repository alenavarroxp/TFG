/* eslint-disable react/prop-types */
import { UnderlinedText } from "../UnderlinedText";
import { ScoreContainer } from "./ScoreContainer";
import { QuestionBadge } from "./QuestionBadge";
import { CgOptions } from "react-icons/cg";

export const RespuestaHeader = ({actualQuestion, feedbackVisible}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center tour-step4">
        <UnderlinedText text="Respuestas" style="text-xl ml-0 mr-4" />
        <QuestionBadge text={actualQuestion?.kindOfAnswer} icon={<CgOptions />}  style="tour-step5"/>
      </div>
      <div>
        <ScoreContainer
          actualQuestion={actualQuestion}
          feedbackVisible={feedbackVisible}
        />
      </div>
    </div>
  );
};

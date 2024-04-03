/* eslint-disable react/prop-types */
import { UnderlinedText } from "../UnderlinedText";
import { QuestionBadge } from "./QuestionBadge";
import { TbTimeline } from "react-icons/tb";
import { ScoreContainer } from "./ScoreContainer";

export const PreguntaHeader = ({actualQuestion}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <UnderlinedText text={"Pregunta 1"} style="text-2xl ml-0 mr-4" />
        <QuestionBadge text={actualQuestion?.kindOfQuestion} icon={<TbTimeline />} />
      </div>
      <div>
        <ScoreContainer score={actualQuestion?.score} />
      </div>
    </div>
  );
};

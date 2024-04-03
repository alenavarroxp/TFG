import { UnderlinedText } from "../UnderlinedText";
import { QuestionBadge } from "./QuestionBadge";
import { TbTimeline } from "react-icons/tb";
import { ScoreContainer } from "./ScoreContainer";

export const PreguntaHeader = () => {
  return (
    <div className="flex bg-pink-500 items-center justify-between">
      <div className="flex items-center">
        <UnderlinedText text="Pregunta 1" style="text-2xl ml-0 mr-4" />
        <QuestionBadge text="Test" icon={<TbTimeline />} />
      </div>
      <div>
        <ScoreContainer />
      </div>
    </div>
  );
};

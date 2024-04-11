/* eslint-disable react/prop-types */
import { UnderlinedText } from "../UnderlinedText";
import { QuestionBadge } from "./QuestionBadge";
import { TbTimeline } from "react-icons/tb";
import { RxReader } from "react-icons/rx";

export const PreguntaHeader = ({ actualQuestion }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center ">
        <UnderlinedText
          text={`Pregunta ${actualQuestion.id}`}
          style="text-2xl ml-0 mr-4"
        />
        {actualQuestion?.kindOfQuestion === "Test" && (
          <QuestionBadge
            text={actualQuestion?.kindOfQuestion}
            icon={<TbTimeline />}
            style="tour-step3"
          />
        )}
        {actualQuestion?.kindOfQuestion === "Redacción" && (
          <QuestionBadge
            text={actualQuestion?.kindOfQuestion}
            icon={<RxReader />}
            style=""
          />
        )}
      </div>
    </div>
  );
};

/* eslint-disable react/prop-types */
import { UnderlinedText } from "../UnderlinedText";
import { QuestionBadge } from "./QuestionBadge";
import { CgOptions } from "react-icons/cg";

export const RespuestaHeader = ({actualQuestion}) => {
  return (
    <div>
      <div className="flex items-center">
        <UnderlinedText text="Respuestas" style="text-xl ml-0 mr-4" />
        <QuestionBadge text={actualQuestion?.kindOfAnswer} icon={<CgOptions />} />
      </div>
    </div>
  );
};

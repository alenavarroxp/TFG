import { UnderlinedText } from "../UnderlinedText";
import { QuestionBadge } from "./QuestionBadge";
import { CgOptions } from "react-icons/cg";

export const RespuestaHeader = () => {
  return (
    <div>
      <div className="flex items-center">
        <UnderlinedText text="Respuestas" style="text-xl ml-0 mr-4" />
        <QuestionBadge text="Opción múltiple" icon={<CgOptions />} />
      </div>
    </div>
  );
};

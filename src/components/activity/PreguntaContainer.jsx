import { PreguntaBody } from "./PreguntaBody";
import { PreguntaHeader } from "./PreguntaHeader";

export const PreguntaContainer = () => {
  return (
    <div className="bg-purple-200 m-5">
      <div>
        <PreguntaHeader />
        <PreguntaBody />
      </div>
    </div>
  );
};

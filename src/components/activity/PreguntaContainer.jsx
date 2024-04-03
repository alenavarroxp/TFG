import { PreguntaBody } from "./PreguntaBody";
import { PreguntaHeader } from "./PreguntaHeader";
import { RespuestaBody } from "./RespuestaBody";
import { RespuestaHeader } from "./RespuestaHeader";

export const PreguntaContainer = () => {
  return (
    <div className="m-5 mb-0 mt-0 flex-col bg-blue-500 h-full">
      <div className="">
        <PreguntaHeader />
        <PreguntaBody />
      </div>
      <div className="bg-yellow-500 h-full mt-5">
        <RespuestaHeader/>
        <RespuestaBody/>
      </div>
    </div>
  );
};

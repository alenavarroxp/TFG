import { PreguntaBody } from "./PreguntaBody";
import { PreguntaHeader } from "./PreguntaHeader";
import { RespuestaBody } from "./RespuestaBody";
import { RespuestaHeader } from "./RespuestaHeader";

export const PreguntaContainer = () => {
  return (
    <div className="m-5 mb-0 mt-0 flex-col h-full">
      <div className="">
        <PreguntaHeader />
        <PreguntaBody />
      </div>
      <div className="h-full mt-5 relative">
        <RespuestaHeader/>
        <RespuestaBody/>
        <button className="absolute bottom-28 right-4 rounded-full bg-white p-2 px-4 font-semibold text-[#167563] ">
            <h1>Siguiente pregunta</h1>
        </button>
      </div>
    </div>
  );
};

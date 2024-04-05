/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { PreguntaBody } from "./PreguntaBody";
import { PreguntaHeader } from "./PreguntaHeader";
import { RespuestaBody } from "./RespuestaBody";
import { RespuestaHeader } from "./RespuestaHeader";

export const PreguntaContainer = ({ activity, actualQuestion, next, prev }) => {
  const [nextVisible, setNextVisible] = useState(true);
  const [prevVisible, setPrevVisible] = useState(false);

  useEffect(() => {
    if (actualQuestion.id === activity.questions?.length) {
      setNextVisible(false);
    } else {
      setNextVisible(true);
    }

    if (actualQuestion.id === 1) {
      setPrevVisible(false);
    } else {
      setPrevVisible(true);
    }
  }, [actualQuestion, activity.questions?.length]);

  return (
    <div className="m-5 mb-0 mt-0 flex-col h-full">
      <div className="">
        <PreguntaHeader actualQuestion={actualQuestion} />
        <PreguntaBody actualQuestion={actualQuestion} />
      </div>
      <div className="h-full mt-5 relative">
        <RespuestaHeader actualQuestion={actualQuestion} />
        <RespuestaBody actualQuestion={actualQuestion} />
        {prevVisible && (
          <button
            className="absolute bottom-28 left  -4 rounded-full bg-white p-2 px-4 font-semibold text-[#167563] "
            onClick={prev}
          >
            <h1>Anterior pregunta</h1>
          </button>
        )}
        {nextVisible && (
          <button
            className="absolute bottom-28 right-4 rounded-full bg-white p-2 px-4 font-semibold text-[#167563] "
            onClick={next}
          >
            <h1>Siguiente pregunta</h1>
          </button>
        )}
      </div>
    </div>
  );
};

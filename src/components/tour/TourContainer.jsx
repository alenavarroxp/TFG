/* eslint-disable react/prop-types */
import { FaTriangleExclamation } from "react-icons/fa6";
import { TbTimeline } from "react-icons/tb";
import { QuestionBadge } from "../activity/QuestionBadge";
import { RxReader } from "react-icons/rx";
import { CgOptions } from "react-icons/cg";
import { AiFillCheckCircle } from "react-icons/ai";
import { ExampleProffesorScore } from "./ExampleProffesorScore";
import { SystemScore } from "./SystemScore";

// eslint-disable-next-line react/prop-types
export const TourContainer = ({
  text,
  kindOfQuestion,
  kindOfAnswer,
  professorExample,
  style,
}) => {
  return (
    <div className={`text-justify text-md px-2 ${style}`}>
      {text}
      {kindOfQuestion && (
        <div className="flex justify-center mt-2 -mb-2">
          <div className="bg-gray-800 p-3 rounded-lg flex flex-col justify-start items-start w-full">
            <div className="flex text-white mb-3 text-xs">
              Estos son algunos ejemplos de los tipos:
            </div>
            <div className="w-full flex justify-center">
              <QuestionBadge text={"Test"} icon={<TbTimeline />} style="mr-2" />
              <QuestionBadge text={"Redacción"} icon={<RxReader />} />
            </div>
          </div>
        </div>
      )}
      {kindOfAnswer && (
        <div className="flex justify-center mt-2 -mb-2">
          <div className="bg-gray-800 p-3 rounded-lg flex flex-col w-full justify-start items-start">
            <div className="flex text-white mb-3 text-xs">
              Estos son algunos ejemplos de los tipos:
            </div>
            <div className="w-full flex justify-center">
              <QuestionBadge
                text={"Opción múltiple"}
                icon={<CgOptions />}
                style="mr-2"
              />
              <QuestionBadge
                text={"Verdadero o falso"}
                icon={<AiFillCheckCircle />}
              />
            </div>
          </div>
        </div>
      )}
      {professorExample && (
        <>
          <SystemScore />
          <div className="text-red-500 font-bold text-lg py-1 flex justify-center items-center flex-col">
            <div className="flex justify-center items-center">
              <FaTriangleExclamation color="red" size={20} className="mr-4" />
              <p>¡Atención!</p>
              <FaTriangleExclamation color="red" size={20} className="ml-4"/>
            </div>
            <p className="text-sm">Te muestro un ejemplo</p>
          </div>
          <ExampleProffesorScore />
        </>
      )}
    </div>
  );
};

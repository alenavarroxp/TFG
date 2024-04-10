/* eslint-disable react/prop-types */
import { TbTimeline } from "react-icons/tb";
import { QuestionBadge } from "../activity/QuestionBadge";
import { RxReader } from "react-icons/rx";
import { CgOptions } from "react-icons/cg";
import { AiFillCheckCircle } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
export const TourContainer = ({
  text,
  kindOfQuestion,
  kindOfAnswer,
  puntuaciónExample,
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
      {puntuaciónExample && (
        <div>
          <div className="mt-2 text-left font-normal text-xs bg-gray-800 rounded-lg text-white p-1">
            <div  >
              El sistema de puntuación es el siguiente:
              <div className=" w-full flex justify-center items-center">
                <div className="mr-2">
                  <p>Puntuación</p>
                  <span className="text-green-500 font-semibold">CORRECTA</span>
                </div>
                =
                <div className="flex flex-row justify-center items-center text-[11px] ml-2">
                  <div className="flex flex-col">
                    <p>Puntuación actual</p>
                    <div className="border-t border-white w-24 my-1"></div>
                    <p>Opciones Correctas</p>
                  </div>
                  <div>
                    <p className="text-[10px] ml-1">* Respuestas Correctas</p>
                  </div>
                </div>
              </div>
              <div className=" w-full flex justify-center items-center mt-2">
                <div className="mr-2">
                  <p>Puntuación</p>
                  <span className="text-red-500 font-semibold">INCORRECTA</span>
                </div>
                =
                <div className="flex flex-row justify-center items-center text-[11px] ml-2">
                  <div className="flex flex-col mr-2">
                    <p>Puntuación actual</p>
                    <div className="border-t border-white w-24 my-1"></div>
                    <p>Opciones Correctas</p>
                  </div>
                </div>
                <p className="mt-1 mr-2">* </p>
                <p> (-1/2)</p>
              </div>
              <div className="flex items-center justify-center py-2">
                Resultado total =
                <div className="mr-2 ml-2">
                  <p>Puntuación</p>
                  <span className="text-green-500 font-semibold">CORRECTA</span>
                </div>{" "}
                +{" "}
                <div className="mr-2 ml-2">
                  <p>Puntuación</p>
                  <span className="text-red-500 font-semibold">INCORRECTA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center font-bold text-red-500 py-2">
            <p>¡ATENCIÓN!</p>
            <p className="text-sm ">Te muestro un ejemplo</p>
            <div className="mt-2 text-left font-normal text-xs bg-gray-800 rounded-lg text-white p-2">
              Si tenemos una pregunta con puntuación 1 y 5 respuestas de las
              cuales 2 opciones correctas y marcamos las 2 opciones correctas y
              1 opción incorrecta:
              <div>
                <div className=" w-full flex justify-center items-center">
                  <div className="mr-2">
                    <p>Respuesta</p>
                    <span className="text-green-500 font-semibold">
                      CORRECTA
                    </span>
                  </div>
                  =
                  <div className="flex flex-row justify-center items-center text-[11px] ml-2 mr-2">
                    <div className="flex flex-col items-center">
                      <p>1</p>
                      <div className="border-t border-white w-3 my-1"></div>
                      <p>2</p>
                    </div>
                    <div>
                      <p className="text-[11px] ml-1">* 2</p>
                    </div>
                  </div>
                  = 1
                </div>
                <div className=" w-full flex justify-center items-center mt-2">
                  <div className="mr-2">
                    <p>Respuesta</p>
                    <span className="text-red-500 font-semibold">
                      INCORRECTA
                    </span>
                  </div>
                  =
                  <div className="flex flex-row justify-center items-center text-[11px] ml-2">
                    <div className="flex flex-col items-center mr-2">
                      <p>1</p>
                      <div className="border-t border-white w-3 my-1"></div>
                      <p>2</p>
                    </div>
                  </div>
                  <p className="mt-1 mr-2">* </p>
                  <p> (-1/2) = - 0.25</p>
                </div>
                <div className="flex items-center justify-center py-2">
                  Resultado total =<div className="mr-2 ml-2">1</div> +{" "}
                  <div className="mr-2 ml-2">(-0.25)</div>= 0.75
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

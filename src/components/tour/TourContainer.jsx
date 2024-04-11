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
      
    </div>
  );
};

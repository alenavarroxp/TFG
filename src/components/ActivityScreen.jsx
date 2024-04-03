/* eslint-disable react/prop-types */

import { AiFillInfoCircle } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { socket } from "../utils/socket";
import { PreguntaContainer } from "./activity/PreguntaContainer";
import { UnderlinedText } from "./UnderlinedText";
import { GridActivity } from "./activity/GridActivity";
import { EndActivity } from "./activity/EndActivity";
import { useEffect } from "react";

export const ActivityScreen = ({ setActivityScreen }) => {
  const handleClickCerrar = () => {
    setActivityScreen(false);
    socket.emit("move");
  };

  useEffect(() => {
    socket.on("startActivity", (obj) => {
      console.log("ACTIVITY STARTED", obj);
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col absolute bg-[#167563] text-white overflow-x-hidden overflow-y-hidden custom-scrollbar">
      <div className="absolute top-2 right-3">
        <button onClick={handleClickCerrar}>
          <IoCloseOutline size={24} />
        </button>
      </div>

      <div className="flex justify-center items-center w-fit mt-5">
        <UnderlinedText text={"1º Primaria - Lengua"} style="text-3xl" />
        <AiFillInfoCircle
          size={16}
          className="ml-2 pointer-events-auto cursor-pointer border-b-0"
          onClick={() => console.log("HELPING")}
        />
      </div>

      <div className="flex flex-1">
        <div className=" w-3/4">
          <PreguntaContainer />
        </div>
        <div>
          <GridActivity
            questions={[{ id: 1 }, { id: 2 }, { id: 3 }]}
            setQuestion={null}
          />
          <EndActivity onClick={console.log("Terminar actividad")} />
        </div>
      </div>
    </div>
  );
};

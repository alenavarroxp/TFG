/* eslint-disable react/prop-types */
import { AiFillInfoCircle } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { UnderlinedText } from "../UnderlinedText";
import { CustomizeHeader } from "./CustomizeHeader";
import { CustomizeBody } from "./CustomizeBody";
import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { toast, Toaster } from "sonner";

export const CustomizeScreen = ({ customizeScreen, setCustomizeScreen }) => {
  const [selectedTab, setSelectedTab] = useState("Colores");
  const handleClickCerrar = () => {
    setCustomizeScreen(false);
    socket.emit("move")
  };

  useEffect(() => {
    console.log("HOA");
    if (customizeScreen) socket.emit("renderCustomizeScene");
  }, [customizeScreen]);

  const handleOk = () => {
    console.log("¡GUARDAR CAMBIOS!");

    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Guardando" }), 2000)
      );

    toast.promise(promise(), {
      loading: "Guardando...",
      success: () => {
        return `Los cambios se han guardado correctamente.`;
      },
      error: "Error al guardar los cambios. Inténtalo de nuevo.",
    });
    socket.emit("saveCustomizeCharacter");
  };

  return (
    <div className="min-h-full w-full flex flex-col absolute bg-[#167563] text-white overflow-x-hidden overflow-y-hidden custom-scrollbar">
      <Toaster position="top-right" />
      <div className="flex justify-center items-center w-fit mt-5">
        <UnderlinedText text={"Personaliza tu avatar"} style="text-2xl ml-5" />
        <AiFillInfoCircle
          size={16}
          className="ml-2 pointer-events-auto cursor-pointer border-b-0"
          onClick={() => {
            console.log("Tour");
            // setTourVisible(true);
            // resetErrors({ tour: true });
          }}
        />
      </div>
      <div className="ml-5 mt-1">
        Esta es la pantalla de personalización, donde puedes darle a tu avatar
        un toque único y distintivo que refleje tu estilo y personalidad.
      </div>
      <div className="absolute top-2 right-3">
        <button onClick={handleClickCerrar}>
          <IoCloseOutline size={24} />
        </button>
      </div>

      <div className="flex items-start justify-between flex-1">
        <div className="w-2/3 ml-5 h-full">
          <CustomizeHeader
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <CustomizeBody selectedTab={selectedTab} onOk={handleOk} />
        </div>
        <div className="w-1/3 flex flex-col h-[515px] items-center justify-center px-16">
          <p className="font-semibold text-2xl">Tu avatar</p>
          <canvas
            id="customizeScene"
            className="flex w-full h-full px-5 mt-3"
          />
        </div>
      </div>
    </div>
  );
};

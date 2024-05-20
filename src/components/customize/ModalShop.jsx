/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { socket } from "../../utils/socket";
import { colors } from "./colors";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";
import { set } from "mongoose";

export const ModalShop = ({
  setModalShop,
  modalTitle,
  setSelectedColorItem,
  oldColor,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const myUser = useAtomValue(userAtom);
  const [initState, setInitState] = useState(false);
  const [canBuy, setCanBuy] = useState(false);

  const handleBuy = () => {
    
    setIsProcessing(true);
    socket.emit("buyItem");
    setTimeout(() => {
      setIsProcessing(false);
      setModalShop(false);
    }, 1500);
  };

  const handleExit = () => {
    setModalShop(false);
    setSelectedColorItem(oldColor);
    socket.emit("customizeCharacter", {
      type: "color",
      color: oldColor,
    });
  };

  useEffect(() => {
    socket.emit("canShop", myUser);
  }, [myUser]);

  useEffect(()=>{
    socket.on("NoMoney",()=>{
        setCanBuy(false);
        setInitState(true);
    });

    return () => {
      socket.off("NoMoney");
    };
  },[])

  useEffect(()=>{
    socket.on("shop",()=>{
        setCanBuy(true);
        setInitState(true);
    });

    return () => {
      socket.off("shop");
    };
  },[])



  return (
    <div className="inset-0 flex justify-center items-center bg-black bg-opacity-25 absolute">
      <div className="bg-white rounded-lg p-5 relative w-[500px]">
        <p className="text-black text-md -mt-2 font-semibold">{modalTitle}</p>
        <p className="text-black text-xs">
          Cuando compres un accesorio, este se guardará en el cajón de
          personalización con la etiqueta de Obtenido.
        </p>
        <div className="flex items-center justify-between mt-6">
          <button
            className="text-black px-4"
            onClick={() => {
              handleExit();
            }}
            disabled={isProcessing}
          >
            <p className="text-md mr-2">Cerrar</p>
          </button>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded flex items-center ${
              isProcessing && "cursor-not-allowed opacity-50"
            }`}
            onClick={handleBuy}
            disabled={isProcessing || !canBuy}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <p className="text-md">Comprando...</p>
                <div className="animate-spin h-3 w-3 border-b-2 border-white rounded-full ml-3"></div>
              </div>
            ) : (
              <>
                <p className={`text-md mr-2 ${!canBuy && "cursor-not-allowed"}`}>{!canBuy && !initState ? "Comprobando...": canBuy ? "Comprar" : "No tienes suficiente dinero"}</p>
                <FaShoppingCart size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

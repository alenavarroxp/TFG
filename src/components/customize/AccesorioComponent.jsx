import { useState } from "react";
import { socket } from "../../utils/socket";
import { FaTrash } from "react-icons/fa";

export const AccesorioComponent = ({
  accesorios,
  selectedAccessoryItem,
  setSelectedAccessoryItem,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleAccesorioSelection = (obj) => {
    if (selectedAccessoryItem === obj) {
      setSelectedAccessoryItem(null);
      return;
    }
    setSelectedAccessoryItem(obj);
  };

  const handleCustomizeCharacter = (obj) => {
    const objSend = {
      type: "accessory",
      accessory: obj,
    };
    socket.emit("customizeCharacter", objSend);
  };
  return accesorios.map((accesorio, index) => (
    <button
      key={index}
      className="flex justify-center items-center flex-col select-none"
      onClick={() => {
        handleAccesorioSelection(accesorio);
        handleCustomizeCharacter(accesorio.id);
      }}
    >
      <div
        className="relative rounded-xl"
        onMouseEnter={() => {
          if (
            selectedAccessoryItem &&
            selectedAccessoryItem.id === accesorio.id
          )
            setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (
            selectedAccessoryItem &&
            selectedAccessoryItem.id === accesorio.id
          )
            setIsHovered(false);
        }}
        style={{
          border:
            selectedAccessoryItem && selectedAccessoryItem.id === accesorio.id
              ? "4px solid gold"
              : "4px solid transparent",
        }}
      >
        <img
          src={accesorio.img}
          className=" border-2 bg-white w-40 h-40 flex justify-center items-center pointer-events-auto select-none"
          
        />
        {selectedAccessoryItem &&
          selectedAccessoryItem.id === accesorio.id &&
          isHovered && (
            <div className="absolute text-black w-40 h-40 -mt-40 bg-black bg-opacity-60 flex items-center justify-center">
              <FaTrash size={35} color="red"/>
            </div>
          )}
      </div>

      <p className="text-sm mt-1">{accesorio.title}</p>
      <div>{accesorio.label}</div>
    </button>
  ));
};

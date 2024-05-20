import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { FaTrash } from "react-icons/fa";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";

export const AccesorioComponent = ({
  initialAccesorios,
  selectedAccessoryItem,
  setSelectedAccessoryItem,
  setModalShop,
  setModalTitle,
}) => {
  const [accessorios, setAccessorios] = useState(initialAccesorios);
  const myUser = useAtomValue(userAtom);
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

  const handleAccessoryAction = (accessory) => {
    if (selectedAccessoryItem === accessory) return;

    if (accessory.label.props.children === "Gratis") {
      setModalTitle(`¿Quieres obtener el color ${accessory.title}?`);
      setModalShop(true);
    } else if (accessory.label.props.children === "Obtenido") {
      console.log("Ya tienes el color.");
    } else {
      setModalTitle(
        `¿Quieres comprar el color ${accessory.title} por ${accessory.precio} monedas?`
      );
      setModalShop(true);
    }
  };

  useEffect(() => {
    const handleCanShop = (data) => {
      console.log("DATA", data, selectedAccessoryItem);
      const accessory = accessorios.find((accessory) => accessory === selectedAccessoryItem);
      console.log("color", accessory);
      if (accessory) {
        socket.emit("shop", { user: data, precio: accessory.precio });
      } else {
        console.warn("Accesorio no encontrado o seleccionado.");
      }
    };

    socket.on("canShop", handleCanShop);

    return () => {
      socket.off("canShop", handleCanShop);
    };
  }, [selectedAccessoryItem, accessorios]);

  useEffect(() => {
    socket.on("buyItem", () => {
      console.log("selectedAccesory", selectedAccessoryItem);
      const accessory = accessorios.find((accessory) => accessory === selectedAccessoryItem);
      socket.emit("saveAccessory", { user: myUser, accessory: accessory });
    });

    return () => socket.off("buyItem");
  }, [selectedAccessoryItem, myUser, accessorios]);

  useEffect(() => {
    socket.on("changeTagAccessory", (data) => {
      console.log("data", data);
      setAccessorios((prev) =>
        prev.map((accessory) =>
          accessory.id === data.id
            ? {
                ...accessory,
                label: <div className="text-lg font-semibold">Obtenido</div>,
                precio: 0,
              }
            : accessory
        )
      );
    });

    return () => socket.off("changeTagAccessory");
  }, []);

  useEffect(() => {
    socket.emit("getAccessories", myUser);

    socket.on("getAccessories", (data) => {
      setAccessorios((prev) => {
        return prev.map((accessory) => {
          const found = data.find((item) => item === accessory.id);
          if (found) {
            return {
              ...accessory,
              label: <div className="text-lg font-semibold">Obtenido</div>,
              precio: 0,
            };
          }
          return accessory;
        });
      });
    });
  }, [myUser]);

  return accessorios.map((accesorio, index) => (
    <button
      key={index}
      className="flex justify-center items-center flex-col select-none"
      onClick={() => {
        handleAccesorioSelection(accesorio);
        handleCustomizeCharacter(accesorio.id);
        handleAccessoryAction(accesorio);
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

import { PiPaintBrushFill } from "react-icons/pi";
import { socket } from "../../utils/socket";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";

export const ColorComponent = ({
  initialColors,
  selectedColorItem,
  setSelectedColorItem,
  oldColor,
  setModalShop,
  setModalTitle,
}) => {
  const [colors, setColors] = useState(initialColors);
  const [isHovered, setIsHovered] = useState(false);
  const myUser = useAtomValue(userAtom);

  useEffect(() => {
    socket.emit("getColors", myUser);

    socket.on("getColors", (data) => {
      setColors((prev) => {
        return prev.map((color) => {
          const found = data.find((item) => item === color.color);
          if (found) {
            return {
              ...color,
              label: <div className="text-lg font-semibold">Obtenido</div>,
              precio: 0,
            };
          }
          return color;
        });
      });
    });
  }, [myUser]);
  
  const handleColorSelection = (color) => {
    if (selectedColorItem === color) {
      setSelectedColorItem(null);
      return;
    }

    setSelectedColorItem(color);
  };

  const handleCustomizeCharacter = (color) => {
    const finalColor = selectedColorItem === color ? oldColor : color;

    const objSend = {
      type: "color",
      color: finalColor,
    };
    socket.emit("customizeCharacter", objSend);
  };

  const handleColorAction = (color) => {
    if (selectedColorItem === color.color) return;

    if (color.label.props.children === "Gratis") {
      setModalTitle(`¿Quieres obtener el color ${color.title}?`);
      setModalShop(true);
    } else if (color.label.props.children === "Obtenido") {
      console.log("Ya tienes el color.");
    } else {
      setModalTitle(
        `¿Quieres comprar el color ${color.title} por ${color.precio} monedas?`
      );
      setModalShop(true);
    }
  };

  useEffect(() => {
    socket.on("buyItem", () => {
      console.log("selectedColorItem", selectedColorItem);
      const color = colors.find((color) => color.color === selectedColorItem);
      socket.emit("saveColor", { user: myUser, color: color });
    });

    return () => socket.off("buyItem");
  }, [selectedColorItem, myUser, colors]);

  useEffect(() => {
    socket.on("changeTag", (data) => {
      console.log("data", data);
      setColors((prev) =>
        prev.map((color) =>
          color.color === data
            ? {
                ...color,
                label: <div className="text-lg font-semibold">Obtenido</div>,
                precio: 0,
              }
            : color
        )
      );
    });

    return () => socket.off("changeTag");
  }, []);

  useEffect(() => {
    const handleCanShop = (data) => {
      console.log("DATA", data, selectedColorItem);
      const color = colors.find((color) => color.color === selectedColorItem);
      console.log("color", color);
      if (color) {
        socket.emit("shop", { user: data, precio: color.precio });
      } else {
        console.warn("Color no encontrado o seleccionado.");
      }
    };

    socket.on("canShop", handleCanShop);

    return () => {
      socket.off("canShop", handleCanShop);
    };
  }, [selectedColorItem, colors]);

  

  return colors.map((color, index) => (
    <button
      key={index}
      className="flex justify-center items-center flex-col"
      onClick={() => {
        handleColorSelection(color.color);
        handleCustomizeCharacter(color.color);
        handleColorAction(color);
      }}
    >
      <div
        className="relative border-2 bg-white rounded-full w-20 h-20 flex justify-center items-center"
        style={{
          border:
            selectedColorItem === color.color
              ? "4px solid gold"
              : "4px solid transparent",
        }}
        onMouseEnter={() => {
          if (selectedColorItem === color.color) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (selectedColorItem === color.color) setIsHovered(false);
        }}
      >
        <PiPaintBrushFill
          color={color.color}
          size={40}
          style={{
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75))",
          }}
        />
        {selectedColorItem === color.color && isHovered && (
          <div className="text-black absolute w-full h-full bg-black bg-opacity-60 rounded-full flex items-center justify-center">
            <FaTrash size={30} color="red" />
          </div>
        )}
      </div>

      <p className="text-sm mt-1">Color {color.title}</p>
      <div>{color.label}</div>
    </button>
  ));
};

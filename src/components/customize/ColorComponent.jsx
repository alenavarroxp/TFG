import { PiPaintBrushFill } from "react-icons/pi";
import { socket } from "../../utils/socket";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export const ColorComponent = ({
  colors,
  selectedColorItem,
  setSelectedColorItem,
  oldColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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

  return colors.map((color, index) => (
    <button
      key={index}
      className="flex justify-center items-center flex-col"
      onClick={() => {
        handleColorSelection(color.color);
        handleCustomizeCharacter(color.color);
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

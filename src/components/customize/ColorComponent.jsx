import { PiPaintBrushFill } from "react-icons/pi";
import { socket } from "../../utils/socket";

export const ColorComponent = ({colors, selectedItem, setSelectedItem}) => {
    const handleColorSelection = (color) => {
        setSelectedItem(color);
      };
    
      const handleCustomizeCharacter = (color) => {
        console.log("¡CUSTOMIZAR!");
        socket.emit("customizeCharacter", color);
      };

  return (
    colors.map((color,index) => (
        <button
        key={index}
        className="flex justify-center items-center flex-col"
        onClick={() => {
          handleColorSelection(color.color);
          handleCustomizeCharacter(color.color);
        }}
      >
        <div
          className="border-2 bg-white rounded-full w-20 h-20 flex justify-center items-center"
          style={{
            border:
              selectedItem === color.color
                ? "4px solid gold"
                : "4px solid transparent",
          }}
        >
          <PiPaintBrushFill
            color={color.color}
            size={40}
            style={{
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75))",
            }}
          />
        </div>

        <p className="text-sm mt-1">Color {color.title}</p>
        <div>{color.label}</div>
      </button>
    )
  ))
}

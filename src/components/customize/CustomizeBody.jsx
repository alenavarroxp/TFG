import { PiPaintBrushFill } from "react-icons/pi";
import { MoneyComponent } from "./MoneyComponent";
import { CustomizeButton } from "./CustomizeButton";
import { useState } from "react";
import { socket } from "../../utils/socket";

export const CustomizeBody = () => {
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const colorOptions = [
    {
      title: "Rojo",
      color: "#FF0000",
      label: <div className="text-lg font-semibold">Obtenido</div>,
    },
    {
      title: "Naranja",
      color: "#FF8A00",
      label: <MoneyComponent style="text-2xl font-semibold" />,
    },
    {
      title: "Amarillo",
      color: "#FAFF00",
      label: <div className="text-lg font-semibold">Gratis</div>,
    },
    {
      title: "Verde",
      color: "#00FF47",
      label: <div className="text-lg font-semibold">Gratis</div>,
    },
    {
      title: "Azul",
      color: "#0094FF",
      label: <div className="text-lg font-semibold">Obtenido</div>,
    },
    {
      title: "Morado",
      color: "#8B00FF",
      label: <MoneyComponent style="text-2xl font-semibold" />,
    },
    {
      title: "Rosa",
      color: "#FF69B4",
      label: <MoneyComponent style="text-2xl font-semibold" />,
    },
    {
      title: "Cian",
      color: "#00FFFF",
      label: <div className="text-lg font-semibold">Gratis</div>,
    },
    {
      title: "Magenta",
      color: "#FF00FF",
      label: <div className="text-lg font-semibold">Obtenido</div>,
    },
    {
      title: "Negro",
      color: "#000000",
      label: <MoneyComponent style="text-2xl font-semibold" />,
    },
  ];

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleCustomizeCharacter = (color) => {
    console.log("¡CUSTOMIZAR!");
    socket.emit("customizeCharacter", color);
  };

  return (
    <>
      <div className="bg-[#1E574B] rounded-r-xl rounded-b-xl flex h-[460px] flex-col">
        <div className="flex justify-center items-center px-6 py-3">
          <p className="border-b-2 font-semibold">
            Seleccionar el color de tu avatar
          </p>
        </div>
        <div className="grid grid-cols-5 grid-rows-2 gap-4 p-3 h-full  justify-center items-center">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className="flex justify-center items-center flex-col"
              onClick={() => {
                handleColorSelection(option.color);
                handleCustomizeCharacter(option.color);
              }}
            >
              <div
                className="border-2 bg-white rounded-full w-20 h-20 flex justify-center items-center"
                style={{
                  border:
                    selectedColor === option.color
                      ? "4px solid gold"
                      : "4px solid transparent",
                }}
              >
                <PiPaintBrushFill
                  color={option.color}
                  size={40}
                  style={{
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75))",
                  }}
                />
              </div>

              <p className="text-sm mt-1">Color {option.title}</p>
              <div>{option.label}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between py-5">
        <CustomizeButton text="Cancelar" />
        <CustomizeButton
          text="Seleccionar color"
          onClick={() => console.log("GUARDAR CAMBIOS")}
        />
      </div>
    </>
  );
};

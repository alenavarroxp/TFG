/* eslint-disable react/prop-types */
import { CustomizeButton } from "./CustomizeButton";
import { useState } from "react";
import { ColorComponent } from "./ColorComponent";
import { AccesorioComponent } from "./AccesorioComponent";
import { colors } from "./colors";
import { accesorios } from "./accesorios";

export const CustomizeBody = ({ selectedTab }) => {
  const [selectedItem, setSelectedItem] = useState("#FF0000");

  return (
    <>
      <div className="bg-[#1E574B] rounded-r-xl rounded-b-xl flex h-[460px] flex-col">
        <div className="flex justify-center items-center px-6 py-3">
          <p className="border-b-2 font-semibold">
            {selectedTab === "Colores" && "Seleccionar el color de tu avatar"}
            {selectedTab === "Accesorios" &&
              "Seleccionar el accesorio para tu avatar"}
          </p>
        </div>

        {selectedTab === "Colores" && (
          <div className="grid grid-cols-5 grid-rows-2 gap-4 p-3 h-full  justify-center items-center">
            <ColorComponent
              colors={colors}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
        )}
        {selectedTab === "Accesorios" && (
          <div className="grid grid-cols-3 grid-rows-2 gap-4 p-3 h-full  justify-center items-center">
            <AccesorioComponent
              accesorios={accesorios}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
        )}
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

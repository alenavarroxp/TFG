import { useState } from 'react';
import { RadioLocation } from "../inputs/radioLocation";
import { MandatoryText } from "./MandatoryText";

export const LocationPicker = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="ml-16 mt-4">
      <MandatoryText text={"Ubicación de la actividad"} />
      <div className="flex flex-col">
        <RadioLocation text={"Posición actual"} selected={selectedOption === "Posición actual"} onSelect={() => handleSelectOption("Posición actual")} />
        <RadioLocation text={"Elegir ubicación en el mapa"} selected={selectedOption === "Elegir ubicación en el mapa"} onSelect={() => handleSelectOption("Elegir ubicación en el mapa")} />
      </div>
    </div>
  );
};

import { useState } from "react";
import { RadioLocation } from "../inputs/radioLocation";
import { MandatoryText } from "./MandatoryText";
import { socket } from "../utils/socket";
import { useAtom } from "jotai";
import { locationAtom } from "../context/atoms/locationAtom";
import { chooseLocationAtom } from "../context/atoms/chooseLocationAtom";

export const LocationPicker = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [location, setLocation] = useAtom(locationAtom);
  const [chooseLocation, setChooseLocation] = useAtom(chooseLocationAtom);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    socketEvent(option);
  };

  const socketEvent = (option) => {
    setLocation({ id: socket.id, position: null });
    switch (option) {
      case 1:
        setChooseLocation({ isChoosing: false });
        socket.emit("currentLocation", socket.id);
        break;
      case 2:
        setChooseLocation({ isChoosing: true });
        socket.emit("chooseLocation");
        break;
      default:
        break;
    }
  };

  console.log("locationAtom", location);
  console.log("chooseLocationAtom", chooseLocation)

  socket.on("returnCurrentLocation", (position) => {
    setLocation({ id: socket.id, position: position });
  });

  return (
    <div className="ml-16 mt-4">
      <MandatoryText text={"Ubicación de la actividad"} />
      <div className="flex flex-col">
        <RadioLocation
          text={"Posición actual"}
          selected={selectedOption === 1}
          onSelect={() => handleSelectOption(1)}
        />
        <RadioLocation
          text={"Elegir ubicación en el mapa"}
          selected={selectedOption === 2}
          onSelect={() => handleSelectOption(2)}
        />
      </div>
    </div>
  );
};

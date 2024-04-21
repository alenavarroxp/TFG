/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { RadioLocation } from "../inputs/radioLocation";
import { MandatoryText } from "./MandatoryText";
import { socket } from "../utils/socket";
import { useAtom } from "jotai";
import { locationAtom } from "../context/atoms/locationAtom";
import { chooseLocationAtom } from "../context/atoms/chooseLocationAtom";
import { locationOptionAtom } from "../context/atoms/locationOptionAtom";
import { errorsTestAtom } from "../context/atoms/errorsTestAtom";
import { ErrorAlert } from "./ErrorAlert";

export const LocationPicker = ({ style }) => {
  const [location, setLocation] = useAtom(locationAtom);
  const [, setChooseLocation] = useAtom(chooseLocationAtom);
  const [option, setOption] = useAtom(locationOptionAtom);
  const [errorsTest, setErrorsTest] = useAtom(errorsTestAtom);

  const handleSelectOption = (option) => {
    setOption(option);
    socketEvent(option);
  };

  const socketEvent = (option) => {
    switch (option) {
      case 1:
        setChooseLocation({ isChoosing: false });
        socket.emit("currentLocation", socket.id);
        break;
      case 2:
        setChooseLocation({ isChoosing: true });
        if (location.position)
          socket.emit("returnPointer", {
            id: socket.id,
            position: location.position,
          });
        socket.emit("chooseLocation");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    socket.on("returnLocation", (obj) => {
      setErrorsTest({ position: false });
      setLocation({
        id: socket.id,
        position: obj.position ? obj.position : null,
      });
      setOption(obj.option);
    });
  }, [setLocation, setOption, setErrorsTest]);

  useEffect(() => {
    if (!location.position) setOption(null);
  }, [location, setOption]);

  return (
    <div className={`ml-5 mt-4 mr-8 mb-2 ${style}`}>
      <MandatoryText text={"Ubicación de la actividad"} />
      {errorsTest.position && (
        <div className="w-fit mb-2">
          <ErrorAlert message={"Debes seleccionar una ubicación"} />
        </div>
      )}
      <div className="flex flex-col">
        <RadioLocation
          text={"Posición actual"}
          selected={option === 1}
          onSelect={() => handleSelectOption(1)}
        />
        <RadioLocation
          text={"Elegir ubicación en el mapa"}
          selected={option === 2}
          onSelect={() => handleSelectOption(2)}
        />
      </div>
    </div>
  );
};

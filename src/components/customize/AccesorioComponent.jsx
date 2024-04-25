import { socket } from "../../utils/socket";

export const AccesorioComponent = ({
  accesorios,
  selectedAccessoryItem,
  setSelectedAccessoryItem,
}) => {
  const handleAccesorioSelection = (obj) => {
    if (selectedAccessoryItem === obj) {
      setSelectedAccessoryItem(null);
      return;
    }
    setSelectedAccessoryItem(obj);
  };

  const handleCustomizeCharacter = (obj) => {
    console.log("¡CUSTOMIZAR ACCESORIOS!", obj);
    const objSend ={
        type: "accessory",
        accessory: obj
    }
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
      <img
        src={accesorio.img}
        className="border-2 bg-white rounded-xl w-40 h-40 flex justify-center items-center pointer-events-auto select-none"
        style={{
          border:
            selectedAccessoryItem === accesorio
              ? "4px solid gold"
              : "4px solid transparent",
        }}
      ></img>

      <p className="text-sm mt-1">{accesorio.title}</p>
      <div>{accesorio.label}</div>
    </button>
  ));
};

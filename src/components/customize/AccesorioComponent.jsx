export const AccesorioComponent = ({
  accesorios,
  selectedItem,
  setSelectedItem,
}) => {
  const handleAccesorioSelection = (obj) => {
    setSelectedItem(obj);
  };

  const handleCustomizeCharacter = (obj) => {
    console.log("¡CUSTOMIZAR ACCESORIOS!", obj);
  };
  return accesorios.map((accesorio, index) => (
    <button
      key={index}
      className="flex justify-center items-center flex-col"
      onClick={() => {
        handleAccesorioSelection(accesorio);
        handleCustomizeCharacter(accesorio);
      }}
    >
      <img
        src={accesorio.img}
        className="border-2 bg-white rounded-xl w-40 h-40 flex justify-center items-center"
        style={{
          border:
            selectedItem === accesorio
              ? "4px solid gold"
              : "4px solid transparent",
        }}
      ></img>

      <p className="text-sm mt-1">{accesorio.title}</p>
      <div>{accesorio.label}</div>
    </button>
  ));
};

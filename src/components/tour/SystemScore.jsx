export const SystemScore = () => {
  return (
    <div className="mt-2 text-left font-normal text-xs bg-gray-800 rounded-lg text-white p-1">
      <div>
        <div className=" w-full flex justify-center items-center">
          <div className="mr-2">
            <p>Puntuación</p>
            <span className="text-green-500 font-semibold">CORRECTA</span>
          </div>
          =
          <div className="flex flex-row justify-center items-center text-[11px] ml-2">
            <div className="flex flex-col">
              <p>Puntuación actual</p>
              <div className="border-t border-white w-24 my-1"></div>
              <p>Opciones Correctas</p>
            </div>
            <div>
              <p className="text-[10px] ml-1">* Respuestas Correctas</p>
            </div>
          </div>
        </div>
        <div className=" w-full flex justify-center items-center mt-2">
          <div className="mr-2">
            <p>Puntuación</p>
            <span className="text-red-500 font-semibold">INCORRECTA</span>
          </div>
          =
          <div className="flex flex-row justify-center items-center text-[11px] ml-2">
            <div className="flex flex-col mr-2">
              <p>Puntuación actual</p>
              <div className="border-t border-white w-24 my-1"></div>
              <p>Opciones Correctas</p>
            </div>
          </div>
          <p className="mt-1 mr-2">* </p>
          <p> (-1/2)</p>
        </div>
        <div className="flex items-center justify-center py-2">
          Resultado total =
          <div className="mr-2 ml-2">
            <p>Puntuación</p>
            <span className="text-green-500 font-semibold">CORRECTA</span>
          </div>{" "}
          +{" "}
          <div className="mr-2 ml-2">
            <p>Puntuación</p>
            <span className="text-red-500 font-semibold">INCORRECTA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

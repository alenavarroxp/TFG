import { useEffect } from "react";
import { initScene } from "../js/babylon";
export const World = () => {
  useEffect(()=>{
    initScene();
  },[])
  return (
    <>
      {" "}
      <div id="GUI" className="absolute right-2 top-2 flex flex-col items-end">
        <a
          id="volver"
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Volver al inicio
        </a>
        <button
          id="changeCameraBtn"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cambiar Cámara
        </button>
        <select
          id="escenarios"
          className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <option value="1">Escenario 1 - ⭐</option>
        </select>
      </div>
      <canvas id="renderCanvas" className="w-full h-screen"></canvas>
    </>
  );
};

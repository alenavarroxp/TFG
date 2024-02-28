import { useEffect, useRef } from "react";
import { initScene } from "../js/babylon";
export const World = () => {
  const reactCanvas = useRef(null);
  
  useEffect(() => {
    const canvas = reactCanvas.current;
    if (canvas) {
      initScene(canvas);
    }
  }, []);

  return (
    <>
      <div id="GUI" className="absolute right-2 top-2 flex flex-col items-end">
        {/* <a
          id="volver"
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Volver al ianicio
        </a> */}
        <button
          id="changeCameraBtn"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cambiar Cámara
        </button>
      </div>
      <canvas id="renderCanvas" ref={reactCanvas} className="w-full h-screen"></canvas>
    </>
  );
};

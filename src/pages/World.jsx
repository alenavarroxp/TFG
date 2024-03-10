import { useEffect, useRef } from "react";
import { initScene } from "../js/babylon";
import { useNavigate } from "react-router-dom";
import { GUI } from "../components/GUI";
import { useAtom } from "jotai";
import { userAtom } from "../context/atoms/userAtom";

export const World = () => {
  const reactCanvas = useRef(null);
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (!user.userName) {
      navigate("/");
      return;
    }
    const canvas = reactCanvas.current;
    if (canvas) {
      initScene(canvas);
    }
  }, [user.userName, navigate]);

  return (
    <>
      <GUI />
      <canvas
        id="renderCanvas"
        ref={reactCanvas}
        className="w-full h-screen"
      ></canvas>
    </>
  );
};

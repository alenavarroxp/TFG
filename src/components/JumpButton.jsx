import { FaAnglesDown } from "react-icons/fa6";
import { socket } from "../utils/socket";
export const JumpButton = () => {
  const sendJump = () => {
    console.log("Jumping");
    socket.emit("jump");
  };

  return (
    <div
      id="jumpBtn"
      className="absolute flex justify-center items-center bottom-10 right-10 rounded-full min-w-20 min-h-20 border-2 border-white pointer-events-auto cursor-pointer"
      onClick={sendJump}
    >
      <FaAnglesDown size={40} color={"white"} style={{ transform: "rotate(180deg)" }} />
    </div>
  );
};

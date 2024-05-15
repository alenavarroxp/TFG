import { IoCloseOutline } from "react-icons/io5";
import { socket } from "../../utils/socket";

// eslint-disable-next-line react/prop-types
export const ChatTitle = ({ setChatScreen }) => {
  const handleClickCerrar = () => {
    setChatScreen(false);
    socket.emit("move");
  };
  return (
    <div className="relative h-fit p-8 w-full font-bold text-5xl">
      Chat{" "}
      <div className="absolute top-4 right-4">
        <button onClick={handleClickCerrar}>
          <IoCloseOutline size={30} />
        </button>
      </div>
    </div>
  );
};

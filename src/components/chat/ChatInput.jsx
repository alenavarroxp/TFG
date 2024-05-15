import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { socket } from "../../utils/socket";

// eslint-disable-next-line react/prop-types
export const ChatInput = ({ selectedChat }) => {
  const [message, setMessage] = useState("");

  const handleChatInput = () => {
    socket.emit("chatMessage", { message, selectedChat });
    setMessage("");
  };
  return (
    <div className="bg-[#ECECEC] p-4 mt-4 rounded-2xl flex">
      <input
        value={message}
        type="text"
        placeholder="Escribe tu mensaje..."
        className="bg-[#ECECEC] w-full outline-none placeholder-[#5F6368]"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleChatInput}>
        <RiSendPlaneFill size={22} />
      </button>
    </div>
  );
};

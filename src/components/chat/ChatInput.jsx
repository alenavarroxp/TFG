/* eslint-disable react/prop-types */
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { socket } from "../../utils/socket";

export const ChatInput = ({ selectedChat }) => {
  const [message, setMessage] = useState("");

  const handleChatInput = () => {
    const currentTime = new Date();

    // Formatear la hora en formato de 12 horas con AM/PM
    const hours = currentTime.getHours() % 12 || 12; // Convertir a formato de 12 horas
    const minutes = currentTime.getMinutes();
    const amOrPm = currentTime.getHours() < 12 ? "AM" : "PM";

    // Crear la cadena de tiempo en el formato deseado
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amOrPm}`;

    socket.emit("chatMessage", {
      id: new Date().getTime(),
      emisor: selectedChat.emisor,
      receptor: selectedChat.receptor,
      message,
      date: formattedTime,
    });
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

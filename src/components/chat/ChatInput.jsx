/* eslint-disable react/prop-types */
import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { socket } from "../../utils/socket";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { categories } from "../../utils/emojiCategories";

export const ChatInput = ({ selectedChat }) => {
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  
  const handleChatInput = () => {
    if (message.trim() === "") return;

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
      emisorId: socket.id,
      emisor: selectedChat.emisor,
      receptor: selectedChat.receptor,
      receptorId: selectedChat.receptor.id,
      message,
      date: formattedTime,
    });
    setMessage("");
  };

  const handleKeyPress = (e) => {
    setEmojiPicker(false);
    if (e.key === "Enter") {
      handleChatInput();
    }
  };

  const handleChatEmoji = () => {
    setEmojiPicker(!emojiPicker);
  };

  return (
    <div className="bg-[#ECECEC] p-4 mt-4 rounded-2xl flex">
      {emojiPicker && (
        <div className="absolute bottom-0 left-1/2 right-1/2">
          <EmojiPicker
            searchPlaceHolder="Buscar emoticono"
            emojiStyle="native"
            onEmojiClick={(e) =>
              setMessage((prevMessage) => prevMessage + e.emoji)
            }
            suggestedEmojisMode="recent"
            lazyLoadEmojis={true}
            categories={categories}
          />
        </div>
      )}
      <input
        value={message}
        type="text"
        placeholder="Escribe tu mensaje..."
        className="bg-[#ECECEC] w-full outline-none placeholder-[#5F6368]"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleChatEmoji} className="ml-3 mr-2.5">
        <BsEmojiSmile size={22} />
      </button>
      <button onClick={handleChatInput} className="ml-2.5 mr-1">
        <RiSendPlaneFill size={22} />
      </button>
    </div>
  );
};

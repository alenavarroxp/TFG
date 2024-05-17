/* eslint-disable react/prop-types */
import { socket } from "../../utils/socket";
import { UserInfo } from "./UserInfo";
import { BiExit } from "react-icons/bi";

export const ChatHeader = ({ selectedChat, setSelectedChat }) => {
  const handleExitChat = () => {
    socket.emit("exitChat", selectedChat);
    setSelectedChat(false);
  };
  return (
    <div className="bg-[#D9D9D9] h-fit w-full rounded-t-xl p-4 flex justify-between items-center">
      <UserInfo user={selectedChat.receptor} photoStyle="" nameStyle="" />
      <button
        onClick={() => {
          handleExitChat();
        }}
      >
        <BiExit size={24} />
      </button>
    </div>
  );
};

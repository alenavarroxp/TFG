import { useEffect, useState } from "react";
import { Chat } from "./Chat";
import { ChatTitle } from "./ChatTitle";
import { ChatUsers } from "./ChatUsers";
import { socket } from "../../utils/socket";

// eslint-disable-next-line react/prop-types
export const ChatComponent = ({ setChatScreen }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  useEffect(() => {
    socket.on("selectedChatUser", (user) => {
      setSelectedChat(user);
    });
  }, [selectedChat]);
  return (
    <div className="w-1/2 flex flex-1 flex-col bg-white text-black lg:min-w-[566px] md:min-w-[560px] sm:min-w-[550px] min-w-[540px]  ">
      <ChatTitle setChatScreen={setChatScreen} />
      <div className="flex flex-1">
        <ChatUsers selectedChat={selectedChat} />
        <Chat selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      </div>
    </div>
  );
};

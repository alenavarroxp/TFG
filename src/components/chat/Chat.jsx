import { useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { NoSelectedChat } from "./NoSelectedChat";
import { socket } from "../../utils/socket";
import { ChatBody } from "./ChatBody";

export const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    socket.on("selectedChatUser", (user) => {
      setSelectedChat(user);
    });
  }, []);
  return (
    <div className=" flex mb-4 mr-4 w-3/5">
      {selectedChat ? (
        <div className="flex flex-col w-full">
          <ChatHeader
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
          <ChatBody selectedChat={selectedChat} />
        </div>
      ) : (
        <NoSelectedChat />
      )}
    </div>
  );
};

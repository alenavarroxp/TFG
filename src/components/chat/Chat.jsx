/* eslint-disable react/prop-types */
import { ChatHeader } from "./ChatHeader";
import { NoSelectedChat } from "./NoSelectedChat";
import { ChatBody } from "./ChatBody";

export const Chat = ({ selectedChat, setSelectedChat }) => {
  return (
    <div className=" flex mb-4 mr-4 w-3/5 min-w-[300px]">
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

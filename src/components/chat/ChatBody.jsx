import { useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";
import { socket } from "../../utils/socket";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";
import OtherMessage from "./OtherMessage";
import { MyMessage } from "./MyMessage";

// eslint-disable-next-line react/prop-types
export const ChatBody = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const myUser = useAtomValue(userAtom);

  useEffect(() => {
    socket.on("chatMessage", (data) => {
      console.log(data);
      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          emisor: data.emisor,
          receptor: data.receptor,
          message: data.message,
          date: data.date,
        },
      ]);
    });
  }, []);
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-[#FAFAFA] h-full max-h-[630px] overflow-y-auto">
        {messages.map((message) =>
          message.emisor.userName === myUser.userName &&
          message.emisor.isProfessor === myUser.isProfessor ? (
            <MyMessage
              key={message.id}
              emisor={message.emisor}
              message={message.message}
              date={message.date}
            />
          ) : (
            <OtherMessage
              key={message.id}
              receptor={message.emisor}
              message={message.message}
              date={message.date}
            />
          )
        )}
      </div>
      <ChatInput selectedChat={selectedChat} />
    </div>
  );
};

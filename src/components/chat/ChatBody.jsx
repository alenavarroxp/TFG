/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { socket } from "../../utils/socket";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";
import OtherMessage from "./OtherMessage";
import { MyMessage } from "./MyMessage";

export const ChatBody = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const myUser = useAtomValue(userAtom);

  useEffect(() => {
    const handleChatMessage = (data) => {
      if (
        (data.emisor.userName === selectedChat.emisor.userName &&
          data.receptor.name === selectedChat.receptor.name) ||
        (data.emisor.userName === selectedChat.receptor.name &&
          data.receptor.name === selectedChat.emisor.userName)
      ) {
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
      }
    };

    socket.on("chatMessage", handleChatMessage);

    return () => {
      socket.off("chatMessage", handleChatMessage);
    };
  }, [selectedChat]);

  useEffect(() => {
    const handleLastMessages = (data) => {
      const oldMessages = data.map((message) => ({
        id: message.message.id,
        emisor: message.message.emisor,
        receptor: message.message.receptor,
        message: message.message.message,
        date: message.message.date,
      }));

      setMessages(oldMessages);
    };

    socket.emit("getLastMessages", selectedChat);
    socket.on("lastMessages", handleLastMessages);

    return () => {
      socket.off("lastMessages", handleLastMessages);
    };
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-[#eaeaea] h-full max-h-[405px] overflow-y-auto chat-scrollbar rounded-b-xl">
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
        <div ref={messagesEndRef} />
      </div>
      <ChatInput selectedChat={selectedChat} />
    </div>
  );
};

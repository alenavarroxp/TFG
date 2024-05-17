/* eslint-disable react/prop-types */
import { useAtomValue } from "jotai";
import { socket } from "../../utils/socket";
import { UserInfo } from "./UserInfo";
import { userAtom } from "../../context/atoms/userAtom";
import { useEffect, useState } from "react";

export const ListUserChat = ({ users, selectedChat }) => {
  const myUser = useAtomValue(userAtom);
  const [numMessagesWithoutRead, setNumMessagesWithoutRead] = useState({});

  const handleUserPress = (user) => () => {
    socket.emit("selectedChatUser", {
      emisorId: socket.id,
      emisor: myUser,
      receptor: user,
    });

    setNumMessagesWithoutRead((prevState) => ({
      ...prevState,
      [user.id]: 0,
    }));
  };

  useEffect(() => {
    console.log("users en list", users);
  }, [users]);

  useEffect(() => {
    console.log("numMessagesWithoutRead en listasdasd", numMessagesWithoutRead);
  }, [numMessagesWithoutRead]);

  useEffect(() => {
    socket.on("exitChat", (chat) => {
      setNumMessagesWithoutRead((prevState) => ({
        ...prevState,
        [chat.receptor.id]: 0,
      }));
    });
  }, []);

  useEffect(() => {
    const handleChatMessage = (data) => {
      console.log("data en listuuser", data, "y", selectedChat);
      if (
        data.receptor.name === myUser.userName &&
        data.receptor.role === (myUser.isProfessor ? "Profesor" : "Estudiante")
      ) {
        setNumMessagesWithoutRead((prevState) => ({
          ...prevState,
          [data.emisorId]: (prevState[data.emisorId] || 0) + 1,
        }));
      }
    };

    socket.on("chatMessage", handleChatMessage);

    return () => {
      socket.off("chatMessage", handleChatMessage);
    };
  }, [selectedChat, myUser]);

  useEffect(() => {
    console.log("numMessagesWithoutRead", numMessagesWithoutRead);
  }, [numMessagesWithoutRead]);

  return (
    <ul
      id="usersList"
      className="text-[#5F6368] w-full overflow-y-auto max-h-[800px] chat-scrollbar flex-1"
    >
      {users.length > 0 ? (
        users.map((user) => {
          if (
            user.name === myUser.userName &&
            user.role === (myUser.isProfessor ? "Profesor" : "Estudiante")
          ) {
            return null; // Omitir este usuario
          }
          return (
            <li
              key={user.id}
              className="flex items-center p-2 mx-3 my-1"
              onClick={handleUserPress(user)}
            >
              <button className="w-full flex justify-start items-start relative">
                <UserInfo user={user} />
                {!selectedChat && numMessagesWithoutRead[user.id] > 0 && (
                  <span className="absolute top-0 right-0 mt-1 mr-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {numMessagesWithoutRead[user.id]}
                  </span>
                )}
                {selectedChat &&
                  numMessagesWithoutRead[user.id] > 0 &&
                  selectedChat.receptor.id !== user.id && (
                    <span className="absolute top-0 right-0 mt-1 mr-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {numMessagesWithoutRead[user.id] || ""}
                    </span>
                  )}
              </button>
            </li>
          );
        })
      ) : (
        <div className="flex flex-1 justify-center items-center">
          No hay usuarios
        </div>
      )}
    </ul>
  );
};

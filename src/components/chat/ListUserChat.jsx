/* eslint-disable react/prop-types */
import { useAtomValue } from "jotai";
import { socket } from "../../utils/socket";
import { UserInfo } from "./UserInfo";
import { userAtom } from "../../context/atoms/userAtom";
import { useEffect } from "react";

export const ListUserChat = ({ users }) => {
  const myUser = useAtomValue(userAtom);

  const handleUserPress = (user) => () => {
    socket.emit("selectedChatUser", {
      emisorId: socket.id,
      emisor: myUser,
      receptor: user,
    });
  };

  useEffect(() => {
    console.log("users en list", users);
  }, [users]);
  

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
              <button className="w-full flex justify-start items-start">
                <UserInfo user={user} />
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

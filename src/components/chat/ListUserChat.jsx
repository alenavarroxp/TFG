import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { UserInfo } from "./UserInfo";
import { userAtom } from "../../context/atoms/userAtom";
import { useAtomValue } from "jotai";

export const ListUserChat = () => {
  const myUser = useAtomValue(userAtom);
  const [users, setUsers] = useState([
    { id: 1, name: "Usuario1", role: "Estudiante" },
    { id: 2, name: "Usuario2", role: "Profesor" },
    { id: 3, name: "Usuario3", role: "Estudiante" },
    { id: 4, name: "Usuario4", role: "Profesor" },
    { id: 5, name: "Usuario5", role: "Estudiante" },
    { id: 6, name: "Usuario6", role: "Profesor" },
    { id: 7, name: "Usuario7", role: "Estudiante" },
    { id: 8, name: "Usuario8", role: "Profesor" },
    { id: 9, name: "Usuario9", role: "Estudiante" },
    { id: 10, name: "Usuario10", role: "Profesor" },
    { id: 11, name: "Usuario11", role: "Estudiante" },
    { id: 12, name: "Usuario12", role: "Profesor" },
    { id: 13, name: "Usuario13", role: "Estudiante" },
  ]);

  useEffect(() => {
    // socket.emit("getUsers");

    socket.on("getUsers", (users) => {
      const userList = Object.keys(users).map((userId) => ({
        id: userId,
        name: users[userId].userName,
        role: users[userId].isProfessor ? "Profesor" : "Estudiante",
      }));
      setUsers(userList);
    });
  }, []);

  const handleUserPress = (user) => () => {
    socket.emit("selectedChatUser", user);
  };

  return (
    <ul
      id="usersList"
      className="text-[#5F6368] w-full overflow-y-auto max-h-[800px] chat-scrollbar "
    >
      {users.length > 0 &&
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
        })}
    </ul>
  );
};

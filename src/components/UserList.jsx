/* eslint-disable react/prop-types */
import { BsChatLeft, BsThreeDots } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de react-toastify
import { socket } from "../utils/socket";
import { useEffect, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { useAtomValue } from "jotai";
import { userAtom } from "../context/atoms/userAtom";

export const UserList = ({ setChatScreen }) => {
  const myUser = useAtomValue(userAtom);
  const [users, setUsers] = useState([]);
  const [isMyUser, setIsMyUser] = useState(false);

  const notify = () =>
    toast.error("Función no implementada", {
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

  useEffect(() => {
    socket.on("getUsers", (users) => {
      const userList = Object.keys(users).map((userId) => ({
        id: userId,
        name: users[userId].userName,
        role: users[userId].isProfessor ? "Profesor" : "Estudiante",
      }));
      setUsers(userList);

      const foundUser = userList.some(
        (user) =>
          user.name === myUser.userName &&
          user.role === (myUser.isProfessor ? "Profesor" : "Estudiante")
      );
      setIsMyUser(foundUser);
    });

    socket.emit("getUsers");

    return () => {
      socket.off("getUsers");
    };
  }, [myUser]);

  const handleChat = (user) => {
    socket.emit("NoMove");
    setChatScreen(true);
    console.log("users", users);
    socket.emit("selectedChatUser", {
      emisorId: socket.id,
      emisor: { userName: myUser.userName, isProfessor: myUser.isProfessor },
      receptor: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  };

  return (
    <div className="text-white w-full mt-2 relative">
      <ul id="usersList" className="text-white w-full">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center border-b border-white p-2 mx-3"
          >
            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center mr-2 text-black font-semibold">
              {user.name ? user.name.substring(0, 2) : ""}
            </div>
            <div>
              <div className="flex items-center">
                <p className="font-semibold" />
                <span className="mr-1">{user.name}</span>
                {isMyUser &&
                  user.name === myUser.userName &&
                  user.role ===
                    (myUser.isProfessor ? "Profesor" : "Estudiante") && (
                    <span>(Tú)</span>
                  )}
              </div>

              <p className="text-sm">{user.role}</p>
            </div>

            {(user.name !== myUser.userName ||
              (user.name === myUser.userName &&
                user.role !==
                  (myUser.isProfessor ? "Profesor" : "Estudiante"))) && (
              <div className="ml-auto flex items-center">
                <button
                  className="btn btn-sm btn-circle ml-3 focus:outline-none bg-white"
                  onClick={() => handleChat(user)}
                  onKeyDown={handleKeyDown}
                >
                  <BsChatLeft color="black" />
                </button>
                <button
                  className="btn btn-sm btn-circle ml-3 focus:outline-none bg-white"
                  onClick={notify}
                  onKeyDown={handleKeyDown}
                >
                  <BsThreeDots color="black" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer className="overflow-hidden" />
    </div>
  );
};

import { BsChatLeft, BsThreeDots } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de react-toastify
import { socket } from "../utils/socket";
import { useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const notify = () =>
    toast.error("Función no implementada", {
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

  socket.emit("getUsers");

  socket.on("getUsers", (users) => {
    const userList = Object.keys(users).map((userId) => ({
      id: userId,
      name: users[userId].userName,
      role: users[userId].isProfessor ? "Profesor" : "Estudiante",
    }));
    setUsers(userList);
  });

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
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm">{user.role}</p>
            </div>
            <button className="btn btn-sm btn-circle ml-auto focus:outline-none bg-white" onClick={notify} onKeyDown={handleKeyDown} >
              <BsChatLeft color="black" />
            </button>
            <button className="btn btn-sm btn-circle ml-3 focus:outline-none bg-white" onClick={notify} onKeyDown={handleKeyDown}>
              <BsThreeDots color="black" />
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer className="overflow-hidden" 
      />
    </div>
      

  );
};

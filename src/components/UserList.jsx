import { BsChatLeft, BsThreeDots } from "react-icons/bs";
import { socket } from "../utils/socket";
import { useState } from "react";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  socket.emit("getUsers");

  socket.on("getUsers", (users) => {
    const userList = Object.keys(users).map((userId) => ({
        id: userId,
        name: users[userId].userName,
        role: users[userId].isProfessor ? "Professor" : "Student",
      }));
      setUsers(userList);
  });

  return (
    <ul id="usersList" className="text-white w-full mt-2">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center border-b border-white p-2 mx-3"
        >
          <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center mr-2 text-black font-semibold">
          {user.name ? user.name.substring(0, 2) : ''}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm">{user.role}</p>
          </div>
          <button className="btn btn-sm btn-circle ml-auto">
            <BsChatLeft color="black" />
          </button>
          <button className="btn btn-sm btn-circle ml-3">
            <BsThreeDots color="black" />
          </button>
        </li>
      ))}
    </ul>
  );
};

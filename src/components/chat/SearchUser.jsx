import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { socket } from "../../utils/socket";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";
export const SearchUser = () => {
  const myUser = useAtomValue(userAtom);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      const userList = Object.keys(users).map((userId) => ({
        id: userId,
        name: users[userId].userName,
        role: users[userId].isProfessor ? "Profesor" : "Estudiante",
      }));
      setUsers(userList);
    });
  }, []);
  return (
    <div className="bg-white rounded-xl p-3 m-3 flex items-center ">
      <IoMdSearch size={22} className="mr-3" />

      <input
        type="text"
        placeholder="Buscar usuario..."
        className="w-full border-none outline-none"
      />
    </div>
  );
};

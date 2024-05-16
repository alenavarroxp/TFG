import { useEffect, useState } from "react";
import { ListUserChat } from "./ListUserChat";
import { SearchUser } from "./SearchUser";
import { socket } from "../../utils/socket";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";

export const ChatUsers = () => {
  const myUser = useAtomValue(userAtom);
  const getMyUserRef = () => {
    return {
      name: myUser.userName,
      role: myUser.isProfessor ? "Profesor" : "Estudiante",
    };
  };

  const myUserRef = getMyUserRef();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState(false);

  useEffect(() => {
    if (!fetchedUsers) {
      socket.emit("getUsers");
      setFetchedUsers(true);
    }

    const getUsersListener = (users) => {
      const userList = Object.keys(users).map((userId) => ({
        id: userId,
        name: users[userId].userName,
        role: users[userId].isProfessor ? "Profesor" : "Estudiante",
      }));

      //Quitar mi usuario de la lista
      const myIndex = userList.findIndex(
        (user) => user.name === myUserRef.name && user.role === myUserRef.role
      );
      userList.splice(myIndex, 1);

      setUsers(userList);
      setAllUsers(userList);
    };

    socket.on("getUsers", getUsersListener);

    return () => {
      socket.off("getUsers", getUsersListener);
    };
  }, [fetchedUsers, myUserRef]);

  return (
    <div className="w-2/5 rounded-xl ml-4 mb-4 mr-4 bg-[#D9D9D9]">
      <SearchUser setUsers={setUsers} allUsers={allUsers} />
      <ListUserChat users={users} />
    </div>
  );
};

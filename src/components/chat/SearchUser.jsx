/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";

export const SearchUser = ({ setUsers, allUsers }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Filtrar la lista original de usuarios cuando search cambia
    const filteredUsers = allUsers.filter((user) =>
      user.name.toLowerCase().startsWith(search.toLowerCase())
    );
    // Actualizar la lista de usuarios mostrada
    setUsers(filteredUsers);
    // Restaurar la lista original si la búsqueda está vacía
    if (search === "") {
      setUsers(allUsers);
    }
  }, [search, setUsers, allUsers]);

  const handleInputChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="bg-white rounded-xl p-3 m-3 flex items-center ">
      <IoMdSearch size={22} className="mr-3" />

      <input
        value={search}
        type="text"
        placeholder="Buscar usuario..."
        className="w-full border-none outline-none"
        onChange={handleInputChange}
      />
    </div>
  );
};

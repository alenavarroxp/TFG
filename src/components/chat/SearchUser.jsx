import { IoMdSearch } from "react-icons/io";
export const SearchUser = () => {
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

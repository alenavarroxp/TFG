import { UserList } from "./UserList";

// eslint-disable-next-line react/prop-types
export const UserModal = ({ setChatScreen }) => {
  return (
    <div
      id="usersModal"
      className="absolute left-1/2 px-2 transform -translate-x-1/2 min-w-96 border-2 border-gray-700 border-opacity-20 rounded-2xl flex flex-col items-center bg-gray-600 bg-opacity-25 justify-center"
    >
      <div className="mt-2 text-white py-2 w-full px-6 flex items-center justify-between border-b-2 border-white">
        <h1 className="text-2xl font-medium ">Entorno CRA</h1>
        <div className="badge font-semibold badge-lg bg-white">1º Primaria</div>
      </div>
      <UserList setChatScreen={setChatScreen} />
    </div>
  );
};

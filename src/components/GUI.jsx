import { useState } from "react";
import { UserModal } from "./UserModal";

export const GUI = () => {
  const [userModal, setUserModal] = useState(false);

  return (
    <>
      <div id="GUI" className="absolute right-2 top-2 flex flex-col items-end">
        <button
          id="changeCameraBtn"
          className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cambiar Cámara
        </button>

        <button
          id="usersModalBtn"
          className="btn btn-sm mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setUserModal(!userModal);
          }}
        >
          Lista de usuarios
        </button>
      </div>

      {userModal && <UserModal />}
    </>
  );
};

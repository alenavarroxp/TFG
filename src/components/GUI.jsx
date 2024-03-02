import { useState } from "react";
import { UserModal } from "./UserModal";
import { HiVideoCamera } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";


export const GUI = () => {
  const [userModal, setUserModal] = useState(false);
  
  const handleKeyDown = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <div id="GUI" className="absolute w-full h-full flex flex-col items-end pointer-events-none">
        <button
          id="changeCameraBtn"
          className="text-white font-bold rounded-full p-3 bottom-1/2 right-4 absolute border-white border-2 pointer-events-auto focus:outline-none"
          onKeyDown={handleKeyDown}
        >
          <HiVideoCamera size={20}/>
        </button>

        <button
          id="usersModalBtn"
          className="text-white font-bold rounded-full p-3 top-3 right-4 absolute border-white border-2 pointer-events-auto focus:outline-none"
          onClick={() => {
            setUserModal(!userModal);
          }}
          onKeyDown={handleKeyDown}
        >
          <FaUsers size={20}/>
        </button>
      </div>

      {userModal && <UserModal />}
    </>
  );
};

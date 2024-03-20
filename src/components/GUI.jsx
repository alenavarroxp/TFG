import { useState } from "react";
import { UserModal } from "./UserModal";
import { HiVideoCamera } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { handleKeyDown } from "../utils/handleKeyDown";
import { userAtom } from "../context/atoms/userAtom";
import { useAtom, useAtomValue } from "jotai";
import { CrearActividad } from "./CrearActividad";
import { chooseLocationAtom } from "../context/atoms/chooseLocationAtom";

export const GUI = () => {
  const [userModal, setUserModal] = useState(false);
  const [crearScreen, setCrearScreen] = useState(false);
  const getUser = useAtomValue(userAtom);
  const [chooseLocation] = useAtom(chooseLocationAtom);

  console.log("GUI user: ", getUser);

  return (
    <>
      {!chooseLocation.isChoosing ? (
        <div
          id="GUI"
          className="absolute w-full h-full flex flex-col items-end pointer-events-none"
        >
          <button
            id="usersModalBtn"
            className="text-white font-bold rounded-full p-4 top-6 right-6 absolute border-white border-2 pointer-events-auto focus:outline-none"
            onClick={() => {
              setUserModal(!userModal);
            }}
            onKeyDown={handleKeyDown}
          >
            <FaUsers size={22} />
          </button>

          {getUser.isProfessor && (
            <button
              id="crearActividadBtn"
              className="text-white font-bold rounded-full p-4 bottom-1/2 right-6 absolute border-white border-2 pointer-events-auto focus:outline-none"
              onKeyDown={handleKeyDown}
              onClick={() => setCrearScreen(!crearScreen)} // Aquí se utiliza una función de callback
            >
              <HiMiniSquaresPlus size={22} />
            </button>
          )}
          <button
            id="changeCameraBtn"
            className="text-white font-bold rounded-full p-4 bottom-6 right-6 absolute border-white border-2 pointer-events-auto focus:outline-none"
            onKeyDown={handleKeyDown}
          >
            <HiVideoCamera size={22} />
          </button>
        </div>
      ) : (
        <></>
      )}

      {userModal && <UserModal />}
      {crearScreen && <CrearActividad setCrearScreen={setCrearScreen} />}
    </>
  );
};

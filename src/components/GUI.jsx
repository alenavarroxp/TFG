/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UserModal } from "./UserModal";
import { HiVideoCamera } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { handleKeyDown } from "../utils/handleKeyDown";
import { userAtom } from "../context/atoms/userAtom";
import { useAtom, useAtomValue } from "jotai";
import { CrearActividad } from "./CrearActividad";
import { chooseLocationAtom } from "../context/atoms/chooseLocationAtom";
import { testAtom } from "../context/atoms/testAtom";
import { socket } from "../utils/socket";
import { v4 as uuidv4 } from "uuid";

export const GUI = () => {
  const [userModal, setUserModal] = useState(false);
  const [crearScreen, setCrearScreen] = useState(false);
  const getUser = useAtomValue(userAtom);
  const [chooseLocation] = useAtom(chooseLocationAtom);
  const [test] = useAtom(testAtom);
  const [tests, setTests] = useState({});

  const crearUuid = () => {
    return uuidv4();
  };

  useEffect(() => {
    if (test.creador != "") {
      const testUuid = crearUuid();

      setTests((prevTests) => ({
        ...prevTests,
        [testUuid]: { ...test },
      }));

      setCrearScreen(false);
    }
  }, [test]);

  useEffect(() => {
    if (Object.keys(tests).length > 0) socket.emit("createPointer", tests);
  }, [tests]);

  useEffect(() => {
    if (crearScreen) socket.emit("NoMove");
  }, [crearScreen]);

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

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
import GUIButton from "../inputs/GUIButton";
import { IoHome } from "react-icons/io5";
import { JoyStickContainer } from "./JoyStickContainer";
import { JumpButton } from "./JumpButton";
import { CustomModal } from "./CustomModal";
import { ActivityScreen } from "./ActivityScreen";
import { CgDebug } from "react-icons/cg";

export const GUI = () => {
  const [userModal, setUserModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [crearScreen, setCrearScreen] = useState(false);
  const [activityScreen, setActivityScreen] = useState(false);
  const getUser = useAtomValue(userAtom);
  const [chooseLocation] = useAtom(chooseLocationAtom);
  const [test] = useAtom(testAtom);
  const [tests, setTests] = useState({});
  const [activityId, setActivityId] = useState("");

  const crearUuid = () => {
    return uuidv4();
  };

  useEffect(() => {
    socket.on("modalActivity", (obj) => {
      modalActivity(obj);
    });
  }, []);

  const modalActivity = (obj) => {
    setModal(true);
    setActivityId(obj);
    setUserModal(false);
  };

  useEffect(() => {
    if (!test) return;
    if (test.creador != "") {
      const testUuid = crearUuid();

      setTests((prevTests) => ({
        ...prevTests,
        [testUuid]: { ...test },
      }));

      socket.emit("updateActivity", { id: testUuid, test: test });

      setCrearScreen(false);
      socket.emit("move");
    }
  }, [test]);

  useEffect(() => {
    if (Object.keys(tests).length > 0) {
      socket.emit("createPointer", tests);
    }
  }, [tests]);

  useEffect(() => {
    if (crearScreen) {
      socket.emit("NoMove");
      setUserModal(false);
    }
  }, [crearScreen]);

  const handleUserModalClick = () => {
    setUserModal(!userModal);
  };

  const handleCrearScreenClick = () => {
    setCrearScreen(!crearScreen);
  };

  const handleChangeCameraClick = () => {
    socket.emit("changeCamera");
  };

  const handleHomeClick = () => {
    window.location.reload();
  };

  const handleDebugClick = () => {
    socket.emit("debug");
    setActivityScreen(true);
  };

  return (
    <>
      {!chooseLocation.isChoosing && !modal ? (
        <div
          id="GUI"
          className="absolute w-full h-full flex flex-row pointer-events-none"
        >
          <div className="items-start justify-start flex w-full">
            <GUIButton
              id="homeBtn"
              onClick={handleHomeClick}
              onKeyDown={handleKeyDown}
              icon={<IoHome size={22} />}
              props="mt-6 ml-6"
            />
            <JoyStickContainer />
          </div>
          <div className="flex flex-col justify-between items-end w-full h-2/3">
            <GUIButton
              id="usersModalBtn"
              onClick={handleUserModalClick}
              onKeyDown={handleKeyDown}
              icon={<FaUsers size={22} />}
              props="mt-6 mr-6"
            />

            {getUser.isProfessor && (
              <GUIButton
                id="crearActividadBtn"
                onClick={handleCrearScreenClick}
                onKeyDown={handleKeyDown}
                icon={<HiMiniSquaresPlus size={22} />}
                props="mr-6"
              />
            )}
            <GUIButton
              id="changeCameraBtn"
              onClick={handleChangeCameraClick}
              onKeyDown={handleKeyDown}
              icon={<HiVideoCamera size={22} />}
              props="mb-6 mr-6"
            />
            <GUIButton
              id="debugBtn"
              onClick={handleDebugClick}
              onKeyDown={handleKeyDown}
              icon={<CgDebug size={22} />}
              props="mb-6 mr-6"
            />
            <JumpButton />
          </div>
        </div>
      ) : (
        <></>
      )}

      {userModal && <UserModal />}
      {crearScreen && <CrearActividad setCrearScreen={setCrearScreen} />}
      {activityScreen && <ActivityScreen setActivityScreen={setActivityScreen} />}
      {modal && (
        <CustomModal
          modal={modal}
          setModal={setModal}
          setCrearScreen={setCrearScreen}
          activityId = {activityId}
          setActivityScreen={setActivityScreen}
        />
      )}
    </>
  );
};

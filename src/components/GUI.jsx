/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UserModal } from "./UserModal";
import { HiChatBubbleLeftRight, HiVideoCamera } from "react-icons/hi2";
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
import { GiPaintBrush } from "react-icons/gi";
import { CustomizeScreen } from "./customize/CustomizeScreen";
import { ChatScreen } from "./chat/ChatScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMapLocationDot } from "react-icons/fa6";

export const GUI = () => {
  const [userModal, setUserModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [crearScreen, setCrearScreen] = useState(false);
  const [activityScreen, setActivityScreen] = useState(false);
  const [customizeScreen, setCustomizeScreen] = useState(false);
  const [chatScreen, setChatScreen] = useState(false);
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

    socket.on("notificationMessage", (obj) => {
      if (!chatScreen && !activityScreen && !customizeScreen && !crearScreen) {
        handleNotification(obj);
      }
    });

    return () => {
      socket.off("notificationMessage");
    };
  }, [chatScreen, activityScreen, customizeScreen, crearScreen]);

  const handleNotification = (obj) => {
    if (toast) toast.dismiss();

    toast(
      <div>
        <strong
          className="text-md"
          style={{ display: "block", marginBottom: "5px" }}
        >
          📬 Tienes un nuevo mensaje 📬
        </strong>
        <span className="text-sm">
          {`${obj.emisor.isProfessor ? "Profesor" : "Estudiante"} ${
            obj.emisor.userName
          } te ha enviado un mensaje.`}
        </span>
        <div className="mt-4 text-right text-xs text-blue-500 underline hover:text-blue-700">
          Pulsa para ver el mensaje
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 50000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 100,
        className: "bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg shadow-lg",
        onClick: () => {
          toast.dismiss();
          setChatScreen(!chatScreen);
          socket.emit("NoMove");

          socket.emit("selectedChatUser", {
            emisorId: obj.receptorId,
            emisor: {
              userName: obj.receptor.name,
              isProfessor:
                obj.receptor.isProfessor === "Profesor" ? true : false,
            },
            receptor: {
              id: obj.emisorId,
              name: obj.emisor.userName,
              role: obj.emisor.isProfessor ? "Profesor" : "Estudiante",
            },
          });
        },
      }
    );
  };

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
  

  const handleCustomizeClick = () => {
    setCustomizeScreen(!customizeScreen);
    socket.emit("NoMove");
  };

  const handleChatClick = () => {
    socket.emit("NoMove");
    setChatScreen(!chatScreen);
  };

  const handleToastPurse = (obj) => {
    if (obj.purse >= 5) {
      toast(
        <div>
          <strong
            className="text-md"
            style={{ display: "block", marginBottom: "5px" }}
          >
            🎒 Actualización de monedero 🎒
          </strong>
          <span className="text-sm">
            {`Has recibido ${obj.purse} monedas. Ahora tienes un total de ${obj.totalPurse} monedas.`}
          </span>
        </div>,
        {
          position: "top-right",
          autoClose: 50000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          delay: 100,
          className:
            "bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg shadow-lg",
        }
      );
    } else {
      toast(
        <div>
          <strong
            className="text-md"
            style={{ display: "block", marginBottom: "5px" }}
          >
            🎒 Actualización de monedero 🎒
          </strong>
          <span className="text-sm">
            {`No has recibido monedas. Sacaste menos de 5 en la actividad.`}
          </span>
        </div>,
        {
          position: "top-right",
          autoClose: 50000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          delay: 100,
          className:
            "bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg shadow-lg",
        }
      );
    }
  };
  useEffect(() => {
    socket.on("updatePurse", (obj) => {
      if (obj.totalPurse) {
        handleToastPurse(obj);
        socket.emit("deleteActivity", { id: activityId });
      }
    });

    return () => {
      socket.off("updatePurse");
    };
  }, [activityId]);

  const handleSpawnClick = () => {
    socket.emit("spawn",socket.id);
  };

  return (
    <>
      {!chooseLocation.isChoosing && !modal ? (
        <div
          id="GUI"
          className="absolute w-full h-full flex flex-row pointer-events-none"
        >
          <ToastContainer
            stacked
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
            limit={1}
            className="pointer-events-auto w-96 font-"
          />

          <div className="items-start justify-between h-1/3 flex flex-col w-full">
            <GUIButton
              id="homeBtn"
              onClick={handleHomeClick}
              onKeyDown={handleKeyDown}
              icon={<IoHome size={22} />}
              label="Inicio"
              props="mt-6 ml-6"
              labelProps="px-4 p-1.5 translate-x-10"
            />
            <GUIButton
              id="chatBtn"
              onClick={handleChatClick}
              onKeyDown={handleKeyDown}
              icon={<HiChatBubbleLeftRight size={22} />}
              label="Chat"
              props="mt-6 ml-6"
              labelProps="px-4 p-1.5 translate-x-10"
            />
            <GUIButton
              id="customizeBtn"
              onClick={handleCustomizeClick}
              onKeyDown={handleKeyDown}
              icon={
                <GiPaintBrush
                  size={22}
                  style={{ transform: "rotate(90deg)" }}
                />
              }
              label="Personalizar avatar"
              props="mt-6 ml-6"
              labelProps="px-4 p-1.5 translate-x-10"
            />
            
            <JoyStickContainer />
          </div>
          <div className="flex flex-col justify-between items-end w-full h-2/3">
            <GUIButton
              id="usersModalBtn"
              onClick={handleUserModalClick}
              onKeyDown={handleKeyDown}
              icon={<FaUsers size={22} />}
              label="Lista de usuarios"
              props="mt-6 mr-6"
              labelProps="px-4 p-1.5 -translate-x-40"
            />

            {getUser.isProfessor && (
              <GUIButton
                id="crearActividadBtn"
                onClick={handleCrearScreenClick}
                onKeyDown={handleKeyDown}
                icon={<HiMiniSquaresPlus size={22} />}
                label="Crear una actividad"
                props="mr-6"
                labelProps="px-4 p-1.5 -translate-x-44"
              />
            )}
            <GUIButton
              id="changeCameraBtn"
              onClick={handleChangeCameraClick}
              onKeyDown={handleKeyDown}
              icon={<HiVideoCamera size={22} />}
              label="Cambio de cámara"
              props=" mr-6"
              labelProps="px-4 p-1.5 -translate-x-44"
            />
            <GUIButton
              id="spawnBtn"
              onClick={handleSpawnClick}
              onKeyDown={handleKeyDown}
              icon={
                <FaMapLocationDot
                  size={22}
                />
              }
              label="Volver al spawn"
              props="mt-6 mr-6"
              labelProps="px-4 p-1.5 -translate-x-40"
            />
            
            <JumpButton />
          </div>
        </div>
      ) : (
        <></>
      )}

      {userModal && <UserModal setChatScreen={setChatScreen} />}
      {crearScreen && <CrearActividad setCrearScreen={setCrearScreen} />}
      {activityScreen && (
        <ActivityScreen setActivityScreen={setActivityScreen} />
      )}
      {customizeScreen && (
        <CustomizeScreen
          customizeScreen={customizeScreen}
          setCustomizeScreen={setCustomizeScreen}
        />
      )}
      {chatScreen && <ChatScreen setChatScreen={setChatScreen} />}
      {modal && (
        <CustomModal
          modal={modal}
          setModal={setModal}
          setCrearScreen={setCrearScreen}
          activityId={activityId}
          setActivityScreen={setActivityScreen}
        />
      )}
    </>
  );
};

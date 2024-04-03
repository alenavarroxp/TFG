/* eslint-disable react/prop-types */
import { socket } from "../utils/socket";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { BsQuestionCircleFill } from "react-icons/bs";
import { userAtom } from "../context/atoms/userAtom";

export const CustomModal = ({
  modal,
  setModal,
  setCrearScreen,
  activityId,
  setActivityScreen,
}) => {
  const [activity, setActivity] = useState({});
  const [open] = useState(modal);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const getUser = useAtomValue(userAtom);
  const [modalText, setModalText] = useState(
    getUser.isProfessor
      ? "Al confirmar, podrás editar los detalles necesarios para mantener la información de la actividad actualizada."
      : "Al confirmar, podrás realizar la actividad propuesta por el profesor para evaluar tus conocimientos."
  );

  useEffect(() => {
    socket.emit("getActivity", { id: activityId });
  }, [modal, activityId]);

  useEffect(() => {
    socket.on("getActivity", (obj) => {
      console.log("ACTIVITY Nidak", obj);
      setActivity(obj.activity);
    });
  }, []);

  useEffect(() => {
    console.log("ACTIVITY", activity);
  }, [activity]);

  const handleOk = () => {
    setModalText(
      "Cargando la información de la actividad... Por favor, espera..."
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setModal(false);
      setConfirmLoading(false);
      socket.emit("move");

      if (getUser.isProfessor) {
        setCrearScreen(true);
        console.log("activityId", activityId);
        socket.emit("getActivity", { id: activityId });
      } else {
        console.log("Realizando actividad...");
        setActivityScreen(true);
        socket.emit("NoMove");
        socket.emit("startActivity", { id: activityId, activity: activity });
      }
    }, 2000);
  };

  const handleCancel = () => {
    setModal(false);
    socket.emit("move");
  };

  return (
    <>
      <Modal
        title={
          getUser.isProfessor
            ? "¿Quieres modificar la actividad?"
            : "¿Quieres realizar la actividad?"
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText={"Confirmar"}
        okButtonProps={{ className: "bg-blue-500" }}
        centered={true}
      >
        <p>{modalText}</p>
        <p className="text-gray-400 text-xs">Actividad compuesta por:</p>
        <div className="bg-[#FFD700] px-4 py-1 w-fit mt-2 font-semibold flex justify-center items-center rounded-full">
          {activity && (
            <p className="mr-2">
              {activity.questions?.length}{" "}
              {activity.questions?.length === 1 ? "Pregunta" : "Preguntas"}
            </p>
          )}

          <BsQuestionCircleFill color="black" />
        </div>
      </Modal>
    </>
  );
};

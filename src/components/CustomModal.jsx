/* eslint-disable react/prop-types */
import { socket } from "../utils/socket";
import { Modal } from "antd";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../context/atoms/userAtom";

export const CustomModal = ({
  modal,
  setModal,
  setCrearScreen,
  activityId,
}) => {
  const [open] = useState(modal);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const getUser = useAtomValue(userAtom);
  const [modalText, setModalText] = useState(
    getUser.isProfessor
      ? "Al confirmar, podrás editar los detalles necesarios para mantener la información de la actividad actualizada."
      : "Al confirmar, podrás realizar la actividad propuesta por el profesor para evaluar tus conocimientos."
  );

  const handleOk = () => {
    setModalText("Cargando la información de la actividad... Por favor, espera...");
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
      </Modal>
    </>
  );
};

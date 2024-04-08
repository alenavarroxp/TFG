import { Modal } from "antd";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const ConfirmModal = ({ confirmModal, setConfirmModal, onConfirm}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Al finalizar, no podrás volver a responder las preguntas, se guardarán tus respuestas y se mostrará tu puntuación."
  );

  const handleOk = () => {
    setModalText(
      "Corrigiendo tus respuestas... Por favor, espera..."
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmModal(false);
      setConfirmLoading(false);
      onConfirm();
    }, 2000);
  };

  const handleCancel = () => {
    setConfirmModal(false);
  };
  return (
    <>
      <Modal
        title={"¿Estás seguro de que deseas finalizar la actividad?"}
        open={confirmModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText={"Finalizar"}
        okButtonProps={{ className: "bg-blue-500" }}
        centered={true}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

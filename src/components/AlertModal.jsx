/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";

export const AlertModal = ({
  alertModal,
  title,
  content,
  question,
  onOk,
  onCancel,
}) => {
  const [modalTitle] = useState(title);
  const [modalContent] = useState(content);

  const modalFooter = question ? (
    <button
      key="ok"
      className="bg-blue-500 text-white py-2 px-10 rounded-2xl"
      onClick={() => onOk()}
    >
      OK
    </button>
  ) : (
    <div className="flex justify-evenly items-center">
      <button
        key="cancel"
        className="text-black border-[1px] border-gray-300 py-1.5 px-10 rounded-full mr-2"
        onClick={() => onCancel()}
      >
        No
      </button>
      <button
        key="ok"
        className="bg-blue-500 text-white py-1.5 px-10 rounded-full"
        onClick={() => onOk()}
      >
        Sí
      </button>
    </div>
  );

  return (
    <Modal
      title={modalTitle}
      open={alertModal}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      centered={true}
      okButtonProps={{ className: "bg-blue-500" }}
      footer={modalFooter}
    >
      <p>{modalContent}</p>
    </Modal>
  );
};

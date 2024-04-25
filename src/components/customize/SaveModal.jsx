/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";

export const SaveModal = ({
  saveModal,
  setSaveModal,
  selectedColorItem,
  selectedAccessoryItem,
}) => {
  const [modalTitle] = useState("¿Deseas guardar los cambios?");
  const modalFooter = (
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

  const onOk = () => {
    setSaveModal(false);
  };

  const onCancel = () => {
    setSaveModal(false);
  };

  return (
    <Modal
      title={modalTitle}
      open={saveModal}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      centered={true}
      okButtonProps={{ className: "bg-blue-500" }}
      footer={modalFooter}
    >
      <p className="mb-1">Los cambios que se guardarán serán:</p>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th className="px-4 py-1 text-center text-lg font-semibold">Color del avatar</th>
                {selectedAccessoryItem && (
                  <th className="px-4 py-1 text-center text-lg font-semibold">
                    Accesorio para el avatar
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-1">
                  <div
                    className="w-32 h-32 rounded-full border-[2px] border-gray-700 mx-auto"
                    style={{ backgroundColor: selectedColorItem }}
                  />
                </td>
                <td className="flex items-center justify-center">
                  {selectedAccessoryItem && (
                    <img
                      src={`${selectedAccessoryItem.img}`}
                      className="w-32 h-32 rounded-full"
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

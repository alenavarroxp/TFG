/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";

export const SaveModal = ({
  saveModal,
  setSaveModal,
  selectedColorItem,
  selectedAccessoryItem,
  onOk
}) => {
  const [modalTitle] = useState(
    !selectedAccessoryItem && !selectedColorItem
      ? "No se pueden guardar los cambios"
      : "¿Deseas guardar los cambios?"
  );

  const handleOk = () => {
    onOk();
    setSaveModal(false);
  };

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
        onClick={() => handleOk()}
      >
        Sí
      </button>
    </div>
  );

  const onCancel = () => {
    setSaveModal(false);
  };

  return (
    <Modal
      title={modalTitle}
      open={saveModal}
      onOk={() => handleOk()}
      onCancel={() => onCancel()}
      centered={true}
      okButtonProps={{ className: "bg-blue-500" }}
      footer={!selectedAccessoryItem && !selectedColorItem ? null : modalFooter}
    >
      {!selectedAccessoryItem && !selectedColorItem ? (
        <p className="mb-1">
          No has realizado ningún cambio en tu avatar. Por favor, realiza un
          cambio para poder guardar.
        </p>
      ) : (
        <>
          <p className="mb-1">Los cambios que se guardarán serán:</p>
          <div>
            <div className="flex items-center justify-center">
              <table>
                <thead>
                  <tr className="text-md">
                    {selectedColorItem && (
                      <th className="px-4 py-1 text-center  font-semibold">
                        Color del avatar
                      </th>
                    )}

                    {selectedAccessoryItem && (
                      <th className="px-4 py-1 text-center font-semibold">
                        Accesorio para el avatar
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {selectedColorItem && (
                      <td className="px-1 py-1">
                        <div
                          className="w-20 h-20 rounded-full border-[2px] border-gray-700 mx-auto"
                          style={{ backgroundColor: selectedColorItem }}
                        />
                      </td>
                    )}
                    {selectedAccessoryItem && (
                      <td className="flex items-center justify-center">
                        <img
                          src={`${selectedAccessoryItem.img}`}
                          className="w-20 h-20 rounded-full pointer-events-none select-none"
                          alt={`${selectedAccessoryItem.title}`}
                        />
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

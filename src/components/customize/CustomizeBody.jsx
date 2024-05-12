/* eslint-disable react/prop-types */
import { CustomizeButton } from "./CustomizeButton";
import { useState } from "react";
import { ColorComponent } from "./ColorComponent";
import { AccesorioComponent } from "./AccesorioComponent";
import { colors } from "./colors";
import { accesorios } from "./accesorios";
import { RiCreativeCommonsFill } from "react-icons/ri";
import { ModalCC } from "../ModalCC";
import { SaveModal } from "./SaveModal";

export const CustomizeBody = ({
  selectedTab,
  onOk,
  selectedColorItem,
  setSelectedColorItem,
  selectedAccessoryItem,
  setSelectedAccessoryItem,
  oldColor
}) => {
  const [modalCC, setModalCC] = useState(false);
  const [saveModal, setSaveModal] = useState(false);

  const handleCreativeModal = () => {
    setModalCC(!modalCC);
  };

  const handleSaveChanges = () => {
    setSaveModal(true);
  };

  return (
    <>
      <div className="bg-[#1E574B] rounded-r-xl rounded-b-xl flex h-[460px] flex-col tourC-step5">
        {modalCC && <ModalCC modalCC={modalCC} setModalCC={setModalCC} />}
        {saveModal && (
          <SaveModal
            saveModal={saveModal}
            setSaveModal={setSaveModal}
            selectedColorItem={selectedColorItem}
            selectedAccessoryItem={selectedAccessoryItem}
            onOk={onOk}
          />
        )}
        <div className="flex justify-center items-center px-6 py-3">
          <p className="border-b-2 font-semibold">
            {selectedTab === "Colores" && "Seleccionar el color de tu avatar"}
            {selectedTab === "Accesorios" &&
              "Seleccionar el accesorio para tu avatar"}
          </p>
        </div>

        {selectedTab === "Colores" && (
          <div className="grid grid-cols-5 grid-rows-2 gap-4 p-3 h-full  justify-center items-center">
            <ColorComponent
              colors={colors}
              selectedColorItem={selectedColorItem}
              setSelectedColorItem={setSelectedColorItem}
              oldColor={oldColor}
            />
          </div>
        )}
        {selectedTab === "Accesorios" && (
          <>
            <div className="grid grid-cols-3 grid-rows-1 gap-4 p-3 h-full  justify-center items-center">
              <AccesorioComponent
                accesorios={accesorios}
                selectedAccessoryItem={selectedAccessoryItem}
                setSelectedAccessoryItem={setSelectedAccessoryItem}
              />
            </div>
            <div className="py-6 flex justify-center items-center">
              <div
                className="flex justify-center items-center cursor-pointer border-b-transparent border-b-2 hover:border-b-white"
                onClick={() => handleCreativeModal()}
              >
                <p className="mr-1 font-semibold ">
                  Aquí se encuentran los Derechos de Creative Commons de los
                  accesorios
                </p>
                <RiCreativeCommonsFill size={20} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-end py-5">
        <CustomizeButton
          text="Guardar cambios"
          onClick={() => handleSaveChanges()}
        />
      </div>
    </>
  );
};

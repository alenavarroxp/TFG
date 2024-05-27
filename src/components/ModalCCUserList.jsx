/* eslint-disable react/prop-types */
import { Modal } from "antd";

export const ModalCCUserList = ({ modalCC, setModalCC }) => {
  return (
    <Modal
      title={"Derechos de Creative Commons"}
      open={modalCC}
      centered={true}
      onCancel={() => setModalCC(false)}
      footer={null}
    >
      <p className="mb-4">
        Los modelos 3D que se encuentran en el mundo están bajo la licencia de
        Creative Commons.
      </p>
      <div className="flex flex-col justify-center items-center font-semibold">
      <div>
          <a href="https://sketchfab.com/3d-models/nordic-village-e068ea6ae6bb41b4bdb51fda3091e5c4">
          Nordic Village 
          </a>{" "}
          by{" "}
          <a href="https://sketchfab.com/brau_og">brau_og</a> [
          <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>] via
          Sketchfab
        </div>
        <div>
          <a href="https://poly.pizza/m/kKtL4zvS3n">
            Animated Platformer Character
          </a>{" "}
          by{" "}
          <a href="https://poly.pizza/u/Quaternius">Quaternius</a> [
          <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>] via
          Poly Pizza
        </div>
        <div>
          <a href="https://poly.pizza/m/h3Wh4fxSQX">
            Book
          </a>{" "}
          by{" "}
          <a href="https://poly.pizza/u/Quaternius">Quaternius</a> [
          <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>] via
          Poly Pizza
        </div>
        <div>
          <a href="https://sketchfab.com/3d-models/info-stand-f63e02c3c60641ba8a67f96419b8e90e">
            Info Stand
          </a>{" "}
          by{" "}
          <a href="https://sketchfab.com/dayoung.ko">dayoung.ko</a> [
          <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>] via
          Sketchfab
        </div>
        <div>
          <a href="https://sketchfab.com/3d-models/exclamation-mark-3d-icon-35fcb8285f134554989f822ab90ee974">
          Exclamation Mark 3D icon 
          </a>{" "}
          by{" "}
          <a href="https://sketchfab.com/summer5717">summer57</a> [
          <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>] via
          Sketchfab
        </div>
      </div>
    </Modal>
  );
};

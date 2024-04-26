/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";
import { FaCreativeCommons, FaCreativeCommonsBy } from "react-icons/fa";

export const ModalCC = ({ modalCC, setModalCC }) => {
  const [modalTitle] = useState(
    <div className="flex items-center">
      <p>Derechos de Creative Commons</p>
      <div className="flex justify-around w-20 ml-2">
        <FaCreativeCommons size={28} />
        <FaCreativeCommonsBy size={28} />
      </div>
    </div>
  );

  return (
    <Modal
      title={modalTitle}
      open={modalCC}
      centered={true}
      onCancel={() => setModalCC(false)}
      footer={null}
    >
      <p className="mb-4">
        Los accesorios que se encuentran en esta pantalla están bajo la licencia
        Creative Commons.
      </p>
      <div className="flex flex-col justify-center items-center font-semibold">
        <div>
          <a href="https://poly.pizza/m/ayNYjI4jcW4">Sheriff Hat</a> by{" "}
          <a href="https://poly.pizza/u/Poly%20by%20Google">Poly by Google</a> [
          <a href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a>] via
          Poly Pizza
        </div>
        <div>
          <a href="https://poly.pizza/m/0vAOG_PcdNb">Propeller hat</a> by{" "}
          <a href="https://poly.pizza/u/jeremy">jeremy</a> [
          <a href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a>] via
          Poly Pizza
        </div>
        <div>
          <a href="https://poly.pizza/m/9QEds6cYAy6">Pirate Hat</a> by{" "}
          <a href="https://poly.pizza/u/Poly%20by%20Google">Poly by Google</a> [
          <a href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a>] via
          Poly Pizza
        </div>
      </div>
    </Modal>
  );
};

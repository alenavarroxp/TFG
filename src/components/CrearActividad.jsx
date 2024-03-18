import { IoCloseOutline } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";

import { useState } from "react";
import { TestForm } from "./forms/TestForm";
import SelectInput from "../inputs/selectInput";

// eslint-disable-next-line react/prop-types
export const CrearActividad = ({ setCrearScreen }) => {
  const [optionActivity, setOptionActivity] = useState("Test");
  const handleClickCerrar = () => {
    setCrearScreen(false);
  };

  return (
    <div className="h-full w-full absolute bg-[#167563] text-white ">
      {" "}
      <div className="absolute top-2 right-3">
        <button onClick={handleClickCerrar}>
          {" "}
          <IoCloseOutline size={24} />
        </button>
      </div>
      <div
        id="title"
        className="text-white ml-5 mt-5 font-semibold text-2xl justify-center items-center border-b-2 w-fit flex flex-row"
      >
        Crear actividad
        <AiFillInfoCircle
          size={16}
          className="ml-2 pointer-events-auto cursor-pointer"
          onClick={() => console.log("HELPING")}
        />
      </div>
      <div id="description" className="font-normal ml-5 mt-1">
        Elabora una actividad para los estudiantes de tu clase. Selecciona los
        campos obligatorios para poder crearla.
      </div>
      <div id="form">
        <div className="flex flex-row">
          <SelectInput
            name="Curso"
            list={["1º Primaria", "2º Primaria", "3º Primaria", "4º Primaria"]}
          />
          <SelectInput
            name="Asignatura"
            list={["Lengua", "Matemáticas", "Inglés", "Biología"]}
          />
          <SelectInput
            id="optionActivity"
            name="Tipo de actividad"
            list={["Test", "Redacción"]}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setOptionActivity(e.target.value);
            }}
          />
          <SelectInput
            name="Tipo de pregunta"
            list={["Opción múltiple", "Rellenar", "Verdadero o Falso"]}
          />
        </div>
        <div
          id="questionContainer"
          className="border-2 w-2/3 max-h-full rounded-lg m-5"
        >
          {optionActivity === "Test" && <TestForm/>}
        </div>
      </div>
    </div>
  );
};

import { IoCloseOutline } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import { useMemo, useState } from "react";
import { useAtom } from "jotai"; // Importar useAtom desde jotai
import { TestForm } from "./forms/TestForm";
import SelectInput from "../inputs/selectInput";
import { GridQuestions } from "./GridQuestions";
import { questionAtom } from "../context/atoms/questionAtom";
import { errorsQuestionAtom } from "../context/atoms/errorsQuestionAtom";

// eslint-disable-next-line react/prop-types
export const CrearActividad = ({ setCrearScreen }) => {
  const [optionActivity, setOptionActivity] = useState("Test");
  const [question, setQuestion] = useAtom(questionAtom); // Utilizar el átomo questionAtom
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useAtom(errorsQuestionAtom);

  const questionIsCreated = useMemo(() => {
    return questions.some((q) => q.id === question.id);
  }, [questions, question]);

  const handleClickCerrar = () => {
    setCrearScreen(false);
  };

  const handleNewQuestion = () => {
    setQuestion({
      id: "",
      questionText: "",
      answers: [],
      correct: [],
      score: 0,
    });

    setErrors({
      questionText: false,
      answers: false,
      correct: false,
      score: false,
    });
  };

  const handleUpdateQuestion = () => {
    if (!validateFields()) return;

    setQuestions((ques) => {
      const newQuestions = [...ques];
      const indexQuestion = newQuestions.findIndex((q) => q.id === question.id);
      if (indexQuestion === -1) return ques;

      newQuestions[indexQuestion] = question;

      return newQuestions;
    });
    handleNewQuestion();
  };

  const handleAddQuestion = () => {
    if (!validateFields()) return;

    setQuestions([...questions, question]);
    handleNewQuestion();
  };

  const validateFields = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    // Validar questionText
    if (question.questionText.trim() === "") {
      errorsCopy.questionText = true;
      isValid = false;
    } else {
      errorsCopy.questionText = false;
    }

    // Validar answers
    if (question.answers.length === 0) {
      errorsCopy.answers = true;
      isValid = false;
    } else {
      errorsCopy.answers = false;
    }

    // Validar correct
    if (question.correct.length === 0) {
      errorsCopy.correct = true;
      isValid = false;
    } else {
      errorsCopy.correct = false;
    }

    // Validar score
    if (question.score === 0) {
      errorsCopy.score = true;
      isValid = false;
    } else {
      errorsCopy.score = false;
    }

    setErrors(errorsCopy);
    console.log("errorsvlaidate", errorsCopy);
    return isValid;
  };

  const calculateNumQuestions = () => {
    if (questions.length > 0) {
      console.log("questions", questions);
      if (questionIsCreated)
        return questions.findIndex((q) => q.id === question.id) + 1;
      return questions.length + 1;
    } else {
      return questions.length + 1;
    }
  };

  return (
    <div className="h-screen w-full absolute bg-[#167563] text-white ">
      <div className="absolute top-2 right-3">
        <button onClick={handleClickCerrar}>
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
      <div className="flex flex-row">
        <div id="form" className="w-2/3">
          <div className="flex flex-row">
            <SelectInput
              name="Curso"
              list={[
                "1º Primaria",
                "2º Primaria",
                "3º Primaria",
                "4º Primaria",
              ]}
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
            className="border-2 w-full min-h-96 rounded-lg m-5"
          >
            {optionActivity === "Test" && (
              <TestForm numQuestion={calculateNumQuestions()} />
            )}
          </div>

          <div className="flex items-center justify-around w-full m-5">
            <button
              id="addQuestionBtn"
              className="bg-white px-6 py-2 text-[#167563] font-semibold rounded-2xl"
              onClick={handleNewQuestion}
            >
              Nueva
            </button>
            <button
              id="addQuestionBtn"
              className="bg-white px-6 py-2 text-[#167563] font-semibold rounded-2xl"
              onClick={
                questionIsCreated ? handleUpdateQuestion : handleAddQuestion
              }
            >
              {questionIsCreated ? "Actualizar" : "Añadir"}
            </button>
          </div>
        </div>
        <div className="w-1/3 m-5">
          <GridQuestions questions={questions} setQuestion={setQuestion} />
        </div>
      </div>
    </div>
  );
};

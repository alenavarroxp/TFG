import { IoCloseOutline } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import { useAtom, useSetAtom } from "jotai"; // Importar useAtom desde jotai
import { TestForm } from "./forms/TestForm";
import SelectInput from "../inputs/selectInput";
import { GridQuestions } from "./GridQuestions";
import { questionAtom } from "../context/atoms/questionAtom";
import { errorsQuestionAtom } from "../context/atoms/errorsQuestionAtom";
import { LocationPicker } from "./LocationPicker";
import { chooseLocationAtom } from "../context/atoms/chooseLocationAtom";
import { ChooseLocationHeader } from "./ChooseLocationHeader";
import { locationAtom } from "../context/atoms/locationAtom";
import { socket } from "../utils/socket";
import { CreateTest } from "./CreateTest";
import { errorsTestAtom } from "../context/atoms/errorsTestAtom";
import { testAtom } from "../context/atoms/testAtom";

// eslint-disable-next-line react/prop-types
export const CrearActividad = ({ setCrearScreen }) => {
  const [optionActivity, setOptionActivity] = useState("Test");
  const [question, setQuestion] = useAtom(questionAtom);
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useAtom(errorsQuestionAtom);
  const [chooseLocation, setChooseLocation] = useAtom(chooseLocationAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [errorsTest, setErrorsTest] = useAtom(errorsTestAtom);
  const setTest = useSetAtom(testAtom);

  const questionIsCreated = useMemo(() => {
    return questions.some((q) => q.id === question.id);
  }, [questions, question]);

  useEffect(() => {
    if (questions.length > 0) {
      setErrorsTest((prev) => ({ ...prev, questions: false }));
    }
  }, [questions, setErrorsTest]);

  const handleClickCerrar = () => {
    setCrearScreen(false);
    socket.emit("move")
  };

  const resetErrors = () => {
    setErrors({
      questionText: false,
      answers: false,
      answerError: false,
      correct: false,
      score: false,
    });

    setErrorsTest({
      questions: questions.length === 0,
      position: location.position === null,
    });
  };

  const handleNewQuestion = () => {
    setQuestion({
      id: "",
      questionText: "",
      answers: [],
      correct: [],
      score: 0,
    });

    resetErrors();
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
    let errorTestCopy = { ...errorsTest };

    errorTestCopy.questions = questions.length === 0;

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
    const score = parseInt(question.score);
    if (score <= 0 || score > 10) {
      errorsCopy.score = true;
      isValid = false;
    } else {
      errorsCopy.score = false;
    }

    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].answerText.trim() === "") {
        errorsCopy.answerError = true;
        isValid = false;
        break;
      } else {
        errorsCopy.answerError = false;
      }
    }

    setErrors(errorsCopy);

    return isValid;
  };

  const calculateNumQuestions = () => {
    if (questions.length > 0) {
      if (questionIsCreated)
        return questions.findIndex((q) => q.id === question.id) + 1;
      return questions.length + 1;
    } else {
      return questions.length + 1;
    }
  };

  const handleBack = () => {
    handleChooseLocation();
    setLocation({ position: null });
  };

  const handleChooseLocation = () => {
    socket.emit("clearPointer");
    setChooseLocation({ isChoosing: false });
  };

  const confirmTest = () => {
    let errorTestCopy = { ...errorsTest };

    errorTestCopy.questions = questions.length === 0;
    errorTestCopy.position = location.position === null;

    setErrorsTest(errorTestCopy);

    if (!errorTestCopy.questions && !errorTestCopy.position) {
      setTest({
        creador: location.id,
        questions: questions,
        location: location.position,
      });
      handleNewQuestion();
      setLocation({ id: "", position: null });
      setQuestions([]);
      return;
    }
  };

  return (
    <>
      {!chooseLocation.isChoosing ? (
        <div className="min-h-screen w-full flex flex-col absolute bg-[#167563] text-white overflow-x-hidden overflow-y-auto custom-scrollbar">
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
            Elabora una actividad para los estudiantes de tu clase. Selecciona
            los campos obligatorios para poder crearla.
          </div>
          <div className="flex-1">
            <div id="form" className="w-full">
              <div className="flex flex-col md:flex-row lg:flex-row">
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
            </div>
            <div className="flex h-full flex-col md:flex-row">
              <div className="lg:w-2/3 md:w-2/3 sm:w-full w-full h-full">
                <div
                  id="questionContainer"
                  className="border-2 min-h-88 max-h-88 rounded-lg ml-5 mt-5 mr-5"
                >
                  {optionActivity === "Test" ? (
                    <TestForm numQuestion={calculateNumQuestions()} />
                  ): <div className="flex items-center justify-center min-h-32 text-lg font-semibold">Tipo de actividad no implementada</div>}
                </div>

                <div className="flex items-center justify-around w-full mt-4 ">
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
                      questionIsCreated
                        ? handleUpdateQuestion
                        : handleAddQuestion
                    }
                  >
                    {questionIsCreated ? "Actualizar" : "Añadir"}
                  </button>
                </div>
              </div>
              <div className="lg:w-1/3 md:w-1/3 sm:w-full w-full flex flex-1 flex-col relative mt-5">
                <GridQuestions
                  questions={questions}
                  setQuestion={setQuestion}
                />
                <LocationPicker />
                <CreateTest onClick={confirmTest} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute h-screen w-full pointer-events-none">
          <button
            className="bg-[#167563] flex items-center justify-center text-white text-lg font-semibold absolute left-4 bottom-4 p-3 rounded-xl min-w-32 pointer-events-auto"
            onClick={handleBack}
          >
            <IoArrowBack size={22} className="absolute left-2" />
            Volver
          </button>

          <button
            className="bg-[#167563] flex items-center justify-center text-white text-lg font-semibold absolute right-4 bottom-4 p-3 rounded-xl min-w-48 pointer-events-auto"
            onClick={handleChooseLocation}
          >
            <MdLocationPin size={22} className="absolute right-4" />
            Seleccionar
          </button>
          <ChooseLocationHeader />
        </div>
      )}
    </>
  );
};

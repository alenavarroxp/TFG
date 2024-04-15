import { HiOutlineViewGridAdd } from "react-icons/hi";
import { PiFilePlus } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";
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
import { UnderlinedText } from "./UnderlinedText";
import { QuestionNavButton } from "./QuestionNavButton";
import { RxUpdate } from "react-icons/rx";
import { AlertModal } from "./AlertModal";
import { TourComponent } from "./TourComponent";

// eslint-disable-next-line react/prop-types
export const CrearActividad = ({ setCrearScreen }) => {
  const [course, setCourse] = useState("1º Primaria");
  const [subject, setSubject] = useState("Lengua");
  const [optionQuestion, setOptionQuestion] = useState("Test");
  const [optionAnswer, setOptionAnswer] = useState("Opción múltiple");
  const [question, setQuestion] = useAtom(questionAtom);
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useAtom(errorsQuestionAtom);
  const [chooseLocation, setChooseLocation] = useAtom(chooseLocationAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [errorsTest, setErrorsTest] = useAtom(errorsTestAtom);
  const setTest = useSetAtom(testAtom);

  const [activityIsModifying, setActivityIsModifying] = useState(false);
  const [activityId, setActivityId] = useState("");
  const [alertModal, setAlertModal] = useState(false);
  const [onConfirm, setOnConfirm] = useState(false);
  const [actionType, setActionType] = useState(null);

  const [tourVisible, setTourVisible] = useState(false);

  const questionIsCreated = useMemo(() => {
    return questions.some((q) => q.id === question.id);
  }, [questions, question]);

  useEffect(() => {
    if (!question) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  useEffect(() => {
    if (questions.length > 0) {
      setErrorsTest((prev) => ({ ...prev, questions: false }));
    }
  }, [questions, setErrorsTest]);

  useEffect(() => {
    socket.on("getActivity", (obj) => {
      console.log("GET ACTIVITY", obj);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setActivityId(obj.id);
      setQuestions(obj.activity.questions);
      if (obj.activity.questions.length > 0) {
        setCourse(obj.activity.course);
        setSubject(obj.activity.subject);
        setOptionQuestion(obj.activity.questions[0].kindOfQuestion);
        setOptionAnswer(obj.activity.questions[0].kindOfAnswer);
        setQuestion(obj.activity.questions[0]);
      }
      setLocation({
        id: obj.activity.creador,
        position: obj.activity.location,
      });
      setActivityIsModifying(true);
    });
  }, [setQuestions, setQuestion, setLocation, activityId]);

  const handleClickCerrar = () => {
    setCrearScreen(false);
    handleNewQuestion();
    socket.emit("move");
  };

  const resetErrors = ({ tour }) => {
    console.log("tour", tour);
    setErrors({
      questionText: false,
      answers: false,
      answerError: false,
      correct: false,
      score: false,
    });
    if (!tour) {
      setErrorsTest({
        questions: questions.length === 0,
        position: location.position === null,
      });
    } else {
      setErrorsTest({
        questions: false,
        position: false,
      });
    }
  };

  const handleNewQuestion = () => {
    setQuestion({
      id: "",
      questionText: "",
      answers: [{ answerText: "", isCorrect: false }],
      correct: [],
      score: 0,
      kindOfQuestion: "",
      kindOfAnswer: "",
    });

    resetErrors({ tour: false });
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
      handleNewQuestion();
      setLocation({ id: "", position: null });
      setQuestions([]);
      return true;
    }

    return false;
  };

  const createTest = () => {
    if (confirmTest()) {
      setTest({
        creador: location.id,
        questions: questions,
        location: location.position,
        course: course,
        subject: subject,
      });
    }
  };

  const updateTest = () => {
    if (confirmTest()) {
      console.log(
        "ACTUALIZAR TEST",
        activityId,
        location.id,
        questions,
        location.position,
        course,
        subject
      );
      socket.emit("setActivity", {
        id: activityId,
        creador: location.id,
        questions: questions,
        location: location.position,
        course: course,
        subject: subject,
      });
      setCrearScreen(false);
      socket.emit("move");
      handleNewQuestion();
      setLocation({ id: "", position: null });
      setQuestions([]);
    }
  };

  const handleCancel = () => {
    setAlertModal(false);
  };

  const handleOk = (actionType) => {
    setAlertModal(false);

    if (actionType === "delete") {
      setOnConfirm(true);
      handleDeleteQuestion();
    } else if (actionType === "close") {
      handleClickCerrar();
    } else if (actionType === "create") {
      createTest();
    } else if (actionType === "update") {
      updateTest();
    } else if (actionType === "new") {
      handleNewQuestion();
    }
  };

  const handleAlertModal = (actionType) => {
    setActionType(actionType);
    setAlertModal(true);
  };

  const handleBackAction = () => {
    if (question.id === "") {
      handleAlertModal("close");
    } else {
      handleAlertModal("question");
    }
  };

  const handleTest = () => {
    if (activityIsModifying) {
      handleTestAction("update", "question");
    } else {
      handleTestAction("create", "question");
    }
  };

  const handleTestAction = (actionType, questionType) => {
    if (question.id === "") {
      handleAlertModal(actionType);
    } else {
      handleAlertModal(questionType);
    }
  };

  useEffect(() => {
    if (!alertModal && onConfirm) {
      handleDeleteQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertModal]);

  const handleDeleteQuestion = () => {
    setQuestions((prev) => prev.filter((q) => q.id !== question.id));
    handleNewQuestion();
  };

  return (
    <>
      {!chooseLocation.isChoosing ? (
        <div className="min-h-screen w-full flex flex-col absolute bg-[#167563] text-white overflow-x-hidden overflow-y-hidden custom-scrollbar">
          {tourVisible && (
            <TourComponent
              setTourVisible={setTourVisible}
              questions={questions}
              isProfessor={true}
            />
          )}

          {alertModal && (
            <AlertModal
              alertModal={alertModal}
              title={
                actionType === "delete"
                  ? "¿Estás seguro de borrar la pregunta actual?"
                  : actionType === "close"
                  ? "¿Estás seguro de cerrar la pantalla actual?"
                  : actionType === "create"
                  ? "¿Estás seguro de crear un nuevo test?"
                  : actionType === "update"
                  ? "¿Estás seguro de actualizar el test?"
                  : actionType === "new"
                  ? "¿Estás seguro de crear una nueva pregunta?"
                  : "Pregunta actual no guardada"
              }
              content={
                actionType === "delete"
                  ? "Esta acción no se puede deshacer y se perderá toda la información de la pregunta actual. ¿Quieres hacerlo de todas formas?"
                  : actionType === "close"
                  ? "Esta acción no se puede deshacer y se perderán todos los datos, incluido las preguntas guardadas. ¿Quieres hacerlo de todas formas?"
                  : actionType === "create"
                  ? "Si creas un nuevo test, se perderá toda la información no guardada. ¿Quieres continuar?"
                  : actionType === "update"
                  ? "Si actualizas el test, se perderá toda la información no guardada. ¿Quieres continuar?"
                  : actionType === "new"
                  ? "Si creas una nueva pregunta, se perderá toda la información no guardada. ¿Quieres continuar?"
                  : "La pregunta actual no se ha guardado. Revise los campos obligatorios y guarde la pregunta antes de continuar.	"
              }
              question={actionType === "question"}
              onOk={() => handleOk(actionType)}
              onCancel={() => handleCancel()}
            />
          )}
          <div className="absolute top-2 right-3">
            <button onClick={() => handleBackAction()}>
              <IoCloseOutline size={24} />
            </button>
          </div>
          <div className="flex justify-center items-center w-fit mt-5">
            <UnderlinedText text={"Crear actividad"} style="text-2xl ml-5" />
            <AiFillInfoCircle
              size={16}
              className="ml-2 pointer-events-auto cursor-pointer border-b-0"
              onClick={() => {
                setTourVisible(true);
                resetErrors({ tour: true });
              }}
            />
          </div>
          <div id="description" className="font-normal ml-5 mt-1">
            Elabora una actividad para los estudiantes de tu clase. Selecciona
            los campos obligatorios para poder crearla.
          </div>
          <div className="flex-1 flex-col flex ">
            <div id="form" className="w-full">
              <div className="flex flex-col md:flex-row lg:flex-row">
                <SelectInput
                  id="optionCourse"
                  value={course}
                  name="Curso"
                  list={[
                    "1º Primaria",
                    "2º Primaria",
                    "3º Primaria",
                    "4º Primaria",
                  ]}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                  style="tourP-step1"
                />
                <SelectInput
                  id="optionSubject"
                  value={subject}
                  name="Asignatura"
                  list={["Lengua", "Matemáticas", "Inglés", "Biología"]}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  style="tourP-step2"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col md:flex-row custom-scrollbar">
              <div className="lg:w-2/3 md:w-2/3 sm:w-full w-full flex flex-col">
                <div
                  id="questionContainer"
                  className="border-2 flex-1 rounded-lg ml-5 mt-5 mr-5  flex flex-col"
                >
                  <p className="mt-3 ml-5 mr-5 font-semibold text-lg">
                    Selecciona el tipo de pregunta y respuesta que deseas crear
                    para la pregunta actual.
                  </p>
                  <div className="flex items-center mb-6 flex-col md:flex-row lg:flex-row ">
                    <div className="w-1/2 sm:w-full">
                      <SelectInput
                        id="optionQuestion"
                        value={optionQuestion}
                        name="Tipo de pregunta"
                        list={["Test", "Redacción"]}
                        onChange={(e) => {
                          setOptionQuestion(e.target.value);
                          setQuestion((prev) => ({
                            ...prev,
                            kindOfQuestion: e.target.value,
                          }));
                        }}
                        style="tourP-step3"
                      />
                    </div>
                    <div className="w-1/2 sm:w-full">
                      <SelectInput
                        id="optionAnswer"
                        value={optionAnswer}
                        name="Tipo de respuesta"
                        list={[
                          "Opción múltiple",
                          "Rellenar",
                          "Verdadero o Falso",
                        ]}
                        onChange={(e) => {
                          setOptionAnswer(e.target.value);
                          setQuestion((prev) => ({
                            ...prev,
                            kindOfAnswer: e.target.value,
                          }));
                        }}
                        style="tourP-step4"
                      />
                    </div>
                  </div>
                  {optionQuestion === "Test" ? (
                    <TestForm
                      numQuestion={calculateNumQuestions()}
                      optionAnswer={optionAnswer}
                    />
                  ) : (
                    <div className="flex items-center justify-center min-h-32 text-lg font-semibold">
                      Tipo de actividad no implementada
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-around w-full mt-4 mb-4">
                  <QuestionNavButton
                    text="Nueva pregunta"
                    onClick={() => handleAlertModal("new")}
                    icon={<PiFilePlus color="#167563" size={30} />}
                    style="tourP-step12"
                  />
                  <QuestionNavButton
                    text={
                      questionIsCreated
                        ? "Actualizar pregunta"
                        : "Guardar pregunta"
                    }
                    onClick={
                      questionIsCreated
                        ? handleUpdateQuestion
                        : handleAddQuestion
                    }
                    icon={
                      questionIsCreated ? (
                        <RxUpdate color="#167563" size={30} />
                      ) : (
                        <HiOutlineViewGridAdd color="#167563" size={30} />
                      )
                    }
                    style="tourP-step13"
                  />
                  <QuestionNavButton
                    text="Borrar pregunta actual"
                    onClick={() => handleAlertModal("delete")}
                    icon={<AiFillDelete color="red" size={30} />}
                    style="text-red-500 tourP-step14"
                  />
                </div>
              </div>
              <div className="lg:w-1/3 md:w-1/3 sm:w-full flex flex-1 flex-col relative mt-5">
                <GridQuestions
                  questions={questions}
                  setQuestion={setQuestion}
                  style="tourP-step15"
                />
                <LocationPicker style="tourP-step16" />
                <CreateTest
                  onClick={() => handleTest()}
                  activityIsModifying={activityIsModifying}
                  style="tourP-step17"
                />
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

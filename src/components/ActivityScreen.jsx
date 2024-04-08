/* eslint-disable react/prop-types */

import { AiFillInfoCircle } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { socket } from "../utils/socket";
import { PreguntaContainer } from "./activity/PreguntaContainer";
import { UnderlinedText } from "./UnderlinedText";
import { GridActivity } from "./activity/GridActivity";
import { EndActivity } from "./activity/EndActivity";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { totalAnswersAtom } from "../context/atoms/totalAnswers";
import { ConfirmModal } from "./activity/ConfirmModal";
import { FinalScore } from "./activity/FinalScore";

export const ActivityScreen = ({ setActivityScreen }) => {
  const [activity, setActivity] = useState({});
  const [actualQuestion, setActualQuestion] = useState({});
  const [answers] = useAtom(totalAnswersAtom);
  const [confirmModal, setConfirmModal] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);

  const handleClickCerrar = () => {
    setActivityScreen(false);
    socket.emit("move");
  };

  useEffect(() => {
    socket.on("startActivity", (obj) => {
      setActivity(obj.activity);
      setActualQuestion(obj.activity.questions[0]);
    });
  }, []);

  const handleNextQuestion = () => {
    const index = activity.questions.findIndex(
      (question) => question.id === actualQuestion.id
    );
    if (index + 1 < activity.questions.length) {
      setActualQuestion(activity.questions[index + 1]);
    }
  };

  const handlePrevQuestion = () => {
    const index = activity.questions.findIndex(
      (question) => question.id === actualQuestion.id
    );
    if (index - 1 >= 0) {
      setActualQuestion(activity.questions[index - 1]);
    }
  };
  const handleConfirmModal = () => {
    setConfirmModal(true);
  };

  const handleCheckAnswer = () => {
    setActualQuestion(activity.questions[0]);
    console.log(
      "activity",
      activity.questions.map((q) => q.correct)
    );
    console.log(
      "answers",
      answers.map((a) => a.answerOption)
    );
    // Verifica que haya preguntas y respuestas antes de realizar la comparación.
    if (activity.questions.length === 0 || answers.length === 0) {
      console.log("No hay preguntas o respuestas para comparar.");
      return;
    }

    console.group("Comparación de respuestas:");

    // Itera sobre cada pregunta.
    activity.questions.forEach((question) => {
      // Encuentra las respuestas del usuario que corresponden a la pregunta actual.
      const userAnswer = answers.find(
        (answer) => answer.id === question.id
      );

      // Verifica si todas las respuestas proporcionadas por el usuario son correctas.
      const allUserAnswersCorrect =
        userAnswer &&
        userAnswer.answerOption.every((userOption) =>
          question.correct.includes(userOption - 1)
        );

      // Verifica si todas las respuestas correctas están incluidas en las respuestas del usuario.
      const allCorrectAnswersIncluded = question.correct.every(
        (correctAnswer) =>
          userAnswer && userAnswer.answerOption.includes(correctAnswer + 1)
      );

      // Si alguna respuesta proporcionada por el usuario es incorrecta o falta alguna respuesta correcta, hay un error.
      const isError = !allUserAnswersCorrect || !allCorrectAnswersIncluded;

      // Si hay errores, los registra.
      if (isError) {
        console.log(`Pregunta ${question.id} tiene errores.`);
      } else {
        console.log(`Pregunta ${question.id} respondida correctamente.`);
      }
    });
    console.groupEnd();
    setScoreVisible(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col absolute bg-[#167563] text-white overflow-x-hidden overflow-y-hidden custom-scrollbar">
      {confirmModal && (
        <ConfirmModal
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          onConfirm={handleCheckAnswer}
        />
      )}
      <div className="absolute top-2 right-3">
        <button onClick={handleClickCerrar}>
          <IoCloseOutline size={24} />
        </button>
      </div>

      <div className="flex justify-center items-center w-fit mt-5">
        <UnderlinedText
          text={`${activity.course} - ${activity.subject}`}
          style="text-3xl ml-5"
        />
        <AiFillInfoCircle
          size={16}
          className="ml-2 pointer-events-auto cursor-pointer border-b-0"
          onClick={() => console.log("HELPING")}
        />
      </div>

      <div className="flex flex-1">
        <div className=" w-3/4">
          <PreguntaContainer
            activity={activity}
            actualQuestion={actualQuestion}
            next={handleNextQuestion}
            prev={handlePrevQuestion}
          />
        </div>
        <div>
          <GridActivity
            questions={activity.questions}
            actualQuestion={actualQuestion}
            setActualQuestion={setActualQuestion}
          />
          <EndActivity onClick={handleConfirmModal} />
          {scoreVisible && (
            <FinalScore
              scoreVisible={scoreVisible}
              activity={activity}
              answers={answers}
            />
          )}
        </div>
      </div>
    </div>
  );
};

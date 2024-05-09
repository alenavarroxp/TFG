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
import { TourComponent } from "./TourComponent";

export const ActivityScreen = ({ setActivityScreen }) => {
  const [activity, setActivity] = useState({});
  const [actualQuestion, setActualQuestion] = useState({});
  const [answers] = useAtom(totalAnswersAtom);
  const [confirmModal, setConfirmModal] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [tourVisible, setTourVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [debug, setDebug] = useState(false);

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
    // Verifica que haya preguntas y respuestas antes de realizar la comparación.
    if (activity.questions.length === 0 || answers.length === 0) {
      console.log("No hay preguntas o respuestas para comparar.");
      return;
    }

    if(answers.length < activity.questions.length) {
      console.log("Faltan responder preguntas");
      return;
    }
    
    setScoreVisible(true);
    setFeedbackVisible(true);
  };

  useEffect(() => {
    if (scoreVisible) {
      socket.emit("feedbackScene", score);
    }
  }, [score, scoreVisible]);

  useEffect(() => {
    // Escuchar el evento "debug"
    socket.on("debug", () => {
      console.log("DEBUG");
      setDebug(true);
      setScoreVisible(true);
      socket.emit("feedbackScene");
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Lista de dependencias vacía para ejecutar el efecto solo una vez al montar el componente

  return (
    <div className="min-h-full w-full flex flex-col absolute bg-[#167563] text-white overflow-x-hidden overflow-y-hidden custom-scrollbar">
      {confirmModal && (
        <ConfirmModal
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          onConfirm={handleCheckAnswer}
        />
      )}
      {tourVisible && (
        <TourComponent
          setTourVisible={setTourVisible}
          questions={activity.questions}
          isProfessor={false}
        />
      )}
      <div className="absolute top-2 right-3">
        <button onClick={handleClickCerrar}>
          <IoCloseOutline size={24} />
        </button>
      </div>

      <div className="flex justify-center items-center w-fit mt-5 tour-step1 ml-5">
        <UnderlinedText
          text={`${activity.course} - ${activity.subject}`}
          style="text-3xl"
        />
        <AiFillInfoCircle
          size={16}
          className="ml-2 pointer-events-auto cursor-pointer border-b-0"
          onClick={() => setTourVisible(true)}
        />
      </div>

      <div className="flex flex-1">
        <div className=" w-3/4">
          <PreguntaContainer
            activity={activity}
            actualQuestion={actualQuestion}
            next={handleNextQuestion}
            prev={handlePrevQuestion}
            feedbackVisible={feedbackVisible}
          />
        </div>
        <div>
          <GridActivity
            questions={activity.questions}
            actualQuestion={actualQuestion}
            setActualQuestion={setActualQuestion}
            feedbackVisible={feedbackVisible}
          />
          <EndActivity onClick={handleConfirmModal} />
          {scoreVisible && (
            <>
              <FinalScore
                score={score}
                setScore={setScore}
                scoreVisible={scoreVisible}
                activity={activity}
                answers={answers}
                debug={debug}
              />
              <div className="flex mt-12 bg-white h-[calc(100vh - 12rem)]">
                <canvas id="feedbackScene" className="h-96 w-full"></canvas>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

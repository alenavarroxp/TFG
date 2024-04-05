/* eslint-disable react/prop-types */

import { AiFillInfoCircle } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { socket } from "../utils/socket";
import { PreguntaContainer } from "./activity/PreguntaContainer";
import { UnderlinedText } from "./UnderlinedText";
import { GridActivity } from "./activity/GridActivity";
import { EndActivity } from "./activity/EndActivity";
import { useEffect, useState } from "react";
import { actualAnswerAtom } from "../context/atoms/actualAnswerAtom";
import { useAtom } from "jotai";
import { totalAnswersAtom } from "../context/atoms/totalAnswers";

export const ActivityScreen = ({ setActivityScreen }) => {
  const [activity, setActivity] = useState({});
  const [actualQuestion, setActualQuestion] = useState({});
  const [currentAnswer] = useAtom(actualAnswerAtom);
  const [answers] = useAtom(totalAnswersAtom);


  console.log("currentAnswer", currentAnswer);

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

  const handleCheckAnswer = () => {
    //TODO COMPARACIÓN DE RESPUESTAS CON LAS CORRECTAS
    console.log("activity", activity.questions.map(question => question.correct));
    console.log("CHECK ANSWER");
    console.log("ANSWERS", answers.answers.map(answer => answer.answerOption));
  };

  return (
    <div className="min-h-screen w-full flex flex-col absolute bg-[#167563] text-white overflow-x-hidden overflow-y-hidden custom-scrollbar">
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
          <EndActivity onClick={handleCheckAnswer} />
        </div>
      </div>
    </div>
  );
};

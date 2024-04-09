import { useAtom } from "jotai";
import { feedbackAtom } from "../../context/atoms/feedbackAtom";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export const ScoreContainer = ({ actualQuestion, feedbackVisible }) => {
  const [feedback] = useAtom(feedbackAtom);
  const [puntuacion, setPuntuacion] = useState(0);

  useEffect(() => {
    setPuntuacion(actualQuestion.score);

    if (feedbackVisible) calculateScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackVisible, feedback, actualQuestion]);

  const calculateScore = () => {
    let score = 0;
    const questionFeedback = feedback[actualQuestion.id - 1];
    const correctsAnswers = questionFeedback?.corrects[0] || [];
    const wrongsAnswers = questionFeedback?.wrongs[0] || [];

    console.log("wrongsAnswers.length", wrongsAnswers.length);

    if (correctsAnswers && wrongsAnswers) {
      console.log(
        "actualQuestion.score",
        actualQuestion.score,
        "actualQuestion.correct.length",
        actualQuestion.correct.length,
        "correctsAnswers.length",
        correctsAnswers.length,
        "wrongsAnswers.length",
        wrongsAnswers.length
      );
      const correctPercentage =
        actualQuestion.correct.length > 1
          ? (actualQuestion.score / actualQuestion.correct.length) *
            correctsAnswers.length
          : actualQuestion.score / actualQuestion.correct.length;

          
      const incorrects =
        wrongsAnswers.length > 1 ? wrongsAnswers.length : 1;
        
      console.log("incorrects", incorrects, "wrongsAnswers.length", wrongsAnswers.length)
      const wrongPercentage =
        incorrects >= 1
          ? (actualQuestion.score / actualQuestion.correct.length) *
            0.5 *
            wrongsAnswers.length 
          : 0 ;
      console.log(
        "Porcentaje de correctas",
        correctPercentage,
        "Porcentaje de incorrectas",
        wrongPercentage
      );

      score = correctPercentage - wrongPercentage;

      console.log("Puntuación de la pregunta", score);
      setPuntuacion(score);
    }
  };

  return (
    <div className="flex font-semibold items-center">
      <h1 className="text-xl text-white mr-1">
        {!feedbackVisible
          ? "Puntuación de la pregunta:"
          : "Puntuación obtenida de la pregunta:"}
      </h1>
      <div className="rounded-full text-xl font-semibold">{feedbackVisible ? `${puntuacion} / ${actualQuestion.score}` : actualQuestion.score}</div>
    </div>
  );
};

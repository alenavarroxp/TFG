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

    if (correctsAnswers && wrongsAnswers) {
      const correctPercentage =
        actualQuestion.correct.length > 1
          ? (actualQuestion.score / actualQuestion.correct.length) *
            correctsAnswers.length
          : actualQuestion.score / actualQuestion.correct.length;

      const incorrects = wrongsAnswers.length > 1 ? wrongsAnswers.length : 1;

      const wrongPercentage =
        incorrects >= 1
          ? (actualQuestion.score / actualQuestion.correct.length) *
            0.5 *
            wrongsAnswers.length
          : 0;

      score = (correctPercentage - wrongPercentage).toFixed(2);

      setPuntuacion(score);
    }
  };

  return (
    <div className="flex font-semibold items-center tour-step6">
      <h1 className="lg:text-xl md:text-md text-white mr-1">
        {!feedbackVisible
          ? "Puntuación de la pregunta:"
          : "Puntuación obtenida de la pregunta:"}
      </h1>
      <div className="rounded-full text-xl font-semibold">
        {feedbackVisible
          ? `${puntuacion} / ${actualQuestion.score}`
          : actualQuestion.score}
      </div>
    </div>
  );
};

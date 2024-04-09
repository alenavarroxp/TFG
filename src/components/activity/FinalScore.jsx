/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UnderlinedText } from "../UnderlinedText";
import { useAtom } from "jotai";
import { feedbackAtom } from "../../context/atoms/feedbackAtom";

export const FinalScore = ({ scoreVisible, activity, answers }) => {
  const [finalScore, setFinalScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [feedback, setFeedback] = useAtom(feedbackAtom);

  useEffect(() => {
    console.log("Calculando puntuación");
    // if (scoreVisible)
    calculateScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreVisible]);

  const calculateScore = () => {
    const { correctAnswers, givenAnswers } = normalize();

    for (let i = 0; i < correctAnswers.length; i++) {
      const correct = correctAnswers[i];
      const given = givenAnswers[i];
      console.log("Comparando", correct, given);
      let corrects = [];

      for (let j = 0; j < correct.length; j++) {
        if (given.includes(correct[j])) {
          corrects.push(correct[j]);
        }
      }
      // console.log("Correctas", corrects);
      let wrongs = given.filter((answer) => !corrects.includes(answer));
      // console.log("Incorrectas", wrongs);

      //CALCULAR PUNTAJE
      let score = corrects.length / correct.length;
      score -= (wrongs.length / correct.length) * 0.5;

      score *= activity.questions[i].score;
      setFinalScore((prev) => prev + score);
      console.log("Puntaje de pregunta", score);
      updateFeedback(i, corrects, wrongs);
    }

    outOfTen();
  };

  const updateFeedback = (i, corrects, wrongs) => {
    setFeedback((prev) => {
      const updatedFeedback = [...prev];
      updatedFeedback[i] = {
        ...updatedFeedback[i],
        corrects: [...(updatedFeedback[i]?.corrects || []), corrects],
        wrongs: [...(updatedFeedback[i]?.wrongs || []), wrongs],
      };
      return updatedFeedback;
    });
  };

  useEffect(() => {
    console.log("Feedback", feedback);
  }, [feedback]);

  const outOfTen = () => {
    activity.questions.forEach((question) => {
      setTotalScore((prev) => prev + parseFloat(question.score));
    });
  };

  useEffect(() => {
    if (totalScore !== 0) {
      setFinalScore((prev) => {
        const newScore = parseFloat((prev / totalScore) * 10).toFixed(2);
        return Math.max(newScore, 0).toFixed(2); // Asegurarse de que el puntaje final no sea negativo
      });
    }
  }, [totalScore]);
  

  const normalize = () => {
    //AQUI QUIERO QUE LOS ARRAYs DE RESPUESTAS CORRECTAS Y DE RESPUESTAS DADAS ESTÉN ORDENADOS DE MENOR A MAYOR
    //PARA PODER COMPARARLOS
    const correctAnswers = activity.questions.map((question) =>
      question.correct.map((answer) => answer + 1).sort((a, b) => a - b)
    );

    const givenAnswers = answers.map((answer) => answer.answerOption.sort());

    console.log("Respuestas correctas ordenadas", correctAnswers);
    console.log("Respuestas dadas ordenadas", givenAnswers);
    return { correctAnswers, givenAnswers };
  };

  return (
    <div className="flex items-center mt-4">
      <UnderlinedText text="Puntuación final:" style="text-xl ml-4" />
      <p className="ml-2 font-semibold text-xl">{finalScore} / 10.00</p>
    </div>
  );
};

/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { UnderlinedText } from "../UnderlinedText";

export const FinalScore = ({ scoreVisible, activity, answers }) => {
  useEffect(() => {
    console.log("Calculando puntuación");
    if (scoreVisible) calculateScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreVisible]);

  const calculateScore = () => {
    // CADA PREGUNTA TIENE UN PUNTAJE, SI LA RESPUESTA ES CORRECTA SE SUMA EL PUNTAJE DIVIDIDO POR EL NUMERO DE CORRECTAS EN ESA PREGUNTA
    //SI LA RESPUESTA NO ES CORRECTA NO SE SUMA NADA
    //SI NO HAY RESPUESTA NO SE SUMA NADA
    console.log(
      "LAS RESPUETSAS CORRECTAS SON: ",
      activity.questions.map((question) => question.correct)
    );
    console.log(
      "LAS RESPUESTAS DADAS SON: ",
      answers.map((answer) => answer.answerOption)
    );
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
      console.log("Correctas", corrects);
      let wrongs = given.filter((answer) => !corrects.includes(answer));
      console.log("Incorrectas", wrongs);

      //CALCULAR PUNTAJE
      let score = corrects.length / correct.length;
      score -= wrongs.length / correct.length;

      console.log("Puntaje de pregunta", score);
    }


  };

  const normalize = () => {
    //AQUI QUIERO QUE LOS ARRAYs DE RESPUESTAS CORRECTAS Y DE RESPUESTAS DADAS ESTÉN ORDENADOS DE MENOR A MAYOR
    //PARA PODER COMPARARLOS
    const correctAnswers = activity.questions.map((question) =>
      question.correct.map((answer) => answer + 1).sort((a, b) => a - b)
    );

    const givenAnswers = answers.map((answer) =>
      answer.answerOption.sort()
    );

    console.log("Respuestas correctas ordenadas", correctAnswers);
    console.log("Respuestas dadas ordenadas", givenAnswers);
    return { correctAnswers, givenAnswers };
  };

  return (
    <div className="flex items-center mt-4">
      <UnderlinedText text="Puntuación final:" style="text-xl ml-4" />
      <p className="ml-2 font-semibold text-xl">0 / 10</p>
    </div>
  );
};

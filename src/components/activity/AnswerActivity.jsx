/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useAtom } from "jotai";
import { totalAnswersAtom } from "../../context/atoms/totalAnswers";
import { feedbackAtom } from "../../context/atoms/feedbackAtom";

export const AnswerActivity = ({
  index,
  answer,
  actualQuestion,
  feedbackVisible,
}) => {
  const optionId = `option-${index}`;
  const { answerText, isCorrect } = answer;
  const [visibleCorrect, setVisibleCorrect] = useState(false);
  const [answers, setAnswers] = useAtom(totalAnswersAtom);
  const [score, setScore] = useState(0);
  const [feedback] = useAtom(feedbackAtom);
  const [visibleFeedback, setVisibleFeedback] = useState(false);

  useEffect(() => {
    if (feedbackVisible) {
      setVisibleFeedback(true);
      calculateScore();
    } else {
      setVisibleFeedback(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackVisible, feedback, actualQuestion]);

  const calculateScore = () => {
    // Calcula el puntaje de la pregunta
    const questionScore = actualQuestion.score;

    // Obtiene los datos de retroalimentación para la pregunta actual
    const questionFeedback = feedback[actualQuestion.id - 1];
    const correctsAnswers = questionFeedback?.corrects[0] || [];
    const wrongsAnswers = questionFeedback?.wrongs[0] || [];

    // Verifica si el índice de la respuesta actual está en los arrays de respuestas correctas o incorrectas
    const isCorrectAnswer = correctsAnswers.includes(index + 1);
    const isWrongAnswer = wrongsAnswers.includes(index + 1);

    // Calcula el puntaje según la lógica establecida
    let score = 0;
    if (isCorrectAnswer || isWrongAnswer) {
      score = isCorrectAnswer
        ? questionScore / actualQuestion.correct.length
        : (questionScore / actualQuestion.correct.length) * 0.5;
      setScore(isCorrectAnswer ? `+${score}` : `-${score}`);
    } else {
      setScore("");
    }

    // Actualiza el estado del puntaje
  };

  useEffect(() => {
    answers.forEach((answer) => {
      if (answer.id === actualQuestion.id - 1) {
        if (answer.answerOption.includes(index + 1)) {
          setVisibleCorrect(true);
        } else {
          setVisibleCorrect(false);
        }
      }
    });

    return () => {
      setVisibleCorrect(false);
    };
  }, [actualQuestion, answers, index]);

  // Función para manejar el cambio en la selección de la opción
  const handleCheckboxChange = () => {
    const newAnswer = {
      id: actualQuestion.id - 1,
      answerOption: [index + 1],
    };

    console.log("actualQuestion", actualQuestion);
    const currentAnswers =
      answers[actualQuestion.id - 1] &&
      answers[actualQuestion.id - 1].answerOption;

    if (!visibleCorrect) {
      if (!answers[actualQuestion.id - 1]) {
        setAnswers([...answers, newAnswer]);
      } else {
        const updatedAnswers = answers.map((answer) => {
          if (answer.id === actualQuestion.id - 1) {
            return {
              ...answer,
              answerOption: currentAnswers.includes(index + 1)
                ? currentAnswers.filter((option) => option !== index + 1)
                : [...currentAnswers, index + 1],
            };
          }
          return answer;
        });

        setAnswers(updatedAnswers);
      }
    } else {
      const updatedAnswers = answers.map((answer) => {
        if (answer.id === actualQuestion.id - 1) {
          return {
            ...answer,
            answerOption: currentAnswers.includes(index + 1)
              ? currentAnswers.filter((option) => option !== index + 1)
              : [...currentAnswers, index + 1],
          };
        }
        return answer;
      });

      setAnswers(updatedAnswers);
    }
    setVisibleCorrect((prevVisibleCorrect) => !prevVisibleCorrect);
    console.log("ANSWERS AFTER", answers);
  };

  return (
    <div className="flex mt-2 rounded-lg py-2.5 bg-white select-none">
      <p className="px-4 font-medium">{index + 1}.</p>
      <div className="mr-4  flex items-center">
        <input
          type="checkbox"
          id={optionId}
          name={optionId}
          disabled={feedbackVisible}
          className={`peer sr-only hidden ${
            feedbackVisible
              ? "cursor-not-allowed pointer-events-none"
              : "pointer-events-auto"
          }`}
          checked={visibleCorrect}
          onChange={handleCheckboxChange}
        />

        <label
          htmlFor={optionId}
          className={`cursor-pointer relative inline-flex items-center justify-center w-4 h-4 border border-gray-400 rounded-full transition-all duration-300 bg-white ${
            feedbackVisible ? "cursor-not-allowed" : "pointer-events-auto"
          }`}
        >
          <IoCheckmarkCircle
            className={`text-[#24B817] ${
              visibleCorrect ? "opacity-100" : "opacity-0"
            } absolute transition-all duration-300 ease-out`}
            size={20}
          />
        </label>
      </div>
      {answerText}
      <div>
        {feedbackVisible && visibleFeedback && (
          <div className="absolute right-4">
            {isCorrect ? (
              <p className="text-[#24B817] font-semibold">Correcta {score}</p>
            ) : (
              <p className="text-[#F44336] font-semibold">Incorrecta {score}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

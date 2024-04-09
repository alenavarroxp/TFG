/* eslint-disable react/prop-types */
import Joyride from "react-joyride";

export const TourComponent = ({ setTourVisible }) => {
  const steps = [
    {
      target: ".tour-step1",
      content: "¡Hola! ¡Bienvenido al tour! Curso y asignatura",
      placement: "bottom",
      title: "Bienvenido",
    },
    {
      target: ".tour-step2",
      content: "Pregunta de la actividad",
      placement: "bottom",
      title: "Pregunta",
    },
    {
      target: ".tour-step3",
      content: "badge",
      placement: "left",
      title: "Badge",
    },
    {
      target: ".tour-step4",
      content: "Respuestas de la actividad",
      placement: "bottom",
      title: "Respuestas",
    },
    {
      target: ".tour-step5",
      content: "badge",
      placement: "left",
      title: "Badge",
    },
    {
      target: ".tour-step6",
      content: "Puntaje de la actividad",
      placement: "bottom",
      title: "Puntaje",
    },
    {
      target: ".tour-step7",
      content: "Respuestas de la actividad",
      placement: "bottom",
      title: "Respuestas",
    },
    {
      target: ".tour-step8",
      content: "Todas las preguntas de la actividad",
      placement: "bottom",
      title: "Todas las preguntas",
    },
    {
      target: ".tour-step9",
      content: "PRegunta actual de la actividad",
      placement: "bottom",
      title: "Pregunta actual",
    }
  ];

  const handleJoyrideCallback = (data) => {
    if (
      data.action === "close" ||
      data.status === "finished" ||
      data.status === "skipped"
    ) {
      setTourVisible(false);
    }
  };

  return (
    <>
      <div>
        <Joyride
          steps={steps}
          run={true}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          disableOverlayClose={true}
          disableScrolling={true}
          spotlightPadding={4}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: "#1890ff",
            },
          }}
          locale={{
            last: "Finalizar",
            next: "Siguiente",
            skip: "Saltar",
            back: "Atrás",
          }}
        />
      </div>
    </>
  );
};

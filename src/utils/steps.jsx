import { TourContainer } from "../components/tour/TourContainer";
import { TourTitle } from "../components/tour/TourTitle";

export const generateSteps = (length) => {
  let steps = [
    {
      target: `.tour-step1`,
      content: (
        <TourContainer text="Aquí se indica el curso y la asignatura a la que pertenece esta actividad junto con el botón de información." />
      ),
      placement: "bottom",
      title: <TourTitle text="Curso y asignatura" />,

      disableBeacon: true,
    },
    {
      target: `.tour-step2`,
      content: (
        <TourContainer text="En esta sección, se proporciona información detallada sobre la pregunta actual, incluyendo su número, tipo y el texto que la compone." />
      ),
      placement: "bottom",
      title: <TourTitle text="Encabezado de la pregunta actual" />,
    },
    {
      target: `.tour-step3`,
      content: (
        <TourContainer
          text="Esto indica el tipo de la pregunta actual. Hay varios tipos de preguntas disponibles, asi que asegúrate de leer la pregunta con atención."
          kindOfQuestion={true}
        />
      ),
      placement: "left",
      title: <TourTitle text="Tipo de la pregunta" />,
    },
    {
      target: `.tour-step4`,
      content: (
        <TourContainer text="En esta sección, se muestra el tipo respuestas y la puntuación de la pregunta actual." />
      ),
      placement: "bottom",
      title: <TourTitle text="Encabezado de las respuestas" />,
    },
    {
      target: `.tour-step5`,
      content: (
        <TourContainer text="Esto indica el tipo de respuestas. Hay varios tipos de respuestas disponibles, asi que asegúrate de responder correctamente según el tipo." kindOfAnswer={true} />
      ),
      placement: "left",
      title: <TourTitle text="Tipo de respuesta" />,
    },
    {
      target: `.tour-step6`,
      content: (
        <TourContainer
          text="Cada pregunta tiene su puntuación asignada. Asegúrate de responder correctamente para obtener la máxima puntuación."
          puntuaciónExample={true}
          style="overflow-y-auto h-72"
        />
      ),
      placement: "right",
      title: <TourTitle text="Puntuación de la pregunta actual" />,
    },
    {
      target: `.tour-step7`,
      content: (
        <TourContainer text="Aquí se muestran todas las posibles respuestas de la pregunta actual." />
      ),
      placement: "bottom",
      title: <TourTitle text="Respuestas de la actividad" />,
    },
    {
      target: `.tour-step8`,
      content: (
        <TourContainer text="En esta sección se muestran todas las preguntas que hay en la actividad. Puedes cambiar de pregunta seleccionando otra pregunta." />
      ),
      placement: "bottom",
      title: <TourTitle text="Todas las preguntas de la actividad" />,
    },
    {
      target: `.tour-step9`,
      content: (
        <TourContainer text="Aquí se muestra la pregunta que tienes seleccionada. Si quieres ver la información de otra pregunta, selecciona otra pregunta." />
      ),
      placement: "bottom",
      title: <TourTitle text="Pregunta actual" />,
    },
  ];

  if (length > 1) {
    // Buscar el índice donde insertar el nuevo paso "botones"
    let insertIndex =
      steps.findIndex((step) => step.target === ".tour-step7") + 1;

    if (insertIndex === 0) {
      // Si no se encuentra el target '.tour-step8', insertar al final
      steps.push({
        target: `.botones`,
        content: (
          <TourContainer text="Con estos botones puedes navegar entre preguntas retrocediendo o avanzando." />
        ),
        placement: "top",
        title: <TourTitle text="Botones de navegación" />,
      });
    } else {
      // Insertar el nuevo paso en el índice calculado
      steps.splice(insertIndex, 0, {
        target: `.botones`,
        content: (
          <TourContainer text="Con estos botones  puedes navegar entre preguntas retrocediendo o avanzando." />
        ),
        placement: "top",
        title: <TourTitle text="Botones de navegación" />,
      });
    }
  }

  return steps;
};

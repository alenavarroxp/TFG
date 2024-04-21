import { TourContainer } from "../components/tour/TourContainer";
import { TourTitle } from "../components/tour/TourTitle";

export const generateSteps = (isProfessor, length) => {
  let steps;
  if (!isProfessor) {
    steps = [
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
          <TourContainer
            text="Esto indica el tipo de respuestas. Hay varios tipos de respuestas disponibles, asi que asegúrate de responder correctamente según el tipo."
            kindOfAnswer={true}
          />
        ),
        placement: "left",
        title: <TourTitle text="Tipo de respuesta" />,
      },
      {
        target: `.tour-step6`,
        content: (
          <TourContainer text="Cada pregunta tiene su puntuación asignada. Asegúrate de responder correctamente  para obtener la máxima puntuación." />
        ),
        placement: "bottom",
        title: <TourTitle text="Puntuación de la pregunta actual" />,
      },
      {
        target: `.tour-step7`,
        content: (
          <TourContainer text="Aquí se muestran todas las posibles respuestas de la pregunta actual. Selecciona o rellena las respuestas correctas según el tipo de respuesta." />
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
  } else {
    steps = [
      {
        target: `.tourP-step1`,
        content: (
          <TourContainer text="Aquí se indica el curso de la actividad. Asegúrate de seleccionar el curso correcto para la actividad." />
        ),
        placement: "bottom",
        title: <TourTitle text="Curso de la actividad" />,

        disableBeacon: true,
      },
      {
        target: `.tourP-step2`,
        content: (
          <TourContainer text="Aquí se indica la asignatura de la actividad. Asegúrate de seleccionar la asignatura correcta para la actividad." />
        ),
        placement: "bottom",
        title: <TourTitle text="Asignatura de la actividad" />,
      },
      {
        target: `.tourP-step3`,
        content: (
          <TourContainer text="Aquí debes seleccionar el tipo de pregunta que deseas crear. Hay varios tipos, selecciona el que más se ajuste a tus necesidades." />
        ),
        placement: "bottom",
        title: <TourTitle text="Tipo de pregunta actual" />,
      },
      {
        target: `.tourP-step4`,
        content: (
          <TourContainer text=" Aquí debes seleccionar el tipo de respuesta para la pregunta actual. Asegúrate de seleccionar el tipo correcto para la pregunta." />
        ),
        placement: "bottom",
        title: <TourTitle text="Tipo de respuesta" />,
      },
      {
        target: `.tourP-step5`,
        content: (
          <TourContainer text="En esta sección, se muestra el número de la pregunta actual para que puedas identificarla más fácilmente." />
        ),
        placement: "bottom",
        title: <TourTitle text="Número de pregunta" />,
      },
      {
        target: `.tourP-step6`,
        content: (
          <TourContainer text="Esto identifica cuál es la pregunta actual que estás creando o modificando" />
        ),
        placement: "bottom",
        title: <TourTitle text="Pregunta actual" />,
      },
      {
        target: `.tourP-step7`,
        content: (
          <TourContainer text="Aquí debes escribir el texto de la pregunta actual. Asegúrate de que la pregunta sea clara y concisa." />
        ),
        placement: "bottom",
        title: <TourTitle text="Texto de la pregunta actual" />,
      },
      {
        target: `.tourP-step8`,
        content: (
          <TourContainer
            text="Aquí debes asignar la puntuación de la pregunta actual. A continuación, se muestra el sistema de puntuación:"
            professorExample={true}
          />
        ),
        placement: "right",
        title: <TourTitle text="Puntuación de la pregunta actual" />,
      },
      {
        target: `.tourP-step9`,
        content: (
          <TourContainer text="En esta sección aparecerán todas las opciones para la pregunta actual. Crea y borra las opciones para que se ajusten a tus necesidades." />
        ),
        placement: "bottom",
        title: <TourTitle text="Contenedor de respuestas" />,
      },
      {
        target: `.tourP-step10`,
        content: (
          <TourContainer text="Aquí debes rellenar el texto de la pregunta y en el caso de que la respuesta sea correcta pulsar el círculo de la derecha. Si quieres borrar la opción pulsa en el icono de la papelera." />
        ),
        placement: "bottom",
        title: <TourTitle text="Opción de respuesta" />,
      },
      {
        target: `.tourP-step11`,
        content: (
          <TourContainer text="Pulsándo este botón aparecerá una nueva opción en el contenedor de respuestas." />
        ),
        placement: "bottom",
        title: <TourTitle text="Botón de añadir respuesta" />,
      },
      {
        target: `.tourP-step12`,
        content: (
          <TourContainer text="Al pulsar este botón podrás crear una nueva pregunta. Ten en cuenta que si tienes una pregunta si guardar se borrará la información." />
        ),
        placement: "top",
        title: <TourTitle text="Botón de nueva pregunta" />,
      },
      {
        target: `.tourP-step13`,
        content: (
          <TourContainer text="Al pulsar este botón la pregunta se guardará en la sección Preguntas guardadas. Ten en cuenta que para guardar una pregunta debes rellenar los campos obligatorios." />
        ),
        placement: "top",
        title: <TourTitle text="Botón de guardar pregunta actual" />,
      },
      {
        target: `.tourP-step14`,
        content: (
          <TourContainer text="Al pulsar este botón se borrará la pregunta actual. Ten cuidado, si borras una pregunta no podrás recuperarla." />
        ),
        placement: "top",
        title: <TourTitle text="Botón de borrar pregunta actual" />,
      },
      {
        target: `.tourP-step15`,
        content: (
          <TourContainer text="En esta sección se guardarán todas las preguntas. Cuando guardes una pregunta se añadirá a este contenedor y podrás acceder pulsando sobre el cuadrado de la pregunta." />
        ),
        placement: "top",
        title: <TourTitle text="Preguntas guardadas" />,
      },
      {
        target: `.tourP-step16`,
        content: (
          <TourContainer text="Aquí debes seleccionar la ubicación de la actividad. Si eliges Posición actual, se creará en la posición donde te encuentres. Si quieres cambiar la ubicación pulsa en Elegir ubicación en el mapa." />
        ),
        placement: "top",
        title: <TourTitle text="Ubicación de la actividad" />,
      },
      {
        target: `.tourP-step17`,
        content: (
          <TourContainer text="Al pulsar este botón se creará la actividad en el mundo y todos los alumnos podrán verla y realizarla. " />
        ),
        placement: "top",
        title: <TourTitle text="Botón de crear actividad" />,
      },
    ];
  }
  return steps;
};

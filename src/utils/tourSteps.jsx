import { TourContainer } from "../components/tour/TourContainer";
import { TourTitle } from "../components/tour/TourTitle";

export const generateCustomizeSteps = () =>{
    let steps = [];
    steps = [
        {
            target: `.tourC-step1`,
            content: (
              <TourContainer text="Aquí se indica el curso de la actividad. Asegúrate de seleccionar el curso correcto para la actividad." />
            ),
            placement: "bottom",
            title: <TourTitle text="Curso de la actividad" />,
    
            disableBeacon: true,
          },
          {
            target: `.tourC-step2`,
            content: (
              <TourContainer text="Aquí se indica la asignatura de la actividad. Asegúrate de seleccionar la asignatura correcta para la actividad." />
            ),
            placement: "bottom",
            title: <TourTitle text="Asignatura de la actividad" />,
          },
          {
            target: `.tourC-step3`,
            content: (
              <TourContainer text="3Aqu3í se indica la asignatura de la actividad. Asegúrate de seleccionar la asignatura correcta para la actividad." />
            ),
            placement: "bottom",
            title: <TourTitle text="Asignatura de la actividad" />,
          },
          {
            target: `.tourC-step4`,
            content: (
              <TourContainer text="Aquí s4e indica la asignatura de la actividad. Asegúrate de seleccionar la asignatura correcta para la actividad." />
            ),
            placement: "bottom",
            title: <TourTitle text="Asignatura de la actividad" />,
          },
          {
            target: `.tourC-step5`,
            content: (
              <TourContainer text="Aquí s5e indica la asignatura de la actividad. Asegúrate de seleccionar la asignatura correcta para la actividad." />
            ),
            placement: "bottom",
            title: <TourTitle text="Asignatura de la actividad" />,
          },
          {
            target: `.tourC-step6`,
            content: (
              <TourContainer text="Aquí s6e indica la asignatura de la actividad. Asegúrate de seleccionar la asignatura correcta para la actividad." />
            ),
            placement: "bottom",
            title: <TourTitle text="Asignatura de la actividad" />,
          },
          {
            target: `.tourC-step7`,
            content: (
              <TourContainer text="Aquí s7e indica la asignatura de la actividad. Asegúrate de seleccionar la asignatura correcta para la actividad." />
            ),
            placement: "bottom",
            title: <TourTitle text="Asignatura de la actividad" />,
          },
    ]

    return steps;
}
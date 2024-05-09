import { TourContainer } from "../components/tour/TourContainer";
import { TourTitle } from "../components/tour/TourTitle";

export const generateCustomizeSteps = () => {
  let steps = [];
  steps = [
    {
      target: `.tourC-step1`,
      content: (
        <TourContainer text="Aquí se indica el título y la descripcion de la pantalla de personalización para ofrecer una visión clara de lo que se puede hacer en esta interfaz." />
      ),
      placement: "bottom",
      title: (
        <TourTitle text="Título y descripción de la pantalla de personalización" />
      ),

      disableBeacon: true,
    },
    {
      target: `.tourC-step2`,
      content: (
        <TourContainer text="Pulsándo esta pestaña podrás ver todos los colores que hay en el sistema. Estas pestañas sirven para navegar por la interfaz por los diferentes menús de personalización." />
      ),
      placement: "bottom",
      title: <TourTitle text="Pestaña de Colores" />,
    },
    {
      target: `.tourC-step3`,
      content: (
        <TourContainer text="Pulsándo esta pestaña podrás ver todos los accesorios que hay en el sistema. Estas pestañas sirven para navegar por la interfaz por los diferentes menús de personalización." />
      ),
      placement: "bottom",
      title: <TourTitle text="Pestaña de Accesorios" />,
    },
    {
      target: `.tourC-step4`,
      content: (
        <TourContainer text="Aquí se encuentra tu monedero del sistema, en él encontrarás las monedas que hayas conseguido realizando actividades. Si quieres más monedas dáte una vuelta por el mundo en busca de nuevas actividades." />
      ),
      placement: "bottom",
      title: <TourTitle text="Tu Monedero" />,
    },
    {
      target: `.tourC-step5`,
      content: (
        <TourContainer text="En este cajon de personalización se encontrarán los colores o los accesorios para poder personalizar tu avatar. Selecciona el objeto que desees pulsándo sobre él." />
      ),
      placement: "bottom",
      title: <TourTitle text="Cajón de personalización" />,
    },
    {
      target: `.tourC-step6`,
      content: (
        <TourContainer text="Cuando pulses este botón se desplegará una ventana indicando los cambios que has realizado para poder guardarlos en el sistema." />
      ),
      placement: "bottom",
      title: <TourTitle text="Botón de guardado" />,
    },
    {
      target: `.tourC-step7`,
      content: (
        <TourContainer text="En este componente saldrán los objetos que selecciones en el cajón de personalización tanto los colores como los accesorios. Así podrás ver tu apariencia en el mundo de EntornoCRA antes de guardar los cambios en el sistema." />
      ),
      placement: "bottom",
      title: <TourTitle text="Probador" />,
    },
  ];

  return steps;
};

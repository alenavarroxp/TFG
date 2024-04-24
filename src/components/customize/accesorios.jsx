import { MoneyComponent } from "./MoneyComponent";

export const accesorios = [
  {
    id:"sheriffAccessory",
    img: "/img/sheriffAccessory.png",
    title: "Sombrero de Sheriff",
    label: <div className="text-lg font-semibold">Obtenido</div>,
  },
  {
    id: "kidAccessory",
    img: "/img/kidAccessory.png",
    title: "Gorrocóptero",
    label: <div className="text-lg font-semibold">Gratis</div>,
  },
  {
    id: "pirateAccessory",
    img: "/img/pirateAccessory.png",
    title: "Sombrero de Pirata",
    label: <MoneyComponent style="text-2xl font-semibold" />,
  },
  
];

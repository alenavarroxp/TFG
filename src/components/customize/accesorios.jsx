import { MoneyComponent } from "./MoneyComponent";

export const accesorios = [
  {
    id:"sheriffAccessory",
    img: "/img/sheriffAccessory.png",
    title: "Sombrero de Sheriff",
    label: <div className="text-lg font-semibold">Obtenido</div>,
  },
  {
    id: "wizardAccessory",
    img: "/img/wizardAccessory.png",
    title: "Gorro de brujo",
    label: <div className="text-lg font-semibold">Gratis</div>,
  },
  {
    id: "pirateAccessory",
    img: "/img/pirateAccessory.png",
    title: "Sombrero de Pirata",
    label: <MoneyComponent style="text-2xl font-semibold" />,
  },
  
];

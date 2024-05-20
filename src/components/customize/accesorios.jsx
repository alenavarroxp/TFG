import { MoneyComponent } from "./MoneyComponent";

export const accesorios = [
  {
    id:"sheriffAccessory",
    img: "/img/sheriffAccessory.png",
    title: "Sombrero de Sheriff",
    label: <div className="text-lg font-semibold">Gratis</div>,
    precio:0,
  },
  {
    id: "wizardAccessory",
    img: "/img/wizardAccessory.png",
    title: "Gorro de brujo",
    label: <MoneyComponent style="text-2xl font-semibold" isCharacterNurse={false} fixedValue={75}/>,
    precio:75,
  },
  {
    id: "pirateAccessory",
    img: "/img/pirateAccessory.png",
    title: "Sombrero de Pirata",
    label: <MoneyComponent style="text-2xl font-semibold" isCharacterNurse={false} fixedValue={90}/>,
    precio:90,
  },
  
];

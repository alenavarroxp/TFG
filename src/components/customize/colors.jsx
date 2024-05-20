import { MoneyComponent } from "./MoneyComponent";

export const colors = [
  {
    title: "Rojo",
    color: "#FF0000",
    label: (
      <MoneyComponent
        style="text-2xl font-semibold"
        isCharacterNurse={false}
        fixedValue={15}
      />
    ),
    precio: 15,
  },
  {
    title: "Naranja",
    color: "#FF8A00",
    label: (
      <MoneyComponent
        style="text-2xl font-semibold"
        isCharacterNurse={false}
        fixedValue={30}
      />
    ),
    precio: 30,
  },
  {
    title: "Amarillo",
    color: "#FAFF00",
    label: <div className="text-lg font-semibold">Gratis</div>,
    precio: 0,
  },
  {
    title: "Verde",
    color: "#00FF47",
    label: <div className="text-lg font-semibold">Gratis</div>,
    precio: 0,
  },
  {
    title: "Azul",
    color: "#0094FF",
    label: <div className="text-lg font-semibold">Gratis</div>,
    precio: 0,
  },
  {
    title: "Morado",
    color: "#8B00FF",
    label: (
      <MoneyComponent
        style="text-2xl font-semibold"
        isCharacterNurse={false}
        fixedValue={25}
      />
    ),
    precio: 25,
  },
  {
    title: "Rosa",
    color: "#FF69B4",
    label: (
      <MoneyComponent
        style="text-2xl font-semibold"
        isCharacterNurse={false}
        fixedValue={10}
      />
    ),
    precio: 10,
  },
  {
    title: "Cian",
    color: "#00FFFF",
    label: <div className="text-lg font-semibold">Gratis</div>,
    precio: 0,
  },
  {
    title: "Magenta",
    color: "#FF00FF",
    label: (
      <MoneyComponent
        style="text-2xl font-semibold"
        isCharacterNurse={false}
        fixedValue={20}
      />
    ),
    precio: 20,
  },
  {
    title: "Blanco",
    color: "#FFFFFF",
    label: (
      <MoneyComponent
        style="text-2xl font-semibold"
        isCharacterNurse={false}
        fixedValue={20}
      />
    ),
    precio: 20,
  },
];

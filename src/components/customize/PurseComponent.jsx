import { MoneyComponent } from "./MoneyComponent";

export const PurseComponent = () => {
  return (
    <div className="absolute right-3 text-xl font-semibold flex">
      <p className="mr-1">Tienes:</p>
      <MoneyComponent />
    </div>
  );
};

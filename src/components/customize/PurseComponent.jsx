import { MoneyComponent } from "./MoneyComponent";

// eslint-disable-next-line react/prop-types
export const PurseComponent = ({ style }) => {
  return (
    <div className={`absolute right-3 text-xl font-semibold flex ${style}`}>
      <p className="mr-1">Tienes:</p>
      <MoneyComponent />
    </div>
  );
};

import { TbCoinFilled } from "react-icons/tb";

// eslint-disable-next-line react/prop-types
export const MoneyComponent = ({style}) => {
  return (
    <div className="flex justify-center items-start">
      <p className={`${style}`}>20</p>
      <TbCoinFilled size={13} color="FFD700" className="mt-1 ml-0.5"/>
    </div>
  );
};

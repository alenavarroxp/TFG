import { useEffect, useState } from "react";
import { TbCoinFilled } from "react-icons/tb";
import { socket } from "../../utils/socket";

// eslint-disable-next-line react/prop-types
export const MoneyComponent = ({ style, isCharacterNurse, fixedValue }) => {
  const [money, setMoney] = useState(isCharacterNurse ? 0 : "");

  useEffect(() => {
    if (!isCharacterNurse) return;
    socket.on("getMoney", (data) => {
      setMoney(data);
    });

    return () => {
      socket.off("getMoney");
    };
  });

  useEffect(() => {
    socket.on("updatePurse", (data) => {
      setMoney(data);
    });
  }, []);
  

  const displayValue = isCharacterNurse ? money : fixedValue;

  return (
    <div className="flex justify-center items-start">
      <p className={`${style}`}>{displayValue}</p>
      <TbCoinFilled size={13} color="FFD700" className="mt-1 ml-0.5" />
    </div>
  );
};

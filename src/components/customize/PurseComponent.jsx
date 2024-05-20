import { useEffect } from "react";
import { MoneyComponent } from "./MoneyComponent";
import { socket } from "../../utils/socket";
import { useAtomValue } from "jotai";
import { userAtom } from "../../context/atoms/userAtom";

// eslint-disable-next-line react/prop-types
export const PurseComponent = ({ style }) => {
  const myUser = useAtomValue(userAtom);
  useEffect(() => {
    socket.emit("getMoney", myUser);
  }, [myUser]);

  return (
    <div className={`absolute right-3 text-xl font-semibold flex ${style}`}>
      <p className="mr-1">Tienes:</p>
      <MoneyComponent isCharacterNurse={true} />
    </div>
  );
};

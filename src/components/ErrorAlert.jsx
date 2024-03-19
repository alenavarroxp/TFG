/* eslint-disable react/prop-types */
import { IoAlertCircle } from "react-icons/io5";

export const ErrorAlert = ({ message, ...props }) => {
  return (
    <div className={`flex flex-row items-center text-white bg-red-500 p-1 rounded-md`} {...props}>
      <IoAlertCircle className="text-white" />
      <p className="text-xs ml-1">{message}</p>
    </div>
  );
};

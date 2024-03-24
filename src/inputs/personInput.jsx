import { BsPersonFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const PersonInput = ({ label, id, type, ...rest }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-white" htmlFor={id}>
        {label}
      </label>
      <div className=" w-fit absolute top-8 left-2.5">
        <BsPersonFill  size={23} color="#167563" />
      </div>
      <input
        type={type}
        id={id}
        className="mt-1 p-2 pl-10 border rounded-full w-80 text-black font-semibold focus:outline-none bg-white
        "
        {...rest}
      ></input>
    </div>
  );
};

export default PersonInput;

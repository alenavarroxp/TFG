import { MandatoryText } from "../components/MandatoryText";

/* eslint-disable react/prop-types */
const SelectInput = ({ name, list, onChange }) => {
  return (
    <div className="ml-5 mr-10 mt-2">
      <MandatoryText text={name}/>
      <select
        id={name}
        name={name}
        className="w-full select select-sm text-left rounded-xl text-md text-[#167563] font-semibold focus:outline-none"
        onChange={onChange}
      >
        {list.map((item, index) => (
          <option
            key={index}
            value={item}
            className="text-[#167563] font-semibold "
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

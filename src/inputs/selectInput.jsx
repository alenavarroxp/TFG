import { LuAsterisk } from "react-icons/lu";
/* eslint-disable react/prop-types */
const SelectInput = ({ name, list, onChange}) => {
  return (<div className="ml-5 mr-10 mt-2">
      <div className="flex-row flex ">
        <label htmlFor={name} className="font-semibold text-xl border-b-2 mb-2">
          {name}
        </label>
        <LuAsterisk className="mt-1" size={14} />
      </div>
      <select id={name} name={name} className="w-44 select select-sm text-left rounded-xl text-md text-[#167563] font-semibold focus:outline-none" onChange={onChange}>
        {list.map((item, index) => (
          <option key={index} value={item} className="text-[#167563] font-semibold ">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

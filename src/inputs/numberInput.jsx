import { useState } from "react";

export const NumberInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      maxLength={4}
      max={10}
      min={0} // Ajusta la longitud máxima según tus necesidades
      className="ml-1 rounded-full w-12 text-[#167563] text-center font-semibold focus:outline-none"
    />
  );
};

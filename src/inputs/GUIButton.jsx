/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { FaUsers } from 'react-icons/fa';

const GUIButton = ({ id, onClick, onKeyDown, icon, props }) => {
  return (
    <button
      id={id}
      className={`text-white font-bold rounded-full p-4 border-white border-2 pointer-events-auto focus:outline-none ${props}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {icon}
    </button>
  );
};

export default GUIButton;

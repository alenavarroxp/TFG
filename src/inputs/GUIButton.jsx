/* eslint-disable react/prop-types */

const GUIButton = ({
  id,
  onClick,
  onKeyDown,
  icon,
  label,
  props,
  labelProps,
}) => {
  return (
    <button
      id={id}
      className={`relative text-white font-bold rounded-full p-4 border-white border-2 pointer-events-auto focus:outline-none ${props}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className="relative group">
  {icon}
  <span
    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-black rounded-full ${labelProps} whitespace-nowrap `}
  >
    <p className="m-auto text-xs">{label}</p>
  </span>
</div>

    </button>
  );
};

export default GUIButton;


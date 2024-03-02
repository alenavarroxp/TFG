// eslint-disable-next-line react/prop-types
const ImageOption = ({ htmlFor, alt, imageUrl, label, isActive, onClick }) => {
  return (
    <div className="animate__animated items-center flex flex-col">
      <input
        type="checkbox"
        id={htmlFor}
        name={htmlFor}
        className="hidden"
        disabled={!isActive} // Desactiva el input si no está activo
      />
      <label htmlFor={htmlFor} className="relative cursor-pointer">
        <div 
          className={`w-24 h-24 flex bg-[#E1E1E1] items-center justify-center rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${isActive ? 'opacity-100' : 'opacity-50'}`}
          onClick={() => onClick(htmlFor)} // Llama a la función onClick con el htmlFor correspondiente
        >
          <img
            src={imageUrl}
            alt={alt}
            className={`w-[72px] h-[72px] ${htmlFor =="teacher" ? 'mt-2': 'mt-4'} drop-shadow-xl `}
          />
          <div className="absolute inset-0 rounded-full ring ring-yellow-400 opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none"></div>
        </div>
      </label>
      <h1 className={`mt-1 lg:text-lg  font-semibold ${isActive ? 'opacity-100' : 'opacity-50'}`}>{label}</h1>
    </div>
  );
}

export default ImageOption;

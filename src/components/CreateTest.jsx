// eslint-disable-next-line react/prop-types
export const CreateTest = ({ onClick }) => {
  return (
    <div
      className="w-full min-h-16 flex items-center justify-center absolute bottom-4 cursor-pointer pointer-events-auto"
      onClick={onClick}
    >
      <div className="bg-white text-[#167563] p-5 px-10 font-semibold text-xl rounded-3xl">
        Crear actividad
      </div>
    </div>
  );
};

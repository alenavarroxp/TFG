// eslint-disable-next-line react/prop-types
export const CreateTest = ({ onClick, activityIsModifying, style }) => {
  return (
    <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
      <div
        className={`bg-white text-[#167563] p-3 px-10 font-semibold text-xl rounded-3xl pointer-events-auto cursor-pointer ${style}`}
        onClick={onClick}
      >
        {!activityIsModifying ? "Crear Actividad" : "Modificar Actividad"}
      </div>
    </div>
  );
};

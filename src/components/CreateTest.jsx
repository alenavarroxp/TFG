// eslint-disable-next-line react/prop-types
export const CreateTest = ({ onClick, activityIsModifying }) => {
  return (
    <div className="w-full h-full flex flex-1 flex-col items-end justify-end">
      <div
        className="bg-white text-[#167563] p-3 px-10 font-semibold text-xl rounded-3xl pointer-events-auto cursor-pointer"
        onClick={onClick}
      >
        {!activityIsModifying ? "Crear Actividad" : "Modificar Actividad"}
      </div>
    </div>
  );
};

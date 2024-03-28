export const ChooseLocationHeader = () => {
  return (
    <div className="absolute w-full flex flex-col items-center justify-center text-white rounded-b-full border-b-4 border-[#035B4A] min-h-20 bg-[#167563]">
      <p className="font-bold lg:text-2xl md:text-xl sm:text-lg text-md">Selecciona una ubicación en el mundo</p>
      <p className="font-semibold lg:text-md md:text-sm text-xs ml-2">
        En la ubicación que selecciones aparecerá la actividad
      </p>
    </div>
  );
};

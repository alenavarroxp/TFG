export const NoSelectedChat = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <p className="xl:text-2xl font-semibold lg:text-xl text-lg">No has seleccionado ningún chat</p>
        <img
          src="/img/noselectedchat.png"
          alt="No selected chat"
          className="xl:w-40 mt-5 mb-5 lg:w-32 w-28 pointer-events-none"
        />
        <p className="font-medium xl:text-xl xl:w-[400px] text-center lg:w-80 lg:text-md md:text-sm md:w-72 sm:text-sm sm:w-64 text-xs   ">Pulsa en algún usuario de la izquierda para abrir su chat</p>
      </div>
    </div>
  );
};

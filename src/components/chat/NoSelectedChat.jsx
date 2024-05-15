export const NoSelectedChat = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <p className="text-2xl font-semibold">No has seleccionado ningún chat</p>
        <img
          src="/img/noselectedchat.png"
          alt="No selected chat"
          className="w-40 mt-5 mb-5"
        />
        <p className="font-medium text-xl w-96 text-center">Pulsa en algún usuario de la izquierda para abrir su chat</p>
      </div>
    </div>
  );
};

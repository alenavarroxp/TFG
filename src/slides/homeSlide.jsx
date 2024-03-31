const HomeSlide = () => {
  return (
    <div
      id="homeSlide"
      className="carousel-item relative h-screen w-screen bg-[#167563] flex flex-col justify-center items-center"
    >
      <div className="flex top-1/2 bottom-1/2 justify-center flex-col items-center w-full text-white">
        <h2 className="text-4xl xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl font-bold text-white m-2 px-4"> EntornoCRA</h2>
        <p className="text-sm xl:text-2xl lg:text-xl md:text-md font-bold text-white m-1 break-words px-4 text-center">¡Sumérgete en un mundo de aprendizaje interactivo y entretenimiento!</p>
      </div>
      <div className="mt-8 w-full items-center justify-center flex px-4 ">
        <a href='#loginSlide'
          className="px-6 xl:py-5 lg:py-4 py-3 w-fit shadow-lg lg:text-2xl md:text-xl text-lg  font-bold bg-gray-200 rounded-full p-3 m-1 flex-row justify-center items-center text-black"
        >
          ¡Comenzar la aventura!
        </a>
      </div>
    </div>
  );
};

export default HomeSlide;

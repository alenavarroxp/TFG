const HomeSlide = () => {
  return (
    <div
      id="homeSlide"
      className="carousel-item relative h-screen w-screen bg-[#167563]"
    >
      <div className="flex top-1/2 bottom-1/2 justify-center flex-col items-center w-full text-white">
        <h2 className="text-4xl lg:text-6xl md:text-5xl font-bold text-white m-2"> EntornoCRA / EduCRA / MundoCRA</h2>
        <p className="text-sm lg:text-xl md:text-md font-bold text-white m-1 break-words">¡Sumérgete en un mundo de aprendizaje interactivo y entretenimiento!</p>
      </div>
      <div className="absolute bottom-1/4 w-full items-center justify-center flex">
        <a href='#loginSlide'
          className="px-6 w-fit shadow-lg text-2xl font-bold bg-gray-200 rounded-full p-3 m-1 flex-row justify-center items-center"
        >
          ¡Comenzar la aventura!
        </a>
      </div>
    </div>
  );
};

export default HomeSlide;

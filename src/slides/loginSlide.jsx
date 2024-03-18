import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import ImageOption from "../inputs/imageOption";
import PersonInput from "../inputs/personInput";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";
import { useSetAtom } from "jotai";
import { userAtom } from "../context/atoms/userAtom";
import { socket } from "../utils/socket";

const LoginSlide = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [userName, setUserName] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const setUser = useSetAtom(userAtom);
  const navigation = useNavigate();

  const handleImageOptionClick = (htmlFor, isProfessor) => {
    if (activeOption === htmlFor) {
      setActiveOption(null);
      setIsProfessor(false);
    } else {
      setActiveOption(htmlFor);
      setIsProfessor(isProfessor);
    }
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);  
  };

  const handleLoginClick = () => {
    setUser({ userName, isProfessor });
    socket.emit("newUserWorld", { userName, isProfessor })
    navigation("/babylon");
  };

  const cleanOption = () => {
    setActiveOption(null);
    setUserName("");
    setIsProfessor(false);
  };

  const isButtonDisabled = !userName || !activeOption;

  return (
    <div
      id="loginSlide"
      className="carousel-item relative h-screen w-screen bg-[#167563]"
    >
      <div className="flex justify-start flex-col items-center w-full text-white">
        <div className="items-center justify-center flex flex-col lg:mt-14 mt-10">
          <p className="font-bold mt-16 lg:text-2xl md:text-xl sm:text-lg px-4 text-center">
            Antes de comenzar, ¿qué{" "}
            <span className="text-white underline">rol</span> te gustaría
            seleccionar para acceder al mundo?
          </p>
          <div>
            <div className="flex justify-evenly mt-8">
              <ImageOption
                htmlFor="student"
                alt="student"
                imageUrl="img/studentOption.png"
                label="Estudiante"
                isActive={activeOption === "student"}
                onClick={() => handleImageOptionClick("student", false)}
              />
              <ImageOption
                htmlFor="teacher"
                alt="teacher"
                imageUrl="img/teacherOption.png"
                label="Docente"
                isActive={activeOption === "teacher"}
                onClick={() => handleImageOptionClick("teacher", true)}
              />
            </div>

            <h1 className="font-bold mt-6 lg:text-2xl md:text-xl sm:text-lg px-4 text-center">
              ¿Cuál es el{" "}
              <span className="text-white underline">nombre de usuario</span>{" "}
              que deseas utilizar?
            </h1>
            <div>
              <div className="flex items-center justify-center mt-4">
                <div>
                  <PersonInput
                    label="Nombre de usuario"
                    id="usernameInput"
                    type="text"
                    name="username"
                    placeholder="Introduce tu nombre de usuario"
                    onChange={handleUserNameChange}
                    value={userName}
                  />
                </div>
              </div>
            </div>

            <div className="absolute flex justify-center bottom-16 left-0 right-0 px-4">
              <button
                id="loginButton"
                className="disabled:pointer-events-none disabled:bg-gray-400 flex items-center justify-center bg-white text-lg lg:text-xl md:text-md font-bold rounded-full shadow-lg px-16 lg:px-20 py-3 lg:py-4 text-gray-800 transition-transform hover:scale-105 hover:shadow-xl relative"
                disabled={isButtonDisabled}
                onClick={handleLoginClick}
              >
                Entrar al mundo
                {isButtonDisabled ? (
                  <HiLockClosed className="right-6 absolute" size={25} />
                ) : (
                  <HiLockOpen className="right-6 absolute" size={25} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex justify-center top-2 left-2 ">
        <a
          onClick={cleanOption}
          href="#homeSlide"
          className="px-4 text-lg font-bold shadow-lg bg-gray-200 rounded-full p-2 m-1 flex flex-row justify-center items-center"
        >
          <MdOutlineArrowBack className="mr-1" />
          Volver
        </a>
      </div>
    </div>
  );
};

export default LoginSlide;

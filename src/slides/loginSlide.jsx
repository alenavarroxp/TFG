// loginSlide.jsx
import { Component } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import ImageOption from "./imageOption";
import PersonInput from "../inputs/personInput";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";

export default class loginSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: null,
      userName: "",
      isProfessor: false,
    };
  }

  // Función para manejar el clic en el ImageOption
  handleImageOptionClick = (htmlFor, isProfessor) => {
    const { activeOption } = this.state;

    if (activeOption === htmlFor) {
      this.setState({ activeOption: null, isProfessor: false });
    } else {
      this.setState({ activeOption: htmlFor, isProfessor });
    }
  };

  handleUserNameChange = (event) => {
    this.setState({ userName: event.target.value });
  };

  handleLoginClick = () => {};

  cleanOption = () => {
    this.setState({ activeOption: null, userName: "", isProfessor: false });
  };

  render() {
    const { activeOption, userName } = this.state;
    const isButtonDisabled = !userName || !activeOption;

    return (
      <div
        id="loginSlide"
        className="carousel-item relative h-screen w-screen bg-[#167563]"
      >
        <div className="flex justify-start flex-col items-center w-full text-white">
          <div className="items-center justify-center flex flex-col mt-24">
            <p className="font-bold mt-16 text-2xl">
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
                  onClick={() => this.handleImageOptionClick("student", false)}
                />
                <ImageOption
                  htmlFor="teacher"
                  alt="teacher"
                  imageUrl="img/teacherOption.png"
                  label="Docente"
                  isActive={activeOption === "teacher"}
                  onClick={() => this.handleImageOptionClick("teacher", true)}
                />
              </div>

              <h1 className="font-bold mt-6 text-2xl">
                ¿Cuál es el{" "}
                <span className="text-white underline">nombre de usuario</span>{" "}
                que deseas utilizar?
              </h1>
              <div>
                <div className="flex items-center justify-center mt-4 w-full">
                  <div className="flex items-center justify-center w-full relative ">
                    <PersonInput
                      label="Nombre de usuario"
                      id="usernameInput"
                      type="text"
                      name="username"
                      placeholder="Introduce tu nombre de usuario"
                      onChange={this.handleUserNameChange}
                    />
                  </div>
                </div>
              </div>

              <div className="absolute flex justify-center bottom-16 left-0 right-0 ">
                <button
                  id="loginButton"
                  className="disabled:pointer-events-none disabled:bg-gray-400 flex items-center justify-center bg-white text-lg lg:text-xl md:text-md font-bold rounded-full shadow-lg px-16 lg:px-20 py-3 lg:py-4 text-gray-800 transition-transform hover:scale-105 hover:shadow-xl relative"
                  disabled={isButtonDisabled}
                  onClick={this.handleLoginClick}
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
            onClick={this.cleanOption}
            href="#homeSlide"
            className="px-4 text-lg font-bold shadow-lg bg-gray-200 rounded-full p-2 m-1 flex flex-row justify-center items-center"
          >
            <MdOutlineArrowBack className="mr-1" />
            Volver
          </a>
        </div>
      </div>
    );
  }
}

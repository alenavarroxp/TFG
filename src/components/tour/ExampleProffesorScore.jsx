export const ExampleProffesorScore = () => {
  return (
    <div className="mt-2 text-justify font-normal text-xs bg-gray-800 rounded-lg text-white p-2 px-3">
              Si tenemos una pregunta con puntuación 1 y 5 respuestas de las
              cuales 2 opciones son correctas y marcamos las 2 opciones correctas y
              1 opción incorrecta:
              <div>
                <div className=" w-full flex justify-center items-center">
                  <div className="mr-2">
                    <p>Respuesta</p>
                    <span className="text-green-500 font-semibold">
                      CORRECTA
                    </span>
                  </div>
                  =
                  <div className="flex flex-row justify-center items-center text-[11px] ml-2 mr-2">
                    <div className="flex flex-col items-center">
                      <p>1</p>
                      <div className="border-t border-white w-3 my-1"></div>
                      <p>2</p>
                    </div>
                    <div>
                      <p className="text-[11px] ml-1">* 2</p>
                    </div>
                  </div>
                  = 1
                </div>
                <div className=" w-full flex justify-center items-center mt-2">
                  <div className="mr-2">
                    <p>Respuesta</p>
                    <span className="text-red-500 font-semibold">
                      INCORRECTA
                    </span>
                  </div>
                  =
                  <div className="flex flex-row justify-center items-center text-[11px] ml-2">
                    <div className="flex flex-col items-center mr-2">
                      <p>1</p>
                      <div className="border-t border-white w-3 my-1"></div>
                      <p>2</p>
                    </div>
                  </div>
                  <p className="mt-1 mr-2">* </p>
                  <p> (-1/2) = - 0.25</p>
                </div>
                <div className="flex items-center justify-center py-2">
                  Resultado total =<div className="mr-2 ml-2">1</div> +{" "}
                  <div className="mr-2 ml-2">(-0.25)</div>= 0.75
                </div>
              </div>
            </div>
  )
}

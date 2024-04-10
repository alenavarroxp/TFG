/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Joyride from "react-joyride";
import { generateSteps } from "../utils/steps";

export const TourComponent = ({ setTourVisible, questions }) => {
  const [run, setRun] = useState(false);
  const steps = generateSteps(questions.length)
  useEffect(()=>{
    setRun(true)
  },[])
  

  const handleJoyrideCallback = (data) => {
    if (
      data.action === "close" ||
      data.status === "finished" ||
      data.status === "skipped"
    ) {
      setTourVisible(false);
    }
  };

  return (
    <>
      <div>
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          disableOverlayClose={true}
          disableScrolling={true}
          spotlightPadding={4}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: "#1890ff",
            },
          }}
          locale={{
            last: "Finalizar",
            next: "Siguiente",
            skip: "Saltar",
            back: "Atrás",
          }}
        />
      </div>
    </>
  );
};

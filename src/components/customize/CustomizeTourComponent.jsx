import Joyride from "react-joyride";
import { generateCustomizeSteps } from "../../utils/tourSteps";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const CustomizeTourComponent = ({ setTourVisible }) => {
  const [run, setRun] = useState(false);
  const steps = generateCustomizeSteps();
  useEffect(() => {
    setRun(true);
  }, []);

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
    </>
  );
};

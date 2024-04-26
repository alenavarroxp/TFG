/* eslint-disable react/prop-types */
import { MdOutlineColorLens } from "react-icons/md";
import { CustomizeTab } from "./CustomizeTab";
import { LiaHatCowboySolid } from "react-icons/lia";
import { PurseComponent } from "./PurseComponent";

export const CustomizeHeader = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex justify-start items-center mt-3 relative">
      <CustomizeTab
        text="Colores"
        icon={<MdOutlineColorLens />}
        selectedTab={selectedTab === "Colores"}
        onClick={() => setSelectedTab("Colores")}
      />
      <CustomizeTab
        text="Accesorios"
        icon={<LiaHatCowboySolid />}
        selectedTab={selectedTab === "Accesorios"}
        onClick={() => setSelectedTab("Accesorios")}
      />
      <PurseComponent />
    </div>
  );
};

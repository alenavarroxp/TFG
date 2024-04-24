import { MdOutlineColorLens } from "react-icons/md";
import { CustomizeTab } from "./CustomizeTab";
import { LiaHatCowboySolid } from "react-icons/lia";
import { useState } from "react";
import { PurseComponent } from "./PurseComponent";

export const CustomizeHeader = () => {
  const [selectedTab, setSelectedTab] = useState("Colores");

  return (
    <div className="flex justify-start items-center mt-3 relative">
      <CustomizeTab 
        text="Colores" 
        icon={<MdOutlineColorLens />} 
        selectedTab={selectedTab === "Colores"} 
        onClick={() => setSelectedTab("Colores")}
      />
      <CustomizeTab 
        text="Cosméticos" 
        icon={<LiaHatCowboySolid />} 
        selectedTab={selectedTab === "Cosméticos"} 
        onClick={() => setSelectedTab("Cosméticos")}
      />
      <PurseComponent/>
    </div>
  );
};


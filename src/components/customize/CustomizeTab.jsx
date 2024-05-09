/* eslint-disable react/prop-types */
export const CustomizeTab = ({ text, icon, selectedTab, onClick ,style}) => {
    return (
      <div
        className={`flex justify-center items-center px-6 py-1 rounded-t-xl text-2xl cursor-pointer ${
          selectedTab ? "bg-[#1E574B]" : "bg-[#167563]"
        } ${style} `}
        onClick={onClick}
      >
        <div className="mr-3 font-semibold border-b-2 border-b-white">{text}</div>
        <div>{icon}</div>
      </div>
    );
  };

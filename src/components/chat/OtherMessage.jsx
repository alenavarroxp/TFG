/* eslint-disable react/prop-types */
const OtherMessage = ({ receptor: emisor, message, date }) => {
  return (
    <div className="flex justify-start items-start flex-col w-full">
      <div className="flex items-center">
      <div className=" rounded-full h-14 w-14 bg-white flex items-center justify-center ml-4 text-[#5F6368] font-semibold text-xl">
          {emisor.userName ? emisor.userName.substring(0, 2) : ""}
        </div>
        <div className="bg-[#d6d6d6] p-2 m-2 rounded-2xl text-black text-md ">
          <p>{message}</p>
        </div>
        
      </div>

      <p className="lg:text-sm ml-4 mt-1 text-xs">{emisor.userName} (Tú) · {date}</p>
    </div>
  );
};

export default OtherMessage;

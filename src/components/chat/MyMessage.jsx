/* eslint-disable react/prop-types */
export const MyMessage = ({ emisor, message, date }) => {
  return (
    <div className="flex justify-end items-end flex-col w-full mt-2">
      <div className="flex items-center">
        <div className="bg-[#3B82F6] p-2 m-2 rounded-2xl text-white text-md ">
          <p>{message}</p>
        </div>
        <div className=" rounded-full min-h-14 min-w-14 max-h-14 max-w-14 bg-white flex items-center justify-center mr-4 text-[#5F6368] font-semibold text-xl">
          {emisor.userName ? emisor.userName.substring(0, 2) : ""}
        </div>
      </div>

      <p className="lg:text-sm mr-4 mt-1 text-xs">{emisor.userName} (Tú) · {date}</p>
    </div>
  );
};

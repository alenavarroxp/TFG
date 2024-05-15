import { UserInfo } from "./UserInfo";
import { BiExit } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
export const ChatHeader = ({ selectedChat, setSelectedChat }) => {
  return (
    <div className="bg-[#D9D9D9] h-fit w-full rounded-t-xl p-4 flex justify-between items-center">
      <UserInfo user={selectedChat} photoStyle="" nameStyle="" />
      <button onClick={() => setSelectedChat(false)}>
        <BiExit size={24} />
      </button>
    </div>
  );
};

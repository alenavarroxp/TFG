import { Chat } from "./Chat";
import { ChatTitle } from "./ChatTitle";
import { ChatUsers } from "./ChatUsers";

// eslint-disable-next-line react/prop-types
export const ChatComponent = ({ setChatScreen }) => {
  return (
    <div className="w-1/2 flex flex-1 flex-col bg-white text-black lg:min-w-[566px] md:min-w-[560px] sm:min-w-[550px] min-w-[540px]  ">
      <ChatTitle setChatScreen={setChatScreen} />
      <div className="flex flex-1">
        <ChatUsers />
        <Chat/>
      </div>
    </div>
  );
};

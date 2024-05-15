import { ChatTitle } from "./ChatTitle";
import { ChatUsers } from "./ChatUsers";

// eslint-disable-next-line react/prop-types
export const ChatComponent = ({ setChatScreen }) => {
  return (
    <div className="w-1/2 flex flex-1 flex-col bg-white text-black">
      <ChatTitle setChatScreen={setChatScreen} />
      <div className="flex-1 flex">
        <ChatUsers />
      </div>
    </div>
  );
};

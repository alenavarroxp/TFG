import { ChatComponent } from "./ChatComponent";

// eslint-disable-next-line react/prop-types
export const ChatScreen = ({ setChatScreen }) => {
  return (
    <div className="min-h-full w-full flex flex-col absolute bg-[#101010] bg-opacity-25 text-white overflow-x-hidden overflow-y-hidden custom-scrollbar">
      <ChatComponent setChatScreen={setChatScreen} />
    </div>
  );
};

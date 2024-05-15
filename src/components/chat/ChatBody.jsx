import { ChatInput } from "./ChatInput";

// eslint-disable-next-line react/prop-types
export const ChatBody = ({ selectedChat }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-[#FAFAFA] h-full">ChatBody</div>
      <ChatInput selectedChat={selectedChat}/>
    </div>
  );
};

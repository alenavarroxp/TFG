import { ListUserChat } from "./ListUserChat";
import { SearchUser } from "./SearchUser";

export const ChatUsers = () => {
  return (
    <div className="w-2/5 rounded-xl ml-4 mb-4 mr-4 bg-[#D9D9D9]">
      <SearchUser />
      <ListUserChat/>
    </div>
  );
};

/* eslint-disable react/prop-types */

export const UserInfo = ({ user }) => {
  return (
    <div className="flex items-center">
      <div className="rounded-full h-14 w-14 bg-white flex items-center justify-center mr-4 text-[#5F6368] font-semibold text-xl">
        {user.name ? user.name.substring(0, 2) : ""}
      </div>
      <div className="w-full flex-1 flex flex-col">
        <p className="font-semibold text-lg">{user.name}</p>
        <p className="text-sm">{user.role}</p>
      </div>
    </div>
  );
};


import { BsChatLeft, BsThreeDots } from "react-icons/bs";

export const UserList = () => {
  return (
    <ul id="usersList" className="text-white w-full mt-2">
          <li className="flex items-center border-b border-white p-2 mx-3">
            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center mr-2 text-black font-semibold">
              AN
            </div>
            <div>
              <p className="font-semibold">Nombre de usuario</p>
              <p className="text-sm">Teacher</p>
            </div>
            <button className="btn btn-sm btn-circle ml-auto">
              <BsChatLeft color="black" />
            </button>
            <button className="btn btn-sm btn-circle ml-3">
              <BsThreeDots color="black" />
            </button>
          </li>
        </ul>
  )
}

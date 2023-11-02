// import { FaWarehouse,FaEnvelope, FaRegIdCard, FaSignOutAlt, FaUsersCog } from 'react-icons/fa';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  
  const handleSignOut = async () => {
    
    try {
      dispatch(signOutUserStart());
      const res = await fetch('api/auth/signout/');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <aside className="absolute top-0 left-0 flex flex-col h-screen duration-300 ease-linear -translate-x-full border z-9999 w-96 overflow-y-hidde bg-slate-900 dark:bg-boxdark lg:static lg:translate-x-0">
    <div className="w-full">
        <h1 className="p-4 text-center text-white">Dashboard</h1>
        <div className="p-6 list-outside">
            <div className="flex p-4 mb-6 rounded-md hover:border hover:text-white text-slate-500 "><span>Profile</span></div>
            <div className="flex p-4 mb-6 rounded-md hover:border hover:text-white text-slate-500 "><span>Listings</span></div>
            <div className="flex p-4 mb-6 rounded-md hover:border hover:text-white text-slate-500 "><span>Projects</span></div>
            <div className="flex p-4 mb-6 rounded-md hover:border hover:text-white text-slate-500 "><span>Inbox</span> </div>
            <div className="flex p-4 mb-6 rounded-md hover:border hover:text-white text-slate-500 "><span>Settings</span> </div>
            <div className="flex p-4 mb-6 rounded-md hover:border hover:text-white text-slate-500 "><button onClick={handleSignOut}><span>Logout</span></button></div>
        </div>
    </div>
    </aside>
  )
}

// import { FaWarehouse,FaEnvelope, FaRegIdCard, FaSignOutAlt, FaUsersCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside 
      className="absolute top-0 left-0 flex flex-col h-screen duration-300 ease-linear -translate-x-full border w-60 z-9999 overflow-y-hidde bg-slate-900 dark:bg-boxdark lg:static lg:translate-x-0">
    <div className="w-full">
        <h1 className="p-4 text-center bg-slate-600 text-white">Realtor Dashboard</h1>
        <div className="mt-12 list-outside">
          <div className="flex p-4 mb-6 hover:bg-violet-600 active:bg-violet-700 focus:outline-none hover:text-white text-slate-500 "><Link to="/listings"><span>Listings</span></Link></div>
          <div className="flex p-4 mb-6 hover:bg-violet-600 active:bg-violet-700 focus:outline-none hover:text-white text-slate-500 "><span>Analytics</span></div>
          <div className="flex p-4 mb-6 hover:bg-violet-600 active:bg-violet-700 focus:outline-none hover:text-white text-slate-500 "><span>Projects</span></div>
          <div className="flex p-4 mb-6 hover:bg-violet-600 active:bg-violet-700 focus:outline-none hover:text-white text-slate-500 "><span>Inbox</span> </div>
        </div>
    </div>
    </aside>
  )
}

// import { FaWarehouse,FaEnvelope, FaRegIdCard, FaSignOutAlt, FaUsersCog } from 'react-icons/fa';
export default function Sidebar() {
  return (
    <aside className="border absolute left-0 top-0 z-9999 flex h-screen w-96 flex-col overflow-y-hidde bg-slate-900  duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full">
    <div className="w-full">
        <h1 className="text-center text-white p-4">Dashboard</h1>
        <div className="p-6 list-outside">
            <div className="flex mb-6 hover:border rounded-md p-4 hover:text-white text-slate-500 "><span>Profile</span></div>
            <div className="flex mb-6 hover:border rounded-md p-4 hover:text-white text-slate-500 "><span>Properties</span></div>
            <div className="flex mb-6 hover:border rounded-md p-4 hover:text-white text-slate-500 "><span>Projects</span></div>
            <div className="flex mb-6 hover:border rounded-md p-4 hover:text-white text-slate-500 "><span>Inbox</span> </div>
            <div className="flex mb-6 hover:border rounded-md p-4 hover:text-white text-slate-500 "><span>Settings</span> </div>
            <div className="flex mb-6 hover:border rounded-md p-4 hover:text-white text-slate-500 "><span>Logout</span> </div>
        </div>
    </div>
    </aside>
  )
}

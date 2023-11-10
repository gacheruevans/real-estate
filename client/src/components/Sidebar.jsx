// import { FaWarehouse,FaEnvelope, FaRegIdCard, FaSignOutAlt, FaUsersCog } from 'react-icons/fa';
import { useState, createContext, useContext } from 'react';
import {ChevronLeft, ChevronRight, MoreVertical} from 'lucide-react';

const SidebarContext = createContext();
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-screen duration-300 ease-linear -translate-x-full lg:static lg:translate-x-0">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="../../public/images/logoipsum-297.svg"
            className={`
              overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
            }`}
            alt="company logo" 
          />
          <button 
            onClick={() => setExpanded( curr => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            { expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{expanded}}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="../../public/images/user.png"
            alt="avatar"
            className="w-10 h-10 rounded-md"
          />
          <div 
            className={`
              flex justify-between items-center 
              overflow-hidden transition-all ${ expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Evans Gacheru</h4>
              <span className="text-xs text-gray-600">evans.gacheru.munene@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const {expanded} = useContext(SidebarContext);
  return (
    <li 
      className={`
        relative flex items-center py-2 px-3 my-1 
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active 
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-500 hover:text-white text-gray-600"
        }
      `}
    >
      {icon}
      <span 
        className={`
          overflow-hidden transition-all ${ 
            expanded ? "w-52 ml-3" : "w-0"  
        }`}
      >
        {text}
      </span>
      {alert && (
        <div className= {`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
          expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div className={`
          absolute left-full roounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}>
          {text}
        </div>
      )}
    </li>
  )
}

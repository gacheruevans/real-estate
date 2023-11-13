import { Link } from 'react-router-dom';
import Sidebar, { SidebarItem } from "../components/Sidebar";
import {
    Archive,
    Inbox,
    LandPlot,
    Home,
    LifeBuoy,
    Receipt,
    UserCircle,
    BarChart3,
    Settings,
    LayoutDashboard,
} from "lucide-react";
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <>
      <div className="flex w-full py-4 columns-2">
        <Sidebar>
          <Link to="/dashboard">
            <SidebarItem 
                icon={<LayoutDashboard size={20}/>}
                text="Dashboard"
                alert
                active
            />
          </Link>
          <Link to="/dashboard/analytics"><SidebarItem icon={<BarChart3 size={20} />} text="Analytics"/></Link>
          <Link to="/dashboard/realtors"><SidebarItem icon={<UserCircle size={20} />} text="Realtors" /></Link>
          <Link to="/dashboard/listings"><SidebarItem icon={<Home size={20} />} text="listings" /></Link>
          <Link to="/dashboard/plots"><SidebarItem icon={<LandPlot size={20} />} text="Plots" /></Link>
          <Link to="/dashboard/requests"><SidebarItem icon={<Inbox size={20} />} text="Requests" /></Link>
          <Link to="/dashboard/billings"><SidebarItem icon={<Receipt size={20} />} text="Billings" /></Link>
          <Link to="/dashboard/archieve"><SidebarItem icon={<Archive size={20} />} text="Archieve" /></Link>
          <hr className="my-3" />
          <Link to="/dashboard/settings"><SidebarItem icon={<Settings size={20} />} text="Settings"  /></Link>
          <Link to="/dashboard/help"><SidebarItem icon={<LifeBuoy size={20} />} text="Help"  /></Link>
        </Sidebar>
        <main className="max-w-4xl p-3 mx-auto">
          <div className="p-4 w-screen">
            <div className="" >
              <h1 className="">Welcome to Realty</h1>
              <p className="text-slate-500 text-sm">Hi {currentUser.firstname}. Welcome back!</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

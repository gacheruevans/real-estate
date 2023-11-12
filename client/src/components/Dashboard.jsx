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

export default function Dashboard() {
  return (
    <div className="flex w-full gap-4 py-4 columns-2 ">
      <Sidebar>
        <Link to="/dashboard">
          <SidebarItem 
              icon={<LayoutDashboard size={20}/>}
              text="Dashboard"
              alert
          />
        </Link>
        <Link to="/dashboard/analytics"><SidebarItem icon={<BarChart3 size={20} />} text="Analytics" active/></Link>
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
    </div>
  );
}

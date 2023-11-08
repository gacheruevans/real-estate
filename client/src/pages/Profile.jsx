import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";


export default function Profile() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Dashboard />
    </div>
  )
}

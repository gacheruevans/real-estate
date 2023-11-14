import { useRef, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
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
import mapboxgl from "mapbox-gl";

export default function ListingDetails() {
    const params = useParams();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(36.611686);
    const [lat, setLat] = useState(-1.264090);
    const [zoom, setZoom] = useState(11);
    
    const [listingDetailsError, setlistingDetailsError] = useState(false);
    const [listingDetails, setListingDetails] = useState([]);

    useEffect(() => {
        const fetchListing = async () => {
            try{
                setlistingDetailsError(false);
                
                const listingId = params.listingId;
                const res = await fetch(`/api/listing/getListing/${listingId}`);
                const data = await res.json();

                if(data.success === false) {
                    setlistingDetailsError(true);
                    return;
                }
                
                setlistingDetailsError(false);
                setListingDetails(data);
            } catch (error) {
                setlistingDetailsError(true);
            }
        };

        fetchListing();

        if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
      }, [lat, lng, zoom, params.listingId]);

      const addDefaultSrc = (ev) => {
        ev.target.src = "../../public/images/home.png";
      };
  return (
    <>
        <div className="flex w-full columns-2">
            <Sidebar>
                <Link to="/dashboard">
                    <SidebarItem 
                        icon={<LayoutDashboard size={20}/>}
                        text="Dashboard"
                    />
                </Link>
                <Link to="/dashboard/analytics"><SidebarItem icon={<BarChart3 size={20} />} text="Analytics" /></Link>
                <Link to="/dashboard/realtors"><SidebarItem icon={<UserCircle size={20} />} text="Realtors" /></Link>
                <Link to="/dashboard/listings"><SidebarItem icon={<Home size={20} />} text="listings" alert active/></Link>
                <Link to="/dashboard/plots"><SidebarItem icon={<LandPlot size={20} />} text="Plots" /></Link>
                <Link to="/dashboard/requests"><SidebarItem icon={<Inbox size={20} />} text="Requests" /></Link>
                <Link to="/dashboard/billings"><SidebarItem icon={<Receipt size={20} />} text="Billings" /></Link>
                <Link to="/dashboard/archieve"><SidebarItem icon={<Archive size={20} />} text="Archieve" /></Link>
                <hr className="my-3" />
                <Link to="/dashboard/settings"><SidebarItem icon={<Settings size={20} />} text="Settings"  /></Link>
                <Link to="/dashboard/help"><SidebarItem icon={<LifeBuoy size={20} />} text="Help"  /></Link>
            </Sidebar>
            <div className="">
                <div ref={mapContainer} className="map-container" />
            </div>
            <div className="flex w-full min-h-screen bg-slate-800">
            </div>
        </div>
    </>
  )
}

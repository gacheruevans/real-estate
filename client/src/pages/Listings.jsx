import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiZWdhY2hlcnUiLCJhIjoiY2xvczlzZnJ6MHozcjJqbXpvNXRreW56aCJ9.fL6OWHyFGY01vWKdowHKrQ";
export default function Listings() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(36.611686);
    const [lat, setLat] = useState(-1.264090);
    const [zoom, setZoom] = useState(11);

    const {currentUser} = useSelector((state) => state.user);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);

    useEffect(() => {
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
    });

    const handleShowListings = async () => {

        try {
            setShowListingsError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if(data.success === false) {
                setShowListingsError(true);
                return;
            }
            setShowListingsError(false);
            setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
        }
    };
    
  return (
    <>
        <div className="flex w-full columns-2">
            <Sidebar>
                <Link to="/dashboard">
                    <SidebarItem 
                        icon={<LayoutDashboard size={20}/>}
                        text="Dashboard"
                        alert
                    />
                </Link>
                <Link to="/dashboard/analytics"><SidebarItem icon={<BarChart3 size={20} />} text="Analytics" /></Link>
                <Link to="/dashboard/realtors"><SidebarItem icon={<UserCircle size={20} />} text="Realtors" /></Link>
                <Link to="/dashboard/listings"><SidebarItem icon={<Home size={20} />} text="listings" active/></Link>
                <Link to="/dashboard/plots"><SidebarItem icon={<LandPlot size={20} />} text="Plots" /></Link>
                <Link to="/dashboard/requests"><SidebarItem icon={<Inbox size={20} />} text="Requests" /></Link>
                <Link to="/dashboard/billings"><SidebarItem icon={<Receipt size={20} />} text="Billings" /></Link>
                <Link to="/dashboard/archieve"><SidebarItem icon={<Archive size={20} />} text="Archieve" /></Link>
                <hr className="my-3" />
                <Link to="/dashboard/settings"><SidebarItem icon={<Settings size={20} />} text="Settings"  /></Link>
                <Link to="/dashboard/help"><SidebarItem icon={<LifeBuoy size={20} />} text="Help"  /></Link>
            </Sidebar>
            <div className="border">
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={mapContainer} className="map-container" />
            </div>
            <div className="gap-4">
                <p className="text-red-700 mt-5">{showListingsError ? "Error showing listings" : ""}</p>
                <iframe onLoad={handleShowListings} className="grid grid-rows-2 grid-flow-col gap-4 justify-center">
                { 
                    userListings && 
                        userListings.length > 0 &&
                            userListings.map((listing) => (
                                <div 
                                    key={listing._id}
                                    className="p-4" >
                                    <Link to={`/listing/${listing._id}`}>
                                        <img 
                                            src={listing.imageUrls[0]} 
                                            alt="listing cover"
                                            className="h-64 w-64 object-contain" />
                                        <p className="text-slate-700">{listing.name}</p>
                                    </Link>
                                </div>
                            ))
                }
                </iframe>
            </div>
        </div>
    </>
  )
}

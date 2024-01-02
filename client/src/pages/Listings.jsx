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
import ReactMapGL, {Marker} from "react-map-gl";
import * as process from "process";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken = "pk.eyJ1IjoiZWdhY2hlcnUiLCJhIjoiY2xvczlzZnJ6MHozcjJqbXpvNXRreW56aCJ9.fL6OWHyFGY01vWKdowHKrQ";
export default function Listings() {
    // const mapContainer = useRef(null);
    // const map = useRef(null);
    // const [lngLat, setLngLat] = useState([36.611686, -1.264090]);
    const [viewport, setViewport] = useState({
        latitude: -1.264090,
        longitude: 36.611686,
        width: "100vh",
        height: "100vh",
        zoom: 16
    });
   

    const {currentUser} = useSelector((state) => state.user);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);

    useEffect(() => {
        // if (map.current) return; // initialize map only once
        //     map.current = new mapboxgl.Map({
        //         container: mapContainer.current,
        //         style: 'mapbox://styles/mapbox/streets-v12',
        //         center: [lng, lat],
        //         zoom: zoom
        //     });

        // Set marker options.
        // const marker =  new mapboxgl.Marker({
        //     color: "#FFFFFF",
        //     draggable: false
        // }).setLngLat(lngLat);

        // marker.addTo(map.current);

        // map.current.on('move', () => {
        //     setLng(map.current.getCenter().lng.toFixed(4));
        //     setLat(map.current.getCenter().lat.toFixed(4));
        //     setZoom(map.current.getZoom().toFixed(2));
        // });

        const handleShowListings = async () => {
            try {
                setShowListingsError(false);
                const res = await fetch(`/api/user/listing/${currentUser._id}`);
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
        handleShowListings();
      }, [currentUser._id]);

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
            <ReactMapGL
                {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}
            >
                markers here
            </ReactMapGL>
            <div className="flex w-full min-h-screen bg-slate-800">
                <div className="absolute right-0 mt-2">
                    <Link 
                        to="/dashboard/create-listing" 
                        className="py-2.5 px-4 text-white uppercase rounded-lg bg-lime-600 hover:opacity-95 disabled:opacity-80"
                    >
                      Add Listing
                    </Link>
                </div>
                <p className="mt-10 text-red-700">{showListingsError ? "No listings to display" : ""}</p>
                <div className="grid justify-center grid-flow-col grid-rows-4 gap-1 mt-8">
                { 
                    userListings && 
                        userListings.length > 0 &&
                            userListings.map((listing) => (
                                <div 
                                    key={listing._id}
                                    className="m-2 bg-white rounded-md w-60" >
                                    <Link to={`/listingDetails/${listing._id}`}>
                                        <img 
                                            src={listing.imageUrls[0]} 
                                            alt="listing cover"
                                            className="items-center object-cover h-40 p-1 w-60 rounded-xl" 
                                            onError={addDefaultSrc}
                                            />
                                        <div className="">
                                            <h2 className="p-2 text-center text-gray-600">{listing.name}</h2>
                                            <p className="p-2 text-sm text-slate-700">{listing.description}</p>
                                        </div>
                                        <div>
                                            <p>{}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                }
                </div>
            </div>
        </div>
    </>
  )
}

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
import geoJson from "../data/geo.json";

mapboxgl.accessToken = "pk.eyJ1IjoiZWdhY2hlcnUiLCJhIjoiY2xxemYybzZ0MDExZDJpbGpoMDgyZHZvMSJ9.5q11xHIeWzA94kV2p-iiBg";

export default function Listings() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(36.611686);
    const [lat, setLat] = useState(-1.264090);
    const [zoom, setZoom] = useState(15);
    
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
        
        
        // Create default markers
        geoJson.features.map((feature) =>
            new mapboxgl.Marker()
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                    `<img src=${feature.properties.image} /><h2>${feature.properties.title}</h2><p>${feature.properties.description}</p>`
                    )
                )
                .addTo(map.current)
        );

        // Add a new layer to visualize the polygon.
        map.current.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine', // reference the data source
            'layout': {},
            'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
            }
        });  

        // navigation controls +/- zoom buttons
        const nav = new mapboxgl.NavigationControl();
        map.current.addControl(nav, 'top-right');
        
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        
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
    }, [currentUser._id, lng, lat, zoom]);

    const addDefaultSrc = (ev) => {
        ev.target.src = "../../images/home.png";
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
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>
        
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
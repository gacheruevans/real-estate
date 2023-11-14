import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

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

export default function ListingDetails() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try{
                setLoading(true);
                const listingId = params.listingId;
                const res = await fetch(`/api/listing/getListing/${listingId}`);
                const data = await res.json();

                if(data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchListing();

      }, [params.listingId]);

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
           
            <div className="flex w-full min-h-screen">
                {
                    loading && <p className="text-2xl text-center my-7"> Loading...</p>
                }
                {
                    error && <p className="text-2xl text-center my-7"> Oooops... Something Went Wrong!</p>
                }
                {
                    listing && !loading && !error && (
                        <>
                            <div>
                                <Link 
                                className="absolute right-0 z-10 p-3 mt-0 text-white uppercase bg-green-700 border rounded boorder-green-700 hover:shadow-lg disabled:opacity-80" 
                                to={`/update-listing/${listing._id}`}>Edit Lisitng</Link>
                            </div>
                       
                            <Swiper navigation>
                                {listing.imageUrls.map( (url) => (
                                    <SwiperSlide key={url}>
                                            <img
                                                className="h-[450px] w-[1098px] object-cover bg-no-repeat" 
                                                src={url}
                                            />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    )
                }
            </div>
        </div>
    </>
  )
}

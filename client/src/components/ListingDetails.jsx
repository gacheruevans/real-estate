import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import {MdPets} from "react-icons/md";
import Contact from "./Contact";

export default function ListingDetails() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

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
    <main>
        { loading && <p className="text-2xl text-center my-7"> Loading...</p> }
        { error && <p className="text-2xl text-center my-7"> Ooops... Something Went Wrong!</p> }
        {
            listing && !loading && !error && (
                <div>
                    <div>
                        <Link 
                        className="absolute right-0 z-10 p-3 mt-0 text-white uppercase bg-green-700 border rounded boorder-green-700 hover:shadow-lg disabled:opacity-80" 
                        to={`/update-listing/${listing._id}`}>Edit Lisitng</Link>
                    </div>
                
                    <Swiper navigation>
                        {listing.imageUrls.map( (url) => (
                            <SwiperSlide key={url}>
                                <div 
                                    className="h-[550px] border" 
                                    style={{ background:`url(${url}) center no-repeat`, backgroundSize: "cover" }}>
                                </div> 
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                        <FaShare
                        className='text-slate-500'
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                            setCopied(false);
                            }, 2000);
                        }}
                        />
                    </div>
                    {copied && (
                        <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                        Link copied!
                        </p>
                    )}
                     
                    <div className='flex flex-col max-w-4xl gap-4 p-3 mx-auto my-7'>
                        <p className='text-2xl font-semibold'>
                        {listing.name} - ${' '}
                        {listing.offer
                            ? listing.discountPrice.toLocaleString('en-US')
                            : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                        </p>
                        <p className='flex items-center gap-2 mt-6 text-sm text-slate-600'>
                        <FaMapMarkerAlt className='text-green-700' />
                        {listing.address}
                        </p>
                        <div className='flex gap-4'>
                        <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
                        {listing.offer && (
                            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                            ${+listing.regularPrice - +listing.discountPrice} OFF
                            </p>
                        )}
                        </div>
                        <p className='text-slate-800'>
                        <span className='font-semibold text-black'>Description - </span>
                        {listing.description}
                        </p>
                        <ul className='flex flex-wrap items-center gap-4 text-sm font-semibold text-green-900 sm:gap-6'>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBed className='text-lg' />
                                {listing.bedrooms > 1
                                ? `${listing.bedrooms} beds `
                                : `${listing.bedrooms} bed `}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBath className='text-lg' />
                                {listing.bathrooms > 1
                                ? `${listing.bathrooms} baths `
                                : `${listing.bathrooms} bath `}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaParking className='text-lg' />
                                {listing.parking ? 'Parking spot' : 'No Parking'}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaChair className='text-lg' />
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <MdPets className='text-lg' />
                                {listing.pets ? 'Pets Allowed' : 'No Pets Allowed'}
                            </li>
                        </ul>
                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                        <button
                            onClick={() => setContact(true)}
                            className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95'
                        >
                            Contact landlord
                        </button>
                        )}
                        {contact && <Contact listing={listing} />}
                    </div>
                </div>
            )
        }
    </main>
        
    
  )
}

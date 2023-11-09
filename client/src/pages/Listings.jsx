import {useState} from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function Listings() {
    const {currentUser} = useSelector((state) => state.user);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);

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
        <div className="flex mb-6 gap-4">
            <Link 
                to="/create-listing" 
                className="p-3 text-green-700 uppercase border rounded boorder-green-700 hover:shadow-lg disabled:opacity-80"
                > Create New Listing</Link>
            <button 
                type="button" 
                onClick={handleShowListings} 
                className="p-3 text-green-700 uppercase border rounded boorder-green-700 hover:shadow-lg disabled:opacity-80"
                > Show Listings
            </button>

            <p className="text-red-700 mt-5">{showListingsError ? "Error showing listings" : ""}</p>
        </div>
         <div className="grid grid-rows-2 grid-flow-col gap-4 justify-center">
         { userListings && 
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
        </div>
    </>
   

    
  )
}

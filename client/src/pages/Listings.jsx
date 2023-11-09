import {useState} from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function Listings() {
    const {currentUser} = useSelector((state) => state.user);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);

    const handleShowListings = async () => {
        try {
            const res = fetch(`/api/user/listings${currentUser._id}`);
            const data = await res.json();
            if(data.success === false) {
                setShowListingsError(true);
                return;
            }
            setShowListingsError(false);
            return setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
        }
    };
    
  return (
    <div >
        <p className="text-red-700 mt-5">{showListingsError ? "Error showing listings" : ""}</p>
        {   
            userListings && userListings.length > 0 &&
                userListings.map((listing) => (
                    <>
                        <div key={listing._id} className="">
                            <Link to={`/listing/${listing._id}`}>
                                <img src={listing.imageUrls} alt="" />
                            </Link>
                            <h1>{listing.title}</h1>
                        </div>
                    </>
                ))
        }
    </div>
  )
}

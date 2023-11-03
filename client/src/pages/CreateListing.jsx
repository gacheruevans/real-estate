import { useState } from "react";
import { useDispatch } from "react-redux";
import { createListingStart, createListingSuccess, createListingFailure } from "../redux/listing/listingSlice.js";

export default function CreateListing() {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(createListingStart());
            const res = await fetch('api/listing/create',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json(data);

            if (data.success === false) {
                dispatch(createListingFailure(data.message));
                return;
            }
            dispatch(createListingSuccess(data));
        } catch (error) {
            dispatch(createListingFailure(error.message));
        }
    };
  return (
    <main className="max-w-4xl p-3 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form onSubmit={handlesubmit} className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-col flex-1 gap-4">
                    <input 
                        type="text" 
                        id="name" 
                        className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                        onChange={handleChange}
                        maxLength="62"
                        minLength="10"
                        required
                        placeholder="Name" />
                    <input 
                        type="text" 
                        id="description" 
                        className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                        onChange={handleChange}
                        required
                        placeholder="Description" />
                     <input 
                        type="text" 
                        id="address" 
                        className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                        onChange={handleChange}
                        required
                        placeholder="Address" />
                
                    <div className="flex flex-wrap gap-6">
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="sale" 
                                className="w-5"  
                                onChange={handleChange}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="rent" 
                                className="w-5"  
                                onChange={handleChange}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="parking" 
                                className="w-5"  
                                onChange={handleChange}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="furnished" 
                                className="w-5"  
                                onChange={handleChange}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="checkbox" 
                                id="offer" 
                                className="w-5"  
                                onChange={handleChange}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input 
                                className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                type="number" id="bedrooms" min="1" max="10" required/>
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                type="number" id="bathrooms" min="1" max="10" required/>
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                type="number" id="regular_price" min="1" max="10" required/>
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                type="number" id="discount_price" min="1" max="10" required/>
                            <div className="flex flex-col items-center">
                                <p>Discounted Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">Images:
                        <span className="ml-2 font-normal text-gray-600">The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input className="w-full p-3 border border-gray-300 rounded" type="file" id="images" accept="image/*" multiple />
                        <button className="p-3 text-green-700 uppercase border rounded boorder-green-700 hover:shadow-lg disabled:opacity-80">Upload</button>
                    </div>
                    <button 
                        className="py-2.5 px-4 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80">Create Listing
                    </button>
                </div>
            </form>
    </main>
  )
}

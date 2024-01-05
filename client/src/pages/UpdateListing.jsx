/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
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
export default function UpdateListing() {
    const params = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        longitude: "",
        latitude: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 50,
        offer: false,
        parking: false,
        furnished: false,
        pets: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
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
                setFormData(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchListing();

      }, [params.listingId]);
    
    const handleChange = (e) => {
        if(e.target.id === "sale" || e.target.id === "rent"){
            setFormData({ 
                ...formData, 
                type: e.target.id,
            });
        }

        if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer" || e.target.id === "pets") {
            setFormData({ 
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea") {
            setFormData({ 
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);

            const res = await fetch(`/api/listing/update/${params.listingId}`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData, 
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(error.message);
                return;
            }
            navigate(`/dashboard/listings`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleImageSubmit = () => {
       
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            
            const promises = [];
            
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData({ 
                    ...formData, 
                    imageUrls: formData.imageUrls.concat(urls), 
                });
                setImageUploadError(false);
                setUploading(false);
            // eslint-disable-next-line no-unused-vars
            }).catch((error) => {
                setImageUploadError("Image Upload Failed (2 MB Max per Image)");
            });
        }else {
            setImageUploadError("You can only upload 6 images per listing.");
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            )
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };
  return (
    <>
        <div className="flex w-full py-4 columns-2">
            <Sidebar>
            <Link to="/dashboard">
                <SidebarItem 
                    icon={<LayoutDashboard size={20}/>}
                    text="Dashboard"
                    alert
                    active
                />
            </Link>
            <Link to="/dashboard/analytics"><SidebarItem icon={<BarChart3 size={20} />} text="Analytics"/></Link>
            <Link to="/dashboard/realtors"><SidebarItem icon={<UserCircle size={20} />} text="Realtors" /></Link>
            <Link to="/dashboard/listings"><SidebarItem icon={<Home size={20} />} text="listings" /></Link>
            <Link to="/dashboard/plots"><SidebarItem icon={<LandPlot size={20} />} text="Plots" /></Link>
            <Link to="/dashboard/requests"><SidebarItem icon={<Inbox size={20} />} text="Requests" /></Link>
            <Link to="/dashboard/billings"><SidebarItem icon={<Receipt size={20} />} text="Billings" /></Link>
            <Link to="/dashboard/archieve"><SidebarItem icon={<Archive size={20} />} text="Archieve" /></Link>
            <hr className="my-3" />
            <Link to="/dashboard/settings"><SidebarItem icon={<Settings size={20} />} text="Settings"  /></Link>
            <Link to="/dashboard/help"><SidebarItem icon={<LifeBuoy size={20} />} text="Help"  /></Link>
            </Sidebar>
            <main className="max-w-4xl p-3 mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Update a Listing</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex flex-col flex-1 gap-4">
                            <input 
                                type="text" 
                                id="name" 
                                className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                                onChange={handleChange}
                                maxLength="62"
                                minLength="10"
                                placeholder="Name"
                                value={formData.name}
                                required />
                            <textarea 
                                type="text" 
                                id="description"
                                rows="3" 
                                className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                                onChange={handleChange}
                                placeholder="Description"
                                value={formData.description}
                                required>
                                </textarea>
                            <input 
                                type="text" 
                                id="address" 
                                className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                                onChange={handleChange}
                                placeholder="Address"
                                value={formData.address}
                                required />
                            <input 
                                type="text" 
                                id="longitude" 
                                className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                                onChange={handleChange}
                                placeholder="Longitude"
                                value={formData.longitude}
                                required />
                            <input 
                                type="text" 
                                id="latitude" 
                                className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                                onChange={handleChange}
                                placeholder="Latitude"
                                value={formData.latitude}
                                required />

                            <div className="flex flex-wrap gap-6">
                                <div className="flex gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="sale" 
                                        className="w-5"  
                                        onChange={handleChange}
                                        checked={formData.type ==="sale"}
                                    />
                                    <span>Sell</span>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="rent" 
                                        className="w-5"  
                                        onChange={handleChange}
                                        checked={formData.type === "rent"}
                                    />
                                    <span>Rent</span>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="parking" 
                                        className="w-5"  
                                        onChange={handleChange}
                                        checked={formData.parking}
                                    />
                                    <span>Parking</span>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="furnished" 
                                        className="w-5"  
                                        onChange={handleChange}
                                        checked={formData.furnished}
                                    />
                                    <span>Furnished</span>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="offer" 
                                        className="w-5"  
                                        onChange={handleChange}
                                        checked={formData.offer}
                                    />
                                    <span>Offer</span>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="pets" 
                                        className="w-5"  
                                        onChange={handleChange}
                                        checked={formData.pets}
                                    />
                                    <span>Pets</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2">
                                    <input 
                                        className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                        type="number" 
                                        id="bedrooms" 
                                        min="1" 
                                        max="10" 
                                        required
                                        onChange={handleChange}
                                        value={formData.bedrooms} />
                                    <p>Beds</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input 
                                        className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                        type="number" 
                                        id="bathrooms" 
                                        min="1" 
                                        max="10" 
                                        required
                                        onChange={handleChange} 
                                        value={formData.bathrooms} />
                                    <p>Baths</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input 
                                        className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                        type="number" 
                                        id="regularPrice" 
                                        min="50" 
                                        max="1000000" 
                                        required
                                        onChange={handleChange} 
                                        value={formData.regularPrice} />
                                    <div className="flex flex-col items-center">
                                        <p>Regular Price</p>
                                        <span className="text-xs">($ / month)</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input 
                                        className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none" 
                                        type="number" 
                                        id="discountPrice" 
                                        min="50" 
                                        max="10000000" 
                                        onChange={handleChange}
                                        value={formData.discountPrice}/>
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
                                <input 
                                    onChange={(e) => setFiles(e.target.files) } 
                                    className="w-full p-3 border border-gray-300 rounded" 
                                    type="file" 
                                    id="images" 
                                    accept="image/.*" 
                                    multiple />
                                <button 
                                    type="button"
                                    disabled={uploading} 
                                    onClick={handleImageSubmit} 
                                    className="p-3 text-green-700 uppercase border rounded boorder-green-700 hover:shadow-lg disabled:opacity-80">
                                    { uploading ? "Uploading..." : "Upload" }
                                </button>
                            </div>
                            <p className="text-sm text-red-700">{imageUploadError && imageUploadError}</p>
                            {
                                // eslint-disable-next-line no-unused-vars
                                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                                    <div key={url} className="flex items-center justify-between p-3 border">
                                        <img src={url} alt="listing image" className="object-contain w-20 h-20 rounded-lg" />
                                        <button 
                                            type="button"
                                            className="p-3 text-red-700 uppercase rounded-lg hover:opacity-75"
                                            onClick={ () => handleRemoveImage(index)}
                                        >Delete</button>
                                    </div>
                                ))
                            }
                            <button 
                                disabled={loading}
                                onClick={handleSubmit}
                                className="py-2.5 px-4 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80">
                                    { loading ? 'Updating...' : 'Update Listing' }
                            </button>
                            {error && <p className="text-sm text-red-700">{ error }</p>}
                        </div>
                    </form>
            </main>
        </div>
    </>
    );
}
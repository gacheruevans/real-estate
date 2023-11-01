import { useSelector, useDispatch} from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.js";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice.js";

export default function ProfileSettings() {
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const [ file, setFile ] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
        if(file){
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName );
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercentage(Math.round(progress));
        },
        (error) => {
            setFileUploadError(true);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFormData({ ...formData, avatar: downloadURL });
            });
        });
    };

    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

  return (
    <div className="w-full flex gap-4 columns-2 py-4 "> 
        <div className="w-1/2 items-center p-4">
            <div className="mb-6 flex items-center justify-center">
                <input 
                    type="file" 
                    onChange={(e)=>setFile(e.target.files[0])} 
                    ref={fileRef} 
                    hidden 
                    accept="image/.*" />
                <img 
                    className="rounded-full h-32 w-32 object-cover self-center my-7 cursor-pointer"
                    src={formData.avatar || currentUser.avatar} 
                    onClick={()=> fileRef.current.click()}
                    alt="profile-pic" 
                />
            </div>
            <div className="mb-6 flex items-center justify-center">
                <p className="flex text-sm text-align-center">
                    {
                        fileUploadError ? 
                        (<span className="text-red-700">Error Image Upload( Image must be less than 2MB )</span>) : 
                        filePercentage > 0 && filePercentage < 100 ? 
                        (<span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>) :
                        filePercentage === 100 ? (<span className="text-green-700">Successfully uploaded!</span>) : " "
                    }
                </p>
            </div>
            <div className="grid justify-center">
                <div className="mb-6">
                    <label className="text-slate-900 sm:text-sm px-3">Username: </label>
                    <span className="text-slate-400 sm:text-sm px-3">{currentUser.username}</span>
                </div>
                <div className="mb-6">
                    <label className="text-slate-900 sm:text-sm px-3">Name: </label>
                    <span className="text-slate-400 sm:text-sm px-3">{currentUser.firstname +" "+ currentUser.lastname}</span>
                </div>
                <div className="mb-6">
                    <label className="text-slate-900 sm:text-sm px-3">Email: </label>
                    <span className="text-slate-400 sm:text-sm px-3"> {currentUser.email}</span>
                </div>
            </div>
            
        </div>
        <div className="w-1/2">
            <h1 className="text-3xl font-semibold my-7">Edit Information</h1>
            <div className="mb-6">
                <form onSubmit={handleSubmit} className="max-w-sm justify-center">
                    <div className="mb-6">
                        <input 
                            type="text" 
                            id="username" 
                            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            defaultValue={currentUser.username}
                            onChange={handleChange}
                            placeholder="username"  />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="text" 
                            id="firstname" 
                            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                            defaultValue={currentUser.firstname}
                            onChange={handleChange}
                            placeholder="first name" />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="text" 
                            id="lastname" 
                            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            defaultValue={currentUser.lastname}
                            onChange={handleChange}
                            placeholder="last name" />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="email"
                            id="email" 
                            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            defaultValue={currentUser.email}
                            onChange={handleChange}
                            placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="text"
                            id="password" 
                            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            onChange={handleChange}
                            placeholder="password" />
                    </div>
                    <div className="mb-6">
                        <button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
                            <span>Update account</span>
                        </button>
                    </div>
                </form>
                <div className="flex mt-5">
                    <span className="text-red-700 cursor-pointer">Deactivate Account</span>
                </div>
            </div>
        </div>
    </div>
  )
}

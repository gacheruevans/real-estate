import { useSelector, useDispatch} from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.js";
import { 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
 } from "../redux/user/userSlice.js";
 import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [ file, setFile ] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    
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
            dispatch(updateUserStart());
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

  return (
    <div className="flex w-full gap-4 py-4 columns-2 "> 
        <div className="items-center w-1/2 p-4">
            <div className="flex items-center justify-center mb-6">
                <input 
                    type="file" 
                    onChange={(e)=>setFile(e.target.files[0])} 
                    ref={fileRef} 
                    hidden 
                    accept="image/.*" />
                <img 
                    className="self-center object-cover w-32 h-32 rounded-full cursor-pointer my-7"
                    src={formData.avatar || currentUser.avatar} 
                    onClick={()=> fileRef.current.click()}
                    alt="profile-pic" 
                />
            </div>
            <div className="flex items-center justify-center mb-6">
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
                    <label className="px-3 text-slate-900 sm:text-sm">Name: </label>
                    <span className="px-3 text-slate-400 sm:text-sm">{currentUser.firstname +" "+ currentUser.lastname}</span>
                </div>
                <div className="mb-6">
                    <label className="px-3 text-slate-900 sm:text-sm">Username: </label>
                    <span className="px-3 text-slate-400 sm:text-sm">{currentUser.username}</span>
                </div>
                <div className="mb-6">
                    <label className="px-3 text-slate-900 sm:text-sm">Email: </label>
                    <span className="px-3 text-slate-400 sm:text-sm"> {currentUser.email}</span>
                </div>
            </div>
            
        </div>
        <div className="w-1/2">
            <h1 className="text-3xl font-semibold my-7">Edit Information</h1>
            <div className="mb-6">
                <form onSubmit={handleSubmit} className="justify-center max-w-sm">
                    <div className="mb-6">
                        <input 
                            type="text" 
                            id="firstname" 
                            className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"  
                            defaultValue={currentUser.firstname}
                            onChange={handleChange}
                            placeholder="first name" />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="text" 
                            id="lastname" 
                            className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            defaultValue={currentUser.lastname}
                            onChange={handleChange}
                            placeholder="last name" />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="text" 
                            id="username" 
                            className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            defaultValue={currentUser.username}
                            onChange={handleChange}
                            placeholder="username"  />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="email"
                            id="email" 
                            className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            defaultValue={currentUser.email}
                            onChange={handleChange}
                            placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="text"
                            id="password" 
                            className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
                            onChange={handleChange}
                            placeholder="password" />
                    </div>
                    <div className="mb-6">
                        <button 
                            disabled={loading} 
                            type="submit" 
                            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
                           <span>{loading ? 'Loading...' : 'Update account'}</span>
                        </button>
                    </div>
                </form>
                <div className="max-w-sm mb-6">
                    <button 
                        disabled={loading} 
                        onClick={handleDeleteUser}
                        className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-red-700 text-white hover:bg-red-600 w-full">
                        <span className="cursor-pointer">{loading ? 'Loading...' : 'Deactivate Account'}</span>
                    </button>
                </div>
                <div className="mb-6">
                    <p className="mt-5 text-red-700">{ error ? error : '' }</p>
                    <p className="mt-5 text-green-700">{ updateSuccess ? 'User Updated Successfully' : '' }</p>
                </div>
            </div>
        </div>
    </div>
  )
}

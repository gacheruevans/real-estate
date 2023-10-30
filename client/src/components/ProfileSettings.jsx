import { useSelector} from 'react-redux';

export default function ProfileSettings() {
    const { currentUser } = useSelector(state => state.user);
  return (
    <div className="w-full flex gap-4 columns-2 py-4 "> 
        <div className="w-1/2 items-center p-4">
            <div className="mb-6 flex items-center justify-center">
                <img 
                    className="rounded-full h-32 w-32 object-cover self-center my-7"
                    src={currentUser.avatar} 
                    alt="profile-pic" 
                />
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
                <form className="max-w-sm justify-center">
                    <div className="mb-6">
                        <input type="text" id="username" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="username"  />
                    </div>
                    <div className="mb-6">
                        <input type="text" id="firstname" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="first name" />
                    </div>
                    <div className="mb-6">
                        <input type="text" id="lastname" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="last name" />
                    </div>
                    <div className="mb-6">
                        <input type="email" id="email" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
                            <span>Update account</span>
                        </button>
                    </div>
                </form>
                <div className="">
                    <span className="text-red-700 cursor-pointer">Delete Account</span>
                </div>
            </div>
        </div>
    </div>
  )
}

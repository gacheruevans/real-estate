import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useState } from 'react';

export default function Header() {
    const [error, setError] = useState(null);
    const { currentUser } = useSelector(state => state.user);
    const [displayMenu, setDisplayMenu] = useState(false);

    const profileMenu = () => {
        if(displayMenu === true) {
            setDisplayMenu(false);
        } else {
            setDisplayMenu(true);
        } 
    };
  
    const handleSignOut = async () => {

        try {
            const res = await fetch('/api/auth/signout/');
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                return;
            }
            setError(null);
            localStorage.clear();
            window.location.reload(true);
        } catch (error) {
            setError(error.message);
        }
    };
  return (
    <header className="shadow-md bg-slate-200">
        <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
            <Link to="/">
                <h1 className="flex flex-wrap text-sm font-bold sm:text-xl ">
                    <span className="text-slate-500">Real</span>
                    <span className="text-slate-700">Estates</span>
                </h1>
            </Link>
            <form className="flex items-center p-3 rounded-lg bg-slate-100">
                <input 
                    type="text" 
                    placeholder="search..." 
                    className="w-24 bg-transparent focus:outline-none sm:w-64"
                />
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className="flex gap-6">
                <Link to="/rent">
                    <li className="hidden sm:inline text-slate-700 hover:underline">Rent</li>
                </Link>
                
                <Link to="/sale">
                    <li className="hidden sm:inline text-slate-700 hover:underline">Sale</li>
                </Link>
                {currentUser ? (
                    <div className="relative inline-block text-left">
                        <button 
                            type="button" 
                            onClick={profileMenu} 
                            aria-expanded={displayMenu} 
                            aria-haspopup="false">
                            <img 
                                className="rounded-full h-7 w-7 object-cover"
                                src={currentUser.avatar} 
                                alt="profile" 
                            />
                        </button>
                        {
                            displayMenu ? (
                                <div 
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                                    role="menu" 
                                    aria-orientation="vertical" 
                                    aria-labelledby="menu-button" 
                                    tabIndex="-1" >
                                    <div className="py-1 hover:bg-violet-600 active:bg-violet-700 focus:outline-none " role="none">
                                        <Link 
                                            to="/dashboard" 
                                            className="text-gray-700 hover:text-white block px-4 py-2 text-sm" 
                                            role="menuitem" 
                                            tabIndex="-1" 
                                            id="menu-item-0" >Realtor Dashboard</Link>
                                    </div>
                                    <div className="py-1  hover:bg-violet-600 active:bg-violet-700 focus:outline-none" role="none">
                                        <Link 
                                            to="/dashboard/profile" 
                                            className="text-gray-700 hover:text-white block w-full px-4 py-2 text-left text-sm" 
                                            role="menuitem" 
                                            tabIndex="-1" 
                                            id="menu-item-3" >Account Settings</Link>
                                    </div>
                                    <div className="py-1  hover:bg-violet-600 active:bg-violet-700 focus:outline-none" role="none">
                                        <button 
                                            type="submit" 
                                            onClick={handleSignOut}
                                            className="text-gray-700 hover:text-white block w-full px-4 py-2 text-left text-sm" 
                                            role="menuitem" 
                                            tabIndex="-1" 
                                            id="menu-item-3" >Sign Out</button>
                                    </div>
                                </div>
                            ) :''
                        }
                    </div>
                ) :
                    (
                        <Link to="/sign-in">
                            <li className="sm:inline text-slate-700 hover:underline">Sign In</li>
                        </Link>
                    )
                }
               
            </ul>
        </div>
    </header>
  )
}

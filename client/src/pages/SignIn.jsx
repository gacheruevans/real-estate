import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { 
  signInStart, 
  signInSuccess,
  signInFailure, 
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
  });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', 
        {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    
  };
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 pt-12 pb-16">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6">
          <input 
            type="email" 
            id="email" 
            className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
            placeholder="email" 
            onChange={handleChange} />
        </div>
        <div className="mb-6">
          <input 
            type="password" 
            id="password" 
            className="block w-full h-10 px-3 mt-2 bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" 
            placeholder="password" 
            onChange={handleChange} />
        </div>
        <div className="mb-6">
          <button 
            disabled={loading} 
            type="submit" 
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
            <span>{loading ? 'Loading...':'Sign in to account'}</span>
          </button>
        </div>
        <div className="mb-6">
          <OAuth />
        </div>
        <p className="mt-8 text-center"> <a href="/reset" className="text-sm hover:underline">Forgot Password? </a></p>
      </form>
      <div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
        <p className="text-center sm:text-left">Don&apos;t have an account? 
         <a href='/sign-up' className="text-sm hover:underline"> Sign Up</a>
        </p>
      </div>
      { error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', 
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
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
  };
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6">
          <input type="text" id="username" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="username" onChange={handleChange} />
        </div>
        <div className="mb-6">
          <input type="text" id="firstname" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="first name" onChange={handleChange}/>
        </div>
        <div className="mb-6">
          <input type="text" id="lastname" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="last name" onChange={handleChange}/>
        </div>
        <div className="mb-6">
          <input type="email" id="email" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="email" onChange={handleChange}/>
        </div>
        <div className="mb-6">
          <input type="password" id="password" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="password" onChange={handleChange}/>
        </div>
        <div className="mb-6">
          <input type="password" id="confirm_password" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="confirm password" />
        </div>
        <div className="mb-6">
          <button disabled={loading} className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
            <span>{loading ? 'Loading...' : 'Create accouont'}</span>
          </button>
        </div>
        <div className="mb-6">
          <OAuth />
        </div>
      </form>
      <div className="mb-6">
        <p className="mt-8 text-center"> Already have an account? 
          <a href="sign-in">
            <span className="text-sm hover:underline"> Sign In</span>
          </a>
        </p>
      </div>
      { error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

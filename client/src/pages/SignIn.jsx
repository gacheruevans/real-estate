import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
  });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6">
          <input type="email" id="email" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="email" onChange={handleChange} />
        </div>
        <div className="mb-6">
          <input type="password" id="password" className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required placeholder="password" onChange={handleChange} />
        </div>
        <button type="submit" className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
          <span>Sign in to account</span>
        </button>
        <p className="mt-8 text-center"> <a href="/reset" className="text-sm hover:underline">Forgot Password? </a></p>
      </form>
      <div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
        <p className="text-center sm:text-left">Don&apos;t have an account?
         <Link to={'/signup'} className="text-sm hover:underline">Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from "./pages/signin";
import SignUp from "./pages/SignUp";
import Profile from "./components/ProfileSettings";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import Listings from "./pages/Listings";
import Header from "./components/Header";
import Dashboard from './components/Dashboard';
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/create-listing' element={<CreateListing />} />
          <Route path='/dashboard/listings' element={<Listings />} />
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

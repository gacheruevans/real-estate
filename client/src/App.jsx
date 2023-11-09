import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from "./pages/signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import Listings from "./pages/Listings";
import Header from "./components/Header";
import Sidebar from './components/Sidebar';
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
          <Route path='/dashboard' element={<Sidebar />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/listings' element={<Listings />} />
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

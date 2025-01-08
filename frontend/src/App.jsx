import "./App.css"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "./Actions/userActions"
import { useEffect } from "react"
import Header from "./Components/Home/Header"
import Footer from "./Components/Home/Footer"
import Home from "./Components/Home/Home"
import MainGallery from "./Components/Gallery/Gallery"
import AllEvents from "./Components/Events/AllEvents"
import EventDetails from "./Components/Events/EventDetails"
import AllClubs from "./Components/Clubs/AllClubs"
import ClubDetails from "./Components/Clubs/ClubDetails"
import ClubGallery from "./Components/Clubs/ClubGallery"
import ClubEvents from "./Components/Clubs/ClubEvents"
import ClubCoordinators from "./Components/Clubs/Coordinators"
import AboutUs from "./Components/AboutUs/AboutUs"
import Donation from "./Components/Donation/Donation"
import Contact from "./Components/Contact/Contact"
import Announcements from "./Components/Annocements/Announcement"
import Letters from "./Components/Letters/Letters"
import Library from "./Components/Library/Library"
import OpenBookDetails from "./Components/Library/OpenBookDetails"
import SignIn from "./Components/User/SignIn/SignIn"
import SignUp from "./Components/User/SignUp/SignUp"
import UserOptions from "./Components/User/UserOptions"
import UserProfile from "./Components/User/Profile/UserProfile"
import UpdateProfile from "./Components/User/UpdateProfile"
import Loading from "./Components/Loaders/Loading"
import ProtectedRoute from "./Components/Functionalities/ProtectedRoot"
import UpdateProfilePassword from "./Components/User/Profile/UpdatePassword"
import ResetPassword from "./Components/User/Profile/ResetPassword"
import ForgotPassword from "./Components/User/ForgotPassword"

import Fest from "./Components/Fest/Fest"
function App() {
  const dispatch = useDispatch();
  const { user, isauthenticate, Loading } = useSelector(state => state.user)
  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
    }
  }, [])
  if (Loading) {
    return <Loading />
  }
  return (
    <Router>
      <Header />
      {isauthenticate && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<MainGallery />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:_id" element={<EventDetails />} />
        <Route path="/clubs" element={<AllClubs />} />
        <Route path="/clubs/gallery/:_id" element={<ClubGallery />} />
        <Route path="/clubs/events/:_id" element={<ClubEvents />} />
        <Route path="/clubs/coordinators/:_id" element={<ClubCoordinators />} />
        <Route path="/clubs/:_id" element={<ClubDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/works/:key" element={<OpenBookDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password/reset" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/profile/update/password" element={<ProtectedRoute element={<UpdateProfilePassword />} />} />

        <Route path="/fest" element={<Fest />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

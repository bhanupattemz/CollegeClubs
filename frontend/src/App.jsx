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
import Announcements from "./Components/Announcements/Announcement"
import Letters from "./Components/Letters/Letters"
import Library from "./Components/Library/Library"
import OpenBookDetails from "./Components/Library/OpenBookDetails"
import SignIn from "./Components/User/SignIn/SignIn"
import SignUp from "./Components/User/SignUp/SignUp"
import AdminSignUp from "./Components/User/SignUp/AdminSignUp"
import UserOptions from "./Components/User/UserOptions"
import UserProfile from "./Components/User/Profile/UserProfile"
import UpdateProfile from "./Components/User/UpdateProfile"
import Loading from "./Components/Loaders/Loading"
import ProtectedRoute from "./Components/Functionalities/ProtectedRoot"
import UpdateProfilePassword from "./Components/User/Profile/UpdatePassword"
import ResetPassword from "./Components/User/Profile/ResetPassword"
import ForgotPassword from "./Components/User/ForgotPassword"
import FestEventRegistration from "./Components/Fest/EventRegistration"
import FestEventDetails from "./Components/Fest/FestEventDetails"
import Fest from "./Components/Fest/Fest"
import PastMembers from "./Components/AboutUs/pastMembers"

import AdminDashBoard from "./Components/Dashboard/Admin/Dashboard/AdminDashboard"
import AdminAllClubs from "./Components/Dashboard/Admin/Clubs/AdminAllClubs"
import AdminAllEvents from "./Components/Dashboard/Admin/Events/AdminAllEvents"
import AdminAllFests from "./Components/Dashboard/Admin/Fests/AdminAllFests"
import AdminAllFestsEvents from "./Components/Dashboard/Admin/Fests/Events/AdminAllFestsEvents"
import AdminAllGallery from "./Components/Dashboard/Admin/Gallery/AdminAllGallery"
import AdminAllAnnouncements from "./Components/Dashboard/Admin/Announcements_Letters/Announcements"
import AdminAllLetters from "./Components/Dashboard/Admin/Announcements_Letters/Letters"
import AdminAllDonars from "./Components/Dashboard/Admin/Donations/Donations"
import AdminAllAcademicBooks from "./Components/Dashboard/Admin/Library/AcademicBooks"
import AdminAllCarouselImgs from "./Components/Dashboard/Admin/Carousel/Carousel"
import AdminAdministrationTeam from "./Components/Dashboard/Admin/AdminstrationTeam/AdministrationTeam"
import AdminAllPastMembers from "./Components/Dashboard/Admin/PastTeam/PastTeam"
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
        <Route path="/about/past_members" element={<PastMembers />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/letters" element={<ProtectedRoute isIn={["admin", "coordinator"]} element={<Letters />} />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/works/:key" element={<OpenBookDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/signup/:_id" element={<AdminSignUp />} />
        <Route path="/password/reset" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/profile/update/password" element={<ProtectedRoute element={<UpdateProfilePassword />} />} />
        <Route path="/fest" element={<Fest />} />
        <Route path="/fest/register/:_id" element={<FestEventRegistration />} />
        <Route path="/fest/events/:_id" element={<FestEventDetails />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute isIn={["admin"]} element={<AdminDashBoard />} />} />
        <Route path="/admin/clubs" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllClubs />} />} />
        <Route path="/admin/events" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllEvents />} />} />
        <Route path="/admin/fests" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllFests />} />} />
        <Route path="/admin/fests/events" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllFestsEvents />} />} />
        <Route path="/admin/gallery" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllGallery />} />} />
        <Route path="/admin/announcements" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllAnnouncements />} />} />
        <Route path="/admin/letters" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllLetters />} />} />
        <Route path="/admin/donations" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllDonars />} />} />
        <Route path="/admin/library" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllAcademicBooks />} />} />
        <Route path="/admin/carousel" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllCarouselImgs />} />} />
        <Route path="/admin/administration_team" element={<ProtectedRoute isIn={["admin"]} element={<AdminAdministrationTeam />} />} />
        <Route path="/admin/past_team" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllPastMembers />} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

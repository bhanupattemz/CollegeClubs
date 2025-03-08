import "./App.css"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "./Actions/userActions"
import { useEffect } from "react"
import { ToastContainer } from 'react-toastify';

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
import CoordinatorVerify from "./Components/User/CoordinatorVerify"
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
import AdminclubMembers from "./Components/Dashboard/Admin/Clubs/ClubMembers"
import AdminUpdateClub from "./Components/Dashboard/Admin/Clubs/UpdateClub"
import AdminCreateClub from "./Components/Dashboard/Admin/Clubs/CreateClub"
import AdminAllEvents from "./Components/Dashboard/Admin/Events/AdminAllEvents"
import AdminCreateEvent from "./Components/Dashboard/Admin/Events/CreateEvent"
import AdminUpdateEvent from "./Components/Dashboard/Admin/Events/UpdateEvent"
import AdminUpdateEventWinner from "./Components/Dashboard/Admin/Events/EventWinners"
import AdminEventMember from "./Components/Dashboard/Admin/Events/EventMembers"
import AdminAllFests from "./Components/Dashboard/Admin/Fests/AdminAllFests"
import AdminFestDetails from "./Components/Dashboard/Admin/Fests/FestDetails"
import AdminCreateFest from "./Components/Dashboard/Admin/Fests/CreateFest"
import AdminUpdateFest from "./Components/Dashboard/Admin/Fests/UpdateFest"
import AdminAllFestsEvents from "./Components/Dashboard/Admin/Fests/Events/AdminAllFestsEvents"
import AdminUpdateFestEvent from "./Components/Dashboard/Admin/Fests/Events/UpdateEvent"
import AdminCreateFestEvent from "./Components/Dashboard/Admin/Fests/Events/CreateEvent"
import AdminUpdateFestEventWinner from "./Components/Dashboard/Admin/Fests/Events/EventWinners"
import AdminFestEventMembers from "./Components/Dashboard/Admin/Fests/Events/EventMembers"
import AdminAllFestsMembers from "./Components/Dashboard/Admin/Fests/Members/Members"
import AdminUpdateFestMember from "./Components/Dashboard/Admin/Fests/Members/Updatemembers"
import AdminAllGallery from "./Components/Dashboard/Admin/Gallery/AdminAllGallery"
import AdminCreateGallery from "./Components/Dashboard/Admin/Gallery/CreateGallery"
import AdminUpdateGallery from "./Components/Dashboard/Admin/Gallery/UpdateGallery"
import AdminMessages from "./Components/Dashboard/Admin/Messages/Messages"
import AdminAllAnnouncements from "./Components/Dashboard/Admin/Announcements_Letters/Announcements"
import AdminCreateAnnouncement from "./Components/Dashboard/Admin/Announcements_Letters/CreateAnnouncement"
import AdminUpdateAnnouncement from "./Components/Dashboard/Admin/Announcements_Letters/UpdateAnnouncement"
import AdminAllLetters from "./Components/Dashboard/Admin/Announcements_Letters/Letters"
import AdminCreateLetter from "./Components/Dashboard/Admin/Announcements_Letters/CreateLetter"
import AdminUpdateLetter from "./Components/Dashboard/Admin/Announcements_Letters/UpdateLetters"
import AdminAllDonars from "./Components/Dashboard/Admin/Donations/Donations"
import AdminCreateDonation from "./Components/Dashboard/Admin/Donations/CreateDonation"
import AdminUpdateDonation from "./Components/Dashboard/Admin/Donations/UpdateDonation"
import AdminAllAcademicBooks from "./Components/Dashboard/Admin/Library/AcademicBooks"
import AdminCreateBook from "./Components/Dashboard/Admin/Library/CreateBook"
import AdminUpdateBook from "./Components/Dashboard/Admin/Library/UpdateAcademicBook"
import AdminAllCarouselImgs from "./Components/Dashboard/Admin/Carousel/Carousel"
import AdminCreateCarousel from "./Components/Dashboard/Admin/Carousel/CreateCarousel"
import AdminUpdateCarousel from "./Components/Dashboard/Admin/Carousel/UpdateCarousel"
import AdminAdministrationTeam from "./Components/Dashboard/Admin/AdminstrationTeam/AdministrationTeam"
import AdminCreateAdministrationTeam from "./Components/Dashboard/Admin/AdminstrationTeam/CreateAdminTeam"
import AdminUpdateAdministrationTeam from "./Components/Dashboard/Admin/AdminstrationTeam/UpdateTeam"
import AdminAllUsers from "./Components/Dashboard/Admin/Users/AllUser"
import AdminUpdateUser from "./Components/Dashboard/Admin/Users/UpdateUser"
import AdminAllPastMembers from "./Components/Dashboard/Admin/Users/PastTeam"
import AdminCreatePastMember from "./Components/Dashboard/Admin/Users/CreatePastMember"


import CoordinatorDashboard from "./Components/Dashboard/Coordinnator/Dashboard/Dashboard"
import CoordinatorClubs from "./Components/Dashboard/Coordinnator/Clubs/CoordinatorClubs"
import CoordinatorClubMembers from "./Components/Dashboard/Coordinnator/Clubs/ClubMember"
import CoordinatorEvents from "./Components/Dashboard/Coordinnator/Events/CoordinatorEvents"
import CoordinatorCreateEvent from "./Components/Dashboard/Coordinnator/Events/CreateEvent"
import CooordinatorUpdateEvent from "./Components/Dashboard/Coordinnator/Events/UpdateEvents"
import CoordinatorEventMembers from "./Components/Dashboard/Coordinnator/Events/EventMembers"
import CoordinatorUpdateClub from "./Components/Dashboard/Coordinnator/Clubs/UpdateClub"
import CoordinatorClubGallery from "./Components/Dashboard/Coordinnator/Gallery/ClubGallery"
import CoordinatorCreateGallery from "./Components/Dashboard/Coordinnator/Gallery/CreateGallery"
import CoordinatorUpdateGallery from "./Components/Dashboard/Coordinnator/Gallery/UpdateGallery"
import CoordinatorDonations from "./Components/Dashboard/Coordinnator/Donations/Donation"
import PageNotfound from "./Components/Functionalities/PageNotFound"
import Alert from "./Alert"
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
        <Route path="/coordinator/verify/:_id" element={<CoordinatorVerify />} />
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
        <Route path="/admin/clubs/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateClub />} />} />
        <Route path="/admin/clubs/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateClub />} />} />
        <Route path="/admin/clubs/members/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminclubMembers />} />} />
        <Route path="/admin/events" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllEvents />} />} />
        <Route path="/admin/events/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateEvent />} />} />
        <Route path="/admin/events/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateEvent />} />} />
        <Route path="/admin/events/members/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminEventMember />} />} />
        <Route path="/admin/events/update/winner/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateEventWinner />} />} />
        <Route path="/admin/fests" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllFests />} />} />
        <Route path="/admin/fests/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminFestDetails />} />} />
        <Route path="/admin/fests/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateFest />} />} />
        <Route path="/admin/fests/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateFest />} />} />
        <Route path="/admin/fests/events" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllFestsEvents />} />} />
        <Route path="/admin/fests/events/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateFestEvent />} />} />
        <Route path="/admin/fests/events/update/winner/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateFestEventWinner />} />} />
        <Route path="/admin/fests/events/members/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminFestEventMembers />} />} />
        <Route path="/admin/fests/events/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateFestEvent />} />} />
        <Route path="/admin/fests/members" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllFestsMembers />} />} />
        <Route path="/admin/fests/members/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateFestMember />} />} />
        <Route path="/admin/gallery" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllGallery />} />} />
        <Route path="/admin/gallery/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateGallery />} />} />
        <Route path="/admin/gallery/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateGallery />} />} />
        <Route path="/admin/messages" element={<ProtectedRoute isIn={["admin"]} element={<AdminMessages />} />} />
        <Route path="/admin/announcements" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllAnnouncements />} />} />
        <Route path="/admin/announcements/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateAnnouncement />} />} />
        <Route path="/admin/announcements/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateAnnouncement />} />} />
        <Route path="/admin/letters" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllLetters />} />} />
        <Route path="/admin/letters/create" element={<ProtectedRoute isIn={["admin"]} element={< AdminCreateLetter />} />} />
        <Route path="/admin/letters/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={< AdminUpdateLetter />} />} />
        <Route path="/admin/donations" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllDonars />} />} />
        <Route path="/admin/donations/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateDonation />} />} />
        <Route path="/admin/donations/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateDonation />} />} />
        <Route path="/admin/library" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllAcademicBooks />} />} />
        <Route path="/admin/library/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateBook />} />} />
        <Route path="/admin/academicBooks/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateBook />} />} />
        <Route path="/admin/carousel" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllCarouselImgs />} />} />
        <Route path="/admin/carousel/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateCarousel />} />} />
        <Route path="/admin/carousel/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateCarousel />} />} />
        <Route path="/admin/administration_team" element={<ProtectedRoute isIn={["admin"]} element={<AdminAdministrationTeam />} />} />
        <Route path="/admin/administration_team/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreateAdministrationTeam />} />} />
        <Route path="/admin/administration_team/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateAdministrationTeam />} />} />
        <Route path="/admin/users" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllUsers />} />} />
        <Route path="/admin/users/update/:_id" element={<ProtectedRoute isIn={["admin"]} element={<AdminUpdateUser />} />} />
        <Route path="/admin/past_team" element={<ProtectedRoute isIn={["admin"]} element={<AdminAllPastMembers />} />} />
        <Route path="/admin/past_team/create" element={<ProtectedRoute isIn={["admin"]} element={<AdminCreatePastMember />} />} />
        <Route path="/coordinator/dashboard" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorDashboard />} />} />
        <Route path="/coordinator/clubs" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorClubs />} />} />
        <Route path="/coordinator/clubs/members/:_id" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorClubMembers />} />} />
        <Route path="/coordinator/clubs/update/:_id" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorUpdateClub />} />} />
        <Route path="/coordinator/events" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorEvents />} />} />
        <Route path="/coordinator/events/create" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorCreateEvent />} />} />
        <Route path="/coordinator/events/update/:_id" element={<ProtectedRoute isIn={["coordinator"]} element={<CooordinatorUpdateEvent />} />} />
        <Route path="/coordinator/events/members/:_id" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorEventMembers />} />} />
        <Route path="/coordinator/gallery" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorClubGallery />} />} />
        <Route path="/coordinator/gallery/create" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorCreateGallery />} />} />
        <Route path="/coordinator/gallery/update/:_id" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorUpdateGallery />} />} />
        <Route path="/coordinator/donations" element={<ProtectedRoute isIn={["coordinator"]} element={<CoordinatorDonations />} />} />
        <Route path="/*" element={<PageNotfound />} />
      </Routes>
      <Footer />
      <ToastContainer />
      <Alert />
    </Router>
  )
}

export default App

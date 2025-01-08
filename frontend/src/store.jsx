import { configureStore } from "@reduxjs/toolkit"
import ClubsReducer from "./Reducers/ClubsReducers/ClubsReducer"
import SingleClubReducer from "./Reducers/ClubsReducers/SingleClubReducer"
import EventsReducer from "./Reducers/EventsReducers/EventsReducer"
import SingleEventReducer from "./Reducers/EventsReducers/SingleEventReducer"
import AnnoucementsReducer from "./Reducers/Annoucements/AnnoucementsReducer"
import LettersReducer from "./Reducers/Letters/Letters"
import GalleryReducer from "./Reducers/Gallery/GalleryReducer"
import ClubGallery from "./Reducers/Gallery/ClubGalleryReducer"
import AdministrationTeam from "./Reducers/AdministrationTeam/AdministrationTeam"
import DonarsReducer from "./Reducers/Donations/Donors"
import AcademicBooksreducer from "./Reducers/Library/AcademicBooks"
import UserReducer from "./Reducers/User/UserReducer"
import PrevLocationReducer from "./Reducers/PrevLocation/PrevLocation"
import ContactReducer from "./Reducers/Contact/AllContact"
import CarouselImgsReducer from "./Reducers/CarouselReducer/CarouselReducer"
import FestReducer from "./Reducers/FestReducer/FestEventsReducer"
const store = configureStore({
    reducer: {
        clubs: ClubsReducer,
        singleClub: SingleClubReducer,
        events: EventsReducer,
        singleEvent: SingleEventReducer,
        annoucements: AnnoucementsReducer,
        letters: LettersReducer,
        gallery: GalleryReducer,
        clubGallery: ClubGallery,
        administrationTeam: AdministrationTeam,
        donars: DonarsReducer,
        academicBooks: AcademicBooksreducer,
        user: UserReducer,
        contacts: ContactReducer,
        prevLocation: PrevLocationReducer,
        carouselImgs: CarouselImgsReducer,
        festEvents: FestReducer
    }
})
export default store
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { clearErrors as clearAdministrationError, clearSuccessMsg as clearAdministrationSuccess } from "./Reducers/AdministrationTeam/AdministrationTeam";
import { clearErrors as clearAnnouncementsError, clearSuccessMsg as clearAnnouncementSuccess } from "./Reducers/Announcements/AnnouncementsReducer";
import { clearErrors as clearCarouselError, clearSuccessMsg as clearCarouselSuccess } from "./Reducers/CarouselReducer/CarouselReducer";
import { clearErrors as clearClubsError, clearSuccessMsg as clearClubsSuccess } from "./Reducers/ClubsReducers/ClubsReducer";
import { clearErrors as clearSingleClubError, clearSuccessMsg as clearSingleClubSuccess } from "./Reducers/ClubsReducers/SingleClubReducer";
import { clearErrors as clearContactError, clearSuccessMsg as clearContactSuccess } from "./Reducers/Contact/AllContact";
import { clearErrors as clearDonationsError, clearSuccessMsg as clearDonationsSuccess } from "./Reducers/Donations/Donors";
import { clearErrors as clearEventsError, clearSuccessMsg as clearEventsSuccess } from "./Reducers/EventsReducers/EventsReducer";
import { clearErrors as clearSingleEventError, clearSuccessMsg as clearSingleEventSuccess } from "./Reducers/EventsReducers/SingleEventReducer";
import { clearErrors as clearFestEventsError, clearSuccessMsg as clearFestEventsSuccess } from "./Reducers/FestReducer/FestEventsReducer";
import { clearErrors as clearSingleFestEventError, clearSuccessMsg as clearSingleFestEventSuccess } from "./Reducers/FestReducer/SingleFestEvent";
import { clearErrors as clearClubGalleryError, clearSuccessMsg as clearClubGallerySuccess } from "./Reducers/Gallery/ClubGalleryReducer";
import { clearErrors as clearGalleryError, clearSuccessMsg as clearGallerySuccess } from "./Reducers/Gallery/GalleryReducer";
import { clearErrors as clearLettersError, clearSuccessMsg as clearLettersSuccess } from "./Reducers/Letters/Letters";
import { clearErrors as clearBooksError, clearSuccessMsg as clearBooksSuccess } from "./Reducers/Library/AcademicBooks";
import { clearErrors as clearPastMembersError, clearSuccessMsg as clearPastMembersSuccess } from "./Reducers/PastMembersReducer/PastMembersReducer";
import { clearErrors as clearUserError, clearSuccessMsg as clearUserSuccess } from "./Reducers/User/UserReducer";
import { clearErrors as clearUsersError, clearSuccessMsg as clearUsersSuccess } from "./Reducers/User/usersReducer";

const reducers = [
    { stateKey: 'administrationTeam', clearErrors: clearAdministrationError, clearSuccessMsg: clearAdministrationSuccess },
    { stateKey: 'announcements', clearErrors: clearAnnouncementsError, clearSuccessMsg: clearAnnouncementSuccess },
    { stateKey: 'carouselImgs', clearErrors: clearCarouselError, clearSuccessMsg: clearCarouselSuccess },
    { stateKey: 'clubs', clearErrors: clearClubsError, clearSuccessMsg: clearClubsSuccess },
    { stateKey: 'singleClub', clearErrors: clearSingleClubError, clearSuccessMsg: clearSingleClubSuccess },
    { stateKey: 'contacts', clearErrors: clearContactError, clearSuccessMsg: clearContactSuccess },
    { stateKey: 'donars', clearErrors: clearDonationsError, clearSuccessMsg: clearDonationsSuccess },
    { stateKey: 'events', clearErrors: clearEventsError, clearSuccessMsg: clearEventsSuccess },
    { stateKey: 'singleEvent', clearErrors: clearSingleEventError, clearSuccessMsg: clearSingleEventSuccess },
    { stateKey: 'festEvents', clearErrors: clearFestEventsError, clearSuccessMsg: clearFestEventsSuccess },
    { stateKey: 'singleFestEvent', clearErrors: clearSingleFestEventError, clearSuccessMsg: clearSingleFestEventSuccess },
    { stateKey: 'clubGallery', clearErrors: clearClubGalleryError, clearSuccessMsg: clearClubGallerySuccess },
    { stateKey: 'gallery', clearErrors: clearGalleryError, clearSuccessMsg: clearGallerySuccess },
    { stateKey: 'letters', clearErrors: clearLettersError, clearSuccessMsg: clearLettersSuccess },
    { stateKey: 'academicBooks', clearErrors: clearBooksError, clearSuccessMsg: clearBooksSuccess },
    { stateKey: 'pastMembers', clearErrors: clearPastMembersError, clearSuccessMsg: clearPastMembersSuccess },
    { stateKey: 'user', clearErrors: clearUserError, clearSuccessMsg: clearUserSuccess },
    { stateKey: 'users', clearErrors: clearUsersError, clearSuccessMsg: clearUsersSuccess },
];

export default function Alert() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    useEffect(() => {
        reducers.forEach(({ stateKey, clearErrors, clearSuccessMsg }) => {
            const { error, msg } = state[stateKey] || {};
            if (error) {
                toast.error(error);
                dispatch(clearErrors());
            }
            if (msg) {
                toast.success(msg);
                dispatch(clearSuccessMsg());
            }
        });
    }, [dispatch, state]);

    return null;
}

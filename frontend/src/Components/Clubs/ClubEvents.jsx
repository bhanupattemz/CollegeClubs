import "./clubDetails.css"
import { Fragment, useState, useEffect } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSingleClub } from "../../Actions/clubsAction"
import { getClubEvents } from "../../Actions/EventAction"
import Banner from "./Banner"
import EventContainer from "../Home/Events"
import Loading from "../Loaders/Loading"
import NoEvents from "../Events/NoEvents"
export default function ClubEvents() {
    const navigate = useNavigate()
    const { _id } = useParams()
    const { singleClub } = useSelector(state => state.singleClub)
    const { events, loading } = useSelector(state => state.events)
    const dispatch = useDispatch()
    const currentBtnStyles = {
        borderBottom: "5px solid black"
    }
    useEffect(() => {
        dispatch(getClubEvents(_id))
        if (!singleClub || singleClub._id != _id) {
            dispatch(getSingleClub(_id))
        }

    }, [])
    if (loading) {
        return <Loading />
    }
    return (
        <Fragment>

            <main className="club-details-main">
                {singleClub && events &&
                    <Fragment>
                        <section className="club-details-btns-section">
                            <button onClick={() => navigate(`/clubs/${singleClub._id}`)} >Club Details</button>
                            <button onClick={() => navigate(`/clubs/gallery/${singleClub._id}`)}>Club Gallery</button>
                            <button onClick={() => navigate(`/clubs/events/${singleClub._id}`)} style={currentBtnStyles}>Conducted Events</button>
                            <button onClick={() => navigate(`/clubs/coordinators/${singleClub._id}`)}>Coordinators</button>
                        </section>
                        <section>
                            <Banner discription={`Explore the events hosted by ${singleClub.name} Club and witness the impact we've made in our community.`} link={singleClub.bannerImage.url} heading={`${singleClub.name} Events`} />
                        </section>
                        <section className="club-events-section">
                            {events.length > 0 ? events.map((item, inx) => {
                                return (
                                    <EventContainer event={item} />
                                )
                            }) : <NoEvents />}
                        </section>
                    </Fragment>
                }

            </main>

        </Fragment>
    )
}
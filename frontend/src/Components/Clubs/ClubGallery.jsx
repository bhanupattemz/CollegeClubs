import { Fragment, useState, useEffect } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getClubGallery } from "../../Actions/GalleryAction"
import { getSingleClub } from "../../Actions/clubsAction"
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import Gallerycontainer from "../Gallery/GalleryContainer"
import Banner from "./Banner"
import "./ClubDetails.css"
import Loading from "../Loaders/Loading"
export default function ClubGallery() {
    const navigate = useNavigate()
    const { _id } = useParams()
    const { singleClub } = useSelector(state => state.singleClub)
    const { clubGallery, loading } = useSelector(state => state.clubGallery)
    const dispatch = useDispatch()
    const currentBtnStyles = {
        borderBottom: "5px solid black"
    }
    useEffect(() => {
        dispatch(getClubGallery(_id))
        if (!singleClub || singleClub._id != _id) {
            dispatch(getSingleClub(_id))
        }
    }, [])
    if (loading) {
        return <Loading />
    }
    return (
        <Fragment>
            {clubGallery && singleClub &&
                <main className="club-details-main">
                    <section className="club-details-btns-section">
                        <button onClick={() => navigate(`/clubs/${singleClub._id}`)} >Club Details</button>
                        <button onClick={() => navigate(`/clubs/gallery/${singleClub._id}`)} style={currentBtnStyles}>Club Gallery</button>
                        <button onClick={() => navigate(`/clubs/events/${singleClub._id}`)}>Conducted Events</button>
                        <button onClick={() => navigate(`/clubs/coordinators/${singleClub._id}`)}>Coordinators</button>
                    </section>
                    <section>
                        <Banner link={singleClub.bannerImage.url} heading={`${singleClub.name} Gallery`} />
                    </section>
                    <section>
                        {clubGallery.length > 0 ? clubGallery.map((item, inx) => {
                            return (<Gallerycontainer data={item} />)
                        }) : <div>
                            <h2>Empty Gallery</h2>
                        </div>}
                    </section>
                </main>}
        </Fragment>

    )
}
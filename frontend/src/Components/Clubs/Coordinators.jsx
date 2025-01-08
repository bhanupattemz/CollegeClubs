import "./clubDetails.css"
import { Fragment, useState, useEffect } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSingleClub } from "../../Actions/clubsAction"
import Banner from "./Banner"
import CoordinatorLeft from "../AboutUs/Coordinators/CoordinatorLeft"
import CoordinatorRight from "../AboutUs/Coordinators/CoordinatorRight"
import Loading from "../Loaders/Loading"
export default function Coordinators() {
    const navigate = useNavigate()
    const { _id } = useParams()
    const { singleClub, loading } = useSelector(state => state.singleClub)
    const dispatch = useDispatch()
    const currentBtnStyles = {
        borderBottom: "5px solid black"
    }
    useEffect(() => {
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
                {singleClub &&
                    <Fragment>
                        <section className="club-details-btns-section">
                            <button onClick={() => navigate(`/clubs/${singleClub._id}`)} >Club Details</button>
                            <button onClick={() => navigate(`/clubs/gallery/${singleClub._id}`)}>Club Gallery</button>
                            <button onClick={() => navigate(`/clubs/events/${singleClub._id}`)} >Conducted Events</button>
                            <button onClick={() => navigate(`/clubs/coordinators/${singleClub._id}`)} style={currentBtnStyles}>Coordinators</button>
                        </section>
                        <section>
                            <Banner discription={`Meet the coordinators of the ${singleClub.name} Club, responsible for managing events and ensuring smooth club operations.`} link={singleClub.bannerImage.url} heading={`${singleClub.name} Coordinators`} />
                        </section>
                        <section>
                            {singleClub.coordinators.length > 0 ? singleClub.coordinators.map((item, inx) => {
                                return (
                                    <Fragment key={inx}>
                                        {inx % 2 == 0 ?
                                            <CoordinatorLeft
                                                imageUrl={item.personalInformation.profile.url}
                                                typeText={"Club Coordinator"}
                                                description={item.description}
                                                name={item.personalInformation.firstname + " " + item.personalInformation.lastname}
                                            /> :
                                            <CoordinatorRight
                                                imageUrl={item.personalInformation.profile.url}
                                                typeText={"Club Coordinator"}
                                                description={item.description}
                                                name={item.personalInformation.firstname + " " + item.personalInformation.lastname}

                                            />}
                                    </Fragment>
                                )
                            }) : <div>
                                <h2>No Coordinators Found</h2>
                            </div>}
                        </section>
                    </Fragment>
                }
            </main>
        </Fragment>
    )
}
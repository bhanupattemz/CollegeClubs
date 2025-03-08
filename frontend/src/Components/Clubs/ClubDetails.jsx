import "./ClubDetails.css"
import { Fragment, useState, useEffect } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSingleClub, registerClub } from "../../Actions/clubsAction"

import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import Banner from "./Banner"
import { confirmAlert } from 'react-confirm-alert';
import { FaRegRegistered } from "react-icons/fa";
import Loading from "../Loaders/Loading"
export default function ClubDetails() {
    const navigate = useNavigate()
    const { _id } = useParams()
    const { singleClub, loading } = useSelector(state => state.singleClub)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const currentBtnStyles = {
        borderBottom: "5px solid black"
    }
    const registerbtnHandler = async () => {
        const options = {
            title: `Confirm Registration for ${singleClub.name}`,
            message: `Ready to join ${singleClub.name}? Click 'Confirm' to secure your spot or 'Cancel' to back out.`,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: async () => {
                        dispatch(registerClub(singleClub._id))
                    }
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "register-club-confirmation-popup"
        };
        if (!user) {
            navigate("/signin")
        } else {
            confirmAlert(options)
        }
    }
    useEffect(() => {
        dispatch(getSingleClub(_id))
    }, [])
    if (loading) {
        return <Loading />
    }
    return (

        <Fragment>
            {singleClub &&
                <main className="club-details-main">
                    <section className="club-details-btns-section">
                        <button onClick={() => navigate(`/clubs/${singleClub._id}`)} style={currentBtnStyles}>Club Details</button>
                        <button onClick={() => navigate(`/clubs/gallery/${singleClub._id}`)}>Club Gallery</button>
                        <button onClick={() => navigate(`/clubs/events/${singleClub._id}`)}>Conducted Events</button>
                        <button onClick={() => navigate(`/clubs/coordinators/${singleClub._id}`)}>Coordinators</button>
                    </section>
                    <section>
                        {!singleClub.members.includes(user ? user._id : null) && (new Date(singleClub.registrationTiming.starting).getTime() < Date.now() &&
                            new Date(singleClub.registrationTiming.ending).getTime() > Date.now()) ?
                            <Banner link={singleClub.bannerImage.url} heading={singleClub.name} btntext={"Register Now"} btnFunction={registerbtnHandler} /> :
                            <Banner link={singleClub.bannerImage.url} heading={singleClub.name}
                            />
                        }
                    </section>

                    <section className="club-details-main-content">
                        <div className="club-details-about-heading">
                            <img src={singleClub.logo.url} alt="club-logo" />
                            <h2>About {singleClub.name} {singleClub.members.includes(user ? user._id : null) && <span style={{ color: "Green" }}><FaRegRegistered /></span>}</h2>
                        </div>
                        <div className="club-details-about-content">
                            <p>{singleClub.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid quis voluptatibus quasi? Unde itaque culpa exercitationem voluptatem obcaecati ad dicta facere porro ex, quas, quasi tenetur totam natus autem.</p>
                        </div>
                    </section>
                    <section className="clubs-details-skills-section">
                        <h2>Skills</h2>
                        <div className="clubs-details-skills-content">
                            {singleClub.skills.map((item, inx) => {
                                return (<div key={inx}>{item}</div>)
                            })}
                        </div>
                    </section>
                    <section className="club-details-timings">
                        <h2>Club Timings & Schedule</h2>
                        <div className="club-details-page-details">
                            <div>
                                <h3><MdDateRange /> Weekly Club Timings</h3>
                                <ul>
                                    {singleClub.timings.map((item, inx) => {
                                        return <li>{item.day}, {item.time}</li>
                                    })}
                                </ul>
                            </div>
                            <div>
                                <h3><FaLocationDot /> Location:</h3>
                                <ul>
                                    <li><b>Venue Name:</b> cse Dept</li>
                                    <li><b>Address:</b> ABC College of Engineering, Sir Mokshagundam Visvesvaraya Road, Anantapuramu, Andhra Pradesh - 515002</li>
                                    <li><b>Landmark:</b> Near CSE</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>}
        </Fragment>


    )
}
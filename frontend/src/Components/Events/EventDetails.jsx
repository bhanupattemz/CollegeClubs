import "./EventDetails.css"
import Timer from "../Home/Timer"
import { ConvertTime } from "../Functionalities/functionalites"
import { useSelector, useDispatch } from "react-redux"
import { getSingleEvent, registerEvents } from "../../Actions/EventAction"
import { useState, useRef, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Bs1Square, Bs2Square, Bs3Square } from "react-icons/bs";
import Loading from "../Loaders/Loading"
import { confirmAlert } from 'react-confirm-alert';
import { FaRegRegistered } from "react-icons/fa";
export default function EventDetails() {
    const { user } = useSelector(state => state.user)
    const { _id } = useParams()
    const dispatch = useDispatch()
    const { singleEvent, loading } = useSelector(state => state.singleEvent)
    const [nClubs, setnClubs] = useState(0)
    const navigate = useNavigate()
    const clubsScrollRef = useRef(null)
    const LeftRef = useRef(null)
    const RightRef = useRef(null)
    const options = singleEvent && {
        title: `Confirm Registration for ${singleEvent.name}`,
        message: `Confirm your registration for ${singleEvent.name} on ${ConvertTime(singleEvent.timings.starting).split(",")[0]}. Click 'Confirm' to proceed or 'Cancel' to stop.`,
        buttons: [
            {
                label: 'Confirm',
                onClick: async () => {
                    if (singleEvent) {
                        dispatch(registerEvents(singleEvent._id))
                    }

                }
            },
            {
                label: 'Cancel',
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        overlayClassName: "register-event-confirmation-popup"
    };
    const registerEventBtnHandler = async (e) => {
        if (!user) {
            console.log("must and should login To Register Event")
            navigate("/signin")
        } else {
            confirmAlert(options)
        }
    }
    let [currentClub, setcurrentClub] = useState(0)
    useEffect(() => {
        if (LeftRef.current && RightRef.current) {
            LeftRef.current.style.transform = `translateX(100px)`
            RightRef.current.style.transform = `translateX(-100px)`
        }
    })
    useEffect(() => {
        const wrapper = clubsScrollRef.current;

        if (wrapper) {
            wrapper.style.transform = `translateX(-${(currentClub - 1) * 19}%)`;
            wrapper.style.transition = "transform 0.5s ease-in-out";
        }
    }, [currentClub])

    useEffect(() => {
        if (!singleEvent || (singleEvent && singleEvent._id != _id)) {
            dispatch(getSingleEvent(_id))
        }
    }, [_id])
    useEffect(() => {
        setnClubs(singleEvent ? singleEvent.conductedClub.length : 0)
    }, [singleEvent])
    if (loading) {
        return <Loading />
    }
    return (
        <Fragment>
            {singleEvent && <main className="event-details-main">
                <section className="event-details-section">
                    <div className="event-details-left" ref={LeftRef}>
                        <h1>{singleEvent.name} {singleEvent.members.includes(user ? user._id : null) && <span className="event-registered-svg" style={{ color: "LightGreen" }}> <FaRegRegistered /></span>}</h1>
                        <div>
                            <h2>About This Event</h2>
                            <div>
                                <p>{singleEvent.description}</p>
                            </div>
                            {new Date(singleEvent.timings.starting).getTime() > Date.now() &&
                                <section className="event-details-apply-btn">
                                    {!singleEvent.members.includes(user ? user._id : null) && <button disabled={loading} onClick={registerEventBtnHandler}>Apply Now</button>}
                                </section>
                            }

                        </div>
                    </div>
                    <div className="event-details-right" ref={RightRef}>
                        <div>
                            <img src={singleEvent.image.url} alt="event-img" />
                        </div>
                    </div>

                </section>

                <section>
                    <h2>Event Timings & Schedule</h2>
                    <div className="event-details-schedule">
                        <div>
                            <Timer time={singleEvent.timings.starting} />
                        </div>
                        <div>
                            <h3><MdDateRange /> Date & Time :</h3>
                            <ul>
                                <li><b>Begins :</b>  <span>{ConvertTime(singleEvent.timings.starting)}</span></li>
                                <li><b>Finishes :</b>  <span>{ConvertTime(singleEvent.timings.ending)}</span></li>
                            </ul>

                        </div>
                        <div>
                            <h3><FaLocationDot /> Venue :</h3>
                            <ul>
                                <li><b>Venue Name:</b> {singleEvent.venue.venueName}</li>
                                <li><b>Address:</b> JNTUA College of Engineering, Sir Mokshagundam Visvesvaraya Road, Anantapuramu, Andhra Pradesh - 515002</li>
                                <li><b>Landmark:</b> {singleEvent.venue.landMark}</li>
                            </ul>
                        </div>

                    </div>
                </section>
                <section className="event-details-clubs-section">
                    <h2>Organizing Clubs</h2>
                    <div className="event-details-organized-clubs">
                        {singleEvent.conductedClub.length > 2 && <button onClick={e => setcurrentClub(prev => (prev - 1 + nClubs) % nClubs)}><FaAngleDoubleLeft /></button>}
                        <div className="event-details-club-scroll">

                            <div className="event-details-clubs-container" style={{ justifyContent: nClubs > 2 ? "flex-start" : null }} ref={clubsScrollRef}>

                                {singleEvent.conductedClub.map((club, inx) => {
                                    return (
                                        <div key={inx} className="event-details-club">
                                            <img src={club.logo.url} alt="club-logo" />

                                            <div>
                                                <h3>{club.name}</h3>
                                                <button onClick={e => navigate(`/clubs/${club._id}`)}>View More</button>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>

                        </div>
                        {singleEvent.conductedClub.length > 2 && currentClub < nClubs && <button onClick={e => setcurrentClub(prev => (prev + 1 + nClubs) % nClubs)} ><FaAngleDoubleRight /></button>}


                    </div>

                </section>
                {Date.now() > new Date(singleEvent.timings.ending) && <section>
                    <h2>Top Performers & Prize Winners</h2>
                    {singleEvent.winner.length == 3 ?
                        <div className="event-details-prize">
                            <div>
                                <h3><Bs1Square /> <sup>st</sup> Prize</h3>
                                <p>{singleEvent.winner[0].name}</p>
                            </div>
                            <div>
                                <h3><Bs2Square /> <sup>nd</sup> Prize</h3>
                                <p>{singleEvent.winner[1].name}</p>
                            </div>
                            <div>
                                <h3><Bs3Square /> <sup>rd</sup> Prize</h3>
                                <p>{singleEvent.winner[2].name}</p>
                            </div>
                        </div> : <div className="event-details-prize"><h3>Winners not declears yet!</h3></div>}
                </section>}
            </main>}
        </Fragment>

    )
}


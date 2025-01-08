import { Fragment, useEffect, useState } from "react"
import "./userProfileOptions.css"
import "../../Clubs/AllClubs.css"
import { useSelector, useDispatch } from "react-redux"
import { getUserclubs } from "../../../Actions/clubsAction"
import { getUserEvents } from "../../../Actions/EventAction"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa";
import Event from "../../Home/Events"
import axios from "axios"
import Loading from "../../Loaders/Loading"
import { BACKENDURL, ConvertTime } from "../../Functionalities/functionalites"
import 'react-confirm-alert/src/react-confirm-alert.css';
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function UserProfileOptions({ setPdfUrl }) {
    let query = new URLSearchParams(useLocation().search);
    const [option, setOption] = useState(query.get("type") || "pd")
    const { clubs, loading: clubLoading } = useSelector(state => state.clubs)
    const { events, loading: eventLoading } = useSelector(state => state.events)
    const { user, loading: UserLoading } = useSelector(state => state.user)
    const [certificates, setCertificates] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const optionStyles = {
        color: "#0A5EB0",
        borderBottom: "4px solid #0A5EB0"
    }


    useEffect(() => {
        clubLoading && setLoading(clubLoading)
        eventLoading && setLoading(eventLoading)
        !clubLoading && !eventLoading && setLoading(false)
    }, [UserLoading, clubLoading, eventLoading])
    useEffect(() => {
        if (user) {
            if (option == "clubs") {
                dispatch(getUserclubs(user._id))
            }
            if (option == "events") {
                dispatch(getUserEvents(user._id))
            }
            if (option == "achi" && !certificates) {
                async function getCertificates() {
                    setLoading(true)
                    let response = undefined
                    try {
                        response = await axiosInstance.get(`/certificates/${user._id}`)
                        response.data && setCertificates(response.data.data)
                    } catch (err) {
                        console.log(err)
                    }
                    setLoading(false)

                }
                getCertificates()
            }
        }
    }, [option])
    if (UserLoading) {
        return (<Loading />)
    }
    return (
        <Fragment>

            <section className="user-data-section">
                <div className="user-data-options">
                    <span onClick={() => { setOption("pd") }} style={option == "pd" ? optionStyles : null}>Personal Details</span>
                    {["student", "coordinator"].includes(user.role) &&
                        <Fragment>
                            <span onClick={() => { setOption("achi") }} style={option == "achi" ? optionStyles : null}>Achievements</span>
                            <span onClick={() => { setOption("clubs") }} style={option == "clubs" ? optionStyles : null}>Participating Clubs</span>
                            <span onClick={() => { setOption("events") }} style={option == "events" ? optionStyles : null}>Your Past Events</span>
                        </Fragment>
                    }
                </div>
                {loading ?
                    <div >
                        <div className="card-loading user-data-loading-cards">

                        </div>
                        <div className="card-loading user-data-loading-cards">

                        </div>
                        <div className="card-loading user-data-loading-cards">

                        </div>
                    </div> :
                    <div className="user-options-data">
                        {option == "pd" &&
                            <div className="user-data-personal-information">
                                <div >
                                    <h2>BASIC INFORMATION</h2>
                                    <div>
                                        <div className="about-data-heading"><h3>Full Name :</h3></div>
                                        <div>{user.personalInformation.firstname} {user.personalInformation.lastname}</div>
                                    </div>

                                    <div>
                                        <div className="about-data-heading"><h3>Gender :</h3></div>
                                        <div>{user.personalInformation.gender == "male" ? "Male" : "Female"}</div>
                                    </div>
                                    <div>
                                        <div className="about-data-heading"><h3>Date Of Birth :</h3></div>
                                        <div>{user.personalInformation.DOB && ConvertTime(user.personalInformation.DOB).split(",")[0]}</div>
                                    </div>
                                </div>
                                <div>
                                    <h2>CONTACT INFORMATION</h2>
                                    <div>
                                        <div className="about-data-heading"><h3>{["student", "coordinator"].includes(user.role) ? "College Mail :" : "Mail :"}</h3>                                        </div>
                                        <div>{user.mail}</div>
                                    </div>
                                    <div>
                                        <div className="about-data-heading"><h3>Personal Mail :</h3></div>
                                        <div>{user.personalInformation.personalMail}</div>
                                    </div>
                                    <div>
                                        <div className="about-data-heading"><h3>Mobile :</h3></div>
                                        <div>{user.personalInformation.mobileNo}</div>
                                    </div>
                                </div>
                                {["student", "coordinator"].includes(user.role) &&
                                    <div>
                                        <h2>ACADEMIC INFORMATION</h2>
                                        <div>
                                            <div className="about-data-heading"><h3>Admission No :</h3></div>
                                            <div>{user.admissionNo.toUpperCase()}</div>
                                        </div>
                                        <div>
                                            <div className="about-data-heading"><h3>Cource :</h3></div>
                                            <div>{user.course.toUpperCase()}</div>
                                        </div>
                                        <div>
                                            <div className="about-data-heading"><h3>Branch :</h3></div>
                                            <div>{user.branch.toUpperCase()}</div>
                                        </div>
                                        <div>
                                            <div className="about-data-heading"><h3>Year of Studying :</h3></div>
                                            <div>{user.academicYear}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {option == "clubs" && (clubs ?
                            <div>
                                {clubs &&
                                    clubs.map((item, inx) => {
                                        return (
                                            <div key={inx} className="user-data-clubs">
                                                <div className="allclubs-club-card">
                                                    <div className="allclubs-clubs-container">
                                                        <div className="allclubs-club-img">
                                                            <img src={item.logo.url} alt="club-log" />
                                                        </div>
                                                        <div className="allclubs-club-details">
                                                            <div>
                                                                <h3>{item.name}</h3>
                                                                <h4>Skills</h4>
                                                                <div className="allclubs-club-skills">
                                                                    {item.skills.map((skill, i) => {
                                                                        return (<div key={i}>{skill}</div>)
                                                                    })}

                                                                </div>
                                                            </div>
                                                            <div className="all-clubs-exp-more">
                                                                <button onClick={() => { navigate(`/clubs/${item._id}`) }}>Explore More <FaChevronRight /></button>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>)
                                    })
                                }
                            </div> :
                            <div className="profile-no-clubs">
                                <h2>No Clubs Found</h2>
                            </div>)
                        }
                        {option == "achi" && (certificates ?
                            <div className="user-certificates-container">
                                {certificates.map((item, inx) => {

                                    return (
                                        <div key={inx} className="user-certificates">
                                            <div>
                                                <Link to={`/events/${item.event._id}`}><h3>{item.event.name}</h3></Link>
                                                <p><b>Issued At :</b> {ConvertTime(item.createdAt).split(",")[0]}</p>
                                            </div>
                                            <div>
                                                <button onClick={() => setPdfUrl(item.pdf.url)}>view</button>
                                                <a href={item.pdf.url} target="_blank"><button>Download</button></a>
                                            </div>
                                        </div>)
                                })}
                            </div> :
                            <div className="user-data-no-certificates">
                                <h2>No Certificates Earned Yet</h2>
                            </div>
                        )}
                        {option == "events" && (events ?
                            <div className="user-data-events">
                                {events.map((item, inx) => {
                                    return (
                                        <Event key={inx} event={item} />
                                    )
                                })}
                            </div> :
                            <div className="user-data-no-events">
                                <h2>No Events Joined Yet</h2>
                            </div>
                        )}
                    </div>
                }

            </section>

        </Fragment>
    )
}
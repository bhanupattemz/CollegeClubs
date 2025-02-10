import "./AllClubs.css"
import Banner from "./Banner"
import { Fragment, useEffect, useState } from "react"
import { FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { getAllclubs, registerClub } from "../../Actions/clubsAction"
import NoClubs from "./NoClubs";
import { confirmAlert } from 'react-confirm-alert';
import { FaRegRegistered } from "react-icons/fa";
import Loading from "../Loaders/Loading";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
export default function AllClubs() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const registerBtnHander = async (club) => {
        const options = {
            title: `Confirm Registration for ${club.name}`,
            message: `Ready to join ${club.name}? Click 'Confirm' to secure your spot or 'Cancel' to back out.`,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: async () => {
                        dispatch(registerClub(club._id))
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

    const { clubs, loading } = useSelector(state => state.clubs)
    const { user } = useSelector(state => state.user)
    const [currentBtn, setCurrentBtn] = useState("all")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [joinClubs, setJoinClubs] = useState([])
    const [key, setKey] = useState(queryParams.get('key'))
    const currentBtnStyles = {
        backgroundColor: "#1F509A",
        color: "white",
        border: "2px solid #1F509A"
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        navigate(`/clubs?key=${key}`)
        dispatch(getAllclubs(key))
    }
    useEffect(() => {
        if (!clubs) {
            dispatch(getAllclubs(""))
        }
    }, [])
    useEffect(() => {
        if (clubs) {
            setJoinClubs([])
            clubs.map((item) => {
                const currentDate = Date.now()
                if (new Date(item.registrationTiming.starting).getTime() < currentDate &&
                    new Date(item.registrationTiming.ending).getTime() > currentDate) {
                    setJoinClubs(prev => ([...prev, item]))
                }
            })
        }
    }, [clubs])
    if (loading) {
        return <Loading />
    }
    return (
        <Fragment>
            <main className="all-clubs-main">
                <section>
                    <Banner
                        elements={
                            <form onSubmit={searchSubmitHandler} className="all-clubs-search-div">
                                <input type="text" name="club" placeholder="Search for Club" onChange={(e) => setKey(e.target.value)} />
                                <button >Search</button>
                            </form>}
                        discription={"Explore a variety of student clubs that inspire creativity, leadership, and teamwork. Join like-minded peers and make the most of your campus life!"} heading={"Discover Our Clubs"} link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
                </section>

                <section className="allclubs-btns-section">
                    <button onClick={() => setCurrentBtn("all")} style={currentBtn == "all" ? currentBtnStyles : null}>All Clubs</button>
                    <button onClick={() => setCurrentBtn("join")} style={currentBtn == "join" ? currentBtnStyles : null}>Join Now</button>
                </section>
                <section className="allclubs-clubs-section">
                    {currentBtn == "all" && (clubs && clubs.length > 0 ? clubs.map((item, inx) => {

                        return (
                            <div key={inx}>
                                <div className="allclubs-club-card">
                                    <div className="allclubs-clubs-container">
                                        <div className="allclubs-club-img">
                                            <img src={item.logo.url} alt="club-log" />
                                            <h3 className="all-clubs-name-mid">{item.name} {item.members.includes(user ? user._id : null) && <span style={{ color: "Green" }}><FaRegRegistered /></span>}</h3>
                                        </div>
                                        <div className="allclubs-club-details">
                                            <div>
                                                <h3>{item.name} {item.members.includes(user ? user._id : null) && <span style={{ color: "Green" }}><FaRegRegistered /></span>}</h3>
                                                <h4>Skills</h4>
                                                <div className="allclubs-club-skills">
                                                    {item.skills.map((skill, i) => {
                                                        return (<div key={i}>{skill}</div>)
                                                    })}

                                                </div>
                                            </div>
                                            <div className="all-clubs-exp-more">
                                                <button onClick={() => navigate(`/clubs/${item._id}`)}>Explore More <FaChevronRight /></button>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )
                    }) : <NoClubs />
                    )}
                    {currentBtn == "join" && (joinClubs && joinClubs.length > 0 ?
                        joinClubs.map((item, inx) => {
                            return (
                                <div key={inx}>
                                    <div className="allclubs-club-card">

                                        <div className="allclubs-clubs-container">
                                            <div className="allclubs-club-img">
                                                <img src={item.logo.url} alt="club-log" />
                                                <h3 className="all-clubs-name-mid">{item.name} {item.members.includes(user ? user._id : null) && <span style={{ color: "Green" }}><FaRegRegistered /></span>}</h3>
                                            </div>
                                            <div className="allclubs-club-details">
                                                <div>
                                                    <h3>{item.name} {item.members.includes(user ? user._id : null) && <span style={{ color: "Green" }}><FaRegRegistered /></span>}</h3>
                                                    <h4>Skills</h4>
                                                    <div className="allclubs-club-skills">
                                                        {item.skills.map((skill, i) => {
                                                            return (<div key={i}>{skill}</div>)
                                                        })}

                                                    </div>
                                                </div>
                                                <div className="all-clubs-exp-more">
                                                    <button onClick={() => navigate(`/clubs/${item._id}`)}>Explore More <FaChevronRight /></button>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="allclubs-registration-btn">
                                        {!item.members.includes(user ? user._id : null) &&
                                            <button onClick={() => registerBtnHander(item)}>Register Club</button>
                                        }

                                    </div>
                                </div>
                            )
                        }) : <NoClubs />

                    )}

                </section>
            </main>
        </Fragment>
    )
}
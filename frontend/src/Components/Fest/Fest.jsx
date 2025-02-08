import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { getFestEvents } from "../../Actions/festActions"
import Loading from "../Loaders/Loading"
import Event from "./Events"
import "./Fest.css"
import axios from "axios"
import { BACKENDURL, ConvertTime } from "../Functionalities/functionalites"
import Banner from "../Clubs/Banner"
// import Banner from 
export default function Fest() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [registrationEvents, setRegistrationEvents] = useState([])
    const [currentState, setCurrentState] = useState("all");
    const btnStyles = { backgroundColor: "#0A5EB0", color: "white", border: "2px solid #0A5EB0" }
    const handleStateChange = (state) => {
        setCurrentState(state);
    };
    const [fest, setFest] = useState()
    const [festLoading, setFestLoading] = useState(false)
    const dispatch = useDispatch()
    const { festEvents, loading } = useSelector(state => state.festEvents)
    const [key, setKey] = useState(queryParams.get('key') ? queryParams.get('key') : "")
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        navigate(`/fest?key=${key}`)
        dispatch(getFestEvents(key))
    }
    useEffect(() => {
        if (!fest) {
            async function getCurrentFest() {
                try {
                    setFestLoading(true)
                    const response = await axiosInstance.get("/fest")
                    setFest(response.data.data)
                }
                catch (err) {
                    console.log(err)
                }
                setFestLoading(false)
            }
            getCurrentFest()
        }
        dispatch(getFestEvents(key))
    }, [])
    useEffect(() => {
        if (festEvents) {
            setRegistrationEvents([])
            festEvents.map((item) => {
                const currentTime = Date.now()
                if (new Date(item.registration.starting).getTime() < currentTime && new Date(item.registration.ending).getTime() > currentTime) {
                    setRegistrationEvents(prev => [...prev, item])
                }
            })
        }
    }, [festEvents])

    if (loading || festLoading) {
        return <Loading />
    }
    return (
        <Fragment>
            {
                fest ?
                    <main>
                        < section >
                            <Banner
                                elements={
                                    <form onSubmit={searchSubmitHandler} className="all-events-search-div">
                                        <input type="text" name="events" value={key} placeholder="Search for Event" onChange={(e) => setKey(e.target.value)} />
                                        <button >Search</button>
                                    </form>
                                }
                                heading={fest.name}
                                link={fest.image.url}
                                discription={fest.description}
                            />
                        </section >
                        <section className="all-events-btns">
                            <button onClick={() => handleStateChange("all")} style={currentState == "all" ? btnStyles : null}>Explore All</button>
                            <button onClick={() => handleStateChange("register")} style={currentState == "register" ? btnStyles : null}>Register Events</button>
                        </section>
                        <section className="fest-events-sections">
                            {currentState == "all" && (festEvents && festEvents.length > 0 ?
                                <Fragment>
                                    {festEvents.map((item, inx) => {
                                        return (
                                            <Event key={inx} event={item} />
                                        )
                                    })}
                                </Fragment> :
                                <div>
                                    Not found
                                </div>)}
                            {currentState == "register" && (registrationEvents && registrationEvents.length > 0 ?
                                <Fragment>
                                    {registrationEvents.map((item, inx) => {
                                        return <Event key={inx} event={item} />
                                    })}
                                </Fragment> :
                                <div>NO Events found</div>)
                            }
                        </section>
                    </main >
                    : <main>Fest Not Found</main>
            }

        </Fragment>
    )
}
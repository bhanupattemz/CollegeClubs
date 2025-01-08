import "./AllEvents.css";
import Event from "../Home/Events";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../Actions/EventAction"
import Banner from "../Clubs/Banner";
import NoEvents from "./NoEvents";
import Loading from "../Loaders/Loading"
import { useNavigate, useLocation } from "react-router";
export default function AllEvents() {
    const { events, loading } = useSelector((state) => state.events);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentState, setCurrentState] = useState("all");
    const btnStyles = { backgroundColor: "#0A5EB0", color: "white", border: "2px solid #0A5EB0" }
    const handleStateChange = (state) => {
        setCurrentState(state);
    };
    const [pastevents, setPastEvents] = useState([])
    const [featureEvents, setfeatureEvents] = useState([])
    const [key, setKey] = useState(queryParams.get('key') ? queryParams.get('key') : "")
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        navigate(`/events?key=${key}`)
        dispatch(getAllEvents(key))
    }
    useEffect(() => {
        dispatch(getAllEvents(key))
    }, [])
    useEffect(() => {
        if (events) {
            setPastEvents([])
            setfeatureEvents([])
            events.map((item) => {
                const eventTime = new Date(item.timings.starting).getTime();
                if (eventTime < Date.now()) {
                    setPastEvents(prev => [...prev, item])
                } else if (eventTime > Date.now()) {
                    setfeatureEvents(prev => [...prev, item])
                }
            })
        }

    }, [events])
    if (loading) {
        return <Loading />;
    }
    return (
        <main className="all-events-main">
            <section>
                <Banner
                    elements={
                        <form onSubmit={searchSubmitHandler} className="all-events-search-div">
                            <input type="text" name="events" value={key} placeholder="Search for Event" onChange={(e) => setKey(e.target.value)} />
                            <button >Search</button>
                        </form>
                    }
                    discription={"Discover exciting events happening in our clubs. Join in and make unforgettable memories!"}
                    heading={"Club Events"}
                    link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
            </section>
            <section className="all-events-btns">
                <button onClick={() => handleStateChange("all")} style={currentState == "all" ? btnStyles : null}>Explore All</button>
                <button onClick={() => handleStateChange("feature")} style={currentState == "feature" ? btnStyles : null}>Ongoing Events</button>
                <button onClick={() => handleStateChange("past")} style={currentState == "past" ? btnStyles : null}>Event Highlights</button>
            </section>

            <section className="all-events">
                {currentState == "all" && (events && events.length != 0 ?
                    events.map((item) => {
                        return <Event key={item._id} event={item} />;
                    }) : <NoEvents />)
                }
                {currentState == "past" && (pastevents.length > 0 ?
                    pastevents.map((item, inx) => {
                        return <Event key={inx} event={item} />
                    }) : <NoEvents />)
                }
                {currentState == "feature" && (featureEvents.length > 0 ?
                    featureEvents.map((item, inx) => {
                        return <Event key={inx} event={item} />
                    }) : <NoEvents />)
                }
            </section>
        </main>
    );
}

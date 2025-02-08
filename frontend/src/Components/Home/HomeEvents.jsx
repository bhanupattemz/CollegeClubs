import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Events from "./Events";
import "./HomeEvents.css"
import { useRef, useEffect, useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllEvents } from "../../Actions/EventAction"
export default function HomeEvents() {
    const dispatch = useDispatch()
    let { events } = useSelector(state => state.events)
    let data = events || [];
    events = events ? events.filter((item) => {
        if (Date.now() < new Date(item.timings.starting).getTime()) {
            return item
        }
    }) : []
    const len = events && events.length == 0 ? data.length : events.length
    let [eventNo, setEventNo] = useState(0)
    let EventContainerRef = useRef(null)

    useEffect(() => {
        const wrapper = EventContainerRef.current;
        if (wrapper) {
            wrapper.style.transform = `translateX(-${eventNo * 100}%)`;
            wrapper.style.transition = "transform 0.5s ease-in-out";
        }
    }, [eventNo])
    useEffect(() => {
        dispatch(getAllEvents())
    }, [])
    return (
        <Fragment>
            {events && <div className="event-container" >
                <div className="home-event-scroll-btns">
                    <button onClick={e => {
                        setEventNo(a => (a - 1 + len) % len)
                    }}><FaChevronLeft /></button>
                </div>

                <div className="home-event-scroller">
                    <div ref={EventContainerRef}>

                        {events.map((item, inx) => {
                            return (
                                <div key={inx} className="home-event-main">
                                    <div className="home-events-heading">
                                        <h2>Upcoming Events</h2>
                                    </div>
                                    <Events event={item} />
                                </div>
                            )
                        })}
                        {events.length == 0 && data.map((item, inx) => {
                            return (
                                <div key={inx} className="home-event-main">
                                    <div className="home-events-heading">
                                        <h2>Event Highlights</h2>
                                    </div>
                                    <Events event={item} />
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
                <div className="home-event-scroll-btns">
                    <button onClick={e => {
                        setEventNo(a => (a + 1 + len) % len)
                    }}><FaChevronRight /></button>
                </div>
            </div>}
            <div className="home-event-scroll-btns-mid">
                <div className="home-event-scroll-btns ">
                    <button onClick={e => {
                        setEventNo(a => (a - 1 + len) % len)
                    }}><FaChevronLeft /></button>
                </div>
                <div className="home-event-scroll-btns">
                    <button onClick={e => {
                        setEventNo(a => (a + 1 + len) % len)
                    }}><FaChevronRight /></button>
                </div>
            </div>
        </Fragment>
    )
}



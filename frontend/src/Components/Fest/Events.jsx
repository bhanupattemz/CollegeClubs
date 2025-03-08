import "../Home/Events.css"
import Timer from "../Home/Timer"
import { useNavigate } from "react-router-dom"
import { Fragment } from "react"
import { ConvertTime } from "../Functionalities/functionalites"
import { useDispatch, useSelector } from "react-redux"
import { confirmAlert } from 'react-confirm-alert';
import { FaRegRegistered } from "react-icons/fa";
export default function Events({ event, registration }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const { loading } = useSelector(state => state.singleEvent)
    return (
        <Fragment>
            {event && <div className="events">
                <div className="event-img">
                    <img src={event.image.url} alt="event-img" />
                    <div className="event-start-time">{ConvertTime(event.timings.starting)}</div>
                </div>
                <div className="event-body">
                    <div>
                        <h2>
                            {event.name} {event.members.includes(user ? user._id : null) && <span style={{ color: "LightGreen" }}> <FaRegRegistered /></span>}
                        </h2>
                        <h3 className="event-amount-heading">Registration Amount ₹{event.amount}</h3>
                    </div>
                    <div>
                        <Timer time={event.registration.ending} />
                        <p>{event.description}</p>
                        <div className="event-btns">
                            <button onClick={e => navigate(`/fest/events/${event._id}`)}>Explore More</button>
                            {new Date(event.registration.starting).getTime() < Date.now() && new Date(event.registration.ending).getTime() > Date.now() &&
                                (!event.members.includes(user ? user._id : null) &&
                                    <button disabled={loading} onClick={() => navigate(`/fest/register/${event._id}`)}>Register Now</button>)}
                        </div>
                    </div>
                </div>
            </div>
            }
        </Fragment>


    )
}